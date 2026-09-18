import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCaseBySlug, getPracticeBySlug, getAllCases } from '@/lib/data/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const cases = getAllCases();
  return cases.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);

  if (!caseItem) notFound();

  const practice = getPracticeBySlug(caseItem.practiceId);

  return (
    <div className="flex flex-col min-h-screen bg-et-bg text-et-dark">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <div className="px-6 md:px-12 pt-16 max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/cases" className="text-xs uppercase tracking-widest text-et-muted hover:text-et-dark transition-colors">
              ← Все кейсы
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-et-muted uppercase mb-4">
            <span>{caseItem.date}</span>
            {practice && <span>• {practice.title}</span>}
          </div>

          {caseItem.claimAmount && (
            <span className="text-3xl sm:text-5xl font-serif font-bold text-et-accent block mb-4">
              {caseItem.claimAmount}
            </span>
          )}

          <h1 className="font-serif text-3xl sm:text-5xl font-medium leading-tight mb-8">
            {caseItem.title}
          </h1>

          <div className="bg-white border border-et-border p-6 sm:p-8 mb-12 rounded-[2px]">
            <span className="text-[10px] uppercase tracking-widest text-et-accent font-semibold block mb-2">
              Итог для доверителя
            </span>
            <p className="text-sm sm:text-base text-et-dark leading-relaxed font-light">
              {caseItem.resultSummary}
            </p>
          </div>

          <div className="space-y-12">
            <section className="border-t border-et-border pt-8">
              <h2 className="font-serif text-2xl font-medium mb-4">Сложность ситуации</h2>
              <p className="text-sm text-et-muted leading-relaxed font-light">
                {caseItem.challenge}
              </p>
            </section>

            <section className="border-t border-et-border pt-8">
              <h2 className="font-serif text-2xl font-medium mb-4">Действия адвокатов бюро</h2>
              <p className="text-sm text-et-muted leading-relaxed font-light">
                {caseItem.solution}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
