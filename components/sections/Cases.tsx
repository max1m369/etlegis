"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cases as mockCases, practices } from "@/lib/data/mock-data";
import { getDynamicCases } from "@/lib/data/payload-api";
import { Trophy } from "lucide-react";
import SpotlightButton from "@/components/ui/SpotlightButton";

export default function Cases() {
  const [items, setItems] = useState(mockCases);

  useEffect(() => {
    getDynamicCases().then((res) => {
      if (res && res.length > 0) {
        const sorted = [...res].sort((a, b) => Number(b.date || 0) - Number(a.date || 0));
        setItems(sorted);
      }
    });
  }, []);

  const getPracticeTitle = (practiceId: string) => {
    return practices.find((p) => p.id === practiceId)?.title || "Арбитражная практика";
  };

  return (
    <section
      id="cases"
      className="w-full relative bg-et-bg text-et-dark border-t border-et-border py-16 md:py-24 px-[clamp(1.5rem,4vw,6rem)]"
      aria-labelledby="cases-title"
    >
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-14 items-start w-full">
        {/* 1. Левая колонка: Заголовок + подзаголовок (sticky) */}
        <div className="w-full lg:w-[32%] xl:w-[30%] lg:sticky lg:top-28 shrink-0">
          <h2
            id="cases-title"
            className="font-heading font-normal text-[clamp(2.5rem,4.4vw,6.5rem)] tracking-tight text-[#141517] dark:text-et-dark leading-[1.05] mb-4"
          >
            Выигранные
            <br className="hidden sm:inline" /> дела
          </h2>
          <p className="text-sm text-[#5E6267] dark:text-et-muted font-light leading-relaxed max-w-sm mb-6">
            Партнеры и адвокаты бюро добиваются победы в арбитражных судах всех инстанций, защищая активы и репутацию доверителей.
          </p>
        </div>

        {/* 2. Правая колонка: Кнопка «Смотреть все» + 4 кейса (сетка 2х2) */}
        <div className="w-full lg:w-[68%] xl:w-[70%] flex flex-col gap-6">
          <div className="flex items-center justify-between sm:justify-end gap-4 pb-1">
            <Link href="/cases">
              <SpotlightButton className="px-5 py-2.5 text-xs font-mono tracking-wider uppercase">
                Смотреть все
              </SpotlightButton>
            </Link>
          </div>

          {/* Сетка кейсов 2х2: в покое без видимых рамок/контейнеров, при наведении подсвечиваются белым и проявляют грани */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {items.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="preview-card p-6 sm:p-7 flex flex-col justify-between group"
              >
                <div>
                  {/* Practice Tag and Year */}
                  <div className="card-divider flex items-center justify-between gap-2 pb-4 mb-4 border-b">
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-[#9B815C] dark:text-accent-bronze truncate font-mono">
                      {getPracticeTitle(item.practiceId)}
                    </span>
                    <span className="text-xs font-mono text-[#5E6267] dark:text-et-muted shrink-0">
                      {item.date}
                    </span>
                  </div>

                  {/* Big Budget / Claim Amount */}
                  {item.claimAmount && (
                    <div className="mb-4">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#5E6267] dark:text-et-muted block mb-0.5">
                        Защищенный бюджет:
                      </span>
                      <span className="font-heading text-3xl sm:text-4xl font-normal text-[#141517] dark:text-et-dark tracking-tight">
                        {item.claimAmount}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-heading font-medium text-[#141517] dark:text-et-dark mb-3 leading-snug group-hover:text-[#507192] dark:group-hover:text-accent-bronze transition-colors">
                    {item.title}
                  </h3>

                  {/* Challenge Summary */}
                  <p className="text-xs text-[#5E6267] dark:text-et-muted leading-relaxed mb-4 line-clamp-3 font-light">
                    {item.challenge}
                  </p>

                  {/* Victory Result Pill: в покое мягко сливается, при ховере выделяется */}
                  <div className="card-result-pill p-3 rounded-[2px] mb-6">
                    <div className="flex items-center gap-1.5 text-[#141517] dark:text-et-dark font-semibold text-xs mb-1">
                      <Trophy size={13} className="text-[#9B815C] dark:text-accent-bronze shrink-0" />
                      <span>Итог разбирательства:</span>
                    </div>
                    <p className="text-xs text-[#5E6267] dark:text-et-muted leading-relaxed">
                      {item.resultSummary}
                    </p>
                  </div>
                </div>

                <div className="card-divider pt-4 border-t">
                  <Link href={`/cases/${item.slug}`} className="block w-full">
                    <SpotlightButton className="w-full py-2.5 text-xs">
                      Детали кейса
                    </SpotlightButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
