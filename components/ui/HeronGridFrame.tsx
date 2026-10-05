'use client';

import React from 'react';

export default function HeronGridFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-[#F6F6F2] dark:bg-[#090A0D] text-[#282828] dark:text-[#EEEEEE] selection:bg-[#FA3600] selection:text-white transition-colors duration-500">
      
      {/* 1. Apple-Style Tactile Film Grain Overlay (feTurbulence Fractal Noise) */}
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-[0.042] dark:opacity-[0.045] mix-blend-multiply dark:mix-blend-screen select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='appleGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23appleGrain)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* 2. Soft Ambient Lighting Vignette (Warm Apple studio depth) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 dark:opacity-20"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(250, 54, 0, 0.035), transparent 70%)',
        }}
      />

      {/* 3. Subtle Technical Cartesian Grid Dots */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025] dark:opacity-[0.02] mix-blend-multiply dark:mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(#282828 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* 4. Outer Technical Hairline Frame */}
      <div className="pointer-events-none fixed inset-2 sm:inset-4 z-40 border border-[#D1D1CB] dark:border-[#222528]" />

      {/* 5. Corner Precision Crosshairs '+' */}
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

      {/* 6. Millimeter Ruler Dashes on Side Margins */}
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

      {/* 7. Main Content Canvas */}
      <div className="relative z-10 w-full pt-16 sm:pt-20">
        {children}
      </div>
    </div>
  );
}
