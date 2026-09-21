import Link from 'next/link';
import { getAllArticles } from '@/lib/data/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SpotlightButton from '@/components/ui/SpotlightButton';

export const metadata = {
  title: 'Блог и аналитика | Адвокатское бюро Etlegis',
  description: 'Правовая аналитика, комментарии законодательства и оценка рисков для бизнеса от адвокатов Etlegis.',
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-[#141517]">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <div className="px-6 md:px-12 pt-8 max-w-7xl mx-auto">
          {/* Вместо «Аналитики» стрелка «Назад» */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-sm font-mono font-medium uppercase tracking-[0.18em] text-[#141517] hover:text-[#507192] transition-colors group"
            >
              <span className="text-xl font-bold transition-transform duration-300 group-hover:-translate-x-1.5">←</span>
              <span>Назад</span>
            </Link>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-medium mt-2 mb-6 text-[#141517]">Блог и публикации</h1>
          <p className="text-sm sm:text-base text-[#5E6267] max-w-2xl font-light mb-16 leading-relaxed">
            Разбираем изменения судебной практики, налоговые последствия сделок и механизмы защиты активов компании.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((item) => (
              <div
                key={item.id}
                data-article-card
                className="relative bg-[#FAFAF8] border border-[#E2E2DC] p-8 flex flex-col justify-between hover:border-[#141517] hover:shadow-card transition-all duration-300 group rounded-[2px]"
              >
                {/* Corner Brackets (Скобки юридического документа) */}
                <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-[#9B815C]/50 group-hover:border-[#507192] transition-colors pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-[#9B815C]/50 group-hover:border-[#507192] transition-colors pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b border-l border-[#9B815C]/50 group-hover:border-[#507192] transition-colors pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-[#9B815C]/50 group-hover:border-[#507192] transition-colors pointer-events-none" />

                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-[#5E6267] mb-4">
                    <span className="text-[#9B815C] uppercase font-semibold">{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h2 className="font-serif text-2xl font-medium mb-4 group-hover:text-[#507192] transition-colors leading-snug text-[#141517]">
                    <Link href={`/blog/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5E6267] font-light leading-relaxed">
                    {item.previewText}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#ECECE8]">
                  <Link href={`/blog/${item.slug}`} className="block w-full">
                    <SpotlightButton className="w-full py-3.5 text-xs">
                      Читать статью
                    </SpotlightButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
