'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cases as mockCases, practices } from '@/lib/data/mock-data';
import { getDynamicCases } from '@/lib/data/payload-api';
import { Trophy, ArrowUpRight } from 'lucide-react';

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
    return practices.find((p) => p.id === practiceId)?.title || 'Корпоративные споры';
  };

  return (
    <section
      id="sec-cases"
      data-bg="light"
      className="relative w-full bg-[#EAE6DF] text-[#19212C] border-b border-[#19212C]/15"
    >
      {/* 20% - 40% - 40% Architectural Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[20%_40%_40%]">
        
        {/* Col 1 (20%): Reserved rail for Chameleon Logo */}
        <div className="hidden lg:block w-full bg-[#EAE6DF] border-r border-[#19212C]/10 relative z-20 pointer-events-none" />

        {/* Content Area across Cols 2 & 3 (Starts strictly at 20%) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col min-w-0">
          
          {/* Section Header */}
          <div className="p-6 lg:p-12 pb-6 lg:pb-8 border-b border-[#19212C]/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-[#C5A059] uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                <span>// 05 ПРЕЦЕДЕНТЫ И СУДЕБНАЯ ПРАКТИКА</span>
                <span className="w-8 h-px bg-[#C5A059]" />
                <span className="text-[#5A6472]">АРБИТРАЖ И КАССАЦИЯ</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#19212C] tracking-tight leading-tight mb-2">
                Выигранные дела
              </h2>
              <p className="text-xs sm:text-sm text-[#5A6472] max-w-xl leading-relaxed font-light">
                Партнёры и адвокаты бюро добиваются победы в арбитражных судах всех инстанций, защищая активы и репутацию доверителей.
              </p>
            </div>
            <Link
              href="/cases"
              className="font-mono text-xs text-[#19212C] hover:text-[#C5A059] transition-colors shrink-0 font-bold"
            >
              Смотреть все кейсы →
            </Link>
          </div>

          {/* 4 Square-like Editorial Cards (2x2 Grid) based on Reference 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#19212C]/10 p-6 lg:p-12 gap-8 lg:gap-10">
            
            {/* Col 2 (40%): Cards 1 & 2 */}
            <div className="flex flex-col gap-8">
              {items.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#19212C]/15 rounded-sm flex flex-col justify-between shadow-sm hover:border-[#C5A059] transition-all group aspect-auto min-h-[360px]"
                >
                  {/* Top Header Block with crisp divider line: Clean titles & amounts only */}
                  <div className="p-6 sm:p-7 pb-5 border-b border-[#19212C]/10">
                    {item.claimAmount && (
                      <div className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-2">
                        {item.claimAmount}
                      </div>
                    )}

                    <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#0F172A] leading-snug group-hover:text-[#C5A059] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Middle Content: Challenge & Result */}
                  <div className="p-6 sm:p-7 py-5 flex-1 flex flex-col justify-between gap-4">
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3 font-light">
                      {item.challenge}
                    </p>

                    <div className="bg-[#F8F7F4] border border-[#19212C]/10 p-3.5 rounded-xs flex items-start gap-2.5">
                      <Trophy size={15} className="text-[#C5A059] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-mono text-[#0F172A] font-semibold mb-0.5">
                          Итог разбирательства:
                        </div>
                        <p className="text-xs text-[#5A6472] leading-relaxed">
                          {item.resultSummary}
                        </p>
                      </div>
                    </div>

                    {/* Read More button right-aligned before bottom tag box */}
                    <div className="flex justify-end pt-1">
                      <Link
                        href={`/cases/${item.slug}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#0F172A] hover:text-[#C5A059] transition-colors"
                      >
                        <span>Смотреть</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Line & Bottom-Left Nadzagolovok Box: Category on the left, Date on the right */}
                  <div className="border-t border-[#19212C]/15 flex items-stretch font-mono text-[11px]">
                    <div className="border-r border-[#19212C]/15 px-4 py-2.5 text-[#C5A059] font-bold uppercase tracking-wider bg-[#F8FAFC]">
                      {getPracticeTitle(item.practiceId)}
                    </div>
                    <div className="px-4 py-2.5 text-[#64748B] text-[11px] flex items-center font-mono">
                      {item.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Col 3 (40%): Cards 3 & 4 */}
            <div className="flex flex-col gap-8 md:pl-8">
              {items.slice(2, 4).map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#19212C]/15 rounded-sm flex flex-col justify-between shadow-sm hover:border-[#C5A059] transition-all group aspect-auto min-h-[360px]"
                >
                  {/* Top Header Block with crisp divider line: Clean titles & amounts only */}
                  <div className="p-6 sm:p-7 pb-5 border-b border-[#19212C]/10">
                    {item.claimAmount && (
                      <div className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-2">
                        {item.claimAmount}
                      </div>
                    )}

                    <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#0F172A] leading-snug group-hover:text-[#C5A059] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Middle Content: Challenge & Result */}
                  <div className="p-6 sm:p-7 py-5 flex-1 flex flex-col justify-between gap-4">
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3 font-light">
                      {item.challenge}
                    </p>

                    <div className="bg-[#F8F7F4] border border-[#19212C]/10 p-3.5 rounded-xs flex items-start gap-2.5">
                      <Trophy size={15} className="text-[#C5A059] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-mono text-[#0F172A] font-semibold mb-0.5">
                          Итог разбирательства:
                        </div>
                        <p className="text-xs text-[#5A6472] leading-relaxed">
                          {item.resultSummary}
                        </p>
                      </div>
                    </div>

                    {/* Read More button right-aligned before bottom tag box */}
                    <div className="flex justify-end pt-1">
                      <Link
                        href={`/cases/${item.slug}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#0F172A] hover:text-[#C5A059] transition-colors"
                      >
                        <span>Смотреть</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Line & Bottom-Left Nadzagolovok Box: Category on the left, Date on the right */}
                  <div className="border-t border-[#19212C]/15 flex items-stretch font-mono text-[11px]">
                    <div className="border-r border-[#19212C]/15 px-4 py-2.5 text-[#C5A059] font-bold uppercase tracking-wider bg-[#F8FAFC]">
                      {getPracticeTitle(item.practiceId)}
                    </div>
                    <div className="px-4 py-2.5 text-[#64748B] text-[11px] flex items-center font-mono">
                      {item.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom Action Footer with line */}
          <div className="p-6 lg:p-12 pt-0 pb-12">
            <div className="pt-6 border-t-2 border-[#C5A059]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-xs sm:text-sm text-[#5A6472] max-w-xl font-light">
                Все судебные акты подтверждены ссылками на картотеку арбитражных дел (kad.arbitr.ru).
              </p>
              <Link
                href="/cases"
                className="bg-[#19212C] hover:bg-[#C5A059] text-white hover:text-[#19212C] border border-[#19212C] hover:border-transparent px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
              >
                Все судебные кейсы бюро →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
