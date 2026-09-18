import type { CollectionConfig } from 'payload'
import { isAdmin, isStaff } from '../access'

const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: { singular: 'Запись на консультацию', plural: 'Записи на консультации' },
  admin: {
    useAsTitle: 'name',
    group: 'Обращения',
    defaultColumns: ['name', 'phone', 'slot', 'lawyer', 'status'],
  },
  access: {
    read: isStaff,
    create: () => true,
    update: isStaff,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Имя' },
    { name: 'phone', type: 'text', required: true, label: 'Телефон' },
    { name: 'email', type: 'email', label: 'Email' },
    {
      name: 'lawyer',
      type: 'relationship',
      relationTo: 'employees',
      label: 'Выбранный специалист',
    },
    {
      name: 'slot',
      type: 'relationship',
      relationTo: 'slots',
      label: 'Временной слот',
    },
    { name: 'date', type: 'date', label: 'Дата консультации' },
    { name: 'time', type: 'text', label: 'Время' },
    {
      name: 'format',
      type: 'select',
      defaultValue: 'online',
      label: 'Формат',
      options: [
        { label: 'Онлайн (Zoom/Telegram)', value: 'online' },
        { label: 'Очно в офисе (Москва)', value: 'office' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      label: 'Статус',
      options: [
        { label: 'Ожидает подтверждения', value: 'pending' },
        { label: 'Подтверждена', value: 'confirmed' },
        { label: 'Завершена', value: 'completed' },
        { label: 'Отменена', value: 'canceled' },
      ],
    },
    { name: 'notes', type: 'textarea', label: 'Заметки' },
  ],
}

export default Bookings
