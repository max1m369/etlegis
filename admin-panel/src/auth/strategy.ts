import type { AuthStrategy } from 'payload'
import { SESSION_COOKIE, AUTH_COLLECTION, IDLE_TTL_MS } from './constants'
import crypto from 'crypto'

const readCookie = (header: string | null, name: string) => {
  if (!header) return null
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=')
    if (k === name) return decodeURIComponent(v.join('='))
  }
  return null
}

export const sessionStrategy: AuthStrategy = {
  name: 'etl-session',
  authenticate: async ({ headers, payload }) => {
    const raw = readCookie(headers.get('cookie'), SESSION_COOKIE)
    if (!raw) return { user: null }

    const tokenHash = crypto.createHash('sha256').update(raw).digest('hex')
    const nowIso = new Date().toISOString()

    const { docs } = await payload.find({
      collection: 'sessions',
      depth: 1,
      limit: 1,
      overrideAccess: true,
      where: {
        and: [
          { tokenHash: { equals: tokenHash } },
          { revoked: { equals: false } },
          { expiresAt: { greater_than: nowIso } },
          { absoluteExpiresAt: { greater_than: nowIso } },
        ],
      },
    })

    const session = docs[0]
    const user = session && typeof session.user === 'object' ? session.user : null
    if (!user || (user as any).active === false) return { user: null }

    // скользящее продление: не чаще раза в 10 минут, чтобы не нагружать БД
    const last = session.lastSeenAt ? new Date(session.lastSeenAt).getTime() : 0
    if (Date.now() - last > 10 * 60 * 1000) {
      await payload.update({
        collection: 'sessions',
        id: session.id,
        overrideAccess: true,
        data: {
          lastSeenAt: nowIso,
          expiresAt: new Date(Date.now() + IDLE_TTL_MS).toISOString(),
        },
      })
    }

    return {
      user: { ...user, collection: AUTH_COLLECTION, _strategy: 'etl-session' },
    }
  },
}
