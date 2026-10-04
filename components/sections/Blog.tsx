"use client";

import React from "react";
import Link from "next/link";
import { articles } from "@/lib/data/mock-data";
import SpotlightButton from "@/components/ui/SpotlightButton";

export default function Blog() {
  return (
    <section
      id="blog"
      className="w-full relative bg-et-bg text-et-dark border-t border-et-border py-16 md:py-24 px-[clamp(1.5rem,4vw,6rem)]"
      aria-labelledby="blog-title"
    >
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-14 items-start w-full">
        {/* 1. Левая колонка: Заголовок + подзаголовок (sticky) */}
        <div className="w-full lg:w-[32%] xl:w-[30%] lg:sticky lg:top-28 shrink-0">
          <h2
            id="blog-title"
            className="font-heading font-normal text-[clamp(2.5rem,4.4vw,6.5rem)] tracking-tight text-[#141517] dark:text-et-dark leading-[1.05] mb-4"
          >
            Блог
          </h2>
          <p className="text-sm text-[#5E6267] dark:text-et-muted font-light leading-relaxed max-w-sm mb-6">
            Экспертные статьи, практические разборы прецедентов и комментарии адвокатов бюро в ведущих деловых изданиях.
          </p>
        </div>

        {/* 2. Правая колонка: Кнопка «Все публикации» + 4 статьи (сетка 2х2) */}
        <div className="w-full lg:w-[68%] xl:w-[70%] flex flex-col gap-6">
          <div className="flex items-center justify-between sm:justify-end gap-4 pb-1">
            <Link href="/blog">
              <SpotlightButton className="px-5 py-2.5 text-xs font-mono tracking-wider uppercase">
                Все публикации
              </SpotlightButton>
            </Link>
          </div>

          {/* Сетка публикаций 2х2: в покое без видимых рамок/контейнеров, при наведении подсвечиваются белым и проявляют грани */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {articles.slice(0, 4).map((article) => (
              <article
                key={article.id}
                className="preview-card relative p-6 sm:p-7 flex flex-col justify-between group"
              >
                {/* Corner Brackets (Скобки юридического документа) - вырисовываются при наведении */}
                <div className="card-bracket absolute top-2 left-2 w-3 h-3 border-t border-l pointer-events-none" />
                <div className="card-bracket absolute top-2 right-2 w-3 h-3 border-t border-r pointer-events-none" />
                <div className="card-bracket absolute bottom-2 left-2 w-3 h-3 border-b border-l pointer-events-none" />
                <div className="card-bracket absolute bottom-2 right-2 w-3 h-3 border-b border-r pointer-events-none" />

                <div>
                  <div className="card-divider flex items-center justify-between pb-4 mb-4 border-b">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#9B815C] dark:text-accent-bronze font-mono">
                        {article.category}
                      </span>
                      {article.videoUrl && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono rounded-[2px] bg-red-500/10 text-red-600 dark:text-red-400 font-medium">
                          <svg className="w-2 h-2 fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <span>Видео</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#5E6267] dark:text-et-muted font-mono">
                      {article.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-medium text-[#141517] dark:text-et-dark mb-3 leading-snug group-hover:text-[#507192] dark:group-hover:text-accent-bronze transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#5E6267] dark:text-et-muted leading-relaxed line-clamp-3 mb-6 font-light">
                    {article.previewText}
                  </p>
                </div>

                <div className="card-divider pt-4 border-t">
                  <Link href={`/blog/${article.slug}`} className="block w-full">
                    <SpotlightButton className="w-full py-2.5 text-xs">
                      Читать статью
                    </SpotlightButton>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
