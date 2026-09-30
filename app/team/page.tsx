import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TeamBlueprintGrid from '@/components/sections/TeamBlueprintGrid';
import { TEAM_MEMBERS_FULL } from '@/lib/data/team-blueprint';

export const metadata = {
  title: 'О компании и команда | Адвокатское бюро ETLEGIS',
  description: 'История адвокатского бюро ETLEGIS, принципы работы, партнеры и ведущие адвокаты практики.',
};

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen bg-et-bg dark:bg-[#0D0F12] text-et-dark transition-colors duration-500">
      <Header />
      <main className="flex-grow pt-24 sm:pt-28 pb-16">
        {/* Breadcrumbs Navigation */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-6">
          <nav
            className="flex items-center gap-2 font-mono text-xs text-et-muted font-medium"
            aria-label="Хлебные крошки"
          >
            <Link
              href="/"
              className="hover:text-et-dark dark:hover:text-white transition-colors"
            >
              ГЛАВНАЯ
            </Link>
            <span>/</span>
            <span className="text-et-dark dark:text-white font-bold">КОМАНДА</span>
          </nav>
        </div>

        {/* 1. Блок "О компании" (Большой заголовок, история и ключевые метрики) */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 pb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#9B815C] dark:text-accent-bronze font-mono font-semibold block mb-3">
            О компании
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-et-dark leading-[1.05] mb-8 max-w-5xl">
            Адвокатское бюро «ЭТЛЕГИС»
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 text-sm sm:text-base text-et-muted font-light leading-relaxed mb-10">
            <p>
              Компания основана в 2019 году ведущими судебными адвокатами и экспертами в области арбитражного, корпоративного и уголовного права. С момента основания бюро ориентировано на решение нестандартных и высокорисковых правовых задач для собственников бизнеса, бенефициаров и генеральных директоров.
            </p>
            <p>
              За годы практики бюро сформировало команду адвокатов высшей квалификации, защитило свыше 1,2 млрд рублей клиентских активов и обеспечило надежный правовой щит в сложных спорах. Мы сочетаем безупречное процессуальное мастерство, глубокое понимание экономики бизнеса и строжайшие стандарты конфиденциальности.
            </p>
          </div>

          {/* Метрики и вехи бюро */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-et-dark/15 dark:border-white/15">
            <div>
              <span className="font-mono text-3xl sm:text-4xl font-semibold text-et-dark tracking-tight block">
                2019
              </span>
              <span className="text-xs text-et-muted font-light mt-1 block">
                Год основания бюро
              </span>
            </div>
            <div>
              <span className="font-mono text-3xl sm:text-4xl font-semibold text-et-dark tracking-tight block">
                1,2+ млрд ₽
              </span>
              <span className="text-xs text-et-muted font-light mt-1 block">
                Защищенных активов
              </span>
            </div>
            <div>
              <span className="font-mono text-3xl sm:text-4xl font-semibold text-et-dark tracking-tight block">
                94%
              </span>
              <span className="text-xs text-et-muted font-light mt-1 block">
                Выигранных дел
              </span>
            </div>
          </div>
        </section>

        {/* 2. Блок "НАША КОМАНДА" (Архитектурная шахматная сетка по структуре прототипа) */}
        <TeamBlueprintGrid members={TEAM_MEMBERS_FULL} />
      </main>
      <Footer />
    </div>
  );
}
