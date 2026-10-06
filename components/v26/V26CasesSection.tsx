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
      data-bg="dark"
      className="relative w-full bg-[#192430] text-[#F3F5F8] border-b border-white/10"
    >
      {/* 20% - 40% - 40% Architectural Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[20%_40%_40%]">
        
        {/* Col 1 (20%): Reserved rail for Chameleon Logo */}
        <div className="hidden lg:block w-full border-r border-white/10 pointer-events-none" />

        {/* Content Area across Cols 2 & 3 (Starts strictly at 20%) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col min-w-0">
          
          {/* Section Header */}
          <div className="p-6 lg:p-12 pb-6 lg:pb-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-[#C5A059] uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                <span>// 05 ПРЕЦЕДЕНТЫ И СУДЕБНАЯ ПРАКТИКА</span>
                <span className="w-8 h-px bg-[#C5A059]" />
                <span className="text-[#94A3B8]">АРБИТРАЖ И КАССАЦИЯ</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight mb-2">
                Выигранные дела
              </h2>
              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed font-light">
                Партнёры и адвокаты бюро добиваются победы в арбитражных судах всех инстанций, защищая активы и репутацию доверителей.
              </p>
            </div>
            <Link
              href="/cases"
              className="font-mono text-xs text-[#C5A059] hover:underline shrink-0 font-semibold"
            >
              Смотреть все кейсы →
            </Link>
          </div>

          {/* 4 Square-like Editorial Cards (2x2 Grid) based on Reference 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 p-6 lg:p-12 gap-8 lg:gap-10">
            
            {/* Col 2 (40%): Cards 1 & 2 */}
            <div className="flex flex-col gap-8">
              {items.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="bg-[#243447] border border-white/15 rounded-sm flex flex-col justify-between shadow-sm hover:border-[#C5A059] transition-all group aspect-auto min-h-[360px]"
                >
                  {/* Top Header Block with crisp divider line */}
                  <div className="p-6 sm:p-7 pb-5 border-b border-white/10">
                    <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-3">
                      <span>СУДЕБНЫЙ ПРЕЦЕДЕНТ</span>
                      <span>{item.date}</span>
                    </div>

                    {item.claimAmount && (
                      <div className="mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] block mb-0.5">
                          Защищённый бюджет:
                        </span>
                        <span className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
                          {item.claimAmount}
                        </span>
                      </div>
                    )}

                    <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white leading-snug group-hover:text-[#C5A059] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Middle Content: Challenge & Result */}
                  <div className="p-6 sm:p-7 py-5 flex-1 flex flex-col justify-between gap-4">
                    <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed line-clamp-3 font-light">
                      {item.challenge}
                    </p>

                    <div className="bg-[#1C2836] border border-white/10 p-3.5 rounded-xs flex items-start gap-2.5">
                      <Trophy size={15} className="text-[#C5A059] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-mono text-white font-semibold mb-0.5">
                          Итог разбирательства:
                        </div>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">
                          {item.resultSummary}
                        </p>
                      </div>
                    </div>

                    {/* Read More button right-aligned before bottom tag box */}
                    <div className="flex justify-end pt-1">
                      <Link
                        href={`/cases/${item.slug}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-white hover:text-[#C5A059] transition-colors"
                      >
                        <span>Смотреть</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Line & Bottom-Left Nadzagolovok Box (like Reference 2) */}
                  <div className="border-t border-white/15 flex items-stretch font-mono text-[11px]">
                    <div className="border-r border-white/15 px-4 py-2.5 text-[#C5A059] font-bold uppercase tracking-wider bg-white/5">
                      {getPracticeTitle(item.practiceId)}
                    </div>
                    <div className="px-4 py-2.5 text-[#94A3B8] text-[10px] flex items-center">
                      АРБИТРАЖНЫЙ СУД // kad.arbitr.ru
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
                  className="bg-[#243447] border border-white/15 rounded-sm flex flex-col justify-between shadow-sm hover:border-[#C5A059] transition-all group aspect-auto min-h-[360px]"
                >
                  {/* Top Header Block with crisp divider line */}
                  <div className="p-6 sm:p-7 pb-5 border-b border-white/10">
                    <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-3">
                      <span>СУДЕБНЫЙ ПРЕЦЕДЕНТ</span>
                      <span>{item.date}</span>
                    </div>

                    {item.claimAmount && (
                      <div className="mb-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#94A3B8] block mb-0.5">
                          Защищённый бюджет:
                        </span>
                        <span className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
                          {item.claimAmount}
                        </span>
                      </div>
                    )}

                    <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white leading-snug group-hover:text-[#C5A059] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  {/* Middle Content: Challenge & Result */}
                  <div className="p-6 sm:p-7 py-5 flex-1 flex flex-col justify-between gap-4">
                    <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed line-clamp-3 font-light">
                      {item.challenge}
                    </p>

                    <div className="bg-[#1C2836] border border-white/10 p-3.5 rounded-xs flex items-start gap-2.5">
                      <Trophy size={15} className="text-[#C5A059] shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-mono text-white font-semibold mb-0.5">
                          Итог разбирательства:
                        </div>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">
                          {item.resultSummary}
                        </p>
                      </div>
                    </div>

                    {/* Read More button right-aligned before bottom tag box */}
                    <div className="flex justify-end pt-1">
                      <Link
                        href={`/cases/${item.slug}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-white hover:text-[#C5A059] transition-colors"
                      >
                        <span>Смотреть</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Line & Bottom-Left Nadzagolovok Box (like Reference 2) */}
                  <div className="border-t border-white/15 flex items-stretch font-mono text-[11px]">
                    <div className="border-r border-white/15 px-4 py-2.5 text-[#C5A059] font-bold uppercase tracking-wider bg-white/5">
                      {getPracticeTitle(item.practiceId)}
                    </div>
                    <div className="px-4 py-2.5 text-[#94A3B8] text-[10px] flex items-center">
                      АРБИТРАЖНЫЙ СУД // kad.arbitr.ru
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom Action Footer with line */}
          <div className="p-6 lg:p-12 pt-0 pb-12">
            <div className="pt-6 border-t-2 border-[#C5A059]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl font-light">
                Все судебные акты подтверждены ссылками на картотеку арбитражных дел (kad.arbitr.ru).
              </p>
              <Link
                href="/cases"
                className="bg-white/10 hover:bg-[#C5A059] text-white hover:text-[#19212C] border border-white/20 hover:border-transparent px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-all"
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
