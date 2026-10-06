'use client';

import React from 'react';
import Link from 'next/link';
import { articles } from '@/lib/data/mock-data';

export default function V26BlogSection() {
  return (
    <section
      id="sec-blog"
      data-bg="light"
      className="relative w-full bg-[#EAE6DF] text-[#19212C] border-b border-[#19212C]/15"
    >
      {/* 20% - 40% - 40% Architectural Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[20%_40%_40%]">
        
        {/* Col 1 (20%): Reserved rail for Chameleon Logo */}
        <div className="hidden lg:block w-full border-r border-[#19212C]/10 pointer-events-none" />

        {/* Content Area across Cols 2 & 3 (Starts strictly at 20%) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col">
          
          {/* Section Header */}
          <div className="p-6 lg:p-12 pb-6 lg:pb-8 border-b border-[#19212C]/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-[#C5A059] uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                <span>// 05 ПРЕСС-ЦЕНТР И ЭКСПЕРТИЗА</span>
                <span className="w-8 h-px bg-[#C5A059]" />
                <span className="text-[#5A6472]">АНАЛИТИКА БЮРО</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#19212C] mb-2">
                Блог и публикации
              </h2>
              <p className="text-xs sm:text-sm text-[#5A6472] max-w-xl leading-relaxed">
                Экспертные статьи, практические разборы прецедентов и комментарии адвокатов бюро в ведущих деловых изданиях.
              </p>
            </div>
            <Link
              href="/blog"
              className="font-mono text-xs text-[#19212C] font-bold hover:text-[#C5A059] transition-colors shrink-0"
            >
              Все публикации →
            </Link>
          </div>

          {/* 4 Articles Grid (2x2 matching Cols 2 & 3: 40% + 40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#19212C]/10 p-6 lg:p-12 gap-8 lg:gap-12">
            
            {/* Col 2 (40%): Articles 1 & 2 */}
            <div className="flex flex-col gap-6">
              {articles.slice(0, 2).map((article) => (
                <article
                  key={article.id}
                  className="bg-white border border-[#19212C]/12 rounded-sm p-6 flex flex-col justify-between shadow-sm hover:border-[#C5A059] transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#19212C]/10">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A059] font-mono">
                        {article.category}
                      </span>
                      <span className="text-xs font-mono text-[#64748B]">
                        {article.date}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-heading font-semibold text-[#0F172A] mb-2 leading-snug group-hover:text-[#C5A059] transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 mb-4 font-light">
                      {article.previewText}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#19212C]/10">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-xs text-[#0F172A] font-bold hover:text-[#C5A059] transition-colors"
                    >
                      <span>Читать материал</span>
                      <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Col 3 (40%): Articles 3 & 4 */}
            <div className="flex flex-col gap-6">
              {articles.slice(2, 4).map((article) => (
                <article
                  key={article.id}
                  className="bg-white border border-[#19212C]/12 rounded-sm p-6 flex flex-col justify-between shadow-sm hover:border-[#C5A059] transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#19212C]/10">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A059] font-mono">
                        {article.category}
                      </span>
                      <span className="text-xs font-mono text-[#64748B]">
                        {article.date}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-heading font-semibold text-[#0F172A] mb-2 leading-snug group-hover:text-[#C5A059] transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#475569] leading-relaxed line-clamp-3 mb-4 font-light">
                      {article.previewText}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#19212C]/10">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1 font-mono text-xs text-[#0F172A] font-bold hover:text-[#C5A059] transition-colors"
                    >
                      <span>Читать материал</span>
                      <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

          </div>

          {/* Bottom Action Footer with line */}
          <div className="p-6 lg:p-12 pt-0">
            <div className="pt-6 border-t-2 border-[#19212C]/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-xs sm:text-sm text-[#5A6472] max-w-xl font-light">
                Аналитические материалы, правовые позиции и комментарии адвокатов бюро к знаковым решениям судов.
              </p>
              <Link
                href="/blog"
                className="bg-[#19212C] hover:bg-[#C5A059] text-white hover:text-[#19212C] px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all"
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
