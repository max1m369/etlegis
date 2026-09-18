import type { CollectionConfig } from 'payload'
import { isStaff, publishedOrStaff } from '../access'
import { slugField } from '../fields/slug'
import { seo } from '../fields/seo'
import { auditChange, auditDelete } from '../hooks/audit'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Материал', plural: 'Медиа' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'publishedAt', '_status'],
  },
  versions: { drafts: true },
  defaultSort: '-publishedAt',
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
    { name: 'title', type: 'text', required: true, label: 'Заголовок материала' },
    slugField(),
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'article',
      label: 'Тип материала',
      options: [
        { label: 'Статья / Колонка', value: 'article' },
        { label: 'Выступление / Вебинар', value: 'speech' },
        { label: 'СМИ о нас', value: 'press' },
      ],
    },
    { name: 'publishedAt', type: 'date', required: true, label: 'Дата публикации' },
    { name: 'excerpt', type: 'textarea', required: true, label: 'Краткий анонс (лид)' },
    { name: 'cover', type: 'upload', relationTo: 'media', label: 'Обложка' },
    { name: 'body', type: 'textarea', label: 'Полный текст (HTML)' },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'employees',
      hasMany: true,
      label: 'Авторы (из команды)',
    },
    {
      name: 'practices',
      type: 'relationship',
      relationTo: 'practices',
      hasMany: true,
      label: 'Связанные практики',
    },
    { name: 'videoUrl', type: 'text', label: 'Ссылка на видео / вебинар' },
    {
      name: 'attachments',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Прикрепленные файлы / документы',
    },
    seo,
  ],
}

export default Posts
