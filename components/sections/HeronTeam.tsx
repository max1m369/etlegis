'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { lawyers } from '@/lib/data/mock-data';
import HeronButton from '@/components/ui/HeronButton';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function HeronTeam() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = lawyers.length;

  // Track horizontal scroll progress
  const updateScrollProgress = () => {
    if (!scrollTrackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollTrackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      setCurrentIndex(0);
      return;
    }
    const progress = Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100));
    setScrollProgress(progress);
    const index = Math.min(total - 1, Math.round((scrollLeft / maxScroll) * (total - 1)));
    setCurrentIndex(index);
  };

  useEffect(() => {
    const track = scrollTrackRef.current;
    if (!track) return;
    track.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => track.removeEventListener('scroll', updateScrollProgress);
  }, [total]);

  // Scroll left/right actions
  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!scrollTrackRef.current) return;
    const cardWidth = 420;
    const scrollOffset = direction === 'left' ? -cardWidth : cardWidth;
    scrollTrackRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
  };

  return (
    <section id="team" className="relative w-full border-b border-[#D1D1CB] dark:border-[#222528] py-16 sm:py-24 overflow-hidden">
      <div className="mx-2 sm:mx-4 px-4 sm:px-8">
        
        {/* 1. Section Header with Telemetry & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D1D1CB] dark:border-[#222528] pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FA3600] tracking-widest uppercase mb-2">
              <span>// 03 КОМАНДА АДВОКАТОВ</span>
              <span className="w-8 h-px bg-[#FA3600]" />
              <span className="text-[#7E7E7A]">ГОРИЗОНТАЛЬНЫЙ РЕЕСТР ПАРТНЕРОВ</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-[#282828] dark:text-white tracking-tight">
              Команда бюро
            </h2>
          </div>

          {/* Stepping Gauge & Scroll Controls */}
          <div className="flex items-center gap-6">
            {/* Step Counter */}
            <div className="text-sm font-mono text-[#282828] dark:text-white flex items-center gap-2">
              <span className="font-bold text-[#FA3600]">
                {String(currentIndex + 1).padStart(2, '0')}
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
                style={{ width: `${Math.max(12, scrollProgress)}%` }}
              />
            </div>

            {/* Prev / Next Track Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollByAmount('left')}
                type="button"
                aria-label="Прокрутить команду влево"
                className="w-10 h-10 border border-[#D1D1CB] dark:border-[#222528] flex items-center justify-center text-[#282828] dark:text-white hover:border-[#FA3600] hover:text-[#FA3600] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollByAmount('right')}
                type="button"
                aria-label="Прокрутить команду вправо"
                className="w-10 h-10 border border-[#D1D1CB] dark:border-[#222528] flex items-center justify-center text-[#282828] dark:text-white hover:border-[#FA3600] hover:text-[#FA3600] transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Horizontal Leftward Scroll Track */}
        <div
          ref={scrollTrackRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {lawyers.map((lawyer, idx) => (
            <Link
              key={lawyer.id}
              href={`/team/${lawyer.slug}`}
              className="flex-shrink-0 w-[300px] sm:w-[360px] md:w-[400px] border border-[#D1D1CB] dark:border-[#222528] hover:border-[#FA3600] dark:hover:border-[#FA3600] bg-white/70 dark:bg-black/30 flex flex-col justify-between group transition-colors duration-300 relative"
            >
              {/* Corner Crosshairs */}
              <span className="absolute top-2 left-2 text-[10px] font-mono text-[#7E7E7A] z-10">+</span>
              <span className="absolute top-2 right-2 text-[10px] font-mono text-[#7E7E7A] z-10">+</span>

              {/* Portrait Visual Stage */}
              <div className="relative w-full aspect-[4/5] bg-neutral-900 border-b border-[#D1D1CB] dark:border-[#222528] overflow-hidden">
                <Image
                  src={lawyer.photoUrl}
                  alt={lawyer.name}
                  fill
                  sizes="(max-width: 640px) 300px, 400px"
                  className="object-cover object-top grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Index Telemetry Stamp */}
                <div className="absolute top-3 left-6 z-10 font-mono text-[11px] text-white/80 bg-black/60 px-2 py-0.5 border border-white/20 backdrop-blur-sm">
                  [{String(idx + 1).padStart(2, '0')}]
                </div>

                {/* Experience Pill */}
                <div className="absolute bottom-3 left-4 z-10 font-mono text-[10px] text-white/90 bg-black/70 px-2.5 py-1 border border-white/20 backdrop-blur-sm">
                  СТАЖ: {lawyer.experienceYears} ЛЕТ
                </div>
              </div>

              {/* Dossier Information Body */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  {/* Name and Status Header with precise alignment */}
                  <div className="border-b border-[#D1D1CB] dark:border-[#222528] pb-3 mb-3">
                    <h3 className="text-lg sm:text-xl font-sans font-bold text-[#282828] dark:text-white leading-tight mb-1.5 group-hover:text-[#FA3600] transition-colors">
                      {lawyer.name}
                    </h3>
                    <div className="text-xs font-mono text-[#FA3600] uppercase tracking-wider">
                      {lawyer.status}
                    </div>
                  </div>

                  {/* Specialization */}
                  <p className="text-xs text-[#414140] dark:text-[#A0A09C] font-light leading-relaxed mb-4 line-clamp-3">
                    {lawyer.specialization}
                  </p>
                </div>

                {/* Bottom Profile Action Link */}
                <div className="pt-3 border-t border-[#D1D1CB] dark:border-[#222528] flex items-center justify-between font-mono text-xs text-[#282828] dark:text-white group-hover:text-[#FA3600] transition-colors">
                  <span className="uppercase tracking-wider">Открыть полный профиль</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 3. Bottom Hairline Separator & Centered Hero-Style Action Button */}
        <div className="mt-8 pt-8 border-t border-[#D1D1CB] dark:border-[#222528] flex justify-center">
          <HeronButton
            variant="outline"
            size="lg"
            href="/team"
            className="w-full sm:w-auto min-w-[280px] text-center"
          >
            ВСЕ АДВОКАТЫ БЮРО
          </HeronButton>
        </div>

      </div>
    </section>
  );
}
