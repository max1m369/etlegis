import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { articles, lawyers } from "@/lib/data/mock-data";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} — Блог Адвокатского бюро Etlegis`,
    description: article.previewText,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const author = lawyers.find((l) => l.id === article.authorId);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="flex-grow pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#5E6267] hover:text-[#141517] transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Все публикации</span>
            </Link>
          </div>

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-[#5E6267]">
              <span className="px-2.5 py-1 bg-white border border-[#E2E2DC] text-[10px] uppercase font-semibold text-[#9B815C] rounded-[2px]">
                {article.category}
              </span>
              <span className="font-mono">{article.date}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-heading font-medium text-[#141517] leading-tight mb-6">
              {article.title}
            </h1>

            {author && (
              <div className="flex items-center gap-3 pt-4 border-t border-[#ECECE8]">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#ECECE8]">
                  <img
                    src={author.photoUrl}
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <Link
                    href={`/team/${author.slug}`}
                    className="text-sm font-semibold text-[#141517] hover:text-[#9B815C] transition-colors"
                  >
                    {author.name}
                  </Link>
                  <span className="block text-xs text-[#5E6267]">{author.status}</span>
                </div>
              </div>
            )}
          </header>

          <div className="bg-white border border-[#E2E2DC] rounded-[2px] p-8 sm:p-12 shadow-subtle mb-12">
            <div className="prose prose-stone max-w-none text-[#141517] leading-relaxed space-y-6 text-sm sm:text-base whitespace-pre-line font-normal">
              {article.content}
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div className="p-8 bg-[#141517] text-white rounded-[2px] shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9B815C] font-semibold block mb-1">
                Юридическая помощь
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-medium">
                Остались вопросы по теме публикации?
              </h3>
              <p className="text-xs text-[#A1A4A8] mt-1 max-w-md">
                Свяжитесь с автором материала для консультации по вашей конкретной ситуации.
              </p>
            </div>
            <a
              href="#contacts"
              className="btn-legal-primary bg-white text-[#141517] hover:bg-[#ECECE8] px-8 py-3.5 text-xs uppercase tracking-wider shrink-0"
            >
              Обсудить ситуацию
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
