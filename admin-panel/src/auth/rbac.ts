export type Role = 'admin' | 'editor'

export const RESOURCES = [
  'cases',
  'employees',
  'posts',
  'services',
  'practices',
  'awards',
  'media',
  'leads',
  'admin-users',
  'audit-log',
  'settings',
] as const

export type Resource = (typeof RESOURCES)[number]
export type Action = 'read' | 'create' | 'update' | 'delete' | 'publish'

const MATRIX: Record<Role, Partial<Record<Resource, Action[]>>> = {
  admin: Object.fromEntries(
    RESOURCES.map((r) => [r, ['read', 'create', 'update', 'delete', 'publish']])
  ) as Record<Resource, Action[]>,
  editor: {
    cases: ['read', 'create', 'update', 'publish'],
    employees: ['read', 'create', 'update'],
    posts: ['read', 'create', 'update', 'publish'],
    services: ['read', 'update'],
    practices: ['read'],
    awards: ['read', 'create', 'update'],
    media: ['read', 'create', 'update'],
    leads: ['read', 'update'],
    settings: ['read'],
  },
}

export const can = (role: Role, resource: Resource, action: Action) =>
  Boolean(MATRIX[role]?.[resource]?.includes(action))
