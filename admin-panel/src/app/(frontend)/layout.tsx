import type { Metadata } from 'next'
import { Jost, Onest } from 'next/font/google'
import '@/styles/tokens.css'
import '@/styles/global.css'
import { ThemeScript } from '@/components/layout/ThemeScript'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://etlegis.ru'),
  title: {
    default: 'Адвокатское бюро ETLEGIS — Защита бизнеса и руководителей',
    template: '%s — ETLEGIS',
  },
  description:
    'Адвокатское бюро города Москвы. Защита бизнеса и его руководителей в уголовных, налоговых и банкротных делах. Работаем с 2019 года.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://etlegis.ru',
    siteName: 'ETLEGIS',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      data-theme="light"
      className={`${jost.variable} ${onest.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
