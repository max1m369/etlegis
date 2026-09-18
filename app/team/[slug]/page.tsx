import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLawyerBySlug, getPracticesForLawyer, getCasesForLawyer, getAllLawyers } from '@/lib/data/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const lawyers = getAllLawyers();
  return lawyers.map((lawyer) => ({
    slug: lawyer.slug,
  }));
}

export default async function LawyerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const lawyer = getLawyerBySlug(slug);

  if (!lawyer) notFound();

  const practices = getPracticesForLawyer(lawyer.practiceIds);
  const cases = getCasesForLawyer(lawyer.cases?.map((c) => c.id));

  return (
    <div className="flex flex-col min-h-screen bg-et-bg text-et-dark">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <div className="px-6 md:px-12 pt-12 md:pt-20 max-w-7xl mx-auto">
          <div className="mb-8">
            <Link href="/team" className="text-xs uppercase tracking-widest text-et-muted hover:text-et-dark transition-colors">
              ← Вся команда
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Фото и статус */}
            <div className="md:col-span-4">
              <div className="w-full aspect-[3/4] bg-neutral-200 border border-et-border overflow-hidden rounded-[2px] flex items-center justify-center text-xs text-neutral-500">
                {lawyer.photoUrl ? (
                  <img
                    src={lawyer.photoUrl}
                    alt={lawyer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>Фотография адвоката</span>
                )}
              </div>
              <div className="mt-6 space-y-4 text-xs">
                <div>
                  <span className="text-neutral-400 uppercase tracking-widest block text-[10px]">Стаж в юриспруденции</span>
                  <span className="font-medium text-sm text-et-dark">{lawyer.experienceYears} лет практики</span>
                </div>
                <div>
                  <span className="text-neutral-400 uppercase tracking-widest block text-[10px]">Образование</span>
                  <ul className="mt-1 space-y-1">
                    {lawyer.education.map((edu, idx) => (
                      <li key={idx} className="text-et-dark">{edu}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Биография и специализация */}
            <div className="md:col-span-8">
              <span className="text-xs uppercase tracking-widest text-et-accent font-semibold">{lawyer.status}</span>
              <h1 className="font-serif text-3xl sm:text-5xl font-medium mt-1 mb-4">{lawyer.name}</h1>
              <p className="text-sm sm:text-base text-et-muted font-light leading-relaxed mb-8">
                {lawyer.specialization}
              </p>

              <div className="border-t border-et-border pt-8 mb-12">
                <h2 className="font-serif text-xl font-medium mb-4">Опыт и профессиональный подход</h2>
                <p className="text-xs sm:text-sm text-et-muted leading-relaxed font-light">{lawyer.bio}</p>
              </div>

              {/* Курируемые практики */}
              {practices.length > 0 && (
                <div className="border-t border-et-border pt-8 mb-12">
                  <h2 className="font-serif text-xl font-medium mb-4">Профильные практики</h2>
                  <div className="flex flex-wrap gap-3">
                    {practices.map((p) => (
                      <Link
                        key={p.id}
                        href={`/practices/${p.slug}`}
                        className="px-4 py-2 border border-et-border text-xs bg-white hover:border-et-dark transition-all rounded-[2px]"
                      >
                        {p.title} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Выигранные дела юриста */}
              {cases.length > 0 && (
                <div className="border-t border-et-border pt-8">
                  <h2 className="font-serif text-xl font-medium mb-6">Знаковые кейсы юриста</h2>
                  <div className="space-y-4">
                    {cases.map((c) => (
                      <div key={c.id} className="bg-white border border-et-border p-6 rounded-[2px]">
                        {c.claimAmount && (
                          <span className="text-lg font-serif font-bold text-et-accent block mb-1">
                            {c.claimAmount}
                          </span>
                        )}
                        <h3 className="font-serif text-lg font-medium">{c.title}</h3>
                        <p className="text-xs text-et-muted mt-2 font-light">{c.resultSummary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
