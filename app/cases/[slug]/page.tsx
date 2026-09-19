import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCaseBySlugAsync, getLawyerBySlug, getAllCases } from '@/lib/data/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import DocumentFrame from '@/components/ui/DocumentFrame';

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
  const caseItem = await getCaseBySlugAsync(slug);

  if (!caseItem) notFound();

  // Resolve assigned lawyers list (from Payload DB or mock data)
  const assignedLawyers: Array<{
    name: string;
    slug: string;
    position?: string;
    photo?: string;
    isAdvocate?: boolean;
    registryNo?: string;
  }> = [];

  if (caseItem.lawyers && caseItem.lawyers.length > 0) {
    assignedLawyers.push(...caseItem.lawyers);
  } else if (caseItem.lawyerSlug) {
    const staticLawyer = getLawyerBySlug(caseItem.lawyerSlug);
    if (staticLawyer) {
      assignedLawyers.push({
        name: staticLawyer.name,
        slug: staticLawyer.slug,
        position: staticLawyer.status || staticLawyer.role || 'Адвокат / Партнёр',
        photo: staticLawyer.photoUrl,
        registryNo: staticLawyer.registryNo || '77/14890',
        isAdvocate: true,
      });
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-et-bg text-et-dark">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <div className="px-4 sm:px-8 max-w-4xl mx-auto">
          {/* Навигация назад */}
          <div className="mb-6 px-2">
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-et-muted hover:text-et-dark transition-colors font-medium"
            >
              ← Все кейсы
            </Link>
          </div>

          {/* 📜 ЮРИДИЧЕСКИЙ ДОКУМЕНТ-ФРЕЙМ С УГЛОВЫМИ СКОБКАМИ СВЕРХУ-СЛЕВА И СНИЗУ-СПРАВА */}
          <DocumentFrame>
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
            <div className="bg-et-surface-alt/60 border-l-4 border-et-accent border-y border-r border-et-border p-6 sm:p-8 mb-10 shadow-subtle rounded-[2px]">
              <span className="text-[11px] uppercase tracking-widest text-et-accent font-mono font-semibold block mb-2">
                Итог для доверителя
              </span>
              <p className="text-base sm:text-lg text-et-dark leading-relaxed font-light">
                {caseItem.resultSummary}
              </p>
            </div>

            {/* Основные блоки описание процесса */}
            <div className="space-y-8">
              {/* Блок 1: С чего всё начиналось */}
              <section className="bg-white border border-et-border p-6 sm:p-8 rounded-[2px]">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-4 text-et-dark flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-et-accent" />
                  С чего всё начиналось
                </h2>
                <p className="text-sm sm:text-base text-et-muted leading-relaxed font-light whitespace-pre-line">
                  {caseItem.challenge}
                </p>
              </section>

              {/* Блок 2: Структура и стратегия решения */}
              <section className="bg-white border border-et-border p-6 sm:p-8 rounded-[2px]">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-4 text-et-dark flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-et-dark" />
                  Структура и стратегия решения
                </h2>
                <p className="text-sm sm:text-base text-et-muted leading-relaxed font-light whitespace-pre-line">
                  {caseItem.solution}
                </p>
              </section>

              {/* Блок 3: Адвокаты и юристы, ведавшие дело */}
              {assignedLawyers.length > 0 && (
                <section className="bg-white border border-et-border p-6 sm:p-8 rounded-[2px]">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-et-muted block mb-6">
                    Адвокаты и юристы по делу
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {assignedLawyers.map((lawyer) => (
                      <Link
                        key={lawyer.slug || lawyer.name}
                        href={`/team/${lawyer.slug}`}
                        className="flex items-center gap-4 p-4 border border-et-border hover:border-et-dark transition-all rounded-[2px] group bg-et-bg/30"
                      >
                        <div className="w-12 h-12 rounded-full bg-et-surface-alt flex items-center justify-center font-serif text-lg font-bold text-et-accent shrink-0 border border-et-border overflow-hidden">
                          {lawyer.photo ? (
                            <img src={lawyer.photo} alt={lawyer.name} className="w-full h-full object-cover" />
                          ) : (
                            lawyer.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <h4 className="font-serif text-base font-medium text-et-dark group-hover:text-et-accent transition-colors">
                            {lawyer.name}
                          </h4>
                          <p className="text-xs text-et-muted font-light mt-0.5">{lawyer.position}</p>
                          {lawyer.registryNo && (
                            <span className="text-[10px] font-mono text-et-accent block mt-1">
                              Реестровый № {lawyer.registryNo}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </DocumentFrame>

          {/* Призыв к действию */}
          <section className="bg-et-dark text-white p-8 sm:p-12 text-center rounded-[2px] mt-10">
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
      </main>
      <Footer />
    </div>
  );
}
