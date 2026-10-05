'use client';

import React from 'react';
import Link from 'next/link';
import { articles } from '@/lib/data/mock-data';
import HeronButton from '@/components/ui/HeronButton';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function HeronBlog() {
  const displayArticles = articles.slice(0, 4);

  return (
    <section id="blog" className="relative w-full border-b border-[#D1D1CB] dark:border-[#222528] py-16 sm:py-24">
      <div className="mx-2 sm:mx-4 px-4 sm:px-8">
        
        {/* Section Header with Telemetry */}
        <ScrollReveal type="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D1D1CB] dark:border-[#222528] pb-6 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#FA3600] tracking-widest uppercase mb-2">
                <span>// 05 ЭКСПЕРТНАЯ АНАЛИТИКА</span>
                <span className="w-8 h-px bg-[#FA3600]" />
                <span className="text-[#7E7E7A]">ПРЕЦЕДЕНТЫ И РАЗБОРЫ СУДОВ</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold text-[#282828] dark:text-white tracking-tight">
                Блог и публикации
              </h2>
            </div>
            <div className="text-xs font-mono text-[#7E7E7A] text-right">
              [ ПРАВОВАЯ АНАЛИТИКА БЮРО ]
            </div>
          </div>
        </ScrollReveal>

        {/* 4-Cell Technical Grid */}
        <ScrollReveal type="fade-up" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#D1D1CB] dark:border-[#222528]">
            {displayArticles.map((article, index) => {
              return (
                <div
                  key={article.id}
                  className="relative group border-r border-b border-[#D1D1CB] dark:border-[#222528] bg-white/40 dark:bg-black/20 p-6 sm:p-8 flex flex-col justify-between hover:bg-white/70 dark:hover:bg-black/40 transition-colors duration-300"
                >
                  {/* Corner Tick */}
                  <span className="absolute top-3 right-3 text-xs font-mono text-[#7E7E7A] group-hover:text-[#FA3600] transition-colors">
                    ┘
                  </span>

                  <div>
                    {/* Top: Category & Date */}
                    <div className="flex items-center justify-between text-xs font-mono mb-4">
                      <span className="text-[#FA3600] uppercase">
                        {article.category}
                      </span>
                      <span className="text-[#7E7E7A]">
                        {article.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-sans font-bold text-[#282828] dark:text-white mb-3 group-hover:text-[#FA3600] transition-colors leading-snug">
                      {article.title}
                    </h3>

                    {/* Preview Text */}
                    <p className="text-xs sm:text-sm text-[#414140] dark:text-[#A0A09C] font-light leading-relaxed mb-6 line-clamp-3">
                      {article.previewText}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-4 border-t border-[#D1D1CB]/50 dark:border-[#222528]">
                    <HeronButton
                      variant="outline"
                      size="sm"
                      href={`/blog/${article.slug}`}
                      className="w-full text-center"
                    >
                      ЧИТАТЬ СТАТЬЮ
                    </HeronButton>
                  </div>

                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Bottom Hairline Separator & Centered Hero-Style Action Button */}
        <ScrollReveal type="fade-up" delay={0.2}>
          <div className="mt-8 pt-8 border-t border-[#D1D1CB] dark:border-[#222528] flex justify-center">
            <HeronButton
              variant="outline"
              size="lg"
              href="/blog"
              className="w-full sm:w-auto min-w-[280px] text-center"
            >
              ВСЕ ПУБЛИКАЦИИ БЮРО
            </HeronButton>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
