import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://etlegis.ru'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/admin', '/api/', '/studio/*'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
