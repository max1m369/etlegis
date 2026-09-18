import type { CollectionConfig } from 'payload'
import { isStaff, publishedOrStaff } from '../access'
import { slugField } from '../fields/slug'
import { seo } from '../fields/seo'
import { auditChange, auditDelete } from '../hooks/audit'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Услуга', plural: 'Услуги' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'practice', 'order', '_status'],
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
  defaultSort: 'order',
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Название услуги' },
    slugField(),
    {
      name: 'practice',
      type: 'relationship',
      relationTo: 'practices',
      required: true,
      label: 'Направление / Практика',
    },
    { name: 'lead', type: 'textarea', label: 'Лид-абзац', required: true },
    { name: 'body', type: 'textarea', label: 'Основной текст (HTML)' },
    {
      name: 'when',
      type: 'array',
      label: 'Когда обращаться / Ситуации доверителя',
      fields: [{ name: 'item', type: 'text', required: true, label: 'Пункт' }],
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Что мы делаем (этапы работы)',
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Заголовок этапа' },
        { name: 'text', type: 'textarea', label: 'Описание этапа' },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      label: 'Часто задаваемые вопросы (FAQ)',
      fields: [
        { name: 'q', type: 'text', required: true, label: 'Вопрос' },
        { name: 'a', type: 'textarea', required: true, label: 'Ответ' },
      ],
    },
    {
      name: 'lawyers',
      type: 'relationship',
      relationTo: 'employees',
      hasMany: true,
      label: 'Ответственные адвокаты / юристы',
    },
    { name: 'order', type: 'number', defaultValue: 0, label: 'Порядок' },
    seo,
  ],
}

export default Services
