import type { CollectionConfig } from 'payload'
import { isAdmin, isStaff } from '../access'
import { notifyLead } from '../hooks/notify'

const Leads: CollectionConfig = {
  slug: 'leads',
  labels: { singular: 'Заявка', plural: 'Заявки и лиды' },
  admin: {
    useAsTitle: 'name',
    group: 'Обращения',
    defaultColumns: ['name', 'phone', 'email', 'status', 'source', 'createdAt'],
  },
  access: {
    read: isStaff,
    create: () => true,
    update: isStaff,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [notifyLead],
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Имя заявителя' },
    { name: 'phone', type: 'text', required: true, label: 'Телефон' },
    { name: 'email', type: 'email', label: 'Электронная почта' },
    { name: 'message', type: 'textarea', label: 'Суть вопроса / Описание ситуации' },
    { name: 'source', type: 'text', label: 'Источник / Страница', admin: { readOnly: true } },
    { name: 'diagnostics', type: 'json', label: 'Ответы правовой диагностики', admin: { readOnly: true } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      label: 'Статус обработки',
      options: [
        { label: 'Новая', value: 'new' },
        { label: 'В работе', value: 'progress' },
        { label: 'Консультация назначена', value: 'scheduled' },
        { label: 'Клиент / Договор заключен', value: 'won' },
        { label: 'Отказ / Нецелевой', value: 'lost' },
      ],
    },
    { name: 'comment', type: 'textarea', label: 'Внутренний комментарий юриста' },
    {
      name: 'consent',
      type: 'group',
      label: 'Согласие на обработку персональных данных',
      admin: { readOnly: true },
      fields: [
        { name: 'given', type: 'checkbox', label: 'Получено' },
        { name: 'at', type: 'date', label: 'Дата и время' },
        { name: 'policyVersion', type: 'text', label: 'Версия политики' },
        { name: 'ip', type: 'text', label: 'IP-адрес' },
      ],
    },
  ],
}

export default Leads
