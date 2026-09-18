import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getAllArticles } from '@/lib/data/queries';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  return (
    <div className="flex flex-col min-h-screen bg-et-bg text-et-dark">
      <Header />
      <main className="flex-grow pt-28 pb-24">
        <article className="px-6 md:px-12 pt-16 max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/blog" className="text-xs uppercase tracking-widest text-et-muted hover:text-et-dark transition-colors">
              ← Все статьи
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-et-muted uppercase mb-4">
            <span className="text-et-accent font-medium">{article.category}</span>
            <span>• {article.date}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-medium leading-tight mb-8">
            {article.title}
          </h1>

          <div className="border-t border-b border-et-border py-6 mb-10 text-sm sm:text-base font-light text-et-dark leading-relaxed italic">
            {article.previewText}
          </div>

          <div className="prose prose-neutral max-w-none text-sm sm:text-base text-et-muted font-light leading-relaxed space-y-6">
            <p>{article.content}</p>
          </div>

          <div className="mt-16 bg-white border border-et-border p-8 flex flex-col sm:flex-row justify-between items-center gap-6 rounded-[2px]">
            <div>
              <h3 className="font-serif text-xl font-medium">Нужна консультация по теме статьи?</h3>
              <p className="text-xs text-et-muted mt-1 font-light">Юристы бюро подготовят оценку правовых рисков.</p>
            </div>
            <Button className="flex-shrink-0">Обсудить ситуацию</Button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
