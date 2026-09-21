// Unified API client for fetching dynamic data from Payload CMS backend
import { cases as fallbackCases, practices as fallbackPractices } from './mock-data';
import type { DetailedCase } from './queries';

const getApiUrl = (endpoint: string) => {
  if (typeof window !== 'undefined') {
    return `/api/payload/${endpoint}`;
  }
  return `http://localhost:3001/api/payload/${endpoint}`;
};

export function mapPayloadCaseToDetailedCase(doc: any): DetailedCase {
  const practiceTitle = typeof doc.practice === 'object' ? doc.practice?.title : 'Арбитражное судопроизводство';
  const mappedLawyers = Array.isArray(doc.lawyers)
    ? doc.lawyers
        .map((l: any) => {
          if (typeof l === 'object' && l !== null) {
            let photoUrl = undefined;
            if (l.photo) {
              photoUrl = typeof l.photo === 'object' ? l.photo.url : undefined;
              if (photoUrl && photoUrl.startsWith('/')) {
                photoUrl = `http://localhost:3001${photoUrl}`;
              }
            }
            return {
              id: String(l.id),
              name: l.name || 'Адвокат',
              slug: l.slug || '',
              position: l.position || 'Адвокат / Партнёр',
              photo: photoUrl,
              isAdvocate: l.isAdvocate ?? true,
              registryNo: l.registryNo || undefined,
            };
          }
          return null;
        })
        .filter(Boolean)
    : [];

  return {
    id: String(doc.id),
    slug: doc.slug,
    categoryLabel: practiceTitle || 'Арбитражное судопроизводство',
    title: doc.title,
    claimAmount: doc.amount ? `${Number(doc.amount).toLocaleString('ru-RU')} ₽` : undefined,
    resultSummary: doc.result ? doc.result.replace(/<[^>]+>/g, '').trim() : 'Победа в суде',
    challenge: doc.task ? doc.task.replace(/<[^>]+>/g, '').trim() : doc.synopsis ? doc.synopsis.replace(/<[^>]+>/g, '').trim() : 'Судебное разбирательство',
    solution: doc.actions ? doc.actions.replace(/<[^>]+>/g, '').trim() : 'Правовая позиция адвокатов Etlegis',
    courtInstance: doc.instances || 'Арбитражный суд',
    date: doc.year ? String(doc.year) : '2026',
    lawyerSlug: mappedLawyers[0]?.slug,
    lawyers: mappedLawyers as any,
  };
}

export async function getDynamicCases() {
  try {
    const url = getApiUrl('cases?depth=2&limit=100');
    const res = await fetch(url, {
      cache: 'no-store',
    });
    if (!res.ok) return fallbackCases;
    const data = await res.json();
    if (!data?.docs || data.docs.length === 0) return fallbackCases;

    const mapped = data.docs.map((doc: any) => ({
      id: String(doc.id),
      slug: doc.slug,
      title: doc.title,
      practiceId: typeof doc.practice === 'object' ? String(doc.practice?.id) : String(doc.practice || '1'),
      practice: doc.practice,
      claimAmount: doc.amount ? `${Number(doc.amount).toLocaleString('ru-RU')} ₽` : undefined,
      challenge: doc.task ? doc.task.replace(/<[^>]+>/g, '').trim() : doc.synopsis ? doc.synopsis.replace(/<[^>]+>/g, '').trim() : 'Дело в суде',
      solution: doc.actions ? doc.actions.replace(/<[^>]+>/g, '').trim() : 'Действия защиты',
      resultSummary: doc.result ? doc.result.replace(/<[^>]+>/g, '').trim() : 'Победа в суде',
      courtInstance: doc.instances || 'Арбитражный суд',
      date: doc.year ? String(doc.year) : '2026',
      lawyerIds: doc.lawyers ? doc.lawyers.map((l: any) => String(typeof l === 'object' ? l.id : l)) : [],
    }));

    return mapped;
  } catch (err) {
    console.warn('[Payload API] Failed to fetch cases, using fallback:', err);
    return fallbackCases;
  }
}

export async function getDynamicPractices() {
  try {
    const url = getApiUrl('practices?depth=1&limit=50');
    const res = await fetch(url, {
      cache: 'no-store',
    });
    if (!res.ok) return fallbackPractices;
    const data = await res.json();
    if (!data?.docs || data.docs.length === 0) return fallbackPractices;

    return data.docs.map((doc: any) => ({
      id: String(doc.id),
      slug: doc.slug,
      title: doc.title,
      short: doc.short || doc.title,
      services: [],
    }));
  } catch (err) {
    return fallbackPractices;
  }
}

export async function getDynamicEmployees() {
  try {
    const res = await fetch('http://localhost:3001/api/employees?depth=2&limit=100', {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.docs || data.docs.length === 0) return null;

    const mapped = data.docs.map((doc: any) => {
      let photoUrl = undefined;
      if (doc.photo) {
        photoUrl = typeof doc.photo === 'object' ? doc.photo.url : undefined;
        if (photoUrl && photoUrl.startsWith('/')) {
          photoUrl = `http://localhost:3001${photoUrl}`;
        }
      }
      if (!photoUrl) {
        if (doc.slug?.includes('biry') || doc.slug?.includes('biru') || doc.name?.includes('Бирюков')) {
          photoUrl = '/team/biryukov.jpg';
        } else if (doc.slug?.includes('luch') || doc.name?.includes('Лучников')) {
          photoUrl = '/team/luchnikov.jpg';
        } else if (doc.slug?.includes('roman') || doc.name?.includes('Романова')) {
          photoUrl = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';
        }
      }

      return {
        id: String(doc.id),
        name: doc.name,
        slug: doc.slug,
        status: doc.position || 'Адвокат / Юрист',
        experienceYears: doc.experienceSince ? new Date().getFullYear() - doc.experienceSince : 12,
        photoUrl: photoUrl || undefined,
        quote: doc.bio || 'Профессиональная защита интересов доверителей в судах всех инстанций.',
        specializations: Array.isArray(doc.specialization) ? doc.specialization.map((s: any) => typeof s === 'object' ? s.item : s) : [],
        registryNo: doc.registryNo || undefined,
        isAdvocate: doc.isAdvocate ?? true,
        order: doc.order ?? 99,
      };
    });

    // Сортировка: 1-й — Бирюков, 2-й — Лучников, остальные — в конец списка
    return mapped.sort((a: any, b: any) => {
      const aIsBir = a.slug?.includes('biry') || a.slug?.includes('biru') || a.name?.includes('Бирюков');
      const bIsBir = b.slug?.includes('biry') || b.slug?.includes('biru') || b.name?.includes('Бирюков');
      if (aIsBir && !bIsBir) return -1;
      if (!aIsBir && bIsBir) return 1;

      const aIsLuch = a.slug?.includes('luch') || a.name?.includes('Лучников');
      const bIsLuch = b.slug?.includes('luch') || b.name?.includes('Лучников');
      if (aIsLuch && !bIsLuch) return -1;
      if (!aIsLuch && bIsLuch) return 1;

      return (a.order ?? 99) - (b.order ?? 99);
    });
  } catch (err) {
    return null;
  }
}
