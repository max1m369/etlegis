'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Scale, Building2, Gavel } from 'lucide-react';
import { TEAM_MEMBERS_FULL, TeamMemberFull } from '@/lib/data/team-blueprint';

interface TeamBlueprintGridProps {
  members?: TeamMemberFull[];
}

function PracticeIcon({ iconName, className = "w-6 h-6 shrink-0" }: { iconName: string; className?: string }) {
  switch (iconName) {
    case 'shield':
      return <Shield className={className} strokeWidth={1.8} />;
    case 'scale':
      return <Scale className={className} strokeWidth={1.8} />;
    case 'building':
      return <Building2 className={className} strokeWidth={1.8} />;
    case 'gavel':
      return <Gavel className={className} strokeWidth={1.8} />;
    default:
      return <Scale className={className} strokeWidth={1.8} />;
  }
}

export default function TeamBlueprintGrid({ members = TEAM_MEMBERS_FULL }: TeamBlueprintGridProps) {
  return (
    <section className="relative w-full overflow-hidden text-et-dark">
      {/* 
        NO DOT-GRID BACKGROUND (clean architectural background matching site design system)
      */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 md:py-14">
        {/* ====================================================================
            HEADER: Title with extending horizontal line
            ==================================================================== */}
        <div className="flex items-center gap-6 border-b blueprint-divider pb-5 mb-16 md:mb-24">
          <h2 className="font-heading font-normal uppercase tracking-[0.04em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-et-dark select-none leading-none shrink-0">
            НАША КОМАНДА
          </h2>
          <div className="hidden sm:block flex-1 h-[1px] blueprint-divider border-b" />
        </div>

        {/* ====================================================================
            TEAM ROSTER: Alternating Zig-Zag Grid (Left/Right photo mirroring)
            - Corner brackets in chess order on info container
            - Crisp divider lines after Name & Role in site palette (not blue)
            - Large prominent practice cards with icons
            - Borderless text-button with arrow interaction
            ==================================================================== */}
        <div className="space-y-24 md:space-y-36">
          {members.map((partner, index) => {
            const isReversed = index % 2 === 1;

            return (
              <article
                key={partner.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start group relative"
              >
                {/* PHOTO COLUMN */}
                <div
                  className={`md:col-span-5 ${
                    isReversed ? 'order-1 md:order-2' : 'order-1 md:order-1'
                  } relative`}
                >
                  <div className="relative aspect-square w-full max-w-md mx-auto md:max-w-none overflow-hidden bg-[#141A23] border border-et-border dark:border-white/15 shadow-sm">
                    {/* UID Tag Overlay (Top-Right) */}
                    <div className="absolute top-3 right-3 z-20 bg-[#0E1218]/90 dark:bg-black/90 backdrop-blur-xs text-[#E2E8F0] font-mono text-[10px] tracking-widest px-2.5 py-0.5 border border-white/15 uppercase select-none">
                      {partner.uid}
                    </div>

                    {/* Studio High-Contrast Monochrome Portrait */}
                    <img
                      src={partner.photo}
                      alt={partner.name}
                      className="w-full h-full object-cover object-[50%_20%] transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-110 brightness-95"
                      loading="eager"
                    />

                    {/* Subtle blueprint frame corners on photo */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40 pointer-events-none" />
                  </div>
                </div>

                {/* INFO COLUMN WITH CORNER BRACKETS IN CHESS ORDER */}
                <div
                  className={`md:col-span-7 ${
                    isReversed
                      ? 'order-2 md:order-1 md:text-right'
                      : 'order-2 md:order-2 md:text-left'
                  } relative p-6 sm:p-8 flex flex-col justify-start`}
                >
                  {/* ==========================================================
                      CHESS-ORDER CORNER BRACKETS (ТРЕУГОЛЬНЫЕ / УГЛОВЫЕ СКОБОЧКИ):
                      - Standard card: Top-Right (┐) & Bottom-Left (└)
                      - Mirrored card: Top-Left (┌) & Bottom-Right (┘)
                      ========================================================== */}
                  {!isReversed ? (
                    <>
                      {/* 1. Правый верхний угол (┐) */}
                      <svg
                        className="absolute top-0 right-0 w-8 h-8 text-[#9B815C] dark:text-accent-bronze pointer-events-none transition-transform duration-500 group-hover:scale-110"
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path d="M 0 2 H 30 V 32" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                      </svg>

                      {/* 2. Левый нижний угол (└) */}
                      <svg
                        className="absolute bottom-0 left-0 w-8 h-8 text-[#9B815C] dark:text-accent-bronze pointer-events-none transition-transform duration-500 group-hover:scale-110"
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path d="M 2 0 V 30 H 32" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                      </svg>
                    </>
                  ) : (
                    <>
                      {/* 1. Левый верхний угол (┌) */}
                      <svg
                        className="absolute top-0 left-0 w-8 h-8 text-[#9B815C] dark:text-accent-bronze pointer-events-none transition-transform duration-500 group-hover:scale-110"
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path d="M 32 2 H 2 V 32" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                      </svg>

                      {/* 2. Правый нижний угол (┘) */}
                      <svg
                        className="absolute bottom-0 right-0 w-8 h-8 text-[#9B815C] dark:text-accent-bronze pointer-events-none transition-transform duration-500 group-hover:scale-110"
                        viewBox="0 0 32 32"
                        fill="none"
                      >
                        <path d="M 30 0 V 30 H 0" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                      </svg>
                    </>
                  )}

                  {/* Member Name */}
                  <h3 className="font-heading font-normal uppercase tracking-[0.03em] text-2xl sm:text-3xl lg:text-4xl text-et-dark leading-tight">
                    <Link
                      href={`/team/${partner.slug}`}
                      className="hover:text-[#507192] dark:hover:text-accent-bronze transition-colors"
                    >
                      {partner.name.toUpperCase()}
                    </Link>
                  </h3>

                  {/* Hairline after name */}
                  <div className="w-full border-b blueprint-hairline my-2" />

                  {/* Role / Subtitle */}
                  <div
                    className={`font-mono text-xs sm:text-sm uppercase tracking-[0.14em] text-[#9B815C] dark:text-accent-bronze font-medium flex items-center ${
                      isReversed ? 'md:justify-end' : 'md:justify-start'
                    }`}
                  >
                    <span>{partner.role}</span>
                  </div>

                  {/* ==========================================================
                      DIVIDER LINE AFTER NAME & ROLE (Линия разделителя)
                      Not blue: site-matching architectural hairline
                      ========================================================== */}
                  <div className="w-full border-b blueprint-divider mt-2.5 mb-6" />

                  {/* 2-Column Specs: Специализация & Опыт (на русском языке) */}
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-6 my-2 ${
                      isReversed ? 'text-left md:text-right' : 'text-left'
                    }`}
                  >
                    <div>
                      <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-[#9B815C] dark:text-accent-bronze mb-1 font-semibold">
                        Специализация:
                      </div>
                      <div className="font-sans text-xs md:text-sm text-et-dark/90 leading-snug font-normal">
                        {partner.specialization}
                      </div>
                    </div>

                    <div>
                      <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-[#9B815C] dark:text-accent-bronze mb-1 font-semibold">
                        Опыт:
                      </div>
                      <div className="font-sans text-xs md:text-sm text-et-dark/90 leading-snug font-normal">
                        {partner.experience}
                      </div>
                    </div>
                  </div>

                  {/* ==========================================================
                      ПРОФИЛЬНЫЕ ПРАКТИКИ: КРУПНЫЕ ПЛАШКИ С ИКОНКАМИ
                      Стильные, аккуратные, крупные карточки в сетке
                      ========================================================== */}
                  <div className="mt-7">
                    <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-[#9B815C] dark:text-accent-bronze mb-3.5 font-semibold">
                      Профильные практики:
                    </div>
                    <div
                      className={`grid gap-3.5 sm:gap-4 ${
                        partner.practices.length === 3
                          ? 'grid-cols-1 sm:grid-cols-3'
                          : partner.practices.length === 2
                          ? 'grid-cols-1 sm:grid-cols-2'
                          : 'grid-cols-1 sm:grid-cols-2 max-w-sm'
                      }`}
                    >
                      {partner.practices.map((practice) => (
                        <Link
                          key={practice.slug}
                          href={`/uslugi#${practice.slug}`}
                          className="group/card relative p-4 sm:p-5 border border-et-border dark:border-white/12 bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 hover:border-[#9B815C] dark:hover:border-accent-bronze transition-all duration-300 rounded-[2px] shadow-2xs hover:shadow-md flex flex-col justify-between min-h-[120px] sm:min-h-[135px] text-left overflow-hidden"
                        >
                          {/* Top Row: Large Icon in Accent Box + Arrow ↗ */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="w-11 h-11 rounded-[2px] bg-[#FAF8F5] dark:bg-white/5 border border-et-border dark:border-white/10 flex items-center justify-center text-[#9B815C] dark:text-accent-bronze group-hover/card:scale-105 group-hover/card:border-[#9B815C] group-hover/card:bg-white dark:group-hover/card:bg-white/10 transition-all duration-300 shrink-0">
                              <PracticeIcon iconName={practice.iconName} className="w-6 h-6 shrink-0 text-[#9B815C] dark:text-accent-bronze" />
                            </div>
                            <span className="font-mono text-xs text-et-muted/50 dark:text-white/40 group-hover/card:text-[#9B815C] dark:group-hover/card:text-accent-bronze group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-transform duration-300">
                              ↗
                            </span>
                          </div>

                          {/* Bottom: Micro-label + Practice Title */}
                          <div className="mt-3.5">
                            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#9B815C] dark:text-accent-bronze font-semibold block mb-0.5">
                              ПРАКТИКА
                            </span>
                            <div className="font-sans font-medium text-xs sm:text-[13px] text-et-dark dark:text-white leading-snug group-hover/card:text-[#507192] dark:group-hover/card:text-accent-bronze transition-colors">
                              {practice.title}
                            </div>
                          </div>

                          {/* Subtle Bottom Accent Line on Hover */}
                          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#9B815C] dark:bg-accent-bronze scale-x-0 group-hover/card:scale-x-100 transition-transform duration-300 origin-left" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* ==========================================================
                      FOOTER: ТЕКСТОВАЯ КНОПКА БЕЗ ГРАНИЦ + РЕЕСТРОВЫЙ НОМЕР
                      У кнопки убраны границы, остался просто интерактивный текст
                      ========================================================== */}
                  <div
                    className={`pt-6 mt-8 border-t blueprint-divider flex flex-wrap items-center gap-4 justify-between ${
                      isReversed ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <Link
                      href={`/team/${partner.slug}`}
                      className="group/btn inline-flex items-center gap-2.5 font-mono text-xs sm:text-[13px] uppercase tracking-[0.14em] font-medium text-et-dark dark:text-white hover:text-[#9B815C] dark:hover:text-accent-bronze transition-colors duration-300 py-1"
                    >
                      <span className="relative pb-0.5">
                        Открыть досье адвоката
                        {/* Animated Underline */}
                        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#9B815C] dark:bg-accent-bronze transition-all duration-300 group-hover/btn:w-full" />
                      </span>
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1.5 text-sm font-sans">
                        →
                      </span>
                    </Link>

                    {partner.regNum && (
                      <span className="font-mono text-[11px] uppercase text-et-muted tracking-wider">
                        {partner.regNum}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
