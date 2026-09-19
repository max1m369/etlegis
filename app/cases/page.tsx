import Link from 'next/link';
import { CasesCatalog } from '@/components/sections/CasesCatalog';
import { Button } from '@/components/ui/Button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getDynamicCases } from '@/lib/data/payload-api';

export const revalidate = 0;

export const metadata = {
  title: 'Успешные кейсы | Адвокатское бюро Etlegis',
  description: 'Более 100 успешных дел — ваша уверенность в надежных руках. Судебная практика, арбитраж, банкротство.',
};

export default async function CasesPage() {
  const dynamicCases = await getDynamicCases();

  return (
    <div className="flex flex-col min-h-screen bg-et-bg text-et-dark">
      <Header />
      <main className="flex-grow pt-20 sm:pt-24">
        {/* Hero-баннер в точности по оригиналу */}
        <section className="relative bg-et-dark text-white py-20 sm:py-28 px-6 md:px-12 overflow-hidden border-b border-white/10">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="text-xs uppercase tracking-widest text-et-accent font-semibold block mb-4">
              Судебная практика бюро
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium leading-tight">
              БОЛЕЕ 100 УСПЕШНЫХ ДЕЛ — ВАША УВЕРЕННОСТЬ В НАДЕЖНЫХ РУКАХ
            </h1>
            <p className="mt-6 text-sm sm:text-base text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
              Оставьте заявку прямо сейчас, и мы начнем решать даже самые сложные юридические задачи.
            </p>
            <div className="mt-8 flex justify-center">
              <Button className="bg-white text-et-dark hover:bg-neutral-200 border-white px-8 py-3.5 text-xs font-semibold uppercase tracking-wider">
                Обсудить ситуацию
              </Button>
            </div>
          </div>
        </section>

        {/* Каталог с верхним переключателем фильтров */}
        <CasesCatalog initialDynamicCases={dynamicCases} />
      </main>
      <Footer />
    </div>
  );
}
