import { Metadata } from 'next'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Brackets } from '@/components/motion/Brackets'
import { LeadForm } from '@/components/blocks/LeadForm'

export const metadata: Metadata = {
  title: 'Контакты и адрес офиса в Москве',
  description:
    'Контакты адвокатского бюро ETLEGIS в Москве: 1-й Магистральный тупик, 11, стр. 10. Телефон: +7 (495) 105-91-15. Конфиденциальная запись.',
}

export default function ContactsPage() {
  return (
    <div style={{ padding: '40px 0 110px' }}>
      <div className="wrap">
        <Breadcrumbs items={[{ label: 'Контакты' }]} />

        <div style={{ maxWidth: 880, margin: '0 auto 64px' }}>
          <Brackets tone="brass">
            <div className="eyebrow">Связь с бюро</div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 54px)', margin: '16px 0 24px' }}>
              Контакты и офис
            </h1>
            <p className="lead" style={{ lineHeight: 1.6 }}>
              Приём в офисе бюро проводится по предварительной записи для обеспечения полной конфиденциальности доверителей.
            </p>
          </Brackets>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 48,
            marginBottom: 96,
          }}
        >
          {/* Блок контактов */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div
              style={{
                background: 'var(--card)',
                border: '1px solid var(--line)',
                padding: 32,
                boxShadow: 'var(--shadow)',
              }}
            >
              <div className="eyebrow" style={{ color: 'var(--brass)' }}>Телефон</div>
              <div style={{ marginTop: 8 }}>
                <a
                  href="tel:+74951059115"
                  style={{
                    fontSize: 24,
                    color: 'var(--text)',
                    textDecoration: 'none',
                    fontFamily: "var(--f-display), 'Jost'",
                    fontWeight: 400,
                  }}
                >
                  +7 (495) 105-91-15
                </a>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>
                Круглосуточный экстренный выезд адвоката
              </div>
            </div>

            <div
              style={{
                background: 'var(--card)',
                border: '1px solid var(--line)',
                padding: 32,
                boxShadow: 'var(--shadow)',
              }}
            >
              <div className="eyebrow" style={{ color: 'var(--brass)' }}>Электронная почта</div>
              <div style={{ marginTop: 8 }}>
                <a
                  href="mailto:info@etlegis.ru"
                  style={{
                    fontSize: 20,
                    color: 'var(--text)',
                    textDecoration: 'none',
                  }}
                >
                  info@etlegis.ru
                </a>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>
                Для направления процессуальных документов
              </div>
            </div>

            <div
              style={{
                background: 'var(--card)',
                border: '1px solid var(--line)',
                padding: 32,
                boxShadow: 'var(--shadow)',
              }}
            >
              <div className="eyebrow" style={{ color: 'var(--brass)' }}>Адрес офиса</div>
              <div style={{ fontSize: 18, color: 'var(--text)', marginTop: 8, lineHeight: 1.5 }}>
                Москва, 1-й Магистральный тупик, 11, стр. 10
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 8 }}>
                Режим работы: Пн–Пт с 09:00 до 20:00 (суббота и воскресенье — по согласованию)
              </div>
            </div>
          </div>

          {/* Форма */}
          <div id="consultation">
            <LeadForm
              source="Страница контактов"
              title="Записаться на встречу"
              subtitle="Укажите контакты, и мы перезвоним для согласования удобного времени приёма."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
