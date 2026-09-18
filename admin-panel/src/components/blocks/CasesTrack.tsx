import Link from 'next/link'
import { SectionHead } from '../ui/SectionHead'
import { Card } from '../ui/Card'

interface CaseItem {
  id?: string | number
  title: string
  slug: string
  amountLabel?: string | null
  resultShort?: string | null
  year?: number | null
  duration?: string | null
  practice?: { title?: string } | any
}

const defaultCases: CaseItem[] = [
  {
    title: 'Победа в многолетней судебной тяжбе по защите активов холдинга',
    slug: 'pobeda-v-mnogoletnej-sudebnoj-tyazhbe',
    amountLabel: '1,2 млрд ₽',
    resultShort: 'Полный отказ в иске к доверителю, сохранение контроля над активами',
    year: 2023,
    duration: '2,5 года',
  },
  {
    title: 'Защита от привлечения к субсидиарной ответственности бенефициара',
    slug: 'zashchita-ot-privlecheniya-k-subsidiarnoj-otvetstvennosti',
    amountLabel: '480 млн ₽',
    resultShort: 'Суд исключил вину руководства в банкротстве предприятия',
    year: 2024,
    duration: '1,8 года',
  },
  {
    title: 'Оспаривание неправомерных доначислений по выездной налоговой проверке',
    slug: 'zashchita-po-osparivaniyu-sdelki',
    amountLabel: '310 млн ₽',
    resultShort: 'Снижение суммы претензий на 94% в досудебном порядке',
    year: 2023,
    duration: '9 месяцев',
  },
]

export function CasesTrack({ items }: { items?: CaseItem[] }) {
  const cases = items && items.length > 0 ? items : defaultCases

  return (
    <section
      className="cases-track"
      style={{
        padding: '110px 0',
        background: 'var(--surface-alt)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="wrap">
        <SectionHead
          eyebrow="Судебная практика"
          title="Реальный опыт и выигранные споры"
          description="Каждое дело — это глубокая стратегия и защита интересов доверителя до победного решения."
          action={{ label: 'Все кейсы', href: '/cases' }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          {cases.map((c, index) => (
            <Card key={c.id || index} href={`/cases/${c.slug}`} delay={index * 100}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: 16,
                }}
              >
                {c.amountLabel && (
                  <span
                    style={{
                      fontFamily: "var(--f-display), 'Jost', sans-serif",
                      fontSize: 28,
                      fontWeight: 400,
                      color: 'var(--brass)',
                    }}
                  >
                    {c.amountLabel}
                  </span>
                )}
                {c.year && (
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>
                    {c.year} г.
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: 20, marginBottom: 12 }}>{c.title}</h3>

              {c.resultShort && (
                <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 20 }}>
                  {c.resultShort}
                </p>
              )}

              <div className="cnt" style={{ marginTop: 'auto' }}>
                Читать разбор дела →
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
