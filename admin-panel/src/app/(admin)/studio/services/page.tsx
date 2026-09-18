import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import { ADMIN_PATH } from '@/auth/constants'
import DataTable from '../_components/DataTable'

export const dynamic = 'force-dynamic'

export default async function ServicesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>
}) {
  await requirePermission('services', 'read')
  const sp = await searchParams
  const payload = await getPayload()

  const where: any = { and: [] }
  if (sp.q) where.and.push({ title: { like: sp.q } })

  const res = await payload.find({
    collection: 'services',
    draft: true,
    depth: 1,
    limit: 50,
    page: Number(sp.page || 1),
    sort: 'order',
    where: where.and.length ? where : undefined,
  })

  return (
    <>
      <header className="adm-head">
        <h1>
          Услуги бюро <span className="adm-count">{res.totalDocs}</span>
        </h1>
        <Link className="adm-btn adm-btn--primary" href={`${ADMIN_PATH}/services/new`}>
          Добавить услугу
        </Link>
      </header>

      <DataTable
        basePath={`${ADMIN_PATH}/services`}
        rows={res.docs}
        searchQuery={sp.q}
        pagination={{ page: res.page ?? 1, totalPages: res.totalPages }}
        columns={[
          { key: 'title', label: 'Название услуги', primary: true },
          { key: 'practice', label: 'Практика', render: (r) => (r.practice as any)?.title ?? '—' },
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
