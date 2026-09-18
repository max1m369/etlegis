export const SESSION_COOKIE = 'etl_session'
export const IDLE_TTL_MS = 8 * 60 * 60 * 1000 // 8 часов бездействия
export const ABSOLUTE_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 суток максимум
export const ADMIN_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH || '/studio'
export const AUTH_COLLECTION = 'admin-users' as const
