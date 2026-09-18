import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import PostForm from '../PostForm'

export const dynamic = 'force-dynamic'

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requirePermission('posts', 'read')
  const { id } = await params
  const payload = await getPayload()

  const [doc, employees, practices] = await Promise.all([
    payload
      .findByID({ collection: 'posts', id, depth: 1, draft: true })
      .catch(() => null),
    payload.find({ collection: 'employees', limit: 100, sort: 'name' }),
    payload.find({ collection: 'practices', limit: 100, sort: 'order' }),
  ])

  if (!doc) notFound()

  return (
    <>
      <header className="adm-head">
        <h1>Редактирование материала</h1>
      </header>
      <PostForm doc={doc} employees={employees.docs} practices={practices.docs} />
    </>
  )
}
