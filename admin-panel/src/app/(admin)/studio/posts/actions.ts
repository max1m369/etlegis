'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import { ADMIN_PATH } from '@/auth/constants'
import { cleanHtml } from '@/lib/sanitize'
import { translit } from '@/lib/translit'

const postSchema = z.object({
  title: z.string().min(3, 'Название слишком короткое'),
  slug: z.string().min(1, 'Слаг обязателен').regex(/^[a-z0-9-]+$/, 'Слаг: только латиница, цифры и дефис'),
  type: z.enum(['article', 'speech', 'press']),
  publishedAt: z.string().min(1, 'Укажите дату публикации'),
  excerpt: z.string().min(1, 'Заполните анонс'),
  body: z.string().optional(),
  cover: z.string().optional(),
  authors: z.array(z.string()).default([]),
  practices: z.array(z.string()).default([]),
  videoUrl: z.string().optional(),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(180).optional(),
  status: z.enum(['draft', 'published']),
})

export async function savePost(id: string | null, _prev: unknown, formData: FormData) {
  await requirePermission('posts', id ? 'update' : 'create')

  const raw = Object.fromEntries(formData) as Record<string, string>
  const title = (raw.title || '').trim()
  let slug = (raw.slug || '').trim()
  if (!slug && title) {
    slug = translit(title)
  }
  if (!slug) {
    slug = 'post-' + Date.now()
  } else {
    slug = translit(slug)
  }

  const parsed = postSchema.safeParse({
    ...raw,
    slug,
    authors: formData.getAll('authors').map(String).filter(Boolean),
    practices: formData.getAll('practices').map(String).filter(Boolean),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const d = parsed.data
  const cleanText = (d.excerpt || d.body || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const fallbackDesc = cleanText
    ? cleanText.slice(0, 160)
    : `Аналитика и практика адвокатского бюро ETLEGIS: ${d.title}`
  const fallbackTitle = `${d.title} — Адвокатское бюро ETLEGIS`.slice(0, 70)

  const data = {
    title: d.title,
    slug: d.slug,
    type: d.type,
    publishedAt: d.publishedAt,
    excerpt: d.excerpt,
    body: cleanHtml(d.body ?? ''),
    cover: d.cover || undefined,
    authors: d.authors,
    practices: d.practices,
    videoUrl: d.videoUrl || undefined,
    seo: {
      title: d.seoTitle || fallbackTitle,
      description: d.seoDescription || fallbackDesc,
    },
    _status: d.status,
  }

  const payload = await getPayload()
  const doc: any = id
    ? await payload.update({ collection: 'posts', id, data: data as any, draft: d.status === 'draft' })
    : await payload.create({ collection: 'posts', data: data as any, draft: d.status === 'draft' })

  revalidateTag('posts')
  revalidatePath('/media')
  revalidatePath(`/media/${doc.slug}`)
  revalidatePath('/')

  if (!id) redirect(`${ADMIN_PATH}/posts/${doc.id}?saved=1`)
  return { ok: true, savedAt: Date.now() }
}

export async function deletePost(id: string) {
  await requirePermission('posts', 'delete')
  const payload = await getPayload()
  await payload.delete({ collection: 'posts', id })
  revalidateTag('posts')
  redirect(`${ADMIN_PATH}/posts?deleted=1`)
}
