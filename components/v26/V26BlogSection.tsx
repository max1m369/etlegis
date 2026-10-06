'use client';

import React from 'react';
import Link from 'next/link';
import { articles } from '@/lib/data/mock-data';
import { ArrowUpRight } from 'lucide-react';

export default function V26BlogSection() {
  return (
    <section
      id="sec-blog"
      data-bg="dark"
      className="relative w-full bg-[#192430] text-[#F3F5F8] border-b border-white/10"
    >
      {/* 20% - 40% - 40% Architectural Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[20%_40%_40%]">
        
        {/* Col 1 (20%): Reserved rail for Chameleon Logo */}
        <div className="hidden lg:block w-full bg-[#192430] border-r border-white/10 relative z-20 pointer-events-none" />

        {/* Content Area across Cols 2 & 3 (Starts strictly at 20%) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col min-w-0">
          
          {/* Section Header */}
          <div className="p-6 lg:p-12 pb-6 lg:pb-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-[#C5A059] uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                <span>// 06 ПРЕСС-ЦЕНТР И ЭКСПЕРТИЗА</span>
                <span className="w-8 h-px bg-[#C5A059]" />
                <span className="text-[#94A3B8]">АНАЛИТИКА БЮРО</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight mb-2">
                Блог и публикации
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed font-light">
                Экспертные статьи, практические разборы прецедентов и комментарии адвокатов бюро в ведущих деловых изданиях.
              </p>
            </div>
            <Link
              href="/blog"
              className="font-mono text-xs text-[#C5A059] font-bold hover:underline transition-colors shrink-0"
            >
              Все публикации →
            </Link>
          </div>

          {/* 4 Square-like Editorial Articles (2x2 Grid) Perfectly Aligned into Equal-Height Rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 p-6 lg:p-12 gap-8 lg:gap-10">
            {articles.slice(0, 4).map((article) => (
              <article
                key={article.id}
                className="bg-[#243447] border border-white/15 rounded-sm flex flex-col justify-between shadow-sm hover:border-[#C5A059] transition-all group h-full"
              >
                {/* Top Header Block with crisp divider line & fixed min-height for uniform alignment */}
                <div className="p-6 sm:p-7 pb-5 border-b border-white/10 min-h-[115px] flex flex-col justify-between">
                  <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white leading-snug group-hover:text-[#C5A059] transition-colors mb-2">
                    {article.title}
                  </h3>
                  <div className="font-mono text-xs text-[#94A3B8] flex items-center gap-1.5">
                    <span>Автор:</span>
                    <strong className="text-white font-semibold">Алексей Бирюков</strong>
                  </div>
                </div>

                {/* Middle Content */}
                <div className="p-6 sm:p-7 py-5 flex-1 flex flex-col justify-between gap-4">
                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed line-clamp-3 font-light">
                    {article.previewText}
                  </p>

                  {/* Right-aligned 'Смотреть' link */}
                  <div className="flex justify-end pt-1">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-white hover:text-[#C5A059] transition-colors"
                    >
                      <span>Смотреть</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Bottom Line & Bottom-Left Nadzagolovok Box: Category on the left, Date aligned to RIGHT */}
                <div className="border-t border-white/15 flex items-stretch font-mono text-[11px]">
                  <div className="border-r border-white/15 px-4 py-2.5 text-[#C5A059] font-bold uppercase tracking-wider bg-white/5 shrink-0">
                    {article.category}
                  </div>
                  <div className="flex-1 px-4 py-2.5 text-[#94A3B8] text-[10px] flex items-center justify-end text-right font-mono">
                    {article.date}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Action Footer with line */}
          <div className="p-6 lg:p-12 pt-0 pb-12">
            <div className="pt-6 border-t-2 border-[#C5A059]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl font-light">
                Аналитические материалы, правовые позиции и комментарии адвокатов бюро к знаковым решениям судов.
              </p>
              <Link
                href="/blog"
                className="bg-white/10 hover:bg-[#C5A059] text-white hover:text-[#19212C] border border-white/20 hover:border-transparent px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all"
              >
                Все публикации бюро →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
