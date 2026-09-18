import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import EmployeeForm from '../EmployeeForm'

export const dynamic = 'force-dynamic'

export default async function NewEmployeePage() {
  await requirePermission('employees', 'create')
  const payload = await getPayload()

  const practices = await payload.find({
    collection: 'practices',
    limit: 100,
    sort: 'order',
  })

  return (
    <>
      <header className="adm-head">
        <h1>Новый сотрудник</h1>
      </header>
      <EmployeeForm practices={practices.docs} />
    </>
  )
}
