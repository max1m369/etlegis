'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { lawyers } from '@/lib/data/mock-data';
import HeronButton from '@/components/ui/HeronButton';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function HeronTeam() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = lawyers.length;
  const current = lawyers[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  };

  const progressPercent = ((activeIndex + 1) / total) * 100;

  return (
    <section id="team" className="relative w-full border-b border-[#D1D1CB] dark:border-[#222528] py-16 sm:py-24">
      <div className="mx-2 sm:mx-4 px-4 sm:px-8">
        
        {/* Section Header with Telemetry */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D1D1CB] dark:border-[#222528] pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FA3600] tracking-widest uppercase mb-2">
              <span>// 03 КОМАНДА АДВОКАТОВ</span>
              <span className="w-8 h-px bg-[#FA3600]" />
              <span className="text-[#7E7E7A]">ПАРТНЕРЫ И РУКОВОДИТЕЛИ ПРАКТИК</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-[#282828] dark:text-white tracking-tight">
              Команда бюро
            </h2>
          </div>

          {/* Stepping Gauge & Slider Navigation Controls */}
          <div className="flex items-center gap-6">
            {/* Step Counter */}
            <div className="text-sm font-mono text-[#282828] dark:text-white flex items-center gap-2">
              <span className="font-bold text-[#FA3600]">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-[#7E7E7A]">/</span>
              <span className="text-[#7E7E7A]">
                {String(total).padStart(2, '0')}
              </span>
            </div>

            {/* Stepping Fractional Progress Bar */}
            <div className="w-24 sm:w-36 h-1 bg-[#D1D1CB] dark:bg-[#222528] overflow-hidden">
              <div
                className="h-full bg-[#FA3600] transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Prev / Next Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                type="button"
                aria-label="Предыдущий адвокат"
                className="w-10 h-10 border border-[#D1D1CB] dark:border-[#222528] flex items-center justify-center text-[#282828] dark:text-white hover:border-[#FA3600] hover:text-[#FA3600] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                type="button"
                aria-label="Следующий адвокат"
                className="w-10 h-10 border border-[#D1D1CB] dark:border-[#222528] flex items-center justify-center text-[#282828] dark:text-white hover:border-[#FA3600] hover:text-[#FA3600] transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Lawyer Interactive Dossier (Split 2-Column Stage) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#D1D1CB] dark:border-[#222528] bg-white/50 dark:bg-black/30">
          
          {/* Left Column: Portrait Frame with Reticle Marks (5 Cols) */}
          <div className="lg:col-span-5 relative border-b lg:border-b-0 lg:border-r border-[#D1D1CB] dark:border-[#222528] p-6 sm:p-10 flex flex-col items-center justify-center">
            
            {/* Corner Markers */}
            <span className="absolute top-2 left-2 text-[10px] font-mono text-[#7E7E7A]">+</span>
            <span className="absolute top-2 right-2 text-[10px] font-mono text-[#7E7E7A]">+</span>
            <span className="absolute bottom-2 left-2 text-[10px] font-mono text-[#7E7E7A]">+</span>
            <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[#7E7E7A]">+</span>

            <div className="relative w-full max-w-sm aspect-[1048/1400] border border-[#D1D1CB] dark:border-[#222528] overflow-hidden bg-neutral-900 group">
              <Image
                src={current.photoUrl}
                alt={current.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                priority
              />

              {/* Status Badge Tag */}
              <div className="absolute top-3 left-3 bg-[#141517]/85 backdrop-blur-sm border border-white/20 px-3 py-1 text-[11px] font-mono text-white">
                СТАЖ: {current.experienceYears} ЛЕТ
              </div>

              {/* Bottom Reticle Alignment Mark */}
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-white/70">
                [ {String(activeIndex + 1).padStart(2, '0')} // LAWYER ]
              </div>
            </div>

            {/* Quick Slider Dots below photo */}
            <div className="flex items-center gap-1.5 mt-6">
              {lawyers.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveIndex(dotIdx)}
                  type="button"
                  aria-label={`Адвокат ${dotIdx + 1}`}
                  className={`h-1.5 transition-all duration-300 ${
                    dotIdx === activeIndex ? 'w-8 bg-[#FA3600]' : 'w-2 bg-[#D1D1CB] dark:bg-[#33373C]'
                  }`}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Technical Dossier Specs & Bio (7 Cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            
            <div>
              {/* Role & Status */}
              <div className="text-xs font-mono text-[#FA3600] tracking-widest uppercase mb-2">
                {current.status}
              </div>

              {/* Lawyer Name */}
              <h3 className="text-2xl sm:text-4xl font-sans font-bold text-[#282828] dark:text-white mb-4">
                {current.name}
              </h3>

              {/* Specialization Box */}
              <div className="border-l-2 border-[#FA3600] pl-4 py-1 mb-6 bg-[#FA3600]/5">
                <span className="text-[11px] font-mono text-[#7E7E7A] block uppercase">
                  КЛЮЧЕВАЯ СПЕЦИАЛИЗАЦИЯ:
                </span>
                <span className="text-sm font-mono text-[#282828] dark:text-white font-medium">
                  {current.specialization}
                </span>
              </div>

              {/* Education Spec */}
              {current.education && current.education.length > 0 && (
                <div className="mb-6">
                  <span className="text-xs font-mono text-[#7E7E7A] block uppercase mb-2">
                    ОБРАЗОВАНИЕ И КВАЛИФИКАЦИЯ:
                  </span>
                  <div className="space-y-1.5 text-xs font-mono text-[#414140] dark:text-[#A0A09C]">
                    {current.education.map((edu, eIdx) => (
                      <div key={eIdx} className="flex items-start gap-2">
                        <span className="text-[#FA3600] mt-0.5">▪</span>
                        <span>{edu}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bio Summary */}
              <p className="text-sm text-[#414140] dark:text-[#A0A09C] font-light leading-relaxed mb-6">
                {current.bio}
              </p>
            </div>

            {/* Action Buttons Row */}
            <div className="pt-6 border-t border-[#D1D1CB] dark:border-[#222528] flex flex-col sm:flex-row items-center justify-between gap-4">
              <HeronButton
                variant="brand"
                size="md"
                href={`/team/${current.slug}`}
                className="w-full sm:w-auto"
              >
                ОТКРЫТЬ ПОЛНЫЙ ПРОФИЛЬ
              </HeronButton>

              <Link
                href="/team"
                className="text-xs font-mono text-[#7E7E7A] hover:text-[#FA3600] transition-colors uppercase tracking-wider"
              >
                ВСЯ КОМАНДА БЮРО (08) →
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
