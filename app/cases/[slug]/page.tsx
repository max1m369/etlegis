import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCaseBySlugAsync, getLawyerBySlug, getAllCases } from '@/lib/data/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DocumentFrame from '@/components/ui/DocumentFrame';
import SpotlightButton from '@/components/ui/SpotlightButton';
import ShimmerStudioWidget from '@/components/ui/ShimmerStudioWidget';

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
        position: staticLawyer.status || (staticLawyer as any).role || 'Адвокат / Партнёр',
        photo: staticLawyer.photoUrl,
        registryNo: (staticLawyer as any).registryNo || '77/14890',
        isAdvocate: true,
      });
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-[#141517]">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <div className="px-4 sm:px-8 max-w-4xl mx-auto">
          {/* Кнопка "На главную" в соответствии с референсом */}
          <div className="mb-6 px-2">
            <Link
              href="/cases"
              className="inline-flex items-center gap-3 text-sm font-mono font-medium uppercase tracking-[0.18em] text-[#141517] hover:text-[#507192] transition-colors group"
            >
              <span className="text-xl font-bold transition-transform duration-300 group-hover:-translate-x-1.5">←</span>
              <span>Все кейсы</span>
            </Link>
          </div>

          {/* 📜 ЮРИДИЧЕСКИЙ ДОКУМЕНТ С 4 СКОБКАМИ И АНИМАЦИЕЙ РАЗВОРАЧИВАНИЯ */}
          <DocumentFrame>
            {/* Мета-шапка документа */}
            <div className="flex items-center gap-4 text-xs font-mono text-[#5E6267] uppercase mb-4 tracking-wider">
              <span className="text-[#9B815C] font-semibold">{caseItem.categoryLabel}</span>
              {caseItem.date && <span>• {caseItem.date} ГОД</span>}
              {caseItem.courtInstance && <span>• {caseItem.courtInstance}</span>}
            </div>

            {/* Защищенная сумма иска */}
            {caseItem.claimAmount && (
              <span className="text-4xl sm:text-6xl font-serif font-bold text-[#141517] block mb-4 tracking-tight">
                {caseItem.claimAmount}
              </span>
            )}

            {/* Заголовок кейса */}
            <h1 className="font-serif text-3xl sm:text-5xl font-medium leading-tight mb-8 text-[#141517]">
              {caseItem.title}
            </h1>

            {/* Итог для доверителя (без рамок, на мягкой подложке с серой полосой) */}
            <div className="bg-[#F8F9FA] border-l-4 border-[#141517] p-6 sm:p-8 mb-10">
              <span className="text-[11px] uppercase tracking-widest text-[#9B815C] font-mono font-semibold block mb-2">
                Итог для доверителя
              </span>
              <p className="text-base sm:text-lg text-[#141517] leading-relaxed font-light">
                {caseItem.resultSummary}
              </p>
            </div>

            {/* Чистые секции документа с разделительными линиями вместо рамок */}
            <div className="space-y-10">
              {/* Блок 1: С чего всё начиналось */}
              <section className="pt-6 border-t border-[#ECECE8]">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-4 text-[#141517] flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#9B815C]" />
                  С чего всё начиналось
                </h2>
                <p className="text-sm sm:text-base text-[#5E6267] leading-relaxed font-light whitespace-pre-line">
                  {caseItem.challenge}
                </p>
              </section>

              {/* Блок 2: Структура и стратегия решения */}
              <section className="pt-6 border-t border-[#ECECE8]">
                <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-4 text-[#141517] flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#141517]" />
                  Структура и стратегия решения
                </h2>
                <p className="text-sm sm:text-base text-[#5E6267] leading-relaxed font-light whitespace-pre-line">
                  {caseItem.solution}
                </p>
              </section>

              {/* Блок 3: Адвокаты и юристы по делу */}
              {assignedLawyers.length > 0 && (
                <section className="pt-6 border-t border-[#ECECE8]">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#5E6267] block mb-6">
                    Адвокаты и юристы по делу
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {assignedLawyers.map((lawyer) => (
                      <Link
                        key={lawyer.slug || lawyer.name}
                        href={`/team/${lawyer.slug}`}
                        className="flex items-center gap-4 p-4 border border-[#E2E2DC] hover:border-[#141517] transition-all rounded-[2px] group bg-[#F8F9FA]"
                      >
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center font-serif text-lg font-bold text-[#141517] shrink-0 border border-[#E2E2DC] overflow-hidden">
                          {lawyer.photo ? (
                            <img src={lawyer.photo} alt={lawyer.name} className="w-full h-full object-cover" />
                          ) : (
                            lawyer.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <h4 className="font-serif text-base font-medium text-[#141517] group-hover:text-[#507192] transition-colors">
                            {lawyer.name}
                          </h4>
                          <p className="text-xs text-[#5E6267] font-light mt-0.5">{lawyer.position}</p>
                          {lawyer.registryNo && (
                            <span className="text-[10px] font-mono text-[#9B815C] block mt-1">
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

          {/* Призыв к действию в едином стиле */}
          <section className="bg-[#141517] text-white p-8 sm:p-12 text-center rounded-[2px] mt-10">
            <h3 className="font-serif text-2xl sm:text-4xl font-medium mb-4 text-white">
              Нужна защита по аналогичному делу?
            </h3>
            <p className="text-sm text-neutral-300 font-light max-w-xl mx-auto mb-8 leading-relaxed">
              Etlegis изучит вашу ситуацию, оценит риски и разработает индивидуальную стратегию защиты.
            </p>

            <SpotlightButton variant="dark" className="px-8 py-4 text-xs mx-auto">
              Обсудить ситуацию с адвокатом
            </SpotlightButton>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
