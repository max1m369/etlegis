'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import { ADMIN_PATH } from '@/auth/constants'
import { cleanHtml } from '@/lib/sanitize'
import { translit } from '@/lib/translit'

const caseSchema = z.object({
  title: z.string().min(3, 'Название слишком короткое'),
  slug: z.string().min(1, 'Слаг обязателен').regex(/^[a-z0-9-]+$/, 'Слаг: только латиница, цифры и дефис'),
  practice: z.union([z.string(), z.number()]).transform((v) => {
    const n = Number(v)
    return isNaN(n) || n <= 0 ? null : n
  }).refine((v) => v !== null, 'Выберите практику'),
  role: z.enum(['plaintiff', 'defendant', 'defence']),
  amount: z.coerce.number().nonnegative().optional(),
  instances: z.string().optional(),
  duration: z.string().optional(),
  year: z.coerce.number().optional(),
  synopsis: z.string().optional(),
  task: z.string().optional(),
  actions: z.string().optional(),
  result: z.string().min(1, 'Заполните результат'),
  lawyers: z.array(z.union([z.string(), z.number()])).transform((arr) =>
    arr.map((v) => Number(v)).filter((n) => !isNaN(n) && n > 0)
  ).default([]),
  relatedServices: z.array(z.union([z.string(), z.number()])).transform((arr) =>
    arr.map((v) => Number(v)).filter((n) => !isNaN(n) && n > 0)
  ).default([]),
  showOnHome: z.coerce.boolean().default(false),
  clientConsent: z.coerce.boolean().default(false),
  consentDate: z.string().optional(),
  anonymizedClient: z.string().optional(),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(180).optional(),
  ogImage: z.union([z.string(), z.number()]).transform((v) => {
    const n = Number(v)
    return isNaN(n) || n <= 0 ? undefined : n
  }).optional(),
  status: z.enum(['draft', 'published']),
})

function parse(formData: FormData) {
  const raw = Object.fromEntries(formData) as Record<string, string>
  const title = (raw.title || '').trim()
  let slug = (raw.slug || '').trim()
  if (!slug && title) {
    slug = translit(title)
  }
  if (!slug) {
    slug = 'case-' + Date.now()
  } else {
    slug = translit(slug)
  }

  return caseSchema.safeParse({
    ...raw,
    slug,
    lawyers: formData.getAll('lawyers').map(String).filter(Boolean),
    relatedServices: formData.getAll('relatedServices').map(String).filter(Boolean),
    showOnHome: raw.showOnHome === 'on',
    clientConsent: raw.clientConsent === 'on',
  })
}

const toDoc = (d: z.infer<typeof caseSchema>) => {
  const cleanResultText = (d.result || d.synopsis || d.task || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const fallbackDesc = cleanResultText
    ? cleanResultText.slice(0, 160)
    : `Судебная практика адвокатского бюро ETLEGIS: ${d.title}`
  const fallbackTitle = `${d.title} — Адвокатское бюро ETLEGIS`.slice(0, 70)

  return {
    title: d.title,
    slug: d.slug,
    practice: d.practice,
    role: d.role,
    amount: d.amount || undefined,
    instances: d.instances || undefined,
    duration: d.duration || undefined,
    year: d.year || undefined,
    synopsis: cleanHtml(d.synopsis ?? ''),
    task: cleanHtml(d.task ?? ''),
    actions: cleanHtml(d.actions ?? ''),
    result: cleanHtml(d.result),
    lawyers: d.lawyers.length > 0 ? d.lawyers : undefined,
    relatedServices: d.relatedServices.length > 0 ? d.relatedServices : undefined,
    showOnHome: d.showOnHome,
    disclosure: {
      clientConsent: d.clientConsent,
      consentDate: d.consentDate || undefined,
      anonymizedClient: d.anonymizedClient || undefined,
    },
    seo: {
      title: (d.seoTitle || fallbackTitle).trim(),
      description: (d.seoDescription || fallbackDesc).trim(),
      ogImage: d.ogImage || undefined,
    },
    _status: d.status,
  }
}

export async function saveCase(id: string | null, _prev: unknown, formData: FormData) {
  await requirePermission('cases', id ? 'update' : 'create')
  const parsed = parse(formData)

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message, field: parsed.error.issues[0].path[0] }
  }

  if (parsed.data.status === 'published') {
    await requirePermission('cases', 'publish')
    if (!parsed.data.clientConsent && !parsed.data.anonymizedClient) {
      return { error: 'Публикация запрещена: нет согласия клиента и не задано обезличенное описание' }
    }
  }

  const payload = await getPayload()
  const data = toDoc(parsed.data)

  let doc: any
  try {
    doc = id
      ? await payload.update({ collection: 'cases', id, data: data as any, draft: parsed.data.status === 'draft' })
      : await payload.create({ collection: 'cases', data: data as any, draft: parsed.data.status === 'draft' })
  } catch (err: any) {
    console.error('Payload case save error:', err)
    return { error: err.message || 'Ошибка сохранения в базу данных' }
  }

  revalidateTag('cases')
  revalidatePath('/cases')
  revalidatePath(`/cases/${doc.slug}`)
  revalidatePath('/')

  if (!id) redirect(`${ADMIN_PATH}/cases/${doc.id}?saved=1`)
  return { ok: true, savedAt: Date.now() }
}

export async function deleteCase(id: string) {
  await requirePermission('cases', 'delete')
  const payload = await getPayload()
  await payload.delete({ collection: 'cases', id })
  revalidateTag('cases')
  redirect(`${ADMIN_PATH}/cases?deleted=1`)
}

export async function duplicateCase(id: string) {
  await requirePermission('cases', 'create')
  const payload = await getPayload()
  const src = await payload.findByID({ collection: 'cases', id, depth: 0, draft: true })
  const { id: _i, createdAt, updatedAt, ...rest } = src as any
  const copy = await payload.create({
    collection: 'cases',
    draft: true,
    data: {
      ...rest,
      title: `${src.title} (копия)`,
      slug: `${src.slug}-copy`,
      _status: 'draft',
    },
  })
  redirect(`${ADMIN_PATH}/cases/${copy.id}`)
}
