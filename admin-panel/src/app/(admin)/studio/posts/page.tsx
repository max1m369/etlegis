import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import { ADMIN_PATH } from '@/auth/constants'
import DataTable from '../_components/DataTable'
import { formatDate } from '@/lib/format'

export const dynamic = 'force-dynamic'

export default async function PostsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; status?: string }>
}) {
  await requirePermission('posts', 'read')
  const sp = await searchParams
  const payload = await getPayload()

  const where: any = { and: [] }
  if (sp.q) where.and.push({ title: { like: sp.q } })
  if (sp.status) where.and.push({ _status: { equals: sp.status } })

  const res = await payload.find({
    collection: 'posts',
    draft: true,
    depth: 1,
    limit: 25,
    page: Number(sp.page || 1),
    sort: '-publishedAt',
    where: where.and.length ? where : undefined,
  })

  return (
    <>
      <header className="adm-head">
        <h1>
          Публикации и медиа <span className="adm-count">{res.totalDocs}</span>
        </h1>
        <Link className="adm-btn adm-btn--primary" href={`${ADMIN_PATH}/posts/new`}>
          Добавить материал
        </Link>
      </header>

      <DataTable
        basePath={`${ADMIN_PATH}/posts`}
        rows={res.docs}
        searchQuery={sp.q}
        pagination={{ page: res.page ?? 1, totalPages: res.totalPages }}
        columns={[
          { key: 'title', label: 'Заголовок', primary: true },
          {
            key: 'type',
            label: 'Тип',
            render: (r) => (
              <span className="adm-badge">
                {r.type === 'speech' ? 'Выступление' : r.type === 'press' ? 'СМИ' : 'Статья'}
              </span>
            ),
          },
          {
            key: 'publishedAt',
            label: 'Дата публикации',
            render: (r) => formatDate(r.publishedAt),
          },
          {
            key: '_status',
            label: 'Статус',
            render: (r) => (
              <span className={`adm-badge adm-badge--${r._status}`}>
                {r._status === 'published' ? 'Опубликован' : 'Черновик'}
              </span>
            ),
          },
        ]}
      />
    </>
  )
}
