import Link from 'next/link';
import { getAllLawyersAsync } from '@/lib/data/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SpotlightButton from '@/components/ui/SpotlightButton';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'О компании и команда | Адвокатское бюро Etlegis',
  description: 'История адвокатского бюро Etlegis, принципы работы, партнеры и ведущие адвокаты практики.',
};

export default async function TeamPage() {
  const lawyers = await getAllLawyersAsync();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-[#141517]">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <div className="px-6 md:px-12 pt-8 max-w-7xl mx-auto">
          {/* Ссылка "На главную" */}
          <div className="mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-sm font-mono font-medium uppercase tracking-[0.18em] text-[#141517] hover:text-[#507192] transition-colors group"
            >
              <span className="text-xl font-bold transition-transform duration-300 group-hover:-translate-x-1.5">←</span>
              <span>На главную</span>
            </Link>
          </div>

          {/* 1. Блок "О компании" (Большой заголовок и история) */}
          <section className="mb-20">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9B815C] font-mono font-semibold block mb-3">
              О компании
            </span>
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#141517] leading-[1.05] mb-8 max-w-5xl">
              Адвокатское бюро «ЭТЛЕГИС»
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 text-sm sm:text-base text-[#5E6267] font-light leading-relaxed mb-10">
              <p>
                Компания основана в 2019 году ведущими судебными адвокатами и экспертами в области арбитражного, корпоративного и уголовного права. С момента основания бюро ориентировано на решение нестандартных и высокорисковых правовых задач для собственников бизнеса, бенефициаров и генеральных директоров.
              </p>
              <p>
                За годы практики бюро сформировало команду адвокатов высшей квалификации, защитило свыше 1,2 млрд рублей клиентских активов и обеспечило надежный правовой щит в сложных спорах. Мы сочетаем безупречное процессуальное мастерство, глубокое понимание экономики бизнеса и строжайшие стандарты конфиденциальности.
              </p>
            </div>

            {/* Метрики и вехи бюро */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-[#E2E2DC]">
              <div>
                <span className="font-mono text-3xl sm:text-4xl font-semibold text-[#141517] tracking-tight block">2019</span>
                <span className="text-xs text-[#5E6267] font-light mt-1 block">Год основания бюро</span>
              </div>
              <div>
                <span className="font-mono text-3xl sm:text-4xl font-semibold text-[#141517] tracking-tight block">1,2+ млрд ₽</span>
                <span className="text-xs text-[#5E6267] font-light mt-1 block">Защищенных активов</span>
              </div>
              <div>
                <span className="font-mono text-3xl sm:text-4xl font-semibold text-[#141517] tracking-tight block">94%</span>
                <span className="text-xs text-[#5E6267] font-light mt-1 block">Выигранных дел</span>
              </div>
            </div>
          </section>

          {/* 2. Блок "Адвокаты бюро" (Команда) */}
          <section className="pt-8 border-t border-[#E2E2DC]">
            <div className="mb-12">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9B815C] font-mono font-semibold block mb-3">
                Лидеры практик
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#141517] mb-4">
                Адвокаты бюро
              </h2>
              <p className="text-sm sm:text-base text-[#5E6267] max-w-2xl font-light leading-relaxed">
                Каждый адвокат бюро специализируется на защите имущественных и личных прав руководителей бизнеса, сочетая процессуальный опыт и бизнес-понимание.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {lawyers.map((lawyer) => (
                <div 
                  key={lawyer.id} 
                  className="bg-white border border-[#E2E2DC] p-6 flex flex-col justify-between hover:border-[#141517] hover:shadow-card transition-all duration-300 group rounded-[2px]"
                >
                  <div>
                    <div className="w-full aspect-[3/4] bg-[#ECECE8] mb-6 relative overflow-hidden flex items-center justify-center text-xs font-mono text-[#5E6267] rounded-[2px]">
                      {lawyer.photoUrl ? (
                        <img
                          src={lawyer.photoUrl}
                          alt={lawyer.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <span>Да, фотография</span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl font-medium group-hover:text-[#507192] transition-colors text-[#141517]">
                      <Link href={`/team/${lawyer.slug}`}>
                        {lawyer.name}
                      </Link>
                    </h3>
                    <span className="text-xs text-[#9B815C] font-mono font-medium block mt-1 uppercase tracking-wider">
                      {lawyer.status}
                    </span>
                    <p className="text-xs text-[#5E6267] mt-3 font-light leading-relaxed line-clamp-3">
                      {Array.isArray((lawyer as any).specializations)
                        ? (lawyer as any).specializations.join(', ')
                        : lawyer.specialization || (lawyer as any).quote || (lawyer as any).bio}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#ECECE8] flex flex-col gap-4">
                    <span className="text-xs text-[#5E6267] font-mono">
                      Стаж: {lawyer.experienceYears} лет практики
                    </span>
                    <Link href={`/team/${lawyer.slug}`} className="block w-full">
                      <SpotlightButton className="w-full py-3 text-xs">
                        Профиль адвоката
                      </SpotlightButton>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
