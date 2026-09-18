import type { CollectionConfig } from 'payload'
import { isStaff } from '../access'

const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Медиафайл', plural: 'Медиабиблиотека' },
  admin: { group: 'Контент' },
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  upload: {
    staticDir: 'public/uploads',
    focalPoint: true,
    formatOptions: { format: 'webp', options: { quality: 82 } },
    imageSizes: [
      { name: 'thumb', width: 400, height: 500, position: 'centre' },
      { name: 'card', width: 800 },
      { name: 'wide', width: 1600 },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [
    { name: 'alt', type: 'text', required: true, label: 'Alt-текст (описание для доступности)' },
    { name: 'credit', type: 'text', label: 'Источник / Автор' },
  ],
}

export default Media
