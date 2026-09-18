import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import ServiceForm from '../ServiceForm'

export const dynamic = 'force-dynamic'

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requirePermission('services', 'read')
  const { id } = await params
  const payload = await getPayload()

  const [doc, practices, employees] = await Promise.all([
    payload
      .findByID({ collection: 'services', id, depth: 1, draft: true })
      .catch(() => null),
    payload.find({ collection: 'practices', limit: 100, sort: 'order' }),
    payload.find({ collection: 'employees', limit: 100, sort: 'name' }),
  ])

  if (!doc) notFound()

  return (
    <>
      <header className="adm-head">
        <h1>Редактирование услуги</h1>
      </header>
      <ServiceForm doc={doc} practices={practices.docs} employees={employees.docs} />
    </>
  )
}
