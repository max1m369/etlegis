import Link from 'next/link';
import { getAllArticles } from '@/lib/data/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Блог и аналитика | Адвокатское бюро Etlegis',
  description: 'Правовая аналитика, комментарии законодательства и оценка рисков для бизнеса от адвокатов Etlegis.',
};

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="flex flex-col min-h-screen bg-et-bg text-et-dark">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <div className="px-6 md:px-12 pt-16 max-w-7xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-et-accent font-semibold">Аналитика</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium mt-2 mb-6">Блог и публикации</h1>
          <p className="text-sm sm:text-base text-et-muted max-w-2xl font-light mb-16 leading-relaxed">
            Разбираем изменения судебной практики, налоговые последствия сделок и механизмы защиты активов компании.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((item) => (
              <Link
                key={item.id}
                href={`/blog/${item.slug}`}
                data-article-card
                className="bg-white border border-et-border p-8 flex flex-col justify-between hover:border-et-dark transition-all group rounded-[2px]"
              >
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-et-muted mb-4">
                    <span className="text-et-accent uppercase font-medium">{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h2 className="font-serif text-2xl font-medium mb-4 group-hover:text-et-accent transition-colors leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-et-muted font-light leading-relaxed">
                    {item.previewText}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-et-border flex justify-between items-center text-xs text-et-muted">
                  <span>Читать материал</span>
                  <span className="font-medium text-et-dark group-hover:underline">Читать статью →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
