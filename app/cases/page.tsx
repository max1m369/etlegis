import Link from 'next/link';
import { CasesCatalog } from '@/components/sections/CasesCatalog';
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
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-[#141517]">
      <Header />
      <main className="flex-grow pt-24 sm:pt-28 w-full">
        <div className="w-full px-4 sm:px-8 lg:px-[15vw]">
          {/* Кнопка "На главную" в шапке раздела кейсов */}
          <div className="pt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-sm font-mono font-medium uppercase tracking-[0.18em] text-[#141517] hover:text-[#507192] transition-colors group"
            >
              <span className="text-xl font-bold transition-transform duration-300 group-hover:-translate-x-1.5">←</span>
              <span>На главную</span>
            </Link>
          </div>

          {/* Hero-баннер кейсов */}
          <section className="relative text-[#141517] py-12 sm:py-16 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <h1 className="font-heading text-3xl sm:text-5xl font-medium leading-tight text-[#141517]">
                БОЛЕЕ 100 УСПЕШНЫХ ДЕЛ — ВАША УВЕРЕННОСТЬ В НАДЕЖНЫХ РУКАХ
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#5E6267] font-light max-w-2xl mx-auto leading-relaxed">
                Стратегическая защита интересов доверителей в арбитражных судах, банкротстве и спорах высшей категории сложности.
              </p>
            </div>
          </section>

          {/* Каталог с фильтрацией и обновленными карточками кейсов */}
          <CasesCatalog initialDynamicCases={dynamicCases} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
