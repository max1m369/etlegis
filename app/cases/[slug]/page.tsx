import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCaseBySlug, getLawyerBySlug, getAllCases } from '@/lib/data/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

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

  const lawyer = caseItem.lawyerSlug ? getLawyerBySlug(caseItem.lawyerSlug) : undefined;

  return (
    <div className="flex flex-col min-h-screen bg-et-bg text-et-dark">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <div className="px-6 md:px-12 pt-12 max-w-4xl mx-auto">
          {/* Навигация назад */}
          <div className="mb-8">
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-et-muted hover:text-et-dark transition-colors font-medium"
            >
              ← Все кейсы
            </Link>
          </div>

          {/* Мета-информация */}
          <div className="flex items-center gap-4 text-xs font-mono text-et-muted uppercase mb-4">
            <span className="text-et-accent font-semibold">{caseItem.categoryLabel}</span>
            {caseItem.date && <span>• {caseItem.date} год</span>}
            {caseItem.courtInstance && <span>• {caseItem.courtInstance}</span>}
          </div>

          {/* Сумма иска */}
          {caseItem.claimAmount && (
            <span className="text-4xl sm:text-6xl font-serif font-bold text-et-accent block mb-4 tracking-tight">
              {caseItem.claimAmount}
            </span>
          )}

          {/* Заголовок кейса */}
          <h1 className="font-serif text-3xl sm:text-5xl font-medium leading-tight mb-8 text-et-dark">
            {caseItem.title}
          </h1>

          {/* Итог для доверителя */}
          <div className="bg-white border-l-4 border-et-accent border-y border-r border-et-border p-6 sm:p-8 mb-12 shadow-subtle">
            <span className="text-[11px] uppercase tracking-widest text-et-accent font-mono font-semibold block mb-2">
              Итог для доверителя
            </span>
            <p className="text-base sm:text-lg text-et-dark leading-relaxed font-light">
              {caseItem.resultSummary}
            </p>
          </div>

          {/* Основные блоки описание процесса */}
          <div className="space-y-12">
            {/* Блок 1: С чего всё начиналось */}
            <section className="bg-white border border-et-border p-8 rounded-[2px]">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-4 text-et-dark flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-et-accent" />
                С чего всё начиналось
              </h2>
              <p className="text-sm sm:text-base text-et-muted leading-relaxed font-light">
                {caseItem.challenge}
              </p>
            </section>

            {/* Блок 2: Структура и стратегия решения */}
            <section className="bg-white border border-et-border p-8 rounded-[2px]">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-4 text-et-dark flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-et-dark" />
                Структура и стратегия решения
              </h2>
              <p className="text-sm sm:text-base text-et-muted leading-relaxed font-light">
                {caseItem.solution}
              </p>
            </section>

            {/* Блок 3: Специалист, ведущий кейс */}
            {lawyer && (
              <section className="bg-white border border-et-border p-8 rounded-[2px]">
                <span className="text-[11px] font-mono uppercase tracking-widest text-et-muted block mb-6">
                  Специалист, ведущий данный кейс
                </span>
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-5">
                    {lawyer.photoUrl && (
                      <img
                        src={lawyer.photoUrl}
                        alt={lawyer.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-et-border"
                      />
                    )}
                    <div>
                      <Link
                        href={`/team/${lawyer.slug}`}
                        className="font-serif text-xl sm:text-2xl font-medium text-et-dark hover:text-et-accent transition-colors block"
                      >
                        {lawyer.name}
                      </Link>
                      <p className="text-xs text-et-muted mt-1 font-light">
                        {lawyer.status}
                      </p>
                      <p className="text-[11px] font-mono text-et-accent mt-1">
                        Стаж: более {lawyer.experienceYears} лет
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Link
                      href={`/team/${lawyer.slug}`}
                      className="px-5 py-3 border border-et-border hover:border-et-dark text-xs uppercase tracking-wider text-center font-medium transition-colors"
                    >
                      Профиль эксперта
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* Блок 4: Призыв к действию */}
            <section className="bg-et-dark text-white p-8 sm:p-12 text-center rounded-[2px] mt-16">
              <h3 className="font-serif text-2xl sm:text-4xl font-medium mb-4">
                Нужна защита по аналогичному делу?
              </h3>
              <p className="text-sm text-neutral-400 font-light max-w-xl mx-auto mb-8 leading-relaxed">
                Адвокаты Etlegis изучат вашу ситуацию, оценят риски и разработают индивидуальную стратегию защиты.
              </p>

              <Button className="bg-white text-et-dark hover:bg-neutral-200 border-white px-8 py-3.5 text-xs uppercase font-medium tracking-wider">
                Обсудить ситуацию с адвокатом
              </Button>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
