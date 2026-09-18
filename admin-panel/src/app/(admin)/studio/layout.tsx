import type { Metadata } from 'next'
import { Jost, Onest } from 'next/font/google'
import { getUser } from '@/auth/guard'
import Shell from './_components/Shell'
import '@/styles/tokens.css'
import '@/styles/admin.css'

const jost = Jost({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500'],
  variable: '--f-display',
  display: 'swap',
})

const onest = Onest({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500'],
  variable: '--f-text',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ETLEGIS · Панель управления',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()

  return (
    <html
      lang="ru"
      data-theme="light"
      className={`${jost.variable} ${onest.variable}`}
      suppressHydrationWarning
    >
      <body className="adm-body">
        {user ? <Shell user={user}>{children}</Shell> : children}
      </body>
    </html>
  )
}
