'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Scale, Building2, Gavel } from 'lucide-react';
import SpotlightButton from '@/components/ui/SpotlightButton';
import { TEAM_MEMBERS_FULL, TeamMemberFull } from '@/lib/data/team-blueprint';

interface TeamBlueprintGridProps {
  members?: TeamMemberFull[];
}

function PracticeIcon({ iconName }: { iconName: string }) {
  switch (iconName) {
    case 'shield':
      return <Shield className="w-4 h-4 shrink-0 text-[#9B815C] dark:text-accent-bronze" />;
    case 'scale':
      return <Scale className="w-4 h-4 shrink-0 text-[#9B815C] dark:text-accent-bronze" />;
    case 'building':
      return <Building2 className="w-4 h-4 shrink-0 text-[#9B815C] dark:text-accent-bronze" />;
    case 'gavel':
      return <Gavel className="w-4 h-4 shrink-0 text-[#9B815C] dark:text-accent-bronze" />;
    default:
      return <Scale className="w-4 h-4 shrink-0 text-[#9B815C] dark:text-accent-bronze" />;
  }
}

export default function TeamBlueprintGrid({ members = TEAM_MEMBERS_FULL }: TeamBlueprintGridProps) {
  return (
    <section className="relative w-full overflow-hidden text-et-dark">
      {/* 
        NO DOT-GRID BACKGROUND (as requested: "фон без вот этих точек")
        Clean architectural background matching the site design system
      */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 md:py-14">
        {/* ====================================================================
            HEADER: Title with extending horizontal line (NO [KEY_ASSETS] as crossed out)
            Font is rendered in our design system typography
            ==================================================================== */}
        <div className="flex items-center gap-6 border-b border-et-dark/15 dark:border-white/15 pb-5 mb-16 md:mb-24">
          <h2 className="font-heading font-normal uppercase tracking-[0.04em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-et-dark select-none leading-none shrink-0">
            НАША КОМАНДА
          </h2>
          <div className="hidden sm:block flex-1 h-[1px] bg-et-dark/25 dark:bg-white/20" />
        </div>

        {/* ====================================================================
            TEAM ROSTER: Alternating Zig-Zag Grid (Left/Right photo mirroring)
            Order matches the main page exactly (t1 through t8)
            NO PINS, NO CIRCLES
            ==================================================================== */}
        <div className="space-y-20 md:space-y-32">
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
                  <div className="relative aspect-square w-full max-w-md mx-auto md:max-w-none overflow-hidden bg-[#141A23] border border-et-dark/20 dark:border-white/15 shadow-sm">
                    {/* UID Tag Overlay (Top-Right) */}
                    <div className="absolute top-3 right-3 z-20 bg-[#0E1218]/90 dark:bg-black/90 backdrop-blur-xs text-[#E2E8F0] font-mono text-[10px] tracking-widest px-2.5 py-0.5 border border-white/15 uppercase select-none">
                      {partner.uid}
                    </div>

                    {/* Studio High-Contrast Monochrome Portrait (centered, same as on main page) */}
                    <img
                      src={partner.photo}
                      alt={partner.name}
                      className="w-full h-full object-cover object-[50%_20%] transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-110 brightness-95"
                      loading="eager"
                    />

                    {/* Subtle blueprint frame corners */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40 pointer-events-none" />
                  </div>
                  {/* Pin and connector lines are completely removed */}
                </div>

                {/* INFO COLUMN */}
                <div
                  className={`md:col-span-7 ${
                    isReversed
                      ? 'order-2 md:order-1 md:text-right'
                      : 'order-2 md:order-2 md:text-left'
                  } flex flex-col justify-start pt-1`}
                >
                  {/* Member Name */}
                  <h3 className="font-heading font-normal uppercase tracking-[0.03em] text-2xl sm:text-3xl lg:text-4xl text-et-dark leading-tight">
                    <Link
                      href={`/team/${partner.slug}`}
                      className="hover:text-[#507192] dark:hover:text-accent-bronze transition-colors"
                    >
                      {partner.name.toUpperCase()}
                    </Link>
                  </h3>

                  {/* Role / Subtitle (SYSTEM_PARTNER removed as crossed out) */}
                  <div
                    className={`font-mono text-xs sm:text-sm uppercase tracking-[0.14em] text-[#9B815C] dark:text-accent-bronze font-medium mt-1.5 flex items-center ${
                      isReversed ? 'md:justify-end' : 'md:justify-start'
                    }`}
                  >
                    <span>{partner.role}</span>
                  </div>

                  {/* Divider Line */}
                  <div className="w-full h-[1px] bg-et-dark/20 dark:bg-white/15 my-5" />

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

                  {/* Профильные практики (крупные карточки с юридическими иконками и ссылками) */}
                  <div className="mt-6">
                    <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-[#9B815C] dark:text-accent-bronze mb-3 font-semibold">
                      Профильные практики:
                    </div>
                    <div
                      className={`flex flex-wrap gap-2.5 ${
                        isReversed ? 'md:justify-end' : 'md:justify-start'
                      }`}
                    >
                      {partner.practices.map((practice) => (
                        <Link
                          key={practice.slug}
                          href={`/uslugi#${practice.slug}`}
                          className="inline-flex items-center gap-2.5 px-3.5 py-2 border border-et-dark/20 dark:border-white/15 bg-white/70 dark:bg-white/5 hover:border-et-dark dark:hover:border-accent-bronze hover:bg-white dark:hover:bg-white/10 transition-all duration-300 rounded-[2px] group/chip text-et-dark dark:text-white/90 shadow-2xs"
                        >
                          <span className="transition-transform duration-300 group-hover/chip:scale-110">
                            <PracticeIcon iconName={practice.iconName} />
                          </span>
                          <span className="text-xs sm:text-sm font-medium tracking-tight font-sans">
                            {practice.title}
                          </span>
                          <span className="text-xs opacity-40 font-mono transition-transform duration-300 group-hover/chip:translate-x-0.5">
                            ↗
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Footer: Кнопка «Открыть досье адвоката» + Реестровый номер */}
                  <div
                    className={`pt-6 mt-8 border-t border-et-dark/15 dark:border-white/10 flex flex-wrap items-center gap-4 justify-between ${
                      isReversed ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <Link href={`/team/${partner.slug}`}>
                      <SpotlightButton className="px-6 py-2.5 text-xs font-mono tracking-wider uppercase">
                        Открыть досье адвоката →
                      </SpotlightButton>
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
