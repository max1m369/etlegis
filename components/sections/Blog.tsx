"use client";

import React from "react";
import Link from "next/link";
import { articles } from "@/lib/data/mock-data";
import SpotlightButton from "@/components/ui/SpotlightButton";

export default function Blog() {
  return (
    <section id="blog" className="py-20 sm:py-28 bg-[#FFFFFF] border-t border-[#E2E2DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9B815C] font-mono font-semibold block mb-3">
              Экспертиза и практика
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-[#141517] leading-tight">
              Блог и комментарии в СМИ
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/blog">
              <SpotlightButton className="px-5 py-3 text-xs">
                Все публикации
              </SpotlightButton>
            </Link>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article) => (
            <article
              key={article.id}
              className="relative bg-[#FAFAF8] border border-[#E2E2DC] rounded-[2px] p-6 sm:p-8 flex flex-col justify-between shadow-subtle hover:shadow-card hover:border-[#141517] transition-all duration-300 group"
            >
              {/* Corner Brackets (Скобки юридического документа) */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#9B815C]/50 group-hover:border-[#507192] transition-colors pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#9B815C]/50 group-hover:border-[#507192] transition-colors pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#9B815C]/50 group-hover:border-[#507192] transition-colors pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#9B815C]/50 group-hover:border-[#507192] transition-colors pointer-events-none" />

              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#ECECE8]">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#9B815C] font-mono">
                    {article.category}
                  </span>
                  <span className="text-xs text-[#5E6267] font-mono">
                    {article.date}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-medium text-[#141517] mb-3 leading-snug group-hover:text-[#507192] transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5E6267] leading-relaxed line-clamp-3 mb-6">
                  {article.previewText}
                </p>
              </div>

              <div className="pt-4 border-t border-[#ECECE8]">
                <Link href={`/blog/${article.slug}`} className="block w-full">
                  <SpotlightButton className="w-full py-3 text-xs">
                    Читать статью
                  </SpotlightButton>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
