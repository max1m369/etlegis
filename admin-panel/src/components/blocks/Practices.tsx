import Link from 'next/link'
import { SectionHead } from '../ui/SectionHead'
import { Card } from '../ui/Card'

interface PracticeItem {
  id?: string | number
  title: string
  slug?: string
  short?: string | null
  icon?: string | null
  order?: number
}

const defaultPractices: PracticeItem[] = [
  {
    title: 'Уголовно-правовая защита бизнеса',
    slug: 'ugolovno-pravovaya-zashchita',
    short: 'Экономические и коррупционные составы. Защита собственников и топ-менеджмента на всех стадиях — от доследственной проверки до кассации.',
    icon: '<rect x="4" y="8" width="16" height="20"/><rect x="12" y="4" width="16" height="20"/>',
  },
  {
    title: 'Налоги и налоговый комплаенс',
    slug: 'nalogi-i-komplaens',
    short: 'Налоговый комплаенс до начала проверки и сопровождение выездных проверок. Снижаем доначисления и личные риски руководителя.',
    icon: '<path d="M6 26V6h20v20z"/><path d="M11 16h10M11 21h10M11 11h10"/>',
  },
  {
    title: 'Банкротство и субсидиарная ответственность',
    slug: 'bankrotstvo-i-subsidiarnaya-otvetstvennost',
    short: 'Инициирование и защита в делах о несостоятельности, оспаривание сделок должника, привлечение и защита КДЛ.',
    icon: '<path d="M4 26h24M8 26V14M16 26V8M24 26V18"/>',
  },
  {
    title: 'Арбитраж и корпоративные споры',
    slug: 'arbitrazh-i-korporativnye-spory',
    short: 'Хозяйственные споры субъектов, подряд, корпоративные конфликты, интеллектуальная собственность.',
    icon: '<path d="M16 4v24M6 12l10-8 10 8"/><rect x="10" y="18" width="12" height="10"/>',
  },
]

export function Practices({ items }: { items?: PracticeItem[] }) {
  const practices = items && items.length > 0 ? items : defaultPractices

  return (
    <section className="practices" style={{ padding: '110px 0' }}>
      <div className="wrap">
        <SectionHead
          eyebrow="Направления"
          title="Ведём дела, где на кону свобода, активы и репутация"
          action={{ label: 'Все услуги', href: '/services' }}
        />

        <div
          className="cards"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          {practices.map((practice, index) => {
            const num = `[ 0${index + 1} ]`
            const href = practice.slug ? `/services?practice=${practice.slug}` : '/services'

            return (
              <Card key={practice.id || index} href={href} delay={index * 100}>
                {practice.icon ? (
                  <svg
                    className="ic"
                    viewBox="0 0 32 32"
                    dangerouslySetInnerHTML={{ __html: practice.icon }}
                  />
                ) : (
                  <svg className="ic" viewBox="0 0 32 32">
                    <rect x="4" y="8" width="16" height="20" />
                    <rect x="12" y="4" width="16" height="20" />
                  </svg>
                )}
                <div className="num">{num}</div>
                <h3>{practice.title}</h3>
                <p>{practice.short}</p>
                <div className="cnt">Подробнее о практике →</div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
