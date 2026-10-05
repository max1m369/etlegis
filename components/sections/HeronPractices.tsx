'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRACTICES_DATA } from '@/lib/data/etlegis-data';
import HeronButton from '@/components/ui/HeronButton';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function HeronPractices() {
  const [activePracticeId, setActivePracticeId] = useState<string>(PRACTICES_DATA[0].id);

  return (
    <section id="practices" className="relative w-full border-b border-[#D1D1CB] dark:border-[#222528] py-16 sm:py-24">
      <div className="mx-2 sm:mx-4 px-4 sm:px-8">
        
        {/* Section Header with Telemetry */}
        <ScrollReveal type="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D1D1CB] dark:border-[#222528] pb-6 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#FA3600] tracking-widest uppercase mb-2">
                <span>// 02 ПРАКТИКИ БЮРО</span>
                <span className="w-8 h-px bg-[#FA3600]" />
                <span className="text-[#7E7E7A]">СИСТЕМНОЕ ВЕДЕНИЕ ДЕЛ</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-sans font-bold text-[#282828] dark:text-white tracking-tight">
                Ключевые практики
              </h2>
            </div>
            <div className="text-xs font-mono text-[#7E7E7A] text-right">
              [ 04 НАПРАВЛЕНИЯ ЗАЩИТЫ ]
            </div>
          </div>
        </ScrollReveal>

        {/* 4-Cell Technical Grid */}
        <ScrollReveal type="fade-up" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#D1D1CB] dark:border-[#222528]">
            {PRACTICES_DATA.slice(0, 4).map((practice, index) => {
              const formattedIndex = `0${index + 1}`;
              const isActive = activePracticeId === practice.id;

              return (
                <div
                  key={practice.id}
                  onMouseEnter={() => setActivePracticeId(practice.id)}
                  className={`relative group border-r border-b border-[#D1D1CB] dark:border-[#222528] bg-white/40 dark:bg-black/20 p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 ${
                    isActive ? 'bg-white/80 dark:bg-black/50' : 'hover:bg-white/60 dark:hover:bg-black/30'
                  }`}
                >
                  {/* Corner Indicator Tick */}
                  <span className="absolute top-3 right-3 text-xs font-mono text-[#7E7E7A] group-hover:text-[#FA3600] transition-colors">
                    ┘
                  </span>

                  {/* Top: Index & Practice Title */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold tracking-widest text-[#FA3600]">
                        {formattedIndex} / 04
                      </span>
                      <span className="text-[10px] font-mono text-[#7E7E7A] uppercase">
                        SPECIALIZATION
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#282828] dark:text-white mb-3 group-hover:text-[#FA3600] transition-colors">
                      {practice.title}
                    </h3>

                    <p className="text-sm text-[#414140] dark:text-[#A0A09C] font-light leading-relaxed mb-6">
                      {practice.shortDescription}
                    </p>
                  </div>

                  {/* Middle: Image Frame with Technical Border */}
                  <div className="relative w-full aspect-[16/9] border border-[#D1D1CB] dark:border-[#222528] overflow-hidden mb-6 bg-neutral-900">
                    {practice.image && (
                      <Image
                        src={practice.image}
                        alt={practice.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
                      />
                    )}
                    {/* Optical Reticle Crosshair in Image Corner */}
                    <span className="absolute bottom-2 right-2 text-[10px] font-mono text-white/70 select-none">
                      +
                    </span>
                  </div>

                  {/* Bottom: Sub-services bullet list + HeronButton */}
                  <div>
                    {practice.services && practice.services.length > 0 && (
                      <div className="space-y-1.5 mb-6 text-xs font-mono text-[#5E6267] dark:text-[#A0A09C]">
                        {practice.services.slice(0, 3).map((srv) => (
                          <div key={srv.id} className="flex items-center gap-2">
                            <span className="text-[#FA3600]">›</span>
                            <span className="truncate">{srv.title}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-4 border-t border-[#D1D1CB]/50 dark:border-[#222528]">
                      <HeronButton
                        variant={isActive ? 'brand' : 'outline'}
                        size="sm"
                        href={`/practices/${practice.slug}`}
                        className="w-full text-center"
                      >
                        ПОДРОБНЕЕ О ПРАКТИКЕ
                      </HeronButton>
                    </div>
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
              href="/practices"
              className="w-full sm:w-auto min-w-[280px] text-center"
            >
              ВСЕ ПРАКТИКИ БЮРО
            </HeronButton>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
