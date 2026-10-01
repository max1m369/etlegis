import Link from 'next/link';
import { getAllArticles } from '@/lib/data/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SpotlightButton from '@/components/ui/SpotlightButton';

export const metadata = {
  title: 'О нас в СМИ — публикации, достижения и новости | Адвокатское бюро Etlegis',
  description: 'Публикации о Etlegis в СМИ: достижения, новости и экспертные комментарии. Узнайте, как адвокатское бюро освещается в прессе и какие результаты признаны публично.',
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-main transition-colors duration-300">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <div className="px-4 sm:px-6 md:px-12 pt-8 max-w-7xl mx-auto">
          {/* Назад */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono font-medium uppercase tracking-[0.18em] text-text-muted hover:text-text-main transition-colors group"
            >
              <span className="text-lg font-bold transition-transform duration-300 group-hover:-translate-x-1.5">←</span>
              <span>Главная страница</span>
            </Link>
          </div>

          {/* Заголовок секции 1-в-1 как на etlegis.ru/blog */}
          <div className="mb-12 sm:mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-accent-bronze font-mono font-semibold block mb-3">
              Пресса и правовая аналитика
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium mt-2 mb-6 text-text-main uppercase tracking-tight leading-tight">
              О нас в СМИ: достижения и новости
            </h1>
            <div className="w-24 h-0.5 bg-accent-bronze mb-6" />
            <p className="text-sm sm:text-base text-text-muted max-w-3xl font-light leading-relaxed">
              Публикации о деятельности бюро «Этлегис» в ведущих изданиях: комментарии к изменениям законодательства, видеозаписи профильных вебинаров, анализ налоговой и судебной практики защиты бизнеса.
            </p>
          </div>

          {/* Сетка статей: 2 колонки как на etlegis.ru */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {articles.map((item) => (
              <div
                key={item.id}
                data-article-card
                className="relative bg-bg-surface border border-border-subtle p-6 sm:p-8 flex flex-col justify-between hover:border-text-main hover:shadow-card transition-all duration-300 group rounded-[2px]"
              >
                {/* Угловые скобки юридического стиля */}
                <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-accent-bronze/60 group-hover:border-text-main transition-colors pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-accent-bronze/60 group-hover:border-text-main transition-colors pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b border-l border-accent-bronze/60 group-hover:border-text-main transition-colors pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-accent-bronze/60 group-hover:border-text-main transition-colors pointer-events-none" />

                <div>
                  {/* Верхняя плашка: Категория, видео-бейдж и дата */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono mb-5 pb-4 border-b border-border-subtle">
                    <div className="flex items-center gap-3">
                      <span className="text-accent-bronze uppercase font-semibold tracking-wider">
                        {item.category}
                      </span>
                      {item.videoUrl && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono rounded-[2px] bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-medium">
                          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <span>Видео</span>
                        </span>
                      )}
                    </div>
                    <span className="text-text-muted">{item.date}</span>
                  </div>

                  {/* Заголовок */}
                  <h2 className="font-serif text-xl sm:text-2xl font-medium mb-4 group-hover:text-accent-bronze transition-colors leading-snug text-text-main uppercase tracking-tight">
                    <Link href={`/blog/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h2>

                  {/* Лид-описание */}
                  <p className="text-xs sm:text-sm text-text-muted font-light leading-relaxed mb-6">
                    {item.previewText}
                  </p>
                </div>

                {/* Нижняя панель действий */}
                <div className="mt-6 pt-5 border-t border-border-subtle flex items-center justify-between gap-4">
                  <Link href={`/blog/${item.slug}`} className="flex-grow sm:flex-grow-0">
                    <SpotlightButton className="w-full sm:w-auto px-6 py-3 text-xs">
                      Открыть публикацию
                    </SpotlightButton>
                  </Link>

                  <Link
                    href={`/blog/${item.slug}`}
                    aria-label={`Перейти к статье ${item.title}`}
                    className="w-10 h-10 rounded-full border border-border-subtle bg-bg-surface flex items-center justify-center text-text-main group-hover:bg-text-main group-hover:text-bg-surface group-hover:border-text-main transition-all duration-300 flex-shrink-0 shadow-sm"
                  >
                    <svg className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
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
