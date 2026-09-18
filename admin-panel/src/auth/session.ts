import 'server-only'
import { cookies, headers } from 'next/headers'
import crypto from 'crypto'
import { getPayload } from '@/lib/payload'
import { SESSION_COOKIE, IDLE_TTL_MS, ABSOLUTE_TTL_MS } from './constants'

export const hashToken = (raw: string) =>
  crypto.createHash('sha256').update(raw).digest('hex')

export async function createSession(userId: string | number) {
  const payload = await getPayload()
  const h = await headers()
  const raw = crypto.randomBytes(48).toString('base64url')
  const now = Date.now()

  await payload.create({
    collection: 'sessions',
    overrideAccess: true,
    data: {
      user: userId as any,
      tokenHash: hashToken(raw),
      expiresAt: new Date(now + IDLE_TTL_MS).toISOString(),
      absoluteExpiresAt: new Date(now + ABSOLUTE_TTL_MS).toISOString(),
      ip: h.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown',
      userAgent: h.get('user-agent') || 'unknown',
      revoked: false,
    } as any,
  })

  const store = await cookies()
  store.set(SESSION_COOKIE, raw, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: Math.floor(ABSOLUTE_TTL_MS / 1000),
  })
}

export async function destroySession() {
  const store = await cookies()
  const raw = store.get(SESSION_COOKIE)?.value
  if (raw) {
    const payload = await getPayload()
    await payload.update({
      collection: 'sessions',
      where: { tokenHash: { equals: hashToken(raw) } },
      data: { revoked: true },
      overrideAccess: true,
    })
  }
  store.delete(SESSION_COOKIE)
}

export async function revokeAllForUser(userId: string | number) {
  const payload = await getPayload()
  await payload.update({
    collection: 'sessions',
    where: { and: [{ user: { equals: userId } }, { revoked: { equals: false } }] },
    data: { revoked: true },
    overrideAccess: true,
  })
}
