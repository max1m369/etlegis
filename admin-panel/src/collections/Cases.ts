import type { CollectionConfig } from 'payload'
import { isStaff, publishedOrStaff } from '../access'
import { slugField } from '../fields/slug'
import { seo } from '../fields/seo'
import { auditChange, auditDelete } from '../hooks/audit'

export const Cases: CollectionConfig = {
  slug: 'cases',
  labels: { singular: 'Кейс', plural: 'Кейсы' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'practice', 'amount', 'showOnHome', '_status'],
  },
  versions: { drafts: true },
  access: {
    read: publishedOrStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  hooks: {
    afterChange: [auditChange],
    afterDelete: [auditDelete],
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Заголовок кейса' },
    slugField(),
    {
      name: 'practice',
      type: 'relationship',
      relationTo: 'practices',
      required: true,
      label: 'Практика',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'defence',
      label: 'Роль в деле',
      options: [
        { label: 'Защита', value: 'defence' },
        { label: 'Истец', value: 'plaintiff' },
        { label: 'Ответчик', value: 'defendant' },
      ],
    },
    { name: 'amount', type: 'number', label: 'Сумма спора (число, ₽)' },
    { name: 'instances', type: 'text', label: 'Инстанции (напр. АС города Москвы → 9 ААС → АС МО)' },
    { name: 'duration', type: 'text', label: 'Срок ведения (напр. 14 месяцев)' },
    { name: 'year', type: 'number', label: 'Год завершения' },

    // HTML контент (редактируется через TipTap в панели)
    { name: 'synopsis', type: 'textarea', label: 'Фабула (HTML)' },
    { name: 'task', type: 'textarea', label: 'Задача (HTML)' },
    { name: 'actions', type: 'textarea', label: 'Что сделали (HTML)' },
    { name: 'result', type: 'textarea', label: 'Результат (HTML)', required: true },

    {
      name: 'lawyers',
      type: 'relationship',
      relationTo: 'employees',
      hasMany: true,
      label: 'Юристы по делу',
    },
    {
      name: 'relatedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Связанные услуги',
    },
    {
      name: 'showOnHome',
      type: 'checkbox',
      label: 'Показывать на главной странице',
      defaultValue: false,
    },
    {
      name: 'disclosure',
      type: 'group',
      label: 'Конфиденциальность и согласие',
      fields: [
        { name: 'clientConsent', type: 'checkbox', label: 'Клиент согласовал публикацию' },
        { name: 'consentDate', type: 'date', label: 'Дата согласия' },
        { name: 'anonymizedClient', type: 'text', label: 'Обезличенное описание клиента' },
      ],
    },
    seo,
  ],
}

export default Cases
