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
    <section id="cases" className="py-20 sm:py-28 bg-[#F5F5F3] dark:bg-et-bg border-t border-[#E2E2DC] dark:border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9B815C] dark:text-accent-bronze font-semibold block mb-3 font-mono">
              Судебная практика и результаты
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-[#141517] dark:text-et-dark leading-tight">
              Выигранные дела доверителей
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/cases">
              <SpotlightButton className="px-5 py-3 text-xs">
                Все завершенные дела
              </SpotlightButton>
            </Link>
          </div>
        </div>

        {/* Victory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {items.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-bg-surface border border-[#E2E2DC] dark:border-border-subtle rounded-[2px] p-6 sm:p-8 flex flex-col justify-between shadow-subtle hover:shadow-card hover:border-[#141517] dark:hover:border-accent-bronze transition-all duration-300 group"
            >
              <div>
                {/* Practice Tag and Year */}
                <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[#ECECE8] dark:border-border-subtle">
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
                    <span className="font-heading text-3xl sm:text-4xl font-semibold text-[#141517] dark:text-et-dark tracking-tight">
                      {item.claimAmount}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-heading font-medium text-[#141517] dark:text-et-dark mb-3 leading-snug group-hover:text-[#507192] dark:group-hover:text-accent-bronze transition-colors">
                  {item.title}
                </h3>

                {/* Challenge Summary */}
                <p className="text-xs text-[#5E6267] dark:text-et-muted leading-relaxed mb-4 line-clamp-3">
                  {item.challenge}
                </p>

                {/* Victory Result Pill */}
                <div className="p-3 bg-[#F8F9FA] dark:bg-bg-subtle border border-[#ECECE8] dark:border-border-subtle rounded-[2px] mb-6">
                  <div className="flex items-center gap-1.5 text-[#141517] dark:text-et-dark font-semibold text-xs mb-1">
                    <Trophy size={13} className="text-[#9B815C] dark:text-accent-bronze" />
                    <span>Итог разбирательства:</span>
                  </div>
                  <p className="text-xs text-[#5E6267] dark:text-et-muted leading-relaxed">
                    {item.resultSummary}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#ECECE8] dark:border-border-subtle">
                <Link href={`/cases/${item.slug}`} className="block w-full">
                  <SpotlightButton className="w-full py-3 text-xs">
                    Детали кейса
                  </SpotlightButton>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
