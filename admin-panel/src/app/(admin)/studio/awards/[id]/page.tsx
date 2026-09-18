import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import AwardForm from '../AwardForm'

export const dynamic = 'force-dynamic'

export default async function EditAwardPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requirePermission('awards', 'read')
  const { id } = await params
  const payload = await getPayload()

  const doc = await payload.findByID({ collection: 'awards', id }).catch(() => null)
  if (!doc) notFound()

  return (
    <>
      <header className="adm-head">
        <h1>Редактирование награды</h1>
      </header>
      <AwardForm doc={doc} />
    </>
  )
}
