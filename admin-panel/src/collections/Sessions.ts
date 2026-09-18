import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access'

export const Sessions: CollectionConfig = {
  slug: 'sessions',
  labels: { singular: 'Сессия', plural: 'Сессии' },
  access: {
    read: isAdmin,
    create: () => false,
    update: () => false,
    delete: isAdmin,
  },
  fields: [
    { name: 'user', type: 'relationship', relationTo: 'admin-users', required: true, index: true },
    { name: 'tokenHash', type: 'text', required: true, index: true, unique: true },
    { name: 'expiresAt', type: 'date', required: true, index: true },
    { name: 'absoluteExpiresAt', type: 'date', required: true },
    { name: 'lastSeenAt', type: 'date' },
    { name: 'ip', type: 'text' },
    { name: 'userAgent', type: 'text' },
    { name: 'revoked', type: 'checkbox', defaultValue: false, index: true },
  ],
}

export default Sessions
