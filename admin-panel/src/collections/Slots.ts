import type { CollectionConfig } from 'payload'
import { isStaff } from '../access'

const Slots: CollectionConfig = {
  slug: 'slots',
  labels: { singular: 'Слот времени', plural: 'Слоты для записи' },
  admin: {
    useAsTitle: 'time',
    group: 'Обращения',
    defaultColumns: ['date', 'time', 'lawyer', 'isBooked'],
  },
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    { name: 'date', type: 'date', required: true, label: 'Дата' },
    { name: 'time', type: 'text', required: true, label: 'Время (напр. 11:00 - 12:00)' },
    {
      name: 'lawyer',
      type: 'relationship',
      relationTo: 'employees',
      label: 'Адвокат / Специалист',
    },
    {
      name: 'isBooked',
      type: 'checkbox',
      defaultValue: false,
      label: 'Забронирован',
    },
  ],
}

export default Slots
