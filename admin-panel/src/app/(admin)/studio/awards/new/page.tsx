import { requirePermission } from '@/auth/guard'
import AwardForm from '../AwardForm'

export const dynamic = 'force-dynamic'

export default async function NewAwardPage() {
  await requirePermission('awards', 'create')

  return (
    <>
      <header className="adm-head">
        <h1>Новая награда</h1>
      </header>
      <AwardForm />
    </>
  )
}
