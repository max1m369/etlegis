import { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SectionHead } from '@/components/ui/SectionHead'
import { Card } from '@/components/ui/Card'
import { LeadForm } from '@/components/blocks/LeadForm'

export const metadata: Metadata = {
  title: 'Судебная практика и выигранные дела',
  description:
    'Примеры побед адвокатов ETLEGIS в уголовных, налоговых, банкротных и арбитражных спорах.',
}

const defaultCases = [
  {
    title: 'Победа в многолетней судебной тяжбе по защите активов холдинга',
    slug: 'pobeda-v-mnogoletnej-sudebnoj-tyazhbe',
    amountLabel: '1,2 млрд ₽',
    resultShort: 'Полный отказ в иске к доверителю, сохранение контроля над активами',
    year: 2023,
    role: 'Защита',
  },
  {
    title: 'Защита от привлечения к субсидиарной ответственности бенефициара',
    slug: 'zashchita-ot-privlecheniya-k-subsidiarnoj-otvetstvennosti',
    amountLabel: '480 млн ₽',
    resultShort: 'Суд исключил вину руководства в банкротстве предприятия',
    year: 2024,
    role: 'Защита',
  },
  {
    title: 'Оспаривание неправомерных доначислений по выездной налоговой проверке',
    slug: 'zashchita-po-osparivaniyu-sdelki',
    amountLabel: '310 млн ₽',
    resultShort: 'Снижение суммы претензий на 94% в досудебном порядке',
    year: 2023,
    role: 'Защита',
  },
  {
    title: 'Привлечение контролирующего должника лица к субсидиарной ответственности',
    slug: 'privlechenie-kontroliruyushchego-dolzhnika',
    amountLabel: '175 млн ₽',
    resultShort: 'Взыскание задолженности в пользу кредитора в полном объёме',
    year: 2024,
    role: 'Кредитор',
  },
]

export default async function CasesPage() {
  let cases = defaultCases

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'cases',
      limit: 100,
      sort: '-year',
      depth: 1,
    })
    if (result.docs.length > 0) {
      cases = result.docs.map((d: any) => ({
        title: d.title,
        slug: d.slug,
        amountLabel: d.amountLabel,
        resultShort: d.resultShort,
        year: d.year,
        role: d.role,
      }))
    }
  } catch (e) {}

  return (
    <div style={{ padding: '40px 0 110px' }}>
      <div className="wrap">
        <Breadcrumbs items={[{ label: 'Кейсы' }]} />

        <SectionHead
          eyebrow="Практика & Прецеденты"
          title="Судебная практика бюро"
          description="Факты, цифры и решения судов. Все кейсы публикуются со строгим соблюдением адвокатской тайны и обезличиванием персональных данных."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 24,
            marginBottom: 96,
          }}
        >
          {cases.map((c, index) => (
            <Card key={index} href={`/cases/${c.slug}`} delay={index * 80}>
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
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{c.year} г.</span>
                )}
              </div>

              <h3 style={{ fontSize: 20, marginBottom: 12 }}>{c.title}</h3>
              {c.resultShort && (
                <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 20 }}>
                  {c.resultShort}
                </p>
              )}
              <div className="cnt">Подробности дела →</div>
            </Card>
          ))}
        </div>

        <LeadForm
          source="Страница кейсов"
          title="У вас похожая правовая ситуация?"
          subtitle="Адвокаты бюро проанализируют риски и разработают индивидуальную стратегию защиты."
        />
      </div>
    </div>
  )
}
