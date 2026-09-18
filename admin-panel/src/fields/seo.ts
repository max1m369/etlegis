import type { Field } from 'payload'

export const seo: Field = {
  type: 'group',
  name: 'seo',
  label: 'SEO',
  admin: { position: 'sidebar' },
  fields: [
    { name: 'title', type: 'text', maxLength: 70, label: 'SEO Заголовок' },
    { name: 'description', type: 'textarea', maxLength: 180, label: 'SEO Описание' },
    { name: 'ogImage', type: 'upload', relationTo: 'media', label: 'Изображение для соцсетей (OG)' },
    { name: 'noindex', type: 'checkbox', label: 'Скрыть от поисковиков (noindex)' },
  ],
}
