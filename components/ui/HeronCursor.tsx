'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function HeronCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Instant positioning for central dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = !!target.closest('a, button, [role="button"], input, textarea, select, .interactive, [data-interactive]');
      setIsHovered(isInteractive);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth lerp loop for the trailing reticle ring
    const render = () => {
      // Lerp factor
      const lerp = 0.18;
      ringX += (mouseX - ringX) * lerp;
      ringY += (mouseY - ringY) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 hidden md:block ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. Core Reticle Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
          isHovered ? 'bg-[#FA3600]' : 'bg-[#282828] dark:bg-white'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* 2. Trailing Reticle Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-all duration-300 ease-out ${
          isHovered
            ? 'h-12 w-12 border-[#FA3600]/80 bg-[#FA3600]/5 scale-100'
            : 'h-7 w-7 border-[#282828]/40 dark:border-white/40 scale-75'
        }`}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
