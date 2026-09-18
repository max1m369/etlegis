import { LAWYERS_DATA, CASES_DATA, ARTICLES_DATA } from './etlegis-data';
import { practices as mockPractices } from './mock-data';
import type { Lawyer } from '@/types/models';

export function getAllLawyers(): Lawyer[] {
  return LAWYERS_DATA;
}

export function getLawyerBySlug(slug: string): Lawyer | undefined {
  return LAWYERS_DATA.find((l) => l.slug === slug);
}

export function getPracticesForLawyer(practiceIds: string[]) {
  return mockPractices.filter((p) => practiceIds.includes(p.id));
}

export function getCasesForLawyer(caseIds?: string[]) {
  if (!caseIds || caseIds.length === 0) return [];
  return CASES_DATA.filter((c) => caseIds.includes(c.id));
}

export function getAllCases() {
  return CASES_DATA;
}

export function getCaseBySlug(slug: string) {
  return CASES_DATA.find((c) => c.slug === slug || c.id === slug);
}

export function getPracticeBySlug(slug: string) {
  return mockPractices.find((p) => p.slug === slug || p.id === slug);
}

export function getAllArticles() {
  return ARTICLES_DATA;
}

export function getArticleBySlug(slug: string) {
  return ARTICLES_DATA.find((a) => a.slug === slug || a.id === slug);
}
