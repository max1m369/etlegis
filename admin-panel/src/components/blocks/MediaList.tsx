import Link from 'next/link'
import { SectionHead } from '../ui/SectionHead'
import { Card } from '../ui/Card'
import { formatDate } from '@/lib/format'

interface PostItem {
  id?: string | number
  title: string
  slug: string
  type: string
  publishedAt: string
  excerpt: string
}

const defaultPosts: PostItem[] = [
  {
    title: 'Субсидиарная ответственность топ-менеджмента в 2024–2025 гг.: новые позиции ВС РФ',
    slug: 'subsidiarnaya-otvetstvennost-novye-pozicii-vs-rf',
    type: 'article',
    publishedAt: '2024-11-15',
    excerpt: 'Анализ ключевых трендов привлечения контролирующих лиц к ответственности при банкротстве юридических лиц.',
  },
  {
    title: 'Вебинар: Стратегия поведения собственника и главного бухгалтера при выездной налоговой проверке',
    slug: 'vebinar-strategiya-povedeniya-pri-nalogovoj-proverke',
    type: 'speech',
    publishedAt: '2024-10-20',
    excerpt: 'Разбор типичных ошибок, инструкция для персонала и защита электронных носителей информации.',
  },
  {
    title: 'Комментарий для РБК: Защита бизнеса от рейдерских захватов через уголовное давление',
    slug: 'kommentarij-rbk-zashchita-biznesa',
    type: 'press',
    publishedAt: '2024-09-05',
    excerpt: 'Экспертная колонка управляющего партнёра Алексея Бирюкова о правовых механизмах пресечения недружественных поглощений.',
  },
]

const typeLabels: Record<string, string> = {
  article: 'Статья',
  speech: 'Выступление / Вебинар',
  press: 'СМИ о нас',
}

export function MediaList({
  items,
  compact = false,
}: {
  items?: PostItem[]
  compact?: boolean
}) {
  const posts = items && items.length > 0 ? items : defaultPosts

  return (
    <section
      style={{
        padding: '110px 0',
        background: 'var(--surface-alt)',
        borderTop: '1px solid var(--line)',
      }}
    >
      <div className="wrap">
        <SectionHead
          eyebrow="Медиа & Экспертиза"
          title="Публикации, вебинары и комментарии в СМИ"
          description="Делимся практическим опытом, анализируем изменения в законодательстве и судебной практике."
          action={compact ? { label: 'Все материалы', href: '/media' } : undefined}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          {posts.map((post, index) => (
            <Card key={post.id || index} href={`/media/${post.slug}`} delay={index * 100}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16,
                  fontSize: 12,
                  fontFamily: "var(--f-display), 'Jost'",
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--brass)',
                }}
              >
                <span>{typeLabels[post.type] || 'Материал'}</span>
                <span style={{ color: 'var(--text-2)', textTransform: 'none' }}>
                  {formatDate(post.publishedAt)}
                </span>
              </div>

              <h3 style={{ fontSize: 20, marginBottom: 12 }}>{post.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 20 }}>
                {post.excerpt}
              </p>

              <div className="cnt">Читать публикацию →</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
