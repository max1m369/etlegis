import 'server-only'
import { redirect } from 'next/navigation'
import { headers as nextHeaders } from 'next/headers'
import { getPayload } from '@/lib/payload'
import { ADMIN_PATH } from './constants'
import { can, type Resource, type Action, type Role } from './rbac'

export interface AuthUser {
  id: string | number
  email: string
  name: string
  role: Role
  active?: boolean
}

export async function getUser(): Promise<AuthUser | null> {
  try {
    const payload = await getPayload()
    const { user } = await payload.auth({ headers: await nextHeaders() })
    return user as AuthUser | null
  } catch (error) {
    console.error('Error getting auth user:', error)
    return null
  }
}

export async function requireUser(): Promise<AuthUser> {
  const user = await getUser()
  if (!user) {
    redirect(`${ADMIN_PATH}/login`)
  }
  return user
}

export async function requirePermission(resource: Resource, action: Action): Promise<AuthUser> {
  const user = await requireUser()
  if (!can(user.role, resource, action)) {
    throw new Error(`Недостаточно прав: ${action} → ${resource}`)
  }
  return user
}
