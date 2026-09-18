import type { Access } from 'payload'

export const isAdmin: Access = ({ req }) => req.user?.role === 'admin'

export const isStaff: Access = ({ req }) => ['admin', 'editor'].includes(req.user?.role ?? '')

export const publishedOrStaff: Access = ({ req }) =>
  ['admin', 'editor'].includes(req.user?.role ?? '') ? true : { _status: { equals: 'published' } }
