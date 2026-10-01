import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getArticleBySlug, getAllArticles } from '@/lib/data/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import SpotlightButton from '@/components/ui/SpotlightButton';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  const params: { slug: string }[] = [];
  articles.forEach((article) => {
    params.push({ slug: article.slug });
    if (article.aliases) {
      article.aliases.forEach((alias) => {
        params.push({ slug: alias });
      });
    }
  });
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Публикация не найдена | Адвокатское бюро Etlegis',
    };
  }

  return {
    title: `${article.title} | Адвокатское бюро Etlegis`,
    description: article.previewText,
    openGraph: {
      title: article.title,
      description: article.previewText,
      type: 'article',
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  // Другие статьи для блока рекомендаций внизу
  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.slug !== article.slug)
    .slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-main transition-colors duration-300">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <article className="px-4 sm:px-6 md:px-12 pt-8 max-w-4xl mx-auto">
          {/* Навигация назад */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono font-medium uppercase tracking-[0.18em] text-text-muted hover:text-text-main transition-colors group"
            >
              <span className="text-lg font-bold transition-transform duration-300 group-hover:-translate-x-1.5">←</span>
              <span>Все публикации в СМИ</span>
            </Link>
          </div>

          {/* Мета-заголовок */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#5E6267] dark:text-et-muted uppercase mb-5 pb-4 border-b border-[#ECECE8] dark:border-border-subtle">
            <span className="text-[#9B815C] dark:text-accent-bronze font-semibold tracking-wider">
              {article.category}
            </span>
            <span>• {article.date}</span>
            {article.videoUrl && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono rounded-[2px] bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-medium ml-auto">
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Видеоматериал</span>
              </span>
            )}
          </div>

          {/* Название статьи */}
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium leading-tight mb-8 text-[#141517] dark:text-et-dark">
            {article.title}
          </h1>

          {/* Лид-синопсис в карточке */}
          <div className="relative bg-[#FAFAF8] dark:bg-bg-surface border-l-2 border-[#9B815C] dark:border-accent-bronze p-6 sm:p-8 mb-10 text-sm sm:text-base font-light text-[#141517] dark:text-et-dark leading-relaxed rounded-r-[2px] shadow-sm">
            <p className="italic text-[#333] dark:text-[#DDD]">
              {article.previewText}
            </p>
          </div>

          {/* Основной текст статьи */}
          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm sm:text-base text-[#2E3033] dark:text-et-muted font-light leading-relaxed space-y-6 mb-12">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Встроенное видео (если есть) */}
          {article.videoUrl && (
            <div className="my-12">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono font-medium text-[#9B815C] dark:text-accent-bronze uppercase tracking-wider">
                <svg className="w-4 h-4 text-red-600 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Видеозапись выступления / вебинара</span>
              </div>
              <div className="relative aspect-video w-full rounded-[2px] overflow-hidden border border-[#E2E2DC] dark:border-border-subtle bg-black shadow-xl">
                <iframe
                  src={article.videoUrl}
                  title={article.title}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Ссылка на полную статью (если есть) */}
          {article.fullArticleUrl && (
            <div className="my-10 p-6 sm:p-8 bg-[#FAFAF8] dark:bg-bg-surface border border-[#E2E2DC] dark:border-border-subtle rounded-[2px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative shadow-subtle group">
              {/* Угловые скобки */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#9B815C]/50 dark:border-accent-bronze/50 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#9B815C]/50 dark:border-accent-bronze/50 pointer-events-none" />

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#9B815C]/10 dark:bg-accent-bronze/10 text-[#9B815C] dark:text-accent-bronze flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <div className="font-serif text-base sm:text-lg font-medium text-[#141517] dark:text-et-dark">
                    Полная версия материала опубликована в «Правовест Аудит»
                  </div>
                  <p className="text-xs sm:text-sm text-[#5E6267] dark:text-et-muted font-light mt-1">
                    Ознакомьтесь с расширенной статьей, таблицами рисков и нормативным обоснованием на ресурсе партнера.
                  </p>
                </div>
              </div>
              <a
                href={article.fullArticleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-mono font-medium uppercase tracking-wider bg-[#141517] text-white hover:bg-[#507192] dark:bg-accent-bronze dark:hover:bg-accent-bronze/80 dark:text-et-dark rounded-[2px] transition-colors whitespace-nowrap shadow-sm group/btn"
              >
                <span>Полная статья</span>
                <span className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">↗</span>
              </a>
            </div>
          )}

          {/* Эксперт / Автор */}
          <div className="mt-12 p-6 sm:p-8 bg-[#FAFAF8] dark:bg-bg-surface border border-[#E2E2DC] dark:border-border-subtle rounded-[2px] flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src="/team/t1.webp"
              alt="Алексей Бирюков"
              className="w-24 h-28 sm:w-28 sm:h-32 object-cover rounded-[2px] border border-[#E2E2DC] dark:border-border-subtle filter grayscale contrast-110 flex-shrink-0"
            />
            <div className="flex-grow text-center sm:text-left">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#9B815C] dark:text-accent-bronze font-semibold">
                Спикер и эксперт бюро
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#141517] dark:text-et-dark mt-1">
                Алексей Сергеевич Бирюков
              </h3>
              <p className="text-xs sm:text-sm text-[#5E6267] dark:text-et-muted font-light mt-1.5 mb-4 leading-relaxed">
                Управляющий партнёр адвокатского бюро «Этлегис», адвокат АП г. Москвы. Специализация: комплексная защита бизнеса и топ-менеджмента при налоговых и уголовных проверках.
              </p>
              <Link
                href="/team/biryukov-alexey"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#141517] dark:text-et-dark hover:text-[#507192] dark:hover:text-accent-bronze font-semibold transition-colors"
              >
                <span>Открыть досье адвоката</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Консультационный блок CTA */}
          <div className="mt-12 bg-white dark:bg-bg-surface border border-[#E2E2DC] dark:border-border-subtle p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 rounded-[2px] shadow-sm">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#141517] dark:text-et-dark">
                Нужна консультация по теме публикации?
              </h3>
              <p className="text-xs sm:text-sm text-[#5E6267] dark:text-et-muted mt-1 font-light">
                Адвокаты бюро подготовят предварительную оценку правовых рисков для вашей компании.
              </p>
            </div>
            <Button className="flex-shrink-0 px-6 py-3.5 text-xs">
              Обсудить ситуацию
            </Button>
          </div>

          {/* Другие публикации */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[#ECECE8] dark:border-border-subtle">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-2xl font-medium text-[#141517] dark:text-et-dark uppercase tracking-tight">
                  Другие публикации и выступления
                </h3>
                <Link
                  href="/blog"
                  className="text-xs font-mono uppercase tracking-wider text-[#9B815C] dark:text-accent-bronze hover:underline"
                >
                  Все статьи →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    className="p-6 bg-[#FAFAF8] dark:bg-bg-surface border border-[#E2E2DC] dark:border-border-subtle rounded-[2px] flex flex-col justify-between hover:border-[#141517] dark:hover:border-accent-bronze transition-colors group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                        <span className="text-[#9B815C] dark:text-accent-bronze uppercase font-semibold">
                          {rel.category}
                        </span>
                        <span className="text-[#5E6267] dark:text-et-muted">{rel.date}</span>
                      </div>
                      <h4 className="font-serif text-lg font-medium text-[#141517] dark:text-et-dark group-hover:text-[#507192] dark:group-hover:text-accent-bronze transition-colors mb-3 leading-snug">
                        <Link href={`/blog/${rel.slug}`}>
                          {rel.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-[#5E6267] dark:text-et-muted font-light line-clamp-3 mb-4 leading-relaxed">
                        {rel.previewText}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#ECECE8] dark:border-border-subtle">
                      <Link href={`/blog/${rel.slug}`}>
                        <SpotlightButton className="w-full py-2.5 text-[11px]">
                          Читать статью
                        </SpotlightButton>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
