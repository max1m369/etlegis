'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cases as mockCases, practices } from '@/lib/data/mock-data';
import { getDynamicCases } from '@/lib/data/payload-api';
import { Trophy } from 'lucide-react';

export default function V26CasesSection() {
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
    return practices.find((p) => p.id === practiceId)?.title || 'Арбитражная практика';
  };

  return (
    <section
      id="sec-cases"
      data-bg="dark"
      className="relative w-full bg-[#192430] text-[#F3F5F8] border-b border-white/10"
    >
      {/* 20% - 40% - 40% Architectural Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[20%_40%_40%]">
        
        {/* Col 1 (20%): Reserved rail for Chameleon Logo */}
        <div className="hidden lg:block w-full border-r border-white/10 pointer-events-none" />

        {/* Content Area across Cols 2 & 3 (Starts strictly at 20%) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col">
          
          {/* Section Header */}
          <div className="p-6 lg:p-12 pb-6 lg:pb-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-[#C5A059] uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                <span>// 04 ПРЕЦЕДЕНТЫ И СУДЕБНАЯ ПРАКТИКА</span>
                <span className="w-8 h-px bg-[#C5A059]" />
                <span className="text-[#94A3B8]">АРБИТРАЖ И КАССАЦИЯ</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-white mb-2">
                Выигранные дела
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed">
                Партнёры и адвокаты бюро добиваются победы в арбитражных судах всех инстанций, защищая активы и репутацию доверителей.
              </p>
            </div>
            <Link
              href="/cases"
              className="font-mono text-xs text-[#C5A059] hover:underline shrink-0"
            >
              Смотреть все кейсы →
            </Link>
          </div>

          {/* 4 Cases Grid (2x2 matching Cols 2 & 3: 40% + 40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10 p-6 lg:p-12 gap-8 lg:gap-12">
            
            {/* Col 2 (40%): Cases 1 & 2 */}
            <div className="flex flex-col gap-6">
              {items.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="bg-[#243447] border border-white/12 rounded-sm p-6 flex flex-col justify-between shadow-sm hover:border-[#C5A059] transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A059] font-mono">
                        {getPracticeTitle(item.practiceId)}
                      </span>
                      <span className="text-xs font-mono text-[#94A3B8]">
                        {item.date}
                      </span>
                    </div>

                    {item.claimAmount && (
                      <div className="mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] block mb-0.5">
                          Защищённый бюджет:
                        </span>
                        <span className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                          {item.claimAmount}
                        </span>
                      </div>
                    )}

                    <h3 className="text-base sm:text-lg font-heading font-medium text-white mb-2 leading-snug group-hover:text-[#C5A059] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#CBD5E1] leading-relaxed mb-4 line-clamp-3 font-light">
                      {item.challenge}
                    </p>
                  </div>

                  <div className="bg-[#1C2836] border border-white/10 p-3 rounded-xs">
                    <div className="flex items-center gap-1.5 text-white font-semibold text-xs mb-1">
                      <Trophy size={13} className="text-[#C5A059] shrink-0" />
                      <span>Итог разбирательства:</span>
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {item.resultSummary}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Col 3 (40%): Cases 3 & 4 */}
            <div className="flex flex-col gap-6">
              {items.slice(2, 4).map((item) => (
                <div
                  key={item.id}
                  className="bg-[#243447] border border-white/12 rounded-sm p-6 flex flex-col justify-between shadow-sm hover:border-[#C5A059] transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#C5A059] font-mono">
                        {getPracticeTitle(item.practiceId)}
                      </span>
                      <span className="text-xs font-mono text-[#94A3B8]">
                        {item.date}
                      </span>
                    </div>

                    {item.claimAmount && (
                      <div className="mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] block mb-0.5">
                          Защищённый бюджет:
                        </span>
                        <span className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
                          {item.claimAmount}
                        </span>
                      </div>
                    )}

                    <h3 className="text-base sm:text-lg font-heading font-medium text-white mb-2 leading-snug group-hover:text-[#C5A059] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#CBD5E1] leading-relaxed mb-4 line-clamp-3 font-light">
                      {item.challenge}
                    </p>
                  </div>

                  <div className="bg-[#1C2836] border border-white/10 p-3 rounded-xs">
                    <div className="flex items-center gap-1.5 text-white font-semibold text-xs mb-1">
                      <Trophy size={13} className="text-[#C5A059] shrink-0" />
                      <span>Итог разбирательства:</span>
                    </div>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {item.resultSummary}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom Action Footer with line */}
          <div className="p-6 lg:p-12 pt-0">
            <div className="pt-6 border-t-2 border-[#C5A059]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl font-light">
                Все судебные акты подтверждены ссылками на картотеку арбитражных дел (kad.arbitr.ru).
              </p>
              <Link
                href="/cases"
                className="bg-white/10 hover:bg-[#C5A059] text-white hover:text-[#19212C] px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all"
              >
                Все судебные кейсы →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
