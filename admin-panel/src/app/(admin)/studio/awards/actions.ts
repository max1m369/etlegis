'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import { ADMIN_PATH } from '@/auth/constants'

const awardSchema = z.object({
  year: z.coerce.number().min(2000).max(2100),
  publication: z.string().min(2, 'Укажите название рейтинга / издания'),
  category: z.string().min(2, 'Укажите номинацию'),
  band: z.string().optional(),
  url: z.string().optional(),
})

export async function saveAward(id: string | null, _prev: unknown, formData: FormData) {
  await requirePermission('awards', id ? 'update' : 'create')
  const parsed = awardSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const payload = await getPayload()
  const data = parsed.data

  const doc = id
    ? await payload.update({ collection: 'awards', id, data })
    : await payload.create({ collection: 'awards', data })

  revalidateTag('awards')
  revalidatePath('/awards')
  revalidatePath('/')

  if (!id) redirect(`${ADMIN_PATH}/awards?saved=1`)
  return { ok: true, savedAt: Date.now() }
}

export async function deleteAward(id: string) {
  await requirePermission('awards', 'delete')
  const payload = await getPayload()
  await payload.delete({ collection: 'awards', id })
  revalidateTag('awards')
  redirect(`${ADMIN_PATH}/awards?deleted=1`)
}
