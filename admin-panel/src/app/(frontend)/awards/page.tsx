import { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SectionHead } from '@/components/ui/SectionHead'
import { Card } from '@/components/ui/Card'
import { LeadForm } from '@/components/blocks/LeadForm'

export const metadata: Metadata = {
  title: 'Рейтинги и награды',
  description:
    'Признание адвокатского бюро ETLEGIS в национальных и отраслевых рейтингах юридических компаний России.',
}

const defaultAwards = [
  {
    publication: 'Право-300',
    year: 2024,
    category: 'Уголовное право (защита бизнеса)',
    band: 'Group 1 (Федеральный рейтинг)',
  },
  {
    publication: 'Коммерсантъ',
    year: 2024,
    category: 'Банкротство и реструктуризация',
    band: 'Tier 1 (Ведущие практики)',
  },
  {
    publication: 'Право-300',
    year: 2023,
    category: 'Налоговое консультирование и споры',
    band: 'Group 2',
  },
  {
    publication: 'РААС (Российская ассоциация арбитражных споров)',
    year: 2023,
    category: 'Корпоративные споры высшей сложности',
    band: 'Лидер отрасли',
  },
]

export default async function AwardsPage() {
  let awards = defaultAwards

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'awards',
      limit: 100,
      sort: '-year',
    })
    if (result.docs.length > 0) {
      awards = result.docs.map((d: any) => ({
        publication: d.publication,
        year: d.year,
        category: d.category,
        band: d.band,
      }))
    }
  } catch (e) {}

  return (
    <div style={{ padding: '40px 0 110px' }}>
      <div className="wrap">
        <Breadcrumbs items={[{ label: 'Рейтинги и награды' }]} />

        <SectionHead
          eyebrow="Признание & Экспертиза"
          title="Позиции в ведущих рейтингах"
          description="Результаты нашей работы и стабильные победы в судах регулярно отмечаются профессиональным сообществом."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            marginBottom: 96,
          }}
        >
          {awards.map((a, index) => (
            <Card key={index} delay={index * 80}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                  color: 'var(--brass)',
                  fontFamily: "var(--f-display), 'Jost'",
                  fontSize: 24,
                }}
              >
                <span>{a.year}</span>
                <span style={{ fontSize: 14, color: 'var(--text-2)', textTransform: 'uppercase' }}>
                  {a.publication}
                </span>
              </div>
              <h3 style={{ fontSize: 20, marginBottom: 12 }}>{a.category}</h3>
              <p style={{ fontSize: 14, color: 'var(--brass)', fontWeight: 500 }}>
                {a.band}
              </p>
            </Card>
          ))}
        </div>

        <LeadForm
          source="Страница наград и рейтингов"
          title="Доверьте защиту лидерам рейтингов"
          subtitle="Запишитесь на первичную консультацию к профильным адвокатам."
        />
      </div>
    </div>
  )
}
