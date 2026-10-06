'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { TEAM_MEMBERS_FULL, TeamMemberFull } from '@/lib/data/team-blueprint';
import { useConsultationModal } from '@/components/providers/ModalProvider';

export default function V26AboutSection() {
  const { openModal } = useConsultationModal();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Drag-to-scroll state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasMoved = useRef(false);

  const totalMembers = TEAM_MEMBERS_FULL.length;

  const updateScrollState = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    const singleCardWidth = clientWidth >= 1024 ? clientWidth / 4 : (clientWidth >= 640 ? clientWidth / 2 : clientWidth * 0.85);
    const index = Math.round(scrollLeft / singleCardWidth);
    setActiveCardIndex(Math.min(totalMembers - 1, Math.max(0, index)));
  }, [totalMembers]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Horizontal wheel-scroll listener: intercept vertical wheel when hovering container and convert to horizontal
    const handleWheel = (e: WheelEvent) => {
      // If user is predominantly scrolling vertically, translate to horizontal scroll inside the track
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth && e.deltaY > 0;
        
        // If not at hard edges, scroll horizontally and prevent window scroll
        if (!atStart && !atEnd) {
          e.preventDefault();
          e.stopPropagation();
          el.scrollLeft += e.deltaY * 1.2;
          updateScrollState();
        }
      }
    };

    el.addEventListener('scroll', updateScrollState, { passive: true });
    el.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('resize', updateScrollState);
    updateScrollState();

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      el.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // Pointer drag interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftStart.current = trackRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasMoved.current = true;
    }
    trackRef.current.scrollLeft = scrollLeftStart.current - walk;
    updateScrollState();
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const scrollByDirection = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const { clientWidth } = trackRef.current;
    // Step by 2 cards on desktop (width * 0.5) or 1 card on smaller devices
    const offset = clientWidth >= 1024 ? clientWidth * 0.5 : clientWidth * 0.8;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth',
    });
    setTimeout(updateScrollState, 350);
  };

  return (
    <section
      id="sec-about"
      data-bg="light"
      className="relative w-full bg-[#EAE6DF] text-[#19212C] border-b border-[#19212C]/15"
    >
      {/* 20% - 40% - 40% Architectural Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[20%_40%_40%]">
        
        {/* Col 1 (20%): Reserved rail for Chameleon Logo */}
        <div className="hidden lg:block w-full bg-[#EAE6DF] border-r border-[#19212C]/10 relative z-20 pointer-events-none" />

        {/* Content Area across Cols 2 & 3 (Starts strictly at 20%) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col min-w-0">
          
          {/* Section Header with Telemetry & Navigation Arrows */}
          <div className="p-6 lg:p-12 pb-6 lg:pb-8 border-b border-[#19212C]/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="font-mono text-xs text-[#C5A059] uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                <span>// 03 КОМАНДА АДВОКАТОВ</span>
                <span className="w-8 h-px bg-[#C5A059]" />
                <span className="text-[#5A6472]">ГОРИЗОНТАЛЬНЫЙ РЕЕСТР ПАРТНЁРОВ</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#19212C] mb-2">
                О Компании и Бюро
              </h2>
              <p className="text-xs sm:text-sm text-[#5A6472] max-w-2xl leading-relaxed">
                8 профильных адвокатов высшей квалификации. Защита бенефициаров, генеральных директоров и активов бизнеса.
              </p>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="font-mono text-xs text-[#5A6472] flex items-center gap-1.5 select-none">
                <span className="font-bold text-[#19212C]">
                  {String(activeCardIndex + 1).padStart(2, '0')}–{String(Math.min(totalMembers, activeCardIndex + 4)).padStart(2, '0')}
                </span>
                <span>/</span>
                <span>{String(totalMembers).padStart(2, '0')}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollByDirection('left')}
                  disabled={!canScrollLeft}
                  aria-label="Прокрутить команду влево"
                  className={`w-10 h-10 border border-[#19212C]/20 flex items-center justify-center transition-all duration-200 rounded-sm cursor-pointer select-none ${
                    canScrollLeft
                      ? 'bg-white hover:bg-[#19212C] text-[#19212C] hover:text-white shadow-sm'
                      : 'opacity-40 cursor-not-allowed bg-transparent text-[#19212C]'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByDirection('right')}
                  disabled={!canScrollRight}
                  aria-label="Прокрутить команду вправо"
                  className={`w-10 h-10 border border-[#19212C]/20 flex items-center justify-center transition-all duration-200 rounded-sm cursor-pointer select-none ${
                    canScrollRight
                      ? 'bg-white hover:bg-[#19212C] text-[#19212C] hover:text-white shadow-sm'
                      : 'opacity-40 cursor-not-allowed bg-transparent text-[#19212C]'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Horizontal Scroll Track: 2 cards in Col 2 (40%) + 2 cards in Col 3 (40%) = 4 cards visible on desktop */}
          <div className="w-full overflow-hidden">
            <div
              ref={trackRef}
              data-lenis-prevent
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden p-6 lg:p-12 gap-5 sm:gap-6 select-none"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
            {TEAM_MEMBERS_FULL.map((member: TeamMemberFull, idx: number) => (
              <div
                key={member.id}
                className="shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start flex flex-col bg-white border border-[#19212C]/15 rounded-sm shadow-sm group hover:border-[#C5A059] transition-all duration-300"
              >
                {/* Photo Header */}
                <div className="relative w-full aspect-[4/4.6] bg-[#141A23] border-b border-[#19212C]/10 overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 20vw"
                    className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none"
                  />
                  
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Stamp ID / Index */}
                  <div className="absolute top-2.5 left-2.5 font-mono text-[10px] text-white/90 bg-black/60 px-2 py-0.5 border border-white/20 backdrop-blur-sm rounded-xs">
                    [{String(idx + 1).padStart(2, '0')}] {member.uid.split('_')[1] || 'PARTNER'}
                  </div>

                  {/* Experience badge */}
                  <div className="absolute bottom-2.5 left-2.5 font-mono text-[10px] text-white bg-black/75 px-2 py-0.5 border border-[#C5A059]/40 backdrop-blur-sm rounded-xs">
                    СТАЖ: {member.experience.replace(/[^0-9]/g, '') || '12+'} ЛЕТ
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    {/* Name & Role */}
                    <div className="border-b border-[#19212C]/10 pb-2.5 mb-2.5">
                      <h3 className="font-heading text-lg font-bold text-[#0F172A] leading-tight group-hover:text-[#C5A059] transition-colors">
                        {member.name}
                      </h3>
                      <div className="font-mono text-[11px] text-[#C5A059] uppercase font-bold mt-1 line-clamp-1">
                        {member.role}
                      </div>
                      {member.regNum && (
                        <div className="font-mono text-[10px] text-[#64748B] mt-0.5 line-clamp-1">
                          {member.regNum}
                        </div>
                      )}
                    </div>

                    {/* Specialization snippet */}
                    <p className="text-[11px] sm:text-xs text-[#475569] leading-relaxed line-clamp-3 font-light mb-3">
                      {member.specialization}
                    </p>

                    {/* Practices tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {member.practices.slice(0, 2).map((p) => (
                        <span
                          key={p.slug}
                          className="font-mono text-[9px] bg-[#F1F5F9] text-[#334155] border border-[#E2E8F0] px-1.5 py-0.5 rounded-xs line-clamp-1"
                        >
                          {p.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button: Modal Dossier Opening */}
                  <div className="pt-2 border-t border-[#19212C]/10 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        if (hasMoved.current) return;
                        e.stopPropagation();
                        openModal(`Досье адвоката: ${member.name} (${member.role})`);
                      }}
                      className="w-full bg-[#0F172A] hover:bg-[#C5A059] text-white hover:text-[#0F172A] py-2 px-3 rounded-sm font-mono text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 text-center flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Открыть досье</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>

          {/* Full Team Footer Bar with Link to All Lawyers */}
          <div className="px-6 lg:px-12 py-4 border-t border-[#19212C]/10 flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-xs text-[#5A6472]">
            <span>В реестре коллегии бюро 8 действующих адвокатов высшей категории</span>
            <Link
              href="/team"
              className="text-[#19212C] font-bold hover:text-[#C5A059] transition-colors flex items-center gap-1"
            >
              <span>Смотреть всех адвокатов бюро</span>
              <span>→</span>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
