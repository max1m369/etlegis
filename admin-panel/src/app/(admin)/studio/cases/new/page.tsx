import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import CaseForm from '../CaseForm'

export const dynamic = 'force-dynamic'

export default async function NewCasePage() {
  await requirePermission('cases', 'create')
  const payload = await getPayload()

  const [practices, employees, services] = await Promise.all([
    payload.find({ collection: 'practices', limit: 100, sort: 'order' }),
    payload.find({ collection: 'employees', limit: 100, sort: 'name' }),
    payload.find({ collection: 'services', limit: 100, sort: 'title' }),
  ])

  return (
    <>
      <header className="adm-head">
        <h1>Новый кейс</h1>
      </header>
      <CaseForm
        practices={practices.docs}
        employees={employees.docs}
        services={services.docs}
      />
    </>
  )
}
