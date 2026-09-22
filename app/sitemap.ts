import { MetadataRoute } from 'next';
import { PRACTICES_DATA, ARTICLES_DATA, LAWYERS_DATA } from '@/lib/data/etlegis-data';
import { ALL_CATALOG_CASES } from '@/lib/data/queries';

const BASE_URL = 'https://etlegis.ru';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Статические страницы
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: currentDate, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/cases`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/team`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/practices`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.9 },
  ];

  // Динамические страницы практик
  const practicePages: MetadataRoute.Sitemap = PRACTICES_DATA.map((p) => ({
    url: `${BASE_URL}/practices/${p.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // Динамические страницы кейсов
  const casePages: MetadataRoute.Sitemap = ALL_CATALOG_CASES.map((c) => ({
    url: `${BASE_URL}/cases/${c.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Динамические страницы юристов
  const lawyerPages: MetadataRoute.Sitemap = LAWYERS_DATA.map((l) => ({
    url: `${BASE_URL}/team/${l.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Динамические страницы статей
  const articlePages: MetadataRoute.Sitemap = ARTICLES_DATA.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...practicePages, ...casePages, ...lawyerPages, ...articlePages];
}
