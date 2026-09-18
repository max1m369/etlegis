import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { requireUser } from '@/auth/guard'
import { ADMIN_PATH } from '@/auth/constants'
import { formatDate } from '@/lib/format'

export const dynamic = 'force-dynamic'

export default async function StudioDashboard() {
  const user = await requireUser()
  const payload = await getPayload()

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const sevenDaysFuture = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

  const [
    recentLeadsCount,
    upcomingBookingsCount,
    casesDrafts,
    postsDrafts,
    casesPublished,
    postsPublished,
    recentLeads,
    recentAudit,
    attentionCases,
    attentionEmployees,
    attentionPosts,
  ] = await Promise.all([
    payload
      .count({
        collection: 'leads',
        where: { createdAt: { greater_than_equal: sevenDaysAgo } },
      })
      .catch(() => ({ totalDocs: 0 })),
    payload
      .count({
        collection: 'bookings',
        where: { date: { less_than_equal: sevenDaysFuture } },
      })
      .catch(() => ({ totalDocs: 0 })),
    payload
      .count({
        collection: 'cases',
        where: { _status: { equals: 'draft' } },
      })
      .catch(() => ({ totalDocs: 0 })),
    payload
      .count({
        collection: 'posts',
        where: { _status: { equals: 'draft' } },
      })
      .catch(() => ({ totalDocs: 0 })),
    payload
      .count({
        collection: 'cases',
        where: { _status: { equals: 'published' } },
      })
      .catch(() => ({ totalDocs: 0 })),
    payload
      .count({
        collection: 'posts',
        where: { _status: { equals: 'published' } },
      })
      .catch(() => ({ totalDocs: 0 })),
    payload
      .find({
        collection: 'leads',
        limit: 10,
        sort: '-createdAt',
      })
      .catch(() => ({ docs: [] })),
    payload
      .find({
        collection: 'audit-log',
        limit: 8,
        sort: '-at',
        depth: 1,
      })
      .catch(() => ({ docs: [] })),
    // Attention items
    payload
      .find({
        collection: 'cases',
        limit: 5,
        where: {
          and: [
            { _status: { equals: 'published' } },
            { 'disclosure.clientConsent': { not_equals: true } },
            { 'disclosure.anonymizedClient': { equals: '' } },
          ],
        },
      })
      .catch(() => ({ docs: [] })),
    payload
      .find({
        collection: 'employees',
        limit: 5,
        where: { photo: { exists: false } },
      })
      .catch(() => ({ docs: [] })),
    payload
      .find({
        collection: 'posts',
        limit: 5,
        where: { 'seo.description': { exists: false } },
      })
      .catch(() => ({ docs: [] })),
  ])

  const totalDrafts = casesDrafts.totalDocs + postsDrafts.totalDocs
  const totalPublished = casesPublished.totalDocs + postsPublished.totalDocs

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <header className="adm-head">
        <div>
          <h1>Панель управления</h1>
          <p className="adm-muted">Добро пожаловать в ETLEGIS Studio, {user.name}</p>
        </div>
      </header>

      {/* 4 ключевых счетчика */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        <div
          style={{
            background: 'var(--adm-surface)',
            border: '1px solid var(--adm-line)',
            padding: '20px 24px',
            borderRadius: 4,
          }}
        >
          <div className="adm-muted" style={{ fontSize: 13, marginBottom: 6 }}>
            Новые заявки (7 дней)
          </div>
          <div style={{ fontSize: 32, fontWeight: 300, color: 'var(--adm-brass)' }}>
            {recentLeadsCount.totalDocs}
          </div>
        </div>

        <div
          style={{
            background: 'var(--adm-surface)',
            border: '1px solid var(--adm-line)',
            padding: '20px 24px',
            borderRadius: 4,
          }}
        >
          <div className="adm-muted" style={{ fontSize: 13, marginBottom: 6 }}>
            Брони на неделю
          </div>
          <div style={{ fontSize: 32, fontWeight: 300, color: 'var(--adm-text)' }}>
            {upcomingBookingsCount.totalDocs}
          </div>
        </div>

        <div
          style={{
            background: 'var(--adm-surface)',
            border: '1px solid var(--adm-line)',
            padding: '20px 24px',
            borderRadius: 4,
          }}
        >
          <div className="adm-muted" style={{ fontSize: 13, marginBottom: 6 }}>
            Черновиков в работе
          </div>
          <div style={{ fontSize: 32, fontWeight: 300, color: '#d35400' }}>
            {totalDrafts}
          </div>
        </div>

        <div
          style={{
            background: 'var(--adm-surface)',
            border: '1px solid var(--adm-line)',
            padding: '20px 24px',
            borderRadius: 4,
          }}
        >
          <div className="adm-muted" style={{ fontSize: 13, marginBottom: 6 }}>
            Опубликовано на сайте
          </div>
          <div style={{ fontSize: 32, fontWeight: 300, color: '#27ae60' }}>
            {totalPublished}
          </div>
        </div>
      </div>

      {/* Блок «Требует внимания» */}
      {(attentionCases.docs.length > 0 ||
        attentionEmployees.docs.length > 0 ||
        attentionPosts.docs.length > 0) && (
        <section
          style={{
            background: 'var(--adm-surface)',
            border: '1px solid var(--adm-brass)',
            borderRadius: 4,
            padding: 24,
          }}
        >
          <h2 style={{ fontSize: 16, color: 'var(--adm-brass)', marginBottom: 16 }}>
            ⚠ Требует внимания
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13.5 }}>
            {attentionCases.docs.map((c: any) => (
              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  Кейс <strong>«{c.title}»</strong> опубликован без отметки о согласии клиента
                </span>
                <Link href={`${ADMIN_PATH}/cases/${c.id}`} className="adm-btn" style={{ padding: '2px 8px', fontSize: 12 }}>
                  Исправить
                </Link>
              </div>
            ))}
            {attentionEmployees.docs.map((e: any) => (
              <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  Сотрудник <strong>«{e.name}»</strong> не имеет загруженного фото
                </span>
                <Link href={`${ADMIN_PATH}/employees/${e.id}`} className="adm-btn" style={{ padding: '2px 8px', fontSize: 12 }}>
                  Загрузить
                </Link>
              </div>
            ))}
            {attentionPosts.docs.map((p: any) => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  Материал <strong>«{p.title}»</strong> не содержит SEO description
                </span>
                <Link href={`${ADMIN_PATH}/posts/${p.id}`} className="adm-btn" style={{ padding: '2px 8px', fontSize: 12 }}>
                  Заполнить
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Последние заявки и аудит */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 24,
        }}
      >
        {/* Заявки */}
        <section className="adm-table-wrap">
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--adm-line)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2 style={{ fontSize: 16 }}>Последние заявки</h2>
            <Link href={`${ADMIN_PATH}/leads`} className="adm-muted" style={{ textDecoration: 'none', fontSize: 13 }}>
              Все заявки →
            </Link>
          </div>
          <table className="adm-table">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Телефон</th>
                <th>Статус</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.docs.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: 24, color: 'var(--adm-text-muted)' }}>
                    Заявок пока нет
                  </td>
                </tr>
              ) : (
                recentLeads.docs.map((l: any) => (
                  <tr key={l.id}>
                    <td>
                      <strong>{l.name}</strong>
                    </td>
                    <td>{l.phone}</td>
                    <td>
                      <span className={`adm-badge adm-badge--${l.status}`}>
                        {l.status === 'new'
                          ? 'Новая'
                          : l.status === 'progress'
                          ? 'В работе'
                          : l.status === 'won'
                          ? 'Клиент'
                          : l.status}
                      </span>
                    </td>
                    <td className="adm-muted">{formatDate(l.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* Журнал аудита */}
        <section className="adm-table-wrap">
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--adm-line)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2 style={{ fontSize: 16 }}>Журнал аудита</h2>
            <Link href={`${ADMIN_PATH}/audit`} className="adm-muted" style={{ textDecoration: 'none', fontSize: 13 }}>
              Весь журнал →
            </Link>
          </div>
          <table className="adm-table">
            <thead>
              <tr>
                <th>Действие</th>
                <th>Объект</th>
                <th>Время</th>
              </tr>
            </thead>
            <tbody>
              {recentAudit.docs.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', padding: 24, color: 'var(--adm-text-muted)' }}>
                    Записей аудита пока нет
                  </td>
                </tr>
              ) : (
                recentAudit.docs.map((a: any) => (
                  <tr key={a.id}>
                    <td>
                      <span className="adm-badge">{a.action}</span>
                    </td>
                    <td>
                      <div>{a.title || a.entity}</div>
                      <span className="adm-muted" style={{ fontSize: 11 }}>{a.entity}</span>
                    </td>
                    <td className="adm-muted">{formatDate(a.at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  )
}
