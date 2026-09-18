import Link from 'next/link'
import { Brackets } from '@/components/motion/Brackets'

export default function NotFound() {
  return (
    <div style={{ padding: '80px 0 120px' }}>
      <div className="wrap">
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <Brackets tone="line">
            <div
              style={{
                fontFamily: "var(--f-display), 'Jost'",
                fontSize: 'clamp(72px, 10vw, 120px)',
                fontWeight: 300,
                color: 'var(--brass)',
                lineHeight: 1,
                marginBottom: 16,
              }}
            >
              404
            </div>
            <h1 style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: 16 }}>
              Страница не найдена
            </h1>
            <p className="lead" style={{ fontSize: 16, marginBottom: 32 }}>
              Возможно, запрашиваемая страница была перемещена, удалена или адрес был введён неверно.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <Link href="/" className="btn">
                На главную страницу
              </Link>
              <Link href="/services" className="btn ghost">
                К списку услуг
              </Link>
            </div>
          </Brackets>
        </div>
      </div>
    </div>
  )
}
