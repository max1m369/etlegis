import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getLawyerBySlugAsync, getLawyerBySlug, getPracticesForLawyer, getCasesForLawyer, getAllLawyers } from '@/lib/data/queries';
import { TEAM_MEMBERS_FULL, PracticeBadge } from '@/lib/data/team-blueprint';
import { Shield, Scale, Building2, Gavel } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

function PracticeIcon({ iconName, className = "w-5 h-5 shrink-0" }: { iconName: string; className?: string }) {
  switch (iconName) {
    case 'shield':
      return <Shield className={className} strokeWidth={1.8} />;
    case 'scale':
      return <Scale className={className} strokeWidth={1.8} />;
    case 'building':
      return <Building2 className={className} strokeWidth={1.8} />;
    case 'gavel':
      return <Gavel className={className} strokeWidth={1.8} />;
    default:
      return <Scale className={className} strokeWidth={1.8} />;
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const lawyers = getAllLawyers();
  const allSlugs = new Set(lawyers.map((lawyer) => lawyer.slug));
  allSlugs.add('birukov-aleksey');
  allSlugs.add('biryukov-alexey');
  allSlugs.add('luchnikov-konstantin');
  allSlugs.add('romanova-ekaterina');

  return Array.from(allSlugs).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lawyer = (await getLawyerBySlugAsync(slug)) || getLawyerBySlug(slug);

  if (!lawyer) {
    return {
      title: 'Адвокат бюро | Адвокатское бюро Etlegis',
    };
  }

  const title = `${lawyer.name} — ${lawyer.status} | Адвокатское бюро Etlegis`;
  const description = `${lawyer.experienceYears} лет юридической практики. ${lawyer.specialization}. Комплексная правовая защита бизнеса в Москве и арбитражных судах РФ.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://etlegis.ru/team/${lawyer.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://etlegis.ru/team/${lawyer.slug}`,
      siteName: 'Адвокатское бюро Etlegis',
      locale: 'ru_RU',
      type: 'profile',
      images: lawyer.photoUrl
        ? [
            {
              url: `https://etlegis.ru${lawyer.photoUrl}`,
              width: 800,
              height: 1100,
              alt: lawyer.name,
            },
          ]
        : [],
    },
  };
}

export default async function LawyerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const lawyer = (await getLawyerBySlugAsync(slug)) || getLawyerBySlug(slug);

  if (!lawyer) notFound();

  const practices = getPracticesForLawyer(Array.isArray(lawyer.practiceIds) ? lawyer.practiceIds : []);
  const directCaseIds = Array.isArray(lawyer.cases) ? lawyer.cases.map((c: any) => c.id || c.slug) : [];
  const cases = getCasesForLawyer(directCaseIds, lawyer.id, lawyer.slug);

  // Resolve practices with icons and proper URLs matching /team page
  const blueprintMember = TEAM_MEMBERS_FULL.find(
    (m) => m.slug === lawyer.slug || m.id === lawyer.id || (m.slug.includes('bir') && lawyer.slug.includes('bir'))
  );

  let resolvedPractices: PracticeBadge[] = [];

  if (blueprintMember && blueprintMember.practices && blueprintMember.practices.length > 0) {
    resolvedPractices = blueprintMember.practices;
  } else {
    resolvedPractices = practices.map((p) => {
      let iconName: 'shield' | 'scale' | 'building' | 'gavel' = 'scale';
      if (p.slug.includes('criminal')) iconName = 'shield';
      else if (p.slug.includes('tax')) iconName = 'building';
      else if (p.slug.includes('subsidiary') || p.slug.includes('bankrot')) iconName = 'gavel';

      return {
        slug: p.slug,
        title: p.title,
        iconName,
      };
    });
  }

  // Schema.org Structured Data for SearchGPT, Perplexity, Google, Yandex
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: lawyer.name,
    jobTitle: lawyer.status,
    description: lawyer.bio || lawyer.specialization,
    image: lawyer.photoUrl ? `https://etlegis.ru${lawyer.photoUrl}` : undefined,
    telephone: '+7 (495) 215-05-55',
    email: 'info@etlegis.ru',
    url: `https://etlegis.ru/team/${lawyer.slug}`,
    worksFor: {
      '@type': 'LegalService',
      name: 'Адвокатское бюро Etlegis',
      url: 'https://etlegis.ru',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Москва',
        streetAddress: 'Пресненская набережная, 12',
        addressCountry: 'RU',
      },
    },
    knowsAbout: resolvedPractices.map((p) => p.title),
    alumniOf: Array.isArray(lawyer.education)
      ? lawyer.education.map((edu) => ({
          '@type': 'EducationalOrganization',
          name: edu,
        }))
      : undefined,
  };

  return (
    <div className="flex flex-col min-h-screen bg-et-bg text-et-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />
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
              <div className="w-full aspect-[3/4] bg-[#ECECE8] dark:bg-bg-subtle border border-et-border overflow-hidden rounded-[2px] flex items-center justify-center text-xs text-et-muted">
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
                    {(Array.isArray(lawyer.education) ? lawyer.education : []).map((edu, idx) => (
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

              {/* Профильные практики: такие же стильные плашки с иконками, как на странице "Команда" */}
              {resolvedPractices.length > 0 && (
                <div className="border-t border-et-border pt-8 mb-12">
                  <h2 className="font-serif text-xl font-medium mb-5">Профильные практики</h2>
                  <div
                    className={`grid gap-3.5 sm:gap-4 ${
                      resolvedPractices.length === 3
                        ? 'grid-cols-1 sm:grid-cols-3'
                        : resolvedPractices.length === 2
                        ? 'grid-cols-1 sm:grid-cols-2'
                        : 'grid-cols-1 sm:grid-cols-2 max-w-sm'
                    }`}
                  >
                    {resolvedPractices.map((practice) => (
                      <Link
                        key={practice.slug}
                        href={`/practices/${practice.slug}`}
                        className="group/card relative p-4 sm:p-5 border border-et-border dark:border-white/15 bg-transparent hover:bg-white dark:hover:bg-white/10 hover:border-[#9B815C] dark:hover:border-accent-bronze transition-all duration-300 rounded-[2px] hover:shadow-md flex flex-col justify-between min-h-[110px] sm:min-h-[125px] text-left overflow-hidden"
                      >
                        {/* Top Row: Large Icon in Accent Box + Arrow ↗ */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="w-10 h-10 rounded-[2px] bg-transparent border border-et-border dark:border-white/15 flex items-center justify-center text-[#9B815C] dark:text-accent-bronze group-hover/card:scale-105 group-hover/card:border-[#9B815C] group-hover/card:bg-white/60 dark:group-hover/card:bg-white/10 transition-all duration-300 shrink-0">
                            <PracticeIcon iconName={practice.iconName} className="w-5 h-5 shrink-0 text-[#9B815C] dark:text-accent-bronze" />
                          </div>
                          <span className="font-mono text-xs text-et-muted/50 dark:text-white/40 group-hover/card:text-[#9B815C] dark:group-hover/card:text-accent-bronze group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform duration-300">
                            ↗
                          </span>
                        </div>

                        {/* Bottom: Practice Title */}
                        <div className="mt-3">
                          <div className="font-sans font-medium text-xs sm:text-[13px] text-et-dark dark:text-white leading-snug group-hover/card:text-[#507192] dark:group-hover/card:text-accent-bronze transition-colors">
                            {practice.title}
                          </div>
                        </div>

                        {/* Subtle Bottom Accent Line on Hover */}
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9B815C] dark:bg-accent-bronze scale-x-0 group-hover/card:scale-x-100 transition-transform duration-300 origin-left" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Знаковые кейсы юриста: интерактивные карточки-ссылки на кейсы */}
              {cases.length > 0 && (
                <div className="border-t border-et-border pt-8">
                  <h2 className="font-serif text-xl font-medium mb-6">Знаковые кейсы юриста</h2>
                  <div className="space-y-4">
                    {cases.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/cases/${c.slug}`}
                        className="group block bg-white dark:bg-bg-surface border border-et-border dark:border-white/12 p-6 rounded-[2px] hover:border-[#9B815C] dark:hover:border-accent-bronze transition-all duration-300 hover:shadow-md relative overflow-hidden"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            {c.claimAmount && (
                              <span className="text-lg font-serif font-bold text-et-accent dark:text-accent-bronze block mb-1.5">
                                {c.claimAmount}
                              </span>
                            )}
                            <h3 className="font-serif text-lg sm:text-xl font-medium text-et-dark dark:text-white group-hover:text-[#507192] dark:group-hover:text-accent-bronze transition-colors">
                              {c.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-et-muted dark:text-white/60 mt-2 font-light leading-relaxed">
                              {c.resultSummary}
                            </p>
                          </div>
                          <span className="font-mono text-sm text-et-muted/50 dark:text-white/40 group-hover:text-[#9B815C] dark:group-hover:text-accent-bronze group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0 mt-1">
                            ↗
                          </span>
                        </div>
                        {/* Hover accent line */}
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9B815C] dark:bg-accent-bronze scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </Link>
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
