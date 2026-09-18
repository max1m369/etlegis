import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import { ADMIN_PATH } from '@/auth/constants'
import DataTable from '../_components/DataTable'
import { formatMoney } from '@/lib/format'

export const dynamic = 'force-dynamic'

export default async function CasesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; status?: string }>
}) {
  await requirePermission('cases', 'read')
  const sp = await searchParams
  const payload = await getPayload()

  const where: any = { and: [] }
  if (sp.q) where.and.push({ title: { like: sp.q } })
  if (sp.status) where.and.push({ _status: { equals: sp.status } })

  const res = await payload.find({
    collection: 'cases',
    draft: true,
    depth: 1,
    limit: 25,
    page: Number(sp.page || 1),
    sort: '-updatedAt',
    where: where.and.length ? where : undefined,
    overrideAccess: false,
  })

  return (
    <>
      <header className="adm-head">
        <h1>
          Кейсы <span className="adm-count">{res.totalDocs}</span>
        </h1>
        <Link className="adm-btn adm-btn--primary" href={`${ADMIN_PATH}/cases/new`}>
          Добавить кейс
        </Link>
      </header>

      <DataTable
        basePath={`${ADMIN_PATH}/cases`}
        rows={res.docs}
        searchQuery={sp.q}
        pagination={{ page: res.page ?? 1, totalPages: res.totalPages }}
        columns={[
          { key: 'title', label: 'Название', primary: true },
          { key: 'practice', label: 'Практика', render: (r) => (r.practice as any)?.title ?? '—' },
          { key: 'amount', label: 'Сумма', render: (r) => (r.amount ? formatMoney(r.amount) : '—') },
          {
            key: '_status',
            label: 'Статус',
            render: (r) => (
              <span className={`adm-badge adm-badge--${r._status}`}>
                {r._status === 'published' ? 'Опубликован' : 'Черновик'}
              </span>
            ),
          },
          { key: 'showOnHome', label: 'На главной', render: (r) => (r.showOnHome ? 'Да' : '—') },
          {
            key: 'updatedAt',
            label: 'Изменён',
            render: (r) => new Date(r.updatedAt).toLocaleDateString('ru-RU'),
          },
        ]}
      />
    </>
  )
}
