import type { CollectionConfig } from 'payload'
import { isStaff } from '../access'
import { auditChange, auditDelete } from '../hooks/audit'

const Awards: CollectionConfig = {
  slug: 'awards',
  labels: { singular: 'Награда / Рейтинг', plural: 'Награды и рейтинги' },
  admin: {
    useAsTitle: 'publication',
    group: 'Контент',
    defaultColumns: ['year', 'month', 'publication', 'category', 'band'],
  },
  defaultSort: '-year',
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
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'year', type: 'number', required: true, label: 'Год' },
        {
          name: 'month',
          type: 'select',
          label: 'Месяц',
          options: [
            'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
            'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь',
          ].map((m) => ({ label: m, value: m })),
        },
      ],
    },
    { name: 'publication', type: 'text', required: true, label: 'Рейтинг / Издание (Право-300, Коммерсантъ, РААС и др.)' },
    { name: 'category', type: 'text', label: 'Номинация / Практика' },
    { name: 'band', type: 'text', label: 'Группа / Band / Tier (напр. Group 1, Tier 2)' },
    { name: 'logo', type: 'upload', relationTo: 'media', label: 'Логотип рейтинга' },
    { name: 'url', type: 'text', label: 'Ссылка на источник / публикацию рейтинга' },
  ],
}

export default Awards
