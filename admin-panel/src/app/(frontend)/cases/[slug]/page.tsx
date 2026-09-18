import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from '@/lib/payload'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Brackets } from '@/components/motion/Brackets'
import { LeadForm } from '@/components/blocks/LeadForm'
import { formatMoney } from '@/lib/format'

interface CasePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'cases',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const item = result.docs[0]
    if (item) {
      return {
        title: item.seo?.title || item.title,
        description: item.seo?.description || item.result,
      }
    }
  } catch (e) {}

  return {
    title: 'Судебный кейс',
  }
}

export default async function CaseDetailPage({ params }: CasePageProps) {
  const { slug } = await params
  let caseDoc: any = null

  try {
    const dm = await draftMode()
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'cases',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
      draft: dm.isEnabled,
    })
    caseDoc = result.docs[0]
  } catch (e) {}

  if (!caseDoc) {
    caseDoc = {
      title: 'Победа в многолетней судебной тяжбе по защите активов холдинга',
      amount: 1200000000,
      duration: '2,5 года',
      year: 2023,
      role: 'defence',
      instances: 'АС города Москвы → 9 ААС → АС МО',
      result: '<p>Полный отказ в удовлетворении необоснованных финансовых претензий, снятие всех обременений с активов.</p>',
      task: '<p>Оппоненты инициировали серию взаимосвязанных исков с целью парализовать операционную деятельность крупного производственного холдинга и добиться банкротства.</p>',
      actions: '<p>Команда адвокатов провела детальный аудит более 400 первичных хозяйственных документов, подготовила заключение независимой финансово-экономической экспертизы и доказала недобросовестность оппонентов.</p>',
    }
  }

  const roleLabel =
    caseDoc.role === 'defence' ? 'Защита' : caseDoc.role === 'plaintiff' ? 'Истец' : caseDoc.role === 'defendant' ? 'Ответчик' : caseDoc.role

  return (
    <div style={{ padding: '40px 0 110px' }}>
      <div className="wrap">
        <Breadcrumbs
          items={[
            { label: 'Кейсы', href: '/cases' },
            { label: caseDoc.title },
          ]}
        />

        <div style={{ maxWidth: 880, margin: '0 auto 64px' }}>
          <Brackets tone="brass">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                flexWrap: 'wrap',
                gap: 16,
              }}
            >
              <div className="eyebrow">Судебная практика</div>
              {caseDoc.amount && (
                <div
                  style={{
                    fontFamily: "var(--f-display), 'Jost'",
                    fontSize: 32,
                    color: 'var(--brass)',
                  }}
                >
                  {formatMoney(caseDoc.amount)}
                </div>
              )}
            </div>

            <h1 style={{ fontSize: 'clamp(28px, 3.6vw, 48px)', margin: '16px 0 24px' }}>
              {caseDoc.title}
            </h1>

            <div
              style={{
                display: 'flex',
                gap: 32,
                flexWrap: 'wrap',
                fontSize: 14,
                color: 'var(--text-2)',
                borderTop: '1px solid var(--line)',
                paddingTop: 16,
              }}
            >
              {caseDoc.duration && <div>Срок: <strong style={{ color: 'var(--text)' }}>{caseDoc.duration}</strong></div>}
              {caseDoc.year && <div>Год: <strong style={{ color: 'var(--text)' }}>{caseDoc.year}</strong></div>}
              {roleLabel && <div>Роль: <strong style={{ color: 'var(--text)' }}>{roleLabel}</strong></div>}
              {caseDoc.instances && <div>Инстанции: <strong style={{ color: 'var(--text)' }}>{caseDoc.instances}</strong></div>}
            </div>
          </Brackets>
        </div>

        {/* Результат (Метафора «Просвет») */}
        {caseDoc.result && (
          <div
            style={{
              maxWidth: 880,
              margin: '0 auto 64px',
              background: 'var(--card)',
              border: '1px solid var(--brass)',
              padding: 36,
              boxShadow: 'var(--shadow)',
            }}
          >
            <div
              style={{
                fontFamily: "var(--f-display), 'Jost'",
                fontSize: 22,
                color: 'var(--brass)',
                marginBottom: 12,
              }}
            >
              Результат дела
            </div>
            <div
              style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text)' }}
              dangerouslySetInnerHTML={{ __html: caseDoc.result }}
            />
          </div>
        )}

        {/* Фабула, задача и работа */}
        <div style={{ maxWidth: 880, margin: '0 auto 96px', display: 'grid', gap: 40 }}>
          {caseDoc.synopsis && (
            <div>
              <h3 style={{ fontSize: 24, marginBottom: 12 }}>Фабула спора</h3>
              <div
                style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.65 }}
                dangerouslySetInnerHTML={{ __html: caseDoc.synopsis }}
              />
            </div>
          )}

          {caseDoc.task && (
            <div>
              <h3 style={{ fontSize: 24, marginBottom: 12 }}>Задача доверителя</h3>
              <div
                style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.65 }}
                dangerouslySetInnerHTML={{ __html: caseDoc.task }}
              />
            </div>
          )}

          {caseDoc.actions && (
            <div>
              <h3 style={{ fontSize: 24, marginBottom: 12 }}>Что сделали адвокаты ETLEGIS</h3>
              <div
                style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.65 }}
                dangerouslySetInnerHTML={{ __html: caseDoc.actions }}
              />
            </div>
          )}
        </div>

        <LeadForm
          source={`Кейс: ${caseDoc.title}`}
          title="Нужна победа в суде?"
          subtitle="Запишитесь на первичный конфиденциальный разбор вашего дела."
        />
      </div>
    </div>
  )
}
