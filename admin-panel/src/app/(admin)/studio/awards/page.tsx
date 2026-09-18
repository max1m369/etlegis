import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import { ADMIN_PATH } from '@/auth/constants'
import DataTable from '../_components/DataTable'

export const dynamic = 'force-dynamic'

export default async function AwardsAdminPage() {
  await requirePermission('awards', 'read')
  const payload = await getPayload()

  const res = await payload.find({
    collection: 'awards',
    limit: 100,
    sort: '-year',
  })

  return (
    <>
      <header className="adm-head">
        <h1>
          Награды и рейтинги <span className="adm-count">{res.totalDocs}</span>
        </h1>
        <Link className="adm-btn adm-btn--primary" href={`${ADMIN_PATH}/awards/new`}>
          Добавить награду
        </Link>
      </header>

      <DataTable
        basePath={`${ADMIN_PATH}/awards`}
        rows={res.docs}
        columns={[
          { key: 'publication', label: 'Издание / Рейтинг', primary: true },
          { key: 'category', label: 'Номинация' },
          { key: 'band', label: 'Группа / Band' },
          { key: 'year', label: 'Год' },
        ]}
      />
    </>
  )
}
