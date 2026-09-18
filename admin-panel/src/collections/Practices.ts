import type { CollectionConfig } from 'payload'
import { isStaff } from '../access'
import { slugField } from '../fields/slug'
import { auditChange, auditDelete } from '../hooks/audit'

const Practices: CollectionConfig = {
  slug: 'practices',
  labels: { singular: 'Практика', plural: 'Практики' },
  admin: {
    useAsTitle: 'title',
    group: 'Контент',
    defaultColumns: ['title', 'order', 'showOnHome'],
  },
  access: {
    read: () => true,
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
    { name: 'title', type: 'text', required: true, label: 'Название практики' },
    slugField(),
    { name: 'short', type: 'textarea', label: 'Описание для карточки' },
    {
      name: 'icon',
      type: 'textarea',
      label: 'SVG-иконка (paths/elements)',
      admin: { description: 'Вставьте только внутреннее содержимое тега <svg> (path, rect, etc.)' },
    },
    { name: 'order', type: 'number', defaultValue: 0, label: 'Порядок сортировки', admin: { position: 'sidebar' } },
    { name: 'showOnHome', type: 'checkbox', label: 'Показывать на главной', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}

export default Practices
