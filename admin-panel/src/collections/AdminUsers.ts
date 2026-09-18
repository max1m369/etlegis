import type { CollectionConfig } from 'payload'
import { sessionStrategy } from '@/auth/strategy'
import { isAdmin } from '@/access'

export const AdminUsers: CollectionConfig = {
  slug: 'admin-users',
  labels: { singular: 'Пользователь админки', plural: 'Пользователи админки' },
  auth: {
    disableLocalStrategy: false, // логин/пароль нужен для проверки в payload.login()
    tokenExpiration: 60, // JWT Payload практически не используем
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    useAPIKey: false,
    strategies: [sessionStrategy], // наша кастомная сессионная стратегия
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: isAdmin,
    update: ({ req, id }) => req.user?.role === 'admin' || req.user?.id === id,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.password && String(data.password).length < 12) {
          throw new Error('Пароль должен быть не короче 12 символов')
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Имя / ФИО' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      label: 'Роль в системе',
      options: [
        { label: 'Администратор (полный доступ)', value: 'admin' },
        { label: 'Редактор (контент)', value: 'editor' },
      ],
    },
    { name: 'active', type: 'checkbox', defaultValue: true, label: 'Активен' },
    { name: 'lastLoginAt', type: 'date', label: 'Последний вход' },
    { name: 'lastLoginIp', type: 'text', label: 'IP последнего входа' },
  ],
}

export default AdminUsers
