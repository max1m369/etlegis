'use client';

import React, { useEffect, useRef } from 'react';

/**
 * ChameleonLogo - Dual-layer pure SVG monogram mark for ETLEGIS (Version 2.6).
 * Positioned in Column 1 (20% rail) and dynamically transitions between dark (#1C2633)
 * and white (#FFFFFF) in exact lockstep with the background boundary of dark sections.
 * Clean, sharp geometric rendering without any glow or drop-shadows ("Без всяких свечений, без всего").
 */
export default function ChameleonLogo() {
  const logoRef = useRef<HTMLDivElement>(null);
  const lightLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateChameleon = () => {
      if (!logoRef.current || !lightLayerRef.current) return;

      const logoRect = logoRef.current.getBoundingClientRect();
      const logoTop = logoRect.top;
      const logoBottom = logoRect.bottom;
      const logoHeight = logoRect.height;

      // Find all sections marked as dark
      const darkSections = document.querySelectorAll<HTMLElement>('[data-bg="dark"]');

      let maxOverlapTop: number | null = null;
      let maxOverlapBottom: number | null = null;

      for (const sec of darkSections) {
        const secRect = sec.getBoundingClientRect();
        const overlapTop = Math.max(logoTop, secRect.top);
        const overlapBottom = Math.min(logoBottom, secRect.bottom);

        if (overlapBottom > overlapTop) {
          maxOverlapTop = overlapTop;
          maxOverlapBottom = overlapBottom;
          break; // First intersecting dark section defines the clipping
        }
      }

      if (maxOverlapTop !== null && maxOverlapBottom !== null) {
        // Compute precise percentage clip-path
        const topInset = Math.max(0, Math.min(100, ((maxOverlapTop - logoTop) / logoHeight) * 100));
        const bottomInset = Math.max(0, Math.min(100, ((logoBottom - maxOverlapBottom) / logoHeight) * 100));
        lightLayerRef.current.style.clipPath = `inset(${topInset.toFixed(2)}% 0% ${bottomInset.toFixed(2)}% 0%)`;
      } else {
        // Completely over light section -> clip away white layer entirely
        lightLayerRef.current.style.clipPath = 'inset(100% 0% 0% 0%)';
      }

      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateChameleon);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    // Initial calculation on mount
    updateChameleon();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      ref={logoRef}
      onClick={scrollToTop}
      role="button"
      tabIndex={0}
      title="ETLEGIS — Перейти к началу"
      className="fixed top-8 lg:top-12 z-50 w-12 h-12 lg:w-16 lg:h-16 cursor-pointer select-none left-4 lg:left-[10%] -translate-x-0 lg:-translate-x-1/2 transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      {/* 1. Base Layer: Dark Monogram (#1C2633 for Light Sections) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#1C2633"
            d="M100,28V12H32v17.5H11v73.5h73.5v-21h17.5V63H50V52.5h50V38.5H50V28H100z M75.5,80.5v14H18.5V35h14v45.5H75.5z"
          />
        </svg>
      </div>

      {/* 2. Reveal Layer: Pure Crisp White Monogram (#FFFFFF for Dark Sections) - Dynamic Liquid Clip */}
      <div
        ref={lightLayerRef}
        className="absolute inset-0 w-full h-full pointer-events-none will-change-[clip-path]"
        style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFFFFF"
            d="M100,28V12H32v17.5H11v73.5h73.5v-21h17.5V63H50V52.5h50V38.5H50V28H100z M75.5,80.5v14H18.5V35h14v45.5H75.5z"
          />
        </svg>
      </div>
    </div>
  );
}
