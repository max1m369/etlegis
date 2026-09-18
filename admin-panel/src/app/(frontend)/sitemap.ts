import { MetadataRoute } from 'next'
import { getPayload } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://etlegis.ru'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/cases`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/awards`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/media`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${siteUrl}/contacts`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/diagnostics`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  let dynamicRoutes: MetadataRoute.Sitemap = []

  try {
    const payload = await getPayload()
    const [services, cases, team, posts] = await Promise.all([
      payload.find({ collection: 'services', limit: 100 }).catch(() => ({ docs: [] })),
      payload.find({ collection: 'cases', limit: 100 }).catch(() => ({ docs: [] })),
      payload.find({ collection: 'employees', limit: 100 }).catch(() => ({ docs: [] })),
      payload.find({ collection: 'posts', limit: 100 }).catch(() => ({ docs: [] })),
    ])

    const serviceUrls = services.docs.map((doc: any) => ({
      url: `${siteUrl}/services/${doc.slug}`,
      lastModified: new Date(doc.updatedAt || doc.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    const caseUrls = cases.docs.map((doc: any) => ({
      url: `${siteUrl}/cases/${doc.slug}`,
      lastModified: new Date(doc.updatedAt || doc.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    const teamUrls = team.docs.map((doc: any) => ({
      url: `${siteUrl}/team/${doc.slug}`,
      lastModified: new Date(doc.updatedAt || doc.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    const postUrls = posts.docs.map((doc: any) => ({
      url: `${siteUrl}/media/${doc.slug}`,
      lastModified: new Date(doc.updatedAt || doc.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    dynamicRoutes = [...serviceUrls, ...caseUrls, ...teamUrls, ...postUrls]
  } catch (e) {}

  return [...staticRoutes, ...dynamicRoutes]
}
