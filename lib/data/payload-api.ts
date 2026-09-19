// Unified API client for fetching dynamic data from Payload CMS backend (port 3001)
import { cases as fallbackCases, practices as fallbackPractices } from './mock-data';
import type { DetailedCase } from './queries';

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';

export function mapPayloadCaseToDetailedCase(doc: any): DetailedCase {
  const practiceTitle = typeof doc.practice === 'object' ? doc.practice?.title : 'Арбитражное судопроизводство';
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
    lawyerSlug: doc.lawyers?.[0]?.slug,
  };
}

export async function getDynamicCases() {
  try {
    const res = await fetch(`${PAYLOAD_URL}/api/payload/cases?depth=2&limit=100`, {
      next: { revalidate: 5 },
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
    const res = await fetch(`${PAYLOAD_URL}/api/payload/practices?depth=1&limit=50`, {
      next: { revalidate: 10 },
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
