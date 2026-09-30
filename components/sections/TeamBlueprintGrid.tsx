'use client';

import React from 'react';
import Link from 'next/link';
import { TEAM_MEMBERS, TeamBlueprintMember } from '@/lib/data/team-blueprint';

interface TeamBlueprintGridProps {
  members?: TeamBlueprintMember[];
}

export default function TeamBlueprintGrid({ members = TEAM_MEMBERS }: TeamBlueprintGridProps) {
  return (
    <section className="relative w-full overflow-hidden text-et-dark">
      {/* 
        NO DOT-GRID BACKGROUND (as explicitly requested: "фон без вот этих точек")
        Clean architectural background matching the site design system
      */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 md:py-16">
        {/* ====================================================================
            HEADER: Title with extending horizontal line and [KEY_ASSETS]
            Font is rendered in our design system typography
            ==================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-et-dark/15 dark:border-white/15 pb-5 mb-16 md:mb-24">
          <div className="flex items-center gap-6 flex-1">
            <h1 className="font-heading font-normal uppercase tracking-[0.04em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-et-dark select-none leading-none">
              НАША КОМАНДА
            </h1>
            <div className="hidden sm:block flex-1 h-[1px] bg-et-dark/25 dark:bg-white/20" />
          </div>

          <div className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#9B815C] dark:text-accent-bronze shrink-0 self-start sm:self-center">
            [KEY_ASSETS]
          </div>
        </div>

        {/* ====================================================================
            TEAM ROSTER: Alternating Zig-Zag Grid (Left/Right photo mirroring)
            NOTE: Connector pin/circle is completely removed as requested
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

                    {/* High-Contrast Monochrome Portrait */}
                    <img
                      src={partner.photo}
                      alt={partner.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-110 brightness-95"
                      loading="eager"
                    />

                    {/* Subtle blueprint frame corners */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40 pointer-events-none" />
                  </div>
                  {/* Pin and connector line are explicitly omitted */}
                </div>

                {/* INFO COLUMN */}
                <div
                  className={`md:col-span-7 ${
                    isReversed
                      ? 'order-2 md:order-1 md:text-right'
                      : 'order-2 md:order-2 md:text-left'
                  } flex flex-col justify-start pt-1`}
                >
                  {/* Member Name in design-system typography */}
                  <h2 className="font-heading font-normal uppercase tracking-[0.03em] text-2xl sm:text-3xl lg:text-4xl text-et-dark leading-tight">
                    <Link
                      href={`/team/${partner.slug}`}
                      className="hover:text-[#507192] dark:hover:text-accent-bronze transition-colors"
                    >
                      {partner.shortName.toUpperCase()}
                    </Link>
                  </h2>

                  {/* Role / Subtitle */}
                  <div
                    className={`font-mono text-xs sm:text-sm uppercase tracking-[0.14em] text-et-muted font-medium mt-1.5 flex items-center ${
                      isReversed ? 'md:justify-end' : 'md:justify-start'
                    }`}
                  >
                    <span>{partner.status.toUpperCase()}</span>
                    <span className="mx-2 opacity-50">/</span>
                    <span className="text-[#9B815C] dark:text-accent-bronze">
                      {partner.role === 'managing' ? 'SYSTEM_PARTNER' : 'LEGAL_ADVOCATE'}
                    </span>
                  </div>

                  {/* Divider Line */}
                  <div className="w-full h-[1px] bg-et-dark/20 dark:bg-white/15 my-5" />

                  {/* 2-Column Specs: Specialization & Experience */}
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 gap-6 my-2 ${
                      isReversed ? 'text-left md:text-right' : 'text-left'
                    }`}
                  >
                    <div>
                      <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-[#9B815C] dark:text-accent-bronze mb-1">
                        - SPECIALIZATION:
                      </div>
                      <div className="font-sans text-xs md:text-sm font-semibold text-et-dark leading-snug">
                        {partner.specializationLine}
                      </div>
                    </div>

                    <div>
                      <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-[#9B815C] dark:text-accent-bronze mb-1">
                        - EXPERIENCE:
                      </div>
                      <div className="font-sans text-xs md:text-sm font-semibold text-et-dark leading-snug">
                        {partner.experience}
                      </div>
                    </div>
                  </div>

                  {/* Core Competencies Boxed Tags */}
                  <div className="mt-5">
                    <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-[#9B815C] dark:text-accent-bronze mb-2.5">
                      CORE_COMPETENCIES:
                    </div>
                    <div
                      className={`flex flex-wrap gap-2 ${
                        isReversed ? 'md:justify-end' : 'md:justify-start'
                      }`}
                    >
                      {partner.specializations.map((spec) => (
                        <span
                          key={spec}
                          className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider px-2.5 py-1 border border-et-dark/25 dark:border-white/20 text-et-dark dark:text-white/90 bg-white/70 dark:bg-white/5 hover:bg-et-dark hover:text-white dark:hover:bg-accent-bronze dark:hover:text-black transition-colors select-none"
                        >
                          [ {spec} ]
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Link to Dossier */}
                  <div
                    className={`pt-5 mt-6 border-t border-et-dark/15 dark:border-white/10 flex flex-wrap items-center gap-4 justify-between ${
                      isReversed ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    <Link
                      href={`/team/${partner.slug}`}
                      className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-et-dark hover:text-[#507192] dark:hover:text-accent-bronze transition-colors group/link"
                    >
                      <span>ОТКРЫТЬ ДОСЬЕ АДВОКАТА</span>
                      <span className="transition-transform group-hover/link:translate-x-1 font-mono">
                        →
                      </span>
                    </Link>

                    {partner.regNum && (
                      <span className="font-mono text-[10px] uppercase text-et-muted tracking-wider">
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
