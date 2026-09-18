import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import EmployeeForm from '../EmployeeForm'

export const dynamic = 'force-dynamic'

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requirePermission('employees', 'read')
  const { id } = await params
  const payload = await getPayload()

  const [doc, practices] = await Promise.all([
    payload
      .findByID({ collection: 'employees', id, depth: 1, draft: true })
      .catch(() => null),
    payload.find({ collection: 'practices', limit: 100, sort: 'order' }),
  ])

  if (!doc) notFound()

  return (
    <>
      <header className="adm-head">
        <h1>Редактирование сотрудника</h1>
      </header>
      <EmployeeForm doc={doc} practices={practices.docs} />
    </>
  )
}
