import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access'

const AuditLog: CollectionConfig = {
  slug: 'audit-log',
  labels: { singular: 'Запись аудита', plural: 'Журнал аудита' },
  admin: {
    useAsTitle: 'title',
    group: 'Система',
    defaultColumns: ['at', 'user', 'action', 'entity', 'title'],
  },
  access: {
    read: isAdmin,
    create: () => true,
    update: () => false,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'admin-users',
      label: 'Пользователь',
    },
    { name: 'action', type: 'text', required: true, label: 'Действие (create / update / delete)' },
    { name: 'entity', type: 'text', required: true, label: 'Коллекция' },
    { name: 'entityId', type: 'text', label: 'ID записи' },
    { name: 'title', type: 'text', label: 'Название / Заголовок' },
    { name: 'at', type: 'date', required: true, label: 'Время' },
  ],
}

export default AuditLog
