'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { getPayload } from '@/lib/payload'
import { createSession } from '@/auth/session'
import { ADMIN_PATH } from '@/auth/constants'
import { notifyTelegram } from '@/hooks/notify'

const schema = z.object({
  email: z.string().email('Некорректный e-mail'),
  password: z.string().min(1, 'Введите пароль'),
  from: z.string().optional(),
})

const attempts = new Map<string, { n: number; ts: number }>()

export async function loginAction(_prev: unknown, formData: FormData) {
  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  const rec = attempts.get(ip)
  if (rec && Date.now() - rec.ts < 10 * 60 * 1000 && rec.n >= 10) {
    return { error: 'Слишком много попыток. Повторите через 10 минут.' }
  }

  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const payload = await getPayload()
  try {
    const { user } = await payload.login({
      collection: 'admin-users',
      data: { email: parsed.data.email, password: parsed.data.password },
    })

    if (!user || (user as any).active === false) {
      return { error: 'Учётная запись отключена' }
    }

    await createSession(user.id)

    await payload.update({
      collection: 'admin-users',
      id: user.id,
      overrideAccess: true,
      data: { lastLoginAt: new Date().toISOString(), lastLoginIp: ip },
    })

    if (user.lastLoginIp && user.lastLoginIp !== ip) {
      await notifyTelegram(`Вход в админку ETLEGIS\nПользователь: ${user.email}\nНовый IP: ${ip}`)
    }

    attempts.delete(ip)
  } catch (err) {
    attempts.set(ip, { n: (rec?.n ?? 0) + 1, ts: rec?.ts ?? Date.now() })
    return { error: 'Неверный e-mail или пароль' }
  }

  redirect(parsed.data.from || ADMIN_PATH)
}

export async function logoutAction() {
  const { destroySession } = await import('@/auth/session')
  await destroySession()
  redirect(`${ADMIN_PATH}/login`)
}
