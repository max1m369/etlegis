'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import { revokeAllForUser } from '@/auth/session'

const userSchema = z.object({
  name: z.string().min(2, 'Укажите имя'),
  email: z.string().email('Некорректный e-mail'),
  password: z.string().min(12, 'Пароль должен быть не менее 12 символов'),
  role: z.enum(['admin', 'editor']),
})

export async function createUser(formData: FormData): Promise<void> {
  await requirePermission('admin-users', 'create')
  const parsed = userSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message)
  }

  const payload = await getPayload()
  await payload.create({
    collection: 'admin-users',
    data: parsed.data,
  })
  revalidatePath('/studio/users')
}

export async function revokeUserSessions(userId: string) {
  await requirePermission('admin-users', 'update')
  await revokeAllForUser(userId)
  revalidatePath('/studio/users')
}
