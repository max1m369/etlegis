import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Brackets } from '@/components/motion/Brackets'
import { LeadForm } from '@/components/blocks/LeadForm'

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const item = result.docs[0]
    if (item) {
      return {
        title: item.seo?.title || item.title,
        description: item.seo?.description || item.lead,
      }
    }
  } catch (e) {}

  return {
    title: 'Юридическая услуга',
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  let service: any = null

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    service = result.docs[0]
  } catch (e) {}

  // Fallback data if service not yet created in Payload
  if (!service) {
    service = {
      title: 'Уголовно-правовая защита бизнеса',
      lead: 'Защита собственников и руководителей компании от необоснованного уголовного преследования по экономическим и коррупционным составам.',
      when: [
        { item: 'Проведение оперативно-розыскных мероприятий (ОРД), обследование помещений, выемка серверов' },
        { item: 'Вызов на допрос или опрос в ОБЭП, Следственный комитет, МВД' },
        { item: 'Возбуждение уголовного дела в отношении генерального директора или главного бухгалтера' },
        { item: 'Арест счетов компании, изъятие первичных финансовых документов' },
      ],
      steps: [
        { title: 'Экстренное вступление в дело', text: 'Немедленный выезд адвоката на место проведения следственных действий, контроль за законностью протоколов.' },
        { title: 'Формирование позиции', text: 'Анализ хозяйственных договоров, подготовка контр-экспертиз, выявление процессуальных нарушений следствия.' },
        { title: 'Защита в суде', text: 'Участие в заседаниях по избранию меры пресечения, обжалование постановлений, защита при рассмотрении дела по существу.' },
      ],
      faq: [
        { q: 'Что делать, если в офис пришли с обыском?', a: 'Немедленно свяжитесь с адвокатом, потребуйте предъявления постановления суда или следователя, не давайте показаний без присутствия защитника (ст. 51 Конституции РФ).' },
        { q: 'Как адвокатская тайна защищает документы?', a: 'Все материалы, переданные адвокату, защищены законом об адвокатской деятельности и не могут быть изъяты или использованы против вас.' },
      ],
    }
  }

  return (
    <div style={{ padding: '40px 0 110px' }}>
      <div className="wrap">
        <Breadcrumbs
          items={[
            { label: 'Услуги', href: '/services' },
            { label: service.title },
          ]}
        />

        <div style={{ maxWidth: 880, margin: '0 auto 80px' }}>
          <Brackets tone="brass">
            <div className="eyebrow">Юридическая услуга</div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 54px)', margin: '16px 0 24px' }}>
              {service.title}
            </h1>
            <p className="lead" style={{ lineHeight: 1.6 }}>
              {service.lead}
            </p>
          </Brackets>
        </div>

        {/* Когда обращаться */}
        {service.when && service.when.length > 0 && (
          <section style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: 32, marginBottom: 32, borderBottom: '1px solid var(--line)', paddingBottom: 16 }}>
              В каких ситуациях необходима помощь
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {service.when.map((w: any, i: number) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--line)',
                    padding: 24,
                    boxShadow: 'var(--shadow)',
                  }}
                >
                  <div style={{ color: 'var(--brass)', fontSize: 18, marginBottom: 8 }}>✦</div>
                  <div style={{ fontSize: 15, lineHeight: 1.5 }}>{w.item}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Этапы */}
        {service.steps && service.steps.length > 0 && (
          <section style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: 32, marginBottom: 32, borderBottom: '1px solid var(--line)', paddingBottom: 16 }}>
              Этапы нашей работы
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {service.steps.map((s: any, i: number) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--surface-alt)',
                    border: '1px solid var(--line)',
                    padding: '28px 32px',
                    display: 'flex',
                    gap: 24,
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--f-display), 'Jost'",
                      fontSize: 28,
                      color: 'var(--brass)',
                      fontWeight: 300,
                      minWidth: 40,
                    }}
                  >
                    0{i + 1}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 20, marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.6 }}>{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {service.faq && service.faq.length > 0 && (
          <section style={{ marginBottom: 96 }}>
            <h2 style={{ fontSize: 32, marginBottom: 32, borderBottom: '1px solid var(--line)', paddingBottom: 16 }}>
              Вопросы и ответы
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {service.faq.map((f: any, i: number) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--line)',
                    padding: 24,
                  }}
                >
                  <h4 style={{ fontSize: 18, marginBottom: 10, color: 'var(--text)' }}>{f.q}</h4>
                  <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.6 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <LeadForm
          source={`Услуга: ${service.title}`}
          title="Заказать сопровождение по услуге"
          subtitle="Наш старший юрист оперативно изучит вашу задачу и предложит дорожную карту защиты."
        />
      </div>
    </div>
  )
}
