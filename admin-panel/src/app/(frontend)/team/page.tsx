import { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { TeamGrid } from '@/components/blocks/TeamGrid'
import { LeadForm } from '@/components/blocks/LeadForm'

export const metadata: Metadata = {
  title: 'Команда адвокатов и юристов',
  description:
    'Партнёры и адвокаты бюро ETLEGIS. Высокая квалификация, многолетний опыт и безупречная репутация.',
}

export default async function TeamPage() {
  let team: any[] = []

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'employees',
      limit: 100,
      sort: 'order',
      depth: 1,
    })
    team = result.docs
  } catch (e) {}

  return (
    <div style={{ padding: '40px 0 110px' }}>
      <div className="wrap">
        <Breadcrumbs items={[{ label: 'Команда' }]} />
        <TeamGrid items={team.length ? team : undefined} />
        <div style={{ marginTop: 96 }}>
          <LeadForm
            source="Страница команды"
            title="Записаться на консультацию к адвокату"
            subtitle="Мы подберём профильного специалиста под специфику и отрасль вашего спора."
          />
        </div>
      </div>
    </div>
  )
}
