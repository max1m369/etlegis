import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import { createUser, revokeUserSessions } from './actions'
import { formatDate } from '@/lib/format'

export const dynamic = 'force-dynamic'

export default async function UsersAdminPage() {
  await requirePermission('admin-users', 'read')
  const payload = await getPayload()

  const [users, activeSessions] = await Promise.all([
    payload.find({ collection: 'admin-users', limit: 100, sort: '-createdAt' }),
    payload.find({
      collection: 'sessions',
      limit: 100,
      sort: '-lastSeenAt',
      where: { revoked: { equals: false } },
      depth: 1,
    }),
  ])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <header className="adm-head">
        <div>
          <h1>
            Пользователи и безопасность <span className="adm-count">{users.totalDocs}</span>
          </h1>
          <p className="adm-muted" style={{ marginTop: 4 }}>
            Управление учётными записями, правами и активными сессиями
          </p>
        </div>
      </header>

      {/* Список пользователей */}
      <section className="adm-table-wrap">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--adm-line)' }}>
          <h2 style={{ fontSize: 16 }}>Учётные записи</h2>
        </div>
        <table className="adm-table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>E-mail</th>
              <th>Роль</th>
              <th>Последний вход</th>
              <th>IP</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.docs.map((u: any) => (
              <tr key={u.id}>
                <td>
                  <strong>{u.name}</strong>
                </td>
                <td>{u.email}</td>
                <td>
                  <span className="adm-badge">
                    {u.role === 'admin' ? 'Администратор' : 'Редактор'}
                  </span>
                </td>
                <td className="adm-muted">
                  {u.lastLoginAt ? formatDate(u.lastLoginAt) : 'Никогда'}
                </td>
                <td className="adm-muted">{u.lastLoginIp || '—'}</td>
                <td>
                  <form
                    action={async () => {
                      'use server'
                      await revokeUserSessions(u.id)
                    }}
                  >
                    <button
                      type="submit"
                      className="adm-btn"
                      style={{ padding: '2px 8px', fontSize: 11 }}
                    >
                      Сбросить все сессии
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Активные сессии */}
      <section className="adm-table-wrap">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--adm-line)' }}>
          <h2 style={{ fontSize: 16 }}>Активные сессии в БД ({activeSessions.totalDocs})</h2>
        </div>
        <table className="adm-table">
          <thead>
            <tr>
              <th>Пользователь</th>
              <th>IP-адрес</th>
              <th>Браузер / User-Agent</th>
              <th>Истекает (Idle)</th>
            </tr>
          </thead>
          <tbody>
            {activeSessions.docs.map((s: any) => (
              <tr key={s.id}>
                <td>
                  <strong>{typeof s.user === 'object' ? s.user?.email : s.user}</strong>
                </td>
                <td>{s.ip}</td>
                <td className="adm-muted" style={{ maxWidth: 300, fontSize: 11 }}>
                  {s.userAgent}
                </td>
                <td className="adm-muted">{formatDate(s.expiresAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Создание нового пользователя */}
      <section style={{ maxWidth: 540 }}>
        <form action={createUser} className="adm-form">
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--adm-line)' }}>
            <h2 style={{ fontSize: 16 }}>Добавить нового пользователя</h2>
          </div>
          <div className="adm-grid">
            <div className="adm-field">
              <label className="adm-field__label">ФИО / Имя *</label>
              <input name="name" required placeholder="Алексей" className="adm-input" />
            </div>
            <div className="adm-field">
              <label className="adm-field__label">E-mail *</label>
              <input name="email" type="email" required placeholder="user@etlegis.ru" className="adm-input" />
            </div>
            <div className="adm-field">
              <label className="adm-field__label">Пароль (не менее 12 символов) *</label>
              <input
                name="password"
                type="password"
                required
                placeholder="Сложный надёжный пароль"
                className="adm-input"
              />
            </div>
            <div className="adm-field">
              <label className="adm-field__label">Роль *</label>
              <select name="role" defaultValue="editor" className="adm-select">
                <option value="editor">Редактор (управление контентом)</option>
                <option value="admin">Администратор (полный доступ)</option>
              </select>
            </div>
            <button type="submit" className="adm-btn adm-btn--primary">
              Создать учётную запись
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
