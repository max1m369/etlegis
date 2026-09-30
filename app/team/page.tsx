import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TeamBlueprintGrid from '@/components/sections/TeamBlueprintGrid';
import { TEAM_MEMBERS } from '@/lib/data/team-blueprint';

export const metadata = {
  title: 'Команда адвокатов и партнёров | Адвокатское бюро ETLEGIS',
  description: 'Команда адвокатов бюро ETLEGIS: признанные эксперты в уголовной защите бизнеса, арбитраже и налоговом праве.',
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

        {/* Blueprint Architecture Grid matching http://localhost:3013/team */}
        <TeamBlueprintGrid members={TEAM_MEMBERS} />
      </main>
      <Footer />
    </div>
  );
}
