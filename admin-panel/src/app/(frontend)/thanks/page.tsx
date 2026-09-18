import { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Brackets } from '@/components/motion/Brackets'

export const metadata: Metadata = {
  title: 'Заявка принята',
  description: 'Спасибо за обращение в адвокатское бюро ETLEGIS.',
}

export default function ThanksPage() {
  return (
    <div style={{ padding: '40px 0 110px' }}>
      <div className="wrap">
        <Breadcrumbs items={[{ label: 'Заявка принята' }]} />

        <div style={{ maxWidth: 740, margin: '60px auto 0', textAlign: 'center' }}>
          <Brackets tone="brass">
            <div className="eyebrow">Обращение зафиксировано</div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: '16px 0 20px' }}>
              Спасибо, мы получили ваше обращение
            </h1>
            <p className="lead" style={{ marginBottom: 32 }}>
              Дежурный адвокат бюро свяжется с вами в течение 15 минут для конфиденциального обсуждения деталей.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/" className="btn">
                На главную
              </Link>
              <Link href="/cases" className="btn ghost">
                Посмотреть кейсы
              </Link>
            </div>
          </Brackets>
        </div>
      </div>
    </div>
  )
}
