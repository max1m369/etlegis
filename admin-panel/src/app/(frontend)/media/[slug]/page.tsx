import { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Brackets } from '@/components/motion/Brackets'
import { formatDate } from '@/lib/format'
import { LeadForm } from '@/components/blocks/LeadForm'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const item = result.docs[0]
    if (item) {
      return {
        title: item.seo?.title || item.title,
        description: item.seo?.description || item.excerpt,
      }
    }
  } catch (e) {}

  return {
    title: 'Публикация бюро',
  }
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { slug } = await params
  let post: any = null

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    post = result.docs[0]
  } catch (e) {}

  if (!post) {
    post = {
      title: 'Субсидиарная ответственность топ-менеджмента в 2024–2025 гг.: новые позиции ВС РФ',
      publishedAt: '2024-11-15',
      excerpt: 'Анализ ключевых трендов привлечения контролирующих лиц к ответственности при банкротстве юридических лиц.',
      content: 'Институт субсидиарной ответственности контролирующих должника лиц (КДЛ) в последние годы стал одним из наиболее агрессивных инструментов давления на бизнес. В обзоре судебной практики Верховного Суда РФ закреплены важнейшие позиции, позволяющие добросовестным руководителям эффективно выстраивать линию защиты.',
    }
  }

  return (
    <div style={{ padding: '40px 0 110px' }}>
      <div className="wrap">
        <Breadcrumbs
          items={[
            { label: 'Медиа', href: '/media' },
            { label: post.title },
          ]}
        />

        <div style={{ maxWidth: 880, margin: '0 auto 64px' }}>
          <Brackets tone="brass">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 13,
                color: 'var(--text-2)',
                marginBottom: 16,
              }}
            >
              <span className="eyebrow" style={{ margin: 0 }}>
                {post.type === 'speech' ? 'Выступление' : post.type === 'press' ? 'СМИ о нас' : 'Статья'}
              </span>
              <span>{formatDate(post.publishedAt)}</span>
            </div>

            <h1 style={{ fontSize: 'clamp(28px, 3.6vw, 44px)', margin: '12px 0 20px' }}>
              {post.title}
            </h1>

            <p className="lead" style={{ lineHeight: 1.6 }}>
              {post.excerpt}
            </p>
          </Brackets>
        </div>

        {/* Тело статьи */}
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto 96px',
            fontSize: 17,
            lineHeight: 1.8,
            color: 'var(--text)',
          }}
        >
          <p style={{ marginBottom: 24 }}>
            {post.content || post.excerpt}
          </p>
          <p style={{ marginBottom: 24, color: 'var(--text-2)' }}>
            Своевременное обращение к специализированным адвокатам позволяет предотвратить негативные сценарии, зафиксировать доказательства добросовестности и избежать блокировки личных счетов руководства.
          </p>
        </div>

        <LeadForm
          source={`Материал: ${post.title}`}
          title="Остались вопросы по теме публикации?"
          subtitle="Задайте вопрос авторам статьи — дежурный адвокат бюро свяжется с вами."
        />
      </div>
    </div>
  )
}
