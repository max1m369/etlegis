import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import CaseForm from '../CaseForm'

export const dynamic = 'force-dynamic'

export default async function EditCasePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requirePermission('cases', 'read')
  const { id } = await params
  const payload = await getPayload()

  const [doc, practices, employees, services] = await Promise.all([
    payload
      .findByID({ collection: 'cases', id, depth: 1, draft: true })
      .catch(() => null),
    payload.find({ collection: 'practices', limit: 100, sort: 'order' }),
    payload.find({ collection: 'employees', limit: 100, sort: 'name' }),
    payload.find({ collection: 'services', limit: 100, sort: 'title' }),
  ])

  if (!doc) notFound()

  return (
    <>
      <header className="adm-head">
        <h1>Редактирование кейса</h1>
      </header>
      <CaseForm
        doc={doc}
        practices={practices.docs}
        employees={employees.docs}
        services={services.docs}
      />
    </>
  )
}
