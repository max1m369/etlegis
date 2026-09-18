import { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Brackets } from '@/components/motion/Brackets'
import { LeadForm } from '@/components/blocks/LeadForm'

interface TeamPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: TeamPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'employees',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const item = result.docs[0]
    if (item) {
      return {
        title: `${item.name} — ${item.position}`,
        description: `Профиль адвоката ${item.name}. Специализация, судебная практика и контакты в адвокатском бюро ETLEGIS.`,
      }
    }
  } catch (e) {}

  return {
    title: 'Адвокат бюро ETLEGIS',
  }
}

export default async function TeamMemberPage({ params }: TeamPageProps) {
  const { slug } = await params
  let member: any = null

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'employees',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    member = result.docs[0]
  } catch (e) {}

  if (!member) {
    member = {
      name: 'Бирюков Алексей',
      position: 'Управляющий партнёр, адвокат',
      isAdvocate: true,
      registryNo: '77/14890',
      experienceSince: 2008,
      education: [
        { item: 'Московская государственная юридическая академия имени О.Е. Кутафина (МГЮА), диплом с отличием' },
        { item: 'Аспирантура кафедры уголовно-процессуального права МГЮА' },
      ],
      specialization: [
        { item: 'Защита по сложным уголовным делам экономической и налоговой направленности' },
        { item: 'Защита от субсидиарной ответственности бенефициаров и топ-менеджеров' },
        { item: 'Корпоративные конфликты и противодействие рейдерским захватам' },
      ],
      contacts: {
        email: 'birukov@etlegis.ru',
        phone: '+7 (495) 105-91-15',
      },
    }
  }

  return (
    <div style={{ padding: '40px 0 110px' }}>
      <div className="wrap">
        <Breadcrumbs
          items={[
            { label: 'Команда', href: '/team' },
            { label: member.name },
          ]}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 56,
            marginBottom: 80,
            alignItems: 'start',
          }}
        >
          <div
            style={{
              aspectRatio: '4 / 5',
              background: 'var(--surface-alt)',
              border: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {member.photo?.url ? (
              <img
                src={member.photo.url}
                alt={member.photo.alt || member.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-2)"
                strokeWidth="1"
                style={{ opacity: 0.3 }}
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </div>

          <div>
            <Brackets tone="brass">
              <div
                style={{
                  fontSize: 13,
                  fontFamily: "var(--f-display), 'Jost'",
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--brass)',
                  marginBottom: 8,
                }}
              >
                {member.isAdvocate
                  ? `Адвокат ${member.registryNo ? `• Реестровый № ${member.registryNo}` : ''}`
                  : 'Юрист'}
              </div>

              <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: '8px 0 12px' }}>
                {member.name}
              </h1>
              <p style={{ fontSize: 18, color: 'var(--text-2)', marginBottom: 24 }}>
                {member.position}
              </p>

              {member.experienceSince && (
                <div style={{ fontSize: 15, color: 'var(--text-2)', marginBottom: 24 }}>
                  В юридической практике с {member.experienceSince} года
                </div>
              )}

              {member.contacts && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    paddingTop: 16,
                    borderTop: '1px solid var(--line)',
                    fontSize: 15,
                  }}
                >
                  {member.contacts.phone && (
                    <div>
                      Тел:{' '}
                      <a href={`tel:${member.contacts.phone}`} style={{ color: 'var(--text)', textDecoration: 'none' }}>
                        {member.contacts.phone}
                      </a>
                    </div>
                  )}
                  {member.contacts.email && (
                    <div>
                      Email:{' '}
                      <a href={`mailto:${member.contacts.email}`} style={{ color: 'var(--text)', textDecoration: 'none' }}>
                        {member.contacts.email}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </Brackets>
          </div>
        </div>

        {/* Образование и специализация */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 40,
            marginBottom: 96,
          }}
        >
          {member.specialization && member.specialization.length > 0 && (
            <div
              style={{
                background: 'var(--card)',
                border: '1px solid var(--line)',
                padding: 36,
                boxShadow: 'var(--shadow)',
              }}
            >
              <h3 style={{ fontSize: 22, marginBottom: 20 }}>Специализация</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {member.specialization.map((s: any, idx: number) => (
                  <li key={idx} style={{ display: 'flex', gap: 12, fontSize: 15, color: 'var(--text-2)' }}>
                    <span style={{ color: 'var(--brass)' }}>✦</span>
                    <span>{s.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {member.education && member.education.length > 0 && (
            <div
              style={{
                background: 'var(--card)',
                border: '1px solid var(--line)',
                padding: 36,
                boxShadow: 'var(--shadow)',
              }}
            >
              <h3 style={{ fontSize: 22, marginBottom: 20 }}>Образование</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {member.education.map((e: any, idx: number) => (
                  <li key={idx} style={{ display: 'flex', gap: 12, fontSize: 15, color: 'var(--text-2)' }}>
                    <span style={{ color: 'var(--brass)' }}>▪</span>
                    <span>{e.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <LeadForm
          source={`Сотрудник: ${member.name}`}
          title={`Записаться на консультацию к ${member.name}`}
          subtitle="Мы согласуем удобное время для онлайн-звонка или очной встречи в офисе бюро."
        />
      </div>
    </div>
  )
}
