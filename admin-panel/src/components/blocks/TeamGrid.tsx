import Link from 'next/link'
import { SectionHead } from '../ui/SectionHead'
import { Card } from '../ui/Card'

interface EmployeeItem {
  id?: string | number
  name: string
  slug: string
  position: string
  isAdvocate?: boolean | null
  registryNo?: string | null
  photo?: { url?: string; alt?: string } | any
}

const defaultTeam: EmployeeItem[] = [
  {
    name: 'Бирюков Алексей',
    slug: 'birukov-aleksey',
    position: 'Управляющий партнёр, адвокат',
    isAdvocate: true,
    registryNo: '77/14890',
  },
  {
    name: 'Булатова Ксения Александровна',
    slug: 'bulatova-kseniya-aleksandrovna',
    position: 'Партнёр, руководитель налоговой практики',
    isAdvocate: true,
    registryNo: '77/15234',
  },
  {
    name: 'Дмитриев Сергей',
    slug: 'dmitriev-sergey',
    position: 'Руководитель практики банкротства',
    isAdvocate: true,
    registryNo: '77/16012',
  },
  {
    name: 'Морозова Анна',
    slug: 'morozova-anna',
    position: 'Ведущий юрист корпоративной практики',
    isAdvocate: false,
  },
]

export function TeamGrid({
  items,
  compact = false,
}: {
  items?: EmployeeItem[]
  compact?: boolean
}) {
  const team = items && items.length > 0 ? items : defaultTeam

  return (
    <section style={{ padding: '110px 0' }}>
      <div className="wrap">
        <SectionHead
          eyebrow="Команда"
          title="Адвокаты и ведущие эксперты бюро"
          description="Команда профессионалов с непререкаемым авторитетом в арбитражных и судах общей юрисдикции."
          action={compact ? { label: 'Вся команда', href: '/team' } : undefined}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {team.map((lawyer, index) => (
            <Card key={lawyer.id || index} href={`/team/${lawyer.slug}`} delay={index * 100}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 5',
                  background: 'var(--surface-alt)',
                  border: '1px solid var(--line)',
                  marginBottom: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {lawyer.photo?.url ? (
                  <img
                    src={lawyer.photo.url}
                    alt={lawyer.photo.alt || lawyer.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--text-2)"
                    strokeWidth="1"
                    style={{ opacity: 0.4 }}
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </div>

              <div
                style={{
                  fontSize: 12,
                  fontFamily: "var(--f-display), 'Jost'",
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--brass)',
                  marginBottom: 8,
                }}
              >
                {lawyer.isAdvocate ? `Адвокат ${lawyer.registryNo ? `• ${lawyer.registryNo}` : ''}` : 'Юрист'}
              </div>

              <h3 style={{ fontSize: 22, margin: '4px 0 8px' }}>{lawyer.name}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-2)' }}>{lawyer.position}</p>

              <div className="cnt">Профиль специалиста →</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
