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

export interface MediaItemData {
  id: string
  alt: string
  filename: string
  url: string
  thumbUrl: string
  mimeType?: string
  filesize?: number
  createdAt?: string
}

export async function getMediaLibrary(query?: string): Promise<MediaItemData[]> {
  await requirePermission('media', 'read')
  const payload = await getPayload()
  const where: any = {}
  if (query && query.trim()) {
    const q = query.trim()
    where.or = [
      { alt: { contains: q } },
      { filename: { contains: q } },
    ]
  }

  const res = await payload.find({
    collection: 'media',
    where,
    limit: 100,
    sort: '-createdAt',
  })

  return res.docs.map((doc: any) => ({
    id: String(doc.id),
    alt: doc.alt || '',
    filename: doc.filename || '',
    url: doc.url || '',
    thumbUrl: doc.sizes?.thumb?.url || doc.url || '',
    mimeType: doc.mimeType || '',
    filesize: doc.filesize || 0,
    createdAt: doc.createdAt,
  }))
}

export async function uploadMediaDirect(formData: FormData): Promise<{ ok: boolean; item?: MediaItemData; error?: string }> {
  await requirePermission('media', 'create')
  const file = formData.get('file') as File | null
  let alt = String(formData.get('alt') || '').trim()

  if (!file || file.size === 0) return { ok: false, error: 'Файл не выбран' }
  if (file.size > MAX) return { ok: false, error: 'Файл больше 10 МБ' }
  if (!ALLOWED.includes(file.type)) return { ok: false, error: `Формат ${file.type} не разрешён` }

  if (!alt) {
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
    alt = nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1)
  }

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
    return {
      ok: true,
      item: {
        id: String(doc.id),
        alt: doc.alt || '',
        filename: doc.filename || '',
        url: doc.url || '',
        thumbUrl: (doc as any).sizes?.thumb?.url || doc.url || '',
        mimeType: doc.mimeType || '',
        filesize: doc.filesize || 0,
        createdAt: doc.createdAt,
      },
    }
  } catch (err: any) {
    return { ok: false, error: err.message || 'Ошибка загрузки файла' }
  }
}

export async function getMediaById(id: string | number): Promise<MediaItemData | null> {
  if (!id) return null
  try {
    const payload = await getPayload()
    const doc = await payload.findByID({
      collection: 'media',
      id: String(id),
    })
    if (!doc) return null
    return {
      id: String(doc.id),
      alt: doc.alt || '',
      filename: doc.filename || '',
      url: doc.url || '',
      thumbUrl: (doc as any).sizes?.thumb?.url || doc.url || '',
      mimeType: doc.mimeType || '',
      filesize: doc.filesize || 0,
      createdAt: doc.createdAt,
    }
  } catch {
    return null
  }
}

