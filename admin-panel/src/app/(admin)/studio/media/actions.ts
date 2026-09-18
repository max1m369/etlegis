'use server'

import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import { revalidateTag } from 'next/cache'

const MAX = 10 * 1024 * 1024
const ALLOWED = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/svg+xml',
  'application/pdf',
]

export async function uploadMedia(_prev: unknown, formData: FormData) {
  await requirePermission('media', 'create')
  const file = formData.get('file') as File | null
  const alt = String(formData.get('alt') || '').trim()

  if (!file || file.size === 0) return { error: 'Выберите файл' }
  if (file.size > MAX) return { error: 'Файл больше 10 МБ' }
  if (!ALLOWED.includes(file.type)) return { error: `Формат ${file.type} не разрешён` }
  if (!alt) return { error: 'Alt обязателен: он необходим для SEO и доступности' }

  try {
    const payload = await getPayload()
    const doc = await payload.create({
      collection: 'media',
      data: { alt, credit: String(formData.get('credit') || '') },
      file: {
        data: Buffer.from(await file.arrayBuffer()),
        name: file.name,
        mimetype: file.type,
        size: file.size,
      },
    })
    revalidateTag('media')
    return { ok: true, id: doc.id, url: doc.url }
  } catch (err: any) {
    return { error: err.message || 'Ошибка загрузки файла' }
  }
}

export async function deleteMedia(id: string) {
  await requirePermission('media', 'delete')
  const payload = await getPayload()
  await payload.delete({ collection: 'media', id })
  revalidateTag('media')
}
