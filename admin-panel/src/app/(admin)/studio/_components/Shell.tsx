import React from 'react'
import Link from 'next/link'
import Sidebar from './Sidebar'
import { logoutAction } from '../login/actions'
import { ADMIN_PATH } from '@/auth/constants'
import { type AuthUser } from '@/auth/guard'

export default function Shell({
  user,
  children,
}: {
  user: AuthUser
  children: React.ReactNode
}) {
  return (
    <div className="adm-shell">
      <aside className="adm-sidebar">
        <Link href={ADMIN_PATH} className="adm-sidebar__logo">
          <svg height="22" viewBox="0 0 633.6 124.6" fill="currentColor" aria-label="ETLEGIS Studio">
            <path d="M113.4,31.3V11.9H35.8v19.4H12.5v81.5H94V89.5h19.4V70.1H55.2V58.4h58.2V42.9H55.2V31.3H113.4z M86.2,89.5V105 h-66V39h15.5v50.4H86.2z" />
            <g>
              <path d="M214,85.9v9.8h-37.5V32.8H213v9.7h-26.2v16.4h23.9v9.5h-23.9v17.6H214z" />
              <path d="M285.5,42.4h-18.4v53.3h-10.3V42.4h-18.4v-9.6h47.2V42.4z" />
              <path d="M349.9,86v9.6h-36.5V32.8h10.3V86H349.9z" />
              <path d="M415.3,85.9v9.8h-37.5V32.8h36.5v9.7h-26.2v16.4h23.9v9.5h-23.9v17.6H415.3z" />
              <path d="M504.5,63.7c-0.3,19.3-13.3,33.1-31.7,33.1c-18.5,0-32.2-13.8-32.2-32.6c0-18.7,13.6-32.6,32-32.6 c15.3,0,28.2,9.7,31,23.3h-10.6c-2.7-8.1-10.7-13.4-20.2-13.4c-12.7,0-21.7,9.3-21.7,22.6c0,13.4,8.7,22.6,21.7,22.6 c10,0,18.2-5.7,20.6-14.2h-22.4v-8.9L504.5,63.7z" />
              <path d="M534.3,32.8h10.3v62.9h-10.3V32.8z" />
              <path d="M574.5,75.9H585c0,7,5.8,10.9,13.2,10.9c6.7,0,12.4-3.5,12.4-9.3c0-6.3-6.7-7.8-14.3-9.6 c-9.6-2.3-20.7-5-20.7-18c0-11.4,8.6-18.1,22-18.1c13.6,0,21.7,7.4,21.7,19.3h-10.2c0-6.3-5.2-9.7-11.8-9.7c-6.3,0-11.5,2.9-11.5,8 c0,5.8,6.5,7.4,13.9,9.2c9.8,2.4,21.3,5.2,21.3,18.7c0,12.6-10.2,19.3-22.9,19.3C584.1,96.6,574.5,88.7,574.5,75.9z" />
            </g>
          </svg>
        </Link>
        <Sidebar role={user.role} />
        <div className="adm-sidebar__footer">
          <span className="adm-muted" style={{ fontSize: 11 }}>Studio v2.0</span>
          <Link href="/" target="_blank" className="adm-muted" style={{ textDecoration: 'none', fontSize: 12 }}>
            Перейти на сайт ↗
          </Link>
        </div>
      </aside>

      <div className="adm-main">
        <header className="adm-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontWeight: 500 }}>{user.name}</span>
            <span className="adm-badge">{user.role === 'admin' ? 'Администратор' : 'Редактор'}</span>
          </div>

          <form action={logoutAction}>
            <button type="submit" className="adm-btn adm-btn--danger" style={{ padding: '6px 12px', fontSize: 12 }}>
              Выйти
            </button>
          </form>
        </header>

        <main className="adm-content">{children}</main>
      </div>
    </div>
  )
}
