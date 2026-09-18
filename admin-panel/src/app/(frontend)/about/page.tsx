import { Metadata } from 'next'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Brackets } from '@/components/motion/Brackets'
import { SectionHead } from '@/components/ui/SectionHead'
import { Stats } from '@/components/blocks/Stats'
import { LeadForm } from '@/components/blocks/LeadForm'

export const metadata: Metadata = {
  title: 'О бюро и принципы работы',
  description:
    'Адвокатское бюро города Москвы «ЭТЛЕГИС» — история создания, миссия, принципы конфиденциальности и защиты доверителей.',
}

export default function AboutPage() {
  return (
    <div style={{ padding: '40px 0 110px' }}>
      <div className="wrap">
        <Breadcrumbs items={[{ label: 'О бюро' }]} />

        <div style={{ maxWidth: 880, margin: '0 auto 80px' }}>
          <Brackets tone="brass">
            <div className="eyebrow">Адвокатское бюро</div>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 56px)', margin: '16px 0 24px' }}>
              Интеллектуальная защита бизнеса и руководителей
            </h1>
            <p className="lead" style={{ lineHeight: 1.6 }}>
              ETLEGIS основано в 2019 году как специализированное бюро по разрешению сложных конфликтов, защите от необоснованного уголовного преследования и сохранению ключевых активов предпринимателей.
            </p>
          </Brackets>
        </div>
      </div>

      <Stats />

      <div className="wrap" style={{ marginTop: 96 }}>
        <SectionHead
          eyebrow="Стандарты"
          title="Принципы, на которых строится доверие"
          description="Мы придерживаемся строгих стандартов российской и международной адвокатуры."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            marginBottom: 96,
          }}
        >
          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--line)',
              padding: 32,
              boxShadow: 'var(--shadow)',
            }}
          >
            <div style={{ color: 'var(--brass)', fontSize: 24, marginBottom: 12 }}>01</div>
            <h3 style={{ fontSize: 20, marginBottom: 12 }}>Абсолютная конфиденциальность</h3>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              Статус адвоката гарантирует тайну переписки, документов и любых сведений, переданных доверителем. Никакие третьи лица не имеют доступа к материалам.
            </p>
          </div>

          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--line)',
              padding: 32,
              boxShadow: 'var(--shadow)',
            }}
          >
            <div style={{ color: 'var(--brass)', fontSize: 24, marginBottom: 12 }}>02</div>
            <h3 style={{ fontSize: 20, marginBottom: 12 }}>Стратегическое планирование</h3>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              Мы не действуем реактивно. Каждый шаг в суде или на следствии является частью просчитанного общего плана победы на всех последующих инстанциях.
            </p>
          </div>

          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--line)',
              padding: 32,
              boxShadow: 'var(--shadow)',
            }}
          >
            <div style={{ color: 'var(--brass)', fontSize: 24, marginBottom: 12 }}>03</div>
            <h3 style={{ fontSize: 20, marginBottom: 12 }}>Личная ответственность партнёров</h3>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
              Каждое дело лично курируется управляющими партнёрами бюро, что гарантирует высочайший уровень юридической проработки и контроля.
            </p>
          </div>
        </div>

        <LeadForm
          source="Страница о бюро"
          title="Обсудить сотрудничество"
          subtitle="Запишитесь на встречу с управляющими партнёрами бюро в Москве или онлайн."
        />
      </div>
    </div>
  )
}
