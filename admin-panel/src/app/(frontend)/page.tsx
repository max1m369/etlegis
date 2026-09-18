import { getPayload } from '@/lib/payload'
import { Hero } from '@/components/blocks/Hero'
import { Stats } from '@/components/blocks/Stats'
import { Practices } from '@/components/blocks/Practices'
import { CasesTrack } from '@/components/blocks/CasesTrack'
import { Process } from '@/components/blocks/Process'
import { AboutTeaser } from '@/components/blocks/AboutTeaser'
import { TeamGrid } from '@/components/blocks/TeamGrid'
import { MediaList } from '@/components/blocks/MediaList'
import { Diagnostics } from '@/components/blocks/Diagnostics'
import { LeadForm } from '@/components/blocks/LeadForm'

export const revalidate = 60 // ISR revalidation

export default async function HomePage() {
  let practicesData: any[] = []
  let casesData: any[] = []
  let teamData: any[] = []
  let postsData: any[] = []

  try {
    const payload = await getPayload()
    const [practices, cases, team, posts] = await Promise.all([
      payload
        .find({
          collection: 'practices',
          where: { showOnHome: { equals: true } },
          sort: 'order',
          limit: 4,
        })
        .catch(() => ({ docs: [] })),
      payload
        .find({
          collection: 'cases',
          where: { showOnHome: { equals: true } },
          limit: 6,
          depth: 1,
        })
        .catch(() => ({ docs: [] })),
      payload
        .find({
          collection: 'employees',
          where: { showOnHome: { equals: true } },
          sort: 'order',
          limit: 4,
          depth: 1,
        })
        .catch(() => ({ docs: [] })),
      payload
        .find({
          collection: 'posts',
          limit: 3,
          sort: '-publishedAt',
        })
        .catch(() => ({ docs: [] })),
    ])

    practicesData = practices.docs
    casesData = cases.docs
    teamData = team.docs
    postsData = posts.docs
  } catch (e) {
    // If DB is offline or empty during static generation/dev
  }

  return (
    <>
      <Hero />
      <Stats />
      <Practices items={practicesData.length ? practicesData : undefined} />
      <CasesTrack items={casesData.length ? casesData : undefined} />
      <Process />
      <AboutTeaser />
      <TeamGrid items={teamData.length ? teamData : undefined} compact />
      <MediaList items={postsData.length ? postsData : undefined} compact />
      <Diagnostics />
      <section style={{ padding: '110px 0', background: 'var(--surface-alt)', borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <LeadForm
            source="Главная страница — нижняя форма"
            title="Запись на первичную консультацию"
            subtitle="Обсудим детали дела, оценим риски и предложим план действий."
          />
        </div>
      </section>
    </>
  )
}
