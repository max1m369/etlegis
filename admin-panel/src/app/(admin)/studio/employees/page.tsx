import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import { ADMIN_PATH } from '@/auth/constants'
import SortableList from './SortableList'

export const dynamic = 'force-dynamic'

export default async function EmployeesPage() {
  await requirePermission('employees', 'read')
  const payload = await getPayload()

  const res = await payload.find({
    collection: 'employees',
    draft: true,
    depth: 1,
    limit: 100,
    sort: 'order',
  })

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>
            Команда <span className="adm-count">{res.totalDocs}</span>
          </h1>
          <p className="adm-muted" style={{ marginTop: 4 }}>
            Перетаскивайте строки за иконку ⠿ для изменения порядка отображения на сайте
          </p>
        </div>
        <Link className="adm-btn adm-btn--primary" href={`${ADMIN_PATH}/employees/new`}>
          Добавить сотрудника
        </Link>
      </header>

      <SortableList initial={res.docs} />
    </>
  )
}
