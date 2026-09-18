'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import { ADMIN_PATH } from '@/auth/constants'
import { cleanHtml } from '@/lib/sanitize'
import { translit } from '@/lib/translit'

const employeeSchema = z.object({
  name: z.string().min(2, 'Укажите ФИО'),
  slug: z.string().min(1, 'Слаг обязателен').regex(/^[a-z0-9-]+$/, 'Слаг: только латиница, цифры и дефис'),
  position: z.string().min(2, 'Укажите должность'),
  isAdvocate: z.coerce.boolean().default(false),
  registryNo: z.string().optional(),
  experienceSince: z.coerce.number().optional(),
  practices: z.array(z.string()).default([]),
  specialization: z.string().optional(),
  education: z.string().optional(),
  bio: z.string().optional(),
  languages: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  telegram: z.string().optional(),
  photo: z.string().optional(),
  showOnHome: z.coerce.boolean().default(false),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(180).optional(),
  status: z.enum(['draft', 'published']),
})

export async function reorder(list: { id: string; order: number }[]) {
  await requirePermission('employees', 'update')
  const payload = await getPayload()
  await Promise.all(
    list.map(({ id, order }) =>
      payload.update({ collection: 'employees', id, data: { order } })
    )
  )
  revalidateTag('employees')
  revalidatePath('/team')
  revalidatePath('/')
}

export async function saveEmployee(id: string | null, _prev: unknown, formData: FormData) {
  await requirePermission('employees', id ? 'update' : 'create')

  const raw = Object.fromEntries(formData) as Record<string, string>
  const name = (raw.name || '').trim()
  let slug = (raw.slug || '').trim()
  if (!slug && name) {
    slug = translit(name)
  }
  if (!slug) {
    slug = 'employee-' + Date.now()
  } else {
    slug = translit(slug)
  }

  const parsed = employeeSchema.safeParse({
    ...raw,
    slug,
    practices: formData.getAll('practices').map(String).filter(Boolean),
    isAdvocate: raw.isAdvocate === 'on',
    showOnHome: raw.showOnHome === 'on',
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const d = parsed.data
  const specializationArray = d.specialization
    ? d.specialization.split('\n').map((s) => s.trim()).filter(Boolean).map((item) => ({ item }))
    : []

  const educationArray = d.education
    ? d.education.split('\n').map((s) => s.trim()).filter(Boolean).map((item) => ({ item }))
    : []

  const data = {
    name: d.name,
    slug: d.slug,
    position: d.position,
    isAdvocate: d.isAdvocate,
    registryNo: d.registryNo || undefined,
    experienceSince: d.experienceSince || undefined,
    practices: d.practices,
    specialization: specializationArray,
    education: educationArray,
    bio: cleanHtml(d.bio ?? ''),
    languages: d.languages || undefined,
    contacts: {
      email: d.email || undefined,
      phone: d.phone || undefined,
      telegram: d.telegram || undefined,
    },
    photo: d.photo || undefined,
    showOnHome: d.showOnHome,
    seo: {
      title: d.seoTitle || undefined,
      description: d.seoDescription || undefined,
    },
    _status: d.status,
  }

  const payload = await getPayload()
  const doc = id
    ? await payload.update({ collection: 'employees', id, data, draft: d.status === 'draft' })
    : await payload.create({ collection: 'employees', data, draft: d.status === 'draft' })

  revalidateTag('employees')
  revalidatePath('/team')
  revalidatePath(`/team/${doc.slug}`)
  revalidatePath('/')

  if (!id) redirect(`${ADMIN_PATH}/employees/${doc.id}?saved=1`)
  return { ok: true, savedAt: Date.now() }
}

export async function deleteEmployee(id: string) {
  await requirePermission('employees', 'delete')
  const payload = await getPayload()
  await payload.delete({ collection: 'employees', id })
  revalidateTag('employees')
  redirect(`${ADMIN_PATH}/employees?deleted=1`)
}
