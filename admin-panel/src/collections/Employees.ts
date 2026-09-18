import type { CollectionConfig } from 'payload'
import { isStaff, publishedOrStaff } from '../access'
import { slugField } from '../fields/slug'
import { seo } from '../fields/seo'
import { auditChange, auditDelete } from '../hooks/audit'

export const Employees: CollectionConfig = {
  slug: 'employees',
  labels: { singular: 'Сотрудник', plural: 'Команда' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'order', 'showOnHome', '_status'],
  },
  versions: { drafts: true },
  defaultSort: 'order',
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
    { name: 'name', type: 'text', required: true, label: 'ФИО' },
    slugField('name'),
    { name: 'position', type: 'text', required: true, label: 'Должность / Статус' },
    { name: 'photo', type: 'upload', relationTo: 'media', label: 'Портретное фото' },
    { name: 'isAdvocate', type: 'checkbox', label: 'Имеет статус адвоката', defaultValue: true },
    { name: 'registryNo', type: 'text', label: 'Реестровый номер в реестре адвокатов' },
    {
      name: 'education',
      type: 'array',
      label: 'Образование и квалификация',
      fields: [{ name: 'item', type: 'text', required: true, label: 'Учебное заведение / Степень' }],
    },
    { name: 'experienceSince', type: 'number', label: 'В юридической профессии с (год)' },
    {
      name: 'practices',
      type: 'relationship',
      relationTo: 'practices',
      hasMany: true,
      label: 'Практики / Специализации',
    },
    {
      name: 'specialization',
      type: 'array',
      label: 'Ключевые направления работы',
      fields: [{ name: 'item', type: 'text', required: true, label: 'Направление' }],
    },
    { name: 'bio', type: 'textarea', label: 'Биография и профессиональный путь (HTML)' },
    { name: 'languages', type: 'text', label: 'Иностранные языки' },
    {
      name: 'contacts',
      type: 'group',
      label: 'Прямые контакты',
      fields: [
        { name: 'email', type: 'email', label: 'Email' },
        { name: 'phone', type: 'text', label: 'Телефон' },
        { name: 'telegram', type: 'text', label: 'Telegram' },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0, label: 'Порядок' },
    { name: 'showOnHome', type: 'checkbox', defaultValue: true, label: 'Показывать на главной' },
    seo,
  ],
}

export default Employees
