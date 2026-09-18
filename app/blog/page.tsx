import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { articles } from "@/lib/data/mock-data";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог и публикации — Адвокатское бюро Etlegis",
  description: "Экспертные комментарии, разбор прецедентов, анализ изменений законодательства в сфере уголовного и арбитражного права.",
};

export default function BlogIndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9B815C] font-semibold block mb-3">
              Правовая аналитика
            </span>
            <h1 className="text-4xl sm:text-5xl font-heading font-medium text-[#141517] mb-6">
              Блог и экспертные материалы
            </h1>
            <p className="text-base sm:text-lg text-[#5E6267] leading-relaxed">
              Практические рекомендации адвокатов по минимизации персональных и корпоративных рисков, налоговому комплаенсу и защите бизнеса.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white border border-[#E2E2DC] rounded-[2px] p-6 sm:p-8 flex flex-col justify-between shadow-subtle hover:shadow-card hover:border-[#141517] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#ECECE8]">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#9B815C]">
                      {article.category}
                    </span>
                    <span className="text-xs text-[#5E6267] font-mono">
                      {article.date}
                    </span>
                  </div>

                  <h2 className="text-xl font-heading font-medium text-[#141517] mb-3 leading-snug">
                    {article.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#5E6267] leading-relaxed line-clamp-3 mb-6">
                    {article.previewText}
                  </p>
                </div>

                <Link
                  href={`/blog/${article.slug}`}
                  className="btn-legal-primary py-3 text-xs uppercase tracking-wider text-center"
                >
                  Читать публикацию
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
