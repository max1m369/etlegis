import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import ServiceForm from '../ServiceForm'

export const dynamic = 'force-dynamic'

export default async function NewServicePage() {
  await requirePermission('services', 'create')
  const payload = await getPayload()

  const [practices, employees] = await Promise.all([
    payload.find({ collection: 'practices', limit: 100, sort: 'order' }),
    payload.find({ collection: 'employees', limit: 100, sort: 'name' }),
  ])

  return (
    <>
      <header className="adm-head">
        <h1>Новая услуга</h1>
      </header>
      <ServiceForm practices={practices.docs} employees={employees.docs} />
    </>
  )
}
