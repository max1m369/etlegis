import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import { updateLeadStatus } from './actions'
import { formatDate } from '@/lib/format'

export const dynamic = 'force-dynamic'

export default async function LeadsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  await requirePermission('leads', 'read')
  const sp = await searchParams
  const payload = await getPayload()

  const where: any = { and: [] }
  if (sp.status) where.and.push({ status: { equals: sp.status } })

  const res = await payload.find({
    collection: 'leads',
    limit: 100,
    sort: '-createdAt',
    where: where.and.length ? where : undefined,
  })

  return (
    <div>
      <header className="adm-head">
        <div>
          <h1>
            Заявки и обращения <span className="adm-count">{res.totalDocs}</span>
          </h1>
          <p className="adm-muted" style={{ marginTop: 4 }}>
            Реестр входящих лидов и результатов экспресс-диагностики
          </p>
        </div>

        <a
          href="/api/admin/export/leads"
          download
          className="adm-btn adm-btn--primary"
        >
          📥 Экспорт в CSV (Excel)
        </a>
      </header>

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Имя заявителя</th>
              <th>Контакты</th>
              <th>Источник</th>
              <th>Сообщение / Диагностика</th>
              <th>Статус</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            {res.docs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: 32, color: 'var(--adm-text-muted)' }}>
                  Заявок не найдено
                </td>
              </tr>
            ) : (
              res.docs.map((lead: any) => (
                <tr key={lead.id}>
                  <td>
                    <strong>{lead.name}</strong>
                  </td>
                  <td>
                    <div>
                      <a href={`tel:${lead.phone}`} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>
                        {lead.phone}
                      </a>
                    </div>
                    {lead.email && <div className="adm-muted" style={{ fontSize: 12 }}>{lead.email}</div>}
                  </td>
                  <td className="adm-muted" style={{ fontSize: 12 }}>{lead.source || '—'}</td>
                  <td style={{ maxWidth: 300, fontSize: 13 }}>
                    {lead.message && <div style={{ marginBottom: 4 }}>{lead.message}</div>}
                    {lead.diagnostics && (
                      <div className="adm-muted" style={{ fontSize: 11, background: 'var(--adm-surface-alt)', padding: '4px 8px', borderRadius: 4 }}>
                        {JSON.stringify(lead.diagnostics)}
                      </div>
                    )}
                  </td>
                  <td>
                    <form
                      action={async (formData) => {
                        'use server'
                        const st = formData.get('status') as string
                        if (st) await updateLeadStatus(lead.id, st)
                      }}
                    >
                      <select
                        name="status"
                        defaultValue={lead.status ?? 'new'}
                        className="adm-select"
                        style={{ padding: '4px 8px', fontSize: 12 }}
                      >
                        <option value="new">Новая</option>
                        <option value="progress">В работе</option>
                        <option value="scheduled">Консультация назначена</option>
                        <option value="won">Клиент</option>
                        <option value="lost">Отказ</option>
                      </select>
                    </form>
                  </td>
                  <td className="adm-muted" style={{ fontSize: 12 }}>{formatDate(lead.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
