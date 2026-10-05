'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function HeronCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
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

      // Instantaneous zero-lag positioning for the primary reticle center
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = !!target.closest(
        'a, button, [role="button"], input, textarea, select, .interactive, [data-interactive]'
      );
      setIsHovered(isInteractive);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Agile, featherlight lerp loop (high-responsiveness: lerp factor 0.42 eliminates sluggish drag)
    const render = () => {
      const lerp = 0.42; // Fast, agile, buttery smooth without heavy drag
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
    document.addEventListener('mouseenter', onMouseEnter);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-200 hidden md:block ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. Precision Center Reticle Dot (Zero-lag) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
          isHovered ? 'bg-[#FA3600]' : 'bg-[#282828] dark:bg-white'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* 2. Agile, Featherlight Follower Reticle Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-all duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? 'h-9 w-9 border-[#FA3600] bg-[#FA3600]/10 scale-110 shadow-[0_0_12px_rgba(250,54,0,0.25)]'
            : 'h-6 w-6 border-[#282828]/50 dark:border-white/50 scale-100'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* Optical corner ticks when hovering interactive elements */}
        {isHovered && (
          <span className="w-1 h-1 bg-[#FA3600] rounded-full animate-ping pointer-events-none" />
        )}
      </div>
    </div>
  );
}
