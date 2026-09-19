'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import { ADMIN_PATH } from '@/auth/constants'
import { cleanHtml } from '@/lib/sanitize'
import { translit } from '@/lib/translit'

const serviceSchema = z.object({
  title: z.string().min(3, 'Укажите название услуги'),
  slug: z.string().min(1, 'Слаг обязателен').regex(/^[a-z0-9-]+$/, 'Слаг: только латиница, цифры и дефис'),
  practice: z.union([z.string(), z.number()]).transform((v) => {
    const n = Number(v)
    return isNaN(n) || n <= 0 ? null : n
  }).refine((v) => v !== null, 'Выберите практику'),
  lead: z.string().min(1, 'Заполните лид-абзац'),
  body: z.string().optional(),
  whenText: z.string().optional(),
  order: z.coerce.number().default(0),
  lawyers: z.array(z.union([z.string(), z.number()])).transform((arr) =>
    arr.map((v) => Number(v)).filter((n) => !isNaN(n) && n > 0)
  ).default([]),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(180).optional(),
  status: z.enum(['draft', 'published']),
})

export async function saveService(id: string | null, _prev: unknown, formData: FormData) {
  await requirePermission('services', id ? 'update' : 'create')

  const raw = Object.fromEntries(formData) as Record<string, string>
  const title = (raw.title || '').trim()
  let slug = (raw.slug || '').trim()
  if (!slug && title) {
    slug = translit(title)
  }
  if (!slug) {
    slug = 'service-' + Date.now()
  } else {
    slug = translit(slug)
  }

  const parsed = serviceSchema.safeParse({
    ...raw,
    slug,
    lawyers: formData.getAll('lawyers').map(String).filter(Boolean),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const d = parsed.data
  const whenArray = d.whenText
    ? d.whenText.split('\n').map((s) => s.trim()).filter(Boolean).map((item) => ({ item }))
    : []

  const cleanText = (d.lead || d.body || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const fallbackDesc = cleanText
    ? cleanText.slice(0, 160)
    : `Юридические услуги адвокатского бюро ETLEGIS: ${d.title}`
  const fallbackTitle = `${d.title} — Адвокатское бюро ETLEGIS`.slice(0, 70)

  const data = {
    title: d.title,
    slug: d.slug,
    practice: d.practice,
    lead: d.lead,
    body: cleanHtml(d.body ?? ''),
    when: whenArray,
    lawyers: d.lawyers.length > 0 ? d.lawyers : undefined,
    order: d.order,
    seo: {
      title: d.seoTitle || fallbackTitle,
      description: d.seoDescription || fallbackDesc,
    },
    _status: d.status,
  }

  const payload = await getPayload()
  let doc: any
  try {
    doc = id
      ? await payload.update({ collection: 'services', id, data: data as any, draft: d.status === 'draft' })
      : await payload.create({ collection: 'services', data: data as any, draft: d.status === 'draft' })
  } catch (err: any) {
    console.error('Payload service save error:', err)
    return { error: err.message || 'Ошибка сохранения услуги' }
  }

  revalidateTag('services')
  revalidatePath('/services')
  revalidatePath(`/services/${doc.slug}`)
  revalidatePath('/')

  if (!id) redirect(`${ADMIN_PATH}/services/${doc.id}?saved=1`)
  return { ok: true, savedAt: Date.now() }
}

export async function deleteService(id: string) {
  await requirePermission('services', 'delete')
  const payload = await getPayload()
  await payload.delete({ collection: 'services', id })
  revalidateTag('services')
  redirect(`${ADMIN_PATH}/services?deleted=1`)
}
