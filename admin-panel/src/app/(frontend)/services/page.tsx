import { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { SectionHead } from '@/components/ui/SectionHead'
import { Card } from '@/components/ui/Card'
import { LeadForm } from '@/components/blocks/LeadForm'

export const metadata: Metadata = {
  title: 'Услуги и юридические практики',
  description:
    'Полный спектр услуг адвокатского бюро ETLEGIS по уголовно-правовой защите бизнеса, налоговым спорам, банкротству и арбитражу.',
}

const defaultServices = [
  {
    title: 'Защита по экономическим и должностным преступлениям',
    slug: 'soprovozhdenie-ugolovnyh-del-v-sfere-ekonomiki',
    practice: 'Уголовно-правовая защита',
    lead: 'Защита собственников и директоров по ст. 159, 160, 199, 201, 204, 290, 291 УК РФ.',
  },
  {
    title: 'Сопровождение выездных налоговых проверок',
    slug: 'soprovozhdenie-vyezdnoj-nalogovoj-proverki',
    practice: 'Налоги и комплаенс',
    lead: 'Предотвращение необоснованных доначислений, подготовка возражений и представление интересов в УФНС.',
  },
  {
    title: 'Защита от субсидиарной ответственности в банкротстве',
    slug: 'privlechenie-k-subsidiarnoj-otvetstvennosti',
    practice: 'Банкротство',
    lead: 'Комплексная защита бенефициаров, топ-менеджеров и номинальных директоров от личных долгов компании.',
  },
  {
    title: 'Корпоративные споры и защита активов',
    slug: 'arbitrazh-korporativnye-spory',
    practice: 'Арбитраж',
    lead: 'Разрешение конфликтов учредителей, оспаривание решений органов управления и защита от недружественных поглощений.',
  },
  {
    title: 'Оспаривание сделок должника в банкротстве',
    slug: 'osparivanie-sdelok-dolzhnika-v-ramkah-dela-o-bankrotstve',
    practice: 'Банкротство',
    lead: 'Защита добросовестных покупателей или возврат активов в конкурсную массу.',
  },
  {
    title: 'Защита интеллектуальной собственности бизнеса',
    slug: 'upravlenie-intellektualnoj-sobstvennostyu',
    practice: 'Интеллектуальная собственность',
    lead: 'Споры о товарных знаках, авторских правах, патентах и коммерческой тайне в суде по интеллектуальным правам.',
  },
]

export default async function ServicesPage() {
  let services = defaultServices

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'services',
      limit: 100,
      sort: 'order',
      depth: 1,
    })
    if (result.docs.length > 0) {
      services = result.docs.map((d: any) => ({
        title: d.title,
        slug: d.slug,
        practice: typeof d.practice === 'object' ? d.practice?.title : 'Практика',
        lead: d.lead,
      }))
    }
  } catch (e) {
    // Fallback to default
  }

  return (
    <div style={{ padding: '40px 0 110px' }}>
      <div className="wrap">
        <Breadcrumbs items={[{ label: 'Услуги' }]} />

        <SectionHead
          eyebrow="Практики & Услуги"
          title="Юридическая защита бизнеса на высшем уровне"
          description="Комплексное сопровождение по ключевым направлениям права с гарантией конфиденциальности."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 24,
            marginBottom: 96,
          }}
        >
          {services.map((s, index) => (
            <Card key={index} href={`/services/${s.slug}`} delay={index * 80}>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "var(--f-display), 'Jost'",
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--brass)',
                  marginBottom: 12,
                }}
              >
                {s.practice}
              </div>
              <h3 style={{ fontSize: 22, marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 24, lineHeight: 1.5 }}>
                {s.lead}
              </p>
              <div className="cnt">Подробнее об услуге →</div>
            </Card>
          ))}
        </div>

        <LeadForm
          source="Страница услуг"
          title="Нужна консультация по конкретной услуге?"
          subtitle="Оставьте заявку, и профильный адвокат предоставит предварительную юридическую оценку."
        />
      </div>
    </div>
  )
}
