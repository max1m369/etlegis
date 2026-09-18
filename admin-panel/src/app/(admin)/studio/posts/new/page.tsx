import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import PostForm from '../PostForm'

export const dynamic = 'force-dynamic'

export default async function NewPostPage() {
  await requirePermission('posts', 'create')
  const payload = await getPayload()

  const [employees, practices] = await Promise.all([
    payload.find({ collection: 'employees', limit: 100, sort: 'name' }),
    payload.find({ collection: 'practices', limit: 100, sort: 'order' }),
  ])

  return (
    <>
      <header className="adm-head">
        <h1>Новый материал</h1>
      </header>
      <PostForm employees={employees.docs} practices={practices.docs} />
    </>
  )
}
