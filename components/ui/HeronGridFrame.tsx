'use client';

import React from 'react';

export default function HeronGridFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-[#F5F5ED] dark:bg-[#0C0D0E] text-[#282828] dark:text-[#EEEEEE] selection:bg-[#FA3600] selection:text-white transition-colors duration-500">
      {/* 1. Subtle Paper Noise & Cartesian Grid Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] dark:opacity-[0.02] mix-blend-multiply dark:mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(#282828 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* 2. Outer Technical Hairline Frame */}
      <div className="pointer-events-none fixed inset-2 sm:inset-4 z-40 border border-[#D1D1CB] dark:border-[#222528]" />

      {/* 3. Corner Precision Crosshairs '+' */}
      <div className="pointer-events-none fixed top-2 left-2 sm:top-4 sm:left-4 z-50 text-[11px] font-mono text-[#7E7E7A] select-none -translate-x-1/2 -translate-y-1/2">
        +
      </div>
      <div className="pointer-events-none fixed top-2 right-2 sm:top-4 sm:right-4 z-50 text-[11px] font-mono text-[#7E7E7A] select-none translate-x-1/2 -translate-y-1/2">
        +
      </div>
      <div className="pointer-events-none fixed bottom-2 left-2 sm:bottom-4 sm:left-4 z-50 text-[11px] font-mono text-[#7E7E7A] select-none -translate-x-1/2 translate-y-1/2">
        +
      </div>
      <div className="pointer-events-none fixed bottom-2 right-2 sm:bottom-4 sm:right-4 z-50 text-[11px] font-mono text-[#7E7E7A] select-none translate-x-1/2 translate-y-1/2">
        +
      </div>

      {/* 4. Millimeter Ruler Dashes on Side Margins (Desktop only) */}
      <div
        className="pointer-events-none fixed left-2 sm:left-4 top-24 bottom-24 w-1 z-40 opacity-40 hidden lg:block"
        style={{
          backgroundImage: 'linear-gradient(to bottom, #7E7E7A 1px, transparent 1px)',
          backgroundSize: '1px 16px',
        }}
      />
      <div
        className="pointer-events-none fixed right-2 sm:right-4 top-24 bottom-24 w-1 z-40 opacity-40 hidden lg:block"
        style={{
          backgroundImage: 'linear-gradient(to bottom, #7E7E7A 1px, transparent 1px)',
          backgroundSize: '1px 16px',
        }}
      />

      {/* 5. Main Content Canvas */}
      <div className="relative z-10 w-full pt-16 sm:pt-20">
        {children}
      </div>
    </div>
  );
}
