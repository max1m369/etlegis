'use client';

import React from 'react';
import Link from 'next/link';
import { cases } from '@/lib/data/mock-data';
import HeronButton from '@/components/ui/HeronButton';

export default function HeronCases() {
  const displayCases = cases.slice(0, 4);

  return (
    <section id="cases" className="relative w-full border-b border-[#D1D1CB] dark:border-[#222528] py-16 sm:py-24">
      <div className="mx-2 sm:mx-4 px-4 sm:px-8">
        
        {/* Section Header with Telemetry */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D1D1CB] dark:border-[#222528] pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FA3600] tracking-widest uppercase mb-2">
              <span>// 04 РЕЗУЛЬТАТЫ СУДЕБНЫХ ПРОЦЕССОВ</span>
              <span className="w-8 h-px bg-[#FA3600]" />
              <span className="text-[#7E7E7A]">АРБИТРАЖ И ЗАЩИТА АКТИВОВ</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-[#282828] dark:text-white tracking-tight">
              Выигранные дела
            </h2>
          </div>
          <div className="text-xs font-mono text-[#7E7E7A] text-right">
            [ 150+ УСПЕШНЫХ ПРОЦЕССОВ ]
          </div>
        </div>

        {/* 4-Cell Technical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#D1D1CB] dark:border-[#222528]">
          {displayCases.map((item, index) => {
            const formattedIndex = `0${index + 1}`;

            return (
              <div
                key={item.id}
                className="relative group border-r border-b border-[#D1D1CB] dark:border-[#222528] bg-white/40 dark:bg-black/20 p-6 sm:p-8 flex flex-col justify-between hover:bg-white/70 dark:hover:bg-black/40 transition-colors duration-300"
              >
                {/* Corner Tick */}
                <span className="absolute top-3 right-3 text-xs font-mono text-[#7E7E7A] group-hover:text-[#FA3600] transition-colors">
                  ┘
                </span>

                <div>
                  {/* Top Bar: Telemetry Index & Year */}
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className="text-[#7E7E7A]">
                      КЕЙС {formattedIndex} // {item.date}
                    </span>
                    <span className="text-[10px] bg-[#282828]/5 dark:bg-white/10 px-2 py-0.5 text-[#414140] dark:text-[#A0A09C] uppercase">
                      {item.courtInstance || 'АРБИТРАЖ'}
                    </span>
                  </div>

                  {/* Budget Highlight */}
                  <div className="mb-4">
                    <span className="text-[10px] font-mono text-[#7E7E7A] block uppercase tracking-wider">
                      ЗАЩИЩЕННЫЙ БЮДЖЕТ:
                    </span>
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-[#282828] dark:text-white group-hover:text-[#FA3600] transition-colors">
                      {item.claimAmount}
                    </span>
                  </div>

                  {/* Case Title */}
                  <h3 className="text-lg sm:text-xl font-sans font-bold text-[#282828] dark:text-white mb-3">
                    {item.title}
                  </h3>

                  {/* Challenge & Summary */}
                  <p className="text-xs sm:text-sm text-[#414140] dark:text-[#A0A09C] font-light leading-relaxed mb-4">
                    {item.challenge}
                  </p>

                  {/* Outcome Tag Box */}
                  <div className="border border-[#D1D1CB] dark:border-[#222528] bg-white/60 dark:bg-black/40 p-3 mb-6 text-xs font-mono">
                    <span className="text-[#FA3600] font-semibold block mb-1">
                      ✓ ИТОГ РАЗБИРАТЕЛЬСТВА:
                    </span>
                    <span className="text-[#414140] dark:text-[#A0A09C]">
                      {item.resultSummary}
                    </span>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-[#D1D1CB]/50 dark:border-[#222528]">
                  <HeronButton
                    variant="outline"
                    size="sm"
                    href={`/cases/${item.slug}`}
                    className="w-full text-center"
                  >
                    ДЕТАЛИ КЕЙСА
                  </HeronButton>
                </div>

              </div>
            );
          })}
        </div>

        {/* Section Bottom Action Row */}
        <div className="mt-8 pt-8 border-t border-[#D1D1CB] dark:border-[#222528] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <p className="text-sm font-mono text-[#7E7E7A] max-w-xl">
            Более 150 успешно завершённых судебных разбирательств и проектов по защите активов бизнеса в сложных арбитражных процессах.
          </p>
          <HeronButton
            variant="brand"
            size="md"
            href="/cases"
            className="shrink-0 w-full sm:w-auto"
          >
            СМОТРЕТЬ ВСЕ КЕЙСЫ
          </HeronButton>
        </div>

      </div>
    </section>
  );
}
