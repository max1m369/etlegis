import { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { MediaList } from '@/components/blocks/MediaList'

export const metadata: Metadata = {
  title: 'Медиацентр и аналитика',
  description:
    'Публикации, вебинары, экспертные комментарии и аналитика адвокатов бюро ETLEGIS.',
}

export default async function MediaPage() {
  let posts: any[] = []

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'posts',
      limit: 100,
      sort: '-publishedAt',
      depth: 1,
    })
    posts = result.docs
  } catch (e) {}

  return (
    <div style={{ padding: '40px 0 110px' }}>
      <div className="wrap">
        <Breadcrumbs items={[{ label: 'Медиа' }]} />
        <MediaList items={posts.length ? posts : undefined} />
      </div>
    </div>
  )
}
