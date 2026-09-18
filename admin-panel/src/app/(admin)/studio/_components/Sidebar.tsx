'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ADMIN_PATH } from '@/auth/constants'
import { can, type Role } from '@/auth/rbac'

const NAV = [
  { href: '', label: 'Обзор', resource: null },
  { href: '/cases', label: 'Кейсы', resource: 'cases' },
  { href: '/posts', label: 'Публикации', resource: 'posts' },
  { href: '/employees', label: 'Команда', resource: 'employees' },
  { href: '/services', label: 'Услуги', resource: 'services' },
  { href: '/awards', label: 'Награды', resource: 'awards' },
  { href: '/media', label: 'Медиатека', resource: 'media' },
  { href: '/leads', label: 'Заявки', resource: 'leads' },
  { href: '/users', label: 'Пользователи', resource: 'admin-users' },
  { href: '/audit', label: 'Журнал', resource: 'audit-log' },
  { href: '/settings', label: 'Настройки', resource: 'settings' },
] as const

export default function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname()

  return (
    <nav className="adm-nav">
      {NAV.filter((i) => !i.resource || can(role, i.resource as never, 'read')).map((i) => {
        const href = `${ADMIN_PATH}${i.href}`
        const active = i.href ? pathname.startsWith(href) : pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={active ? 'adm-nav__item is-active' : 'adm-nav__item'}
          >
            {i.label}
          </Link>
        )
      })}
    </nav>
  )
}
