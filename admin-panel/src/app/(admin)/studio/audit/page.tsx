import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import { formatDate } from '@/lib/format'

export const dynamic = 'force-dynamic'

export default async function AuditLogAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  await requirePermission('audit-log', 'read')
  const sp = await searchParams
  const payload = await getPayload()

  const res = await payload.find({
    collection: 'audit-log',
    limit: 50,
    page: Number(sp.page || 1),
    sort: '-at',
    depth: 1,
  })

  return (
    <div>
      <header className="adm-head">
        <div>
          <h1>
            Журнал аудита <span className="adm-count">{res.totalDocs}</span>
          </h1>
          <p className="adm-muted" style={{ marginTop: 4 }}>
            История всех изменений и удалений контента в системе
          </p>
        </div>
      </header>

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Время</th>
              <th>Действие</th>
              <th>Раздел</th>
              <th>Объект / Заголовок</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {res.docs.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 32, color: 'var(--adm-text-muted)' }}>
                  Журнал пуст
                </td>
              </tr>
            ) : (
              res.docs.map((a: any) => (
                <tr key={a.id}>
                  <td className="adm-muted">{formatDate(a.at)}</td>
                  <td>
                    <span
                      className={`adm-badge ${
                        a.action === 'delete'
                          ? 'adm-badge--lost'
                          : a.action === 'create'
                          ? 'adm-badge--published'
                          : 'adm-badge--progress'
                      }`}
                    >
                      {a.action}
                    </span>
                  </td>
                  <td>
                    <strong>{a.entity}</strong>
                  </td>
                  <td>{a.title || '—'}</td>
                  <td className="adm-muted" style={{ fontSize: 11 }}>
                    {a.entityId || '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
