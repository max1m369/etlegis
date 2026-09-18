import Link from 'next/link'
import { Brackets } from '../motion/Brackets'
import { Reveal } from '../motion/Reveal'

export function AboutTeaser() {
  return (
    <section
      style={{
        padding: '110px 0',
        background: 'var(--surface)',
        position: 'relative',
      }}
    >
      <div className="wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 56,
            alignItems: 'center',
          }}
        >
          <Brackets tone="brass">
            <div className="eyebrow">О бюро</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.4vw, 42px)', margin: '20px 0 24px' }}>
              Бескомпромиссная защита бизнеса и репутации
            </h2>
            <p className="lead" style={{ marginBottom: 24, fontSize: 17 }}>
              ETLEGIS объединяет адвокатов с глубоким пониманием корпоративных процессов, уголовной специфики экономических составов и налогового регулирования.
            </p>
            <p style={{ color: 'var(--text-2)', fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
              Мы не даём пустых обещаний. Каждый шаг просчитывается с точки зрения судебных прецедентов, уголовно-процессуальных рисков и сохранения контроля над бизнесом.
            </p>
            <Link href="/about" className="btn ghost">
              Узнать больше о бюро
            </Link>
          </Brackets>

          <Reveal delay={150}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 20,
              }}
            >
              <div
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  padding: '32px 24px',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <div style={{ fontFamily: "var(--f-display), 'Jost'", fontSize: 36, color: 'var(--brass)', marginBottom: 8 }}>
                  100%
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-2)' }}>
                  Адвокатская тайна и защита конфиденциальности
                </div>
              </div>

              <div
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  padding: '32px 24px',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <div style={{ fontFamily: "var(--f-display), 'Jost'", fontSize: 36, color: 'var(--brass)', marginBottom: 8 }}>
                  24/7
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-2)' }}>
                  Экстренный выезд адвоката при обысках и задержаниях
                </div>
              </div>

              <div
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  padding: '32px 24px',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <div style={{ fontFamily: "var(--f-display), 'Jost'", fontSize: 36, color: 'var(--brass)', marginBottom: 8 }}>
                  ТОП
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-2)' }}>
                  Признание в ведущих юридических рейтингах РФ
                </div>
              </div>

              <div
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--line)',
                  padding: '32px 24px',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <div style={{ fontFamily: "var(--f-display), 'Jost'", fontSize: 36, color: 'var(--brass)', marginBottom: 8 }}>
                  15+
                </div>
                <div style={{ fontSize: 14, color: 'var(--text-2)' }}>
                  Лет совокупного опыта ключевых партнёров
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
