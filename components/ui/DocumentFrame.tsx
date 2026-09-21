'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function DocumentFrame({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 4 Corner Brackets refs
  const bTlRef = useRef<SVGSVGElement>(null);
  const bTrRef = useRef<SVGSVGElement>(null);
  const bBlRef = useRef<SVGSVGElement>(null);
  const bBrRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const bTl = bTlRef.current;
    const bTr = bTrRef.current;
    const bBl = bBlRef.current;
    const bBr = bBrRef.current;
    const content = contentRef.current;

    if (!bTl || !bTr || !bBl || !bBr || !content) return;

    // Анимация разворачивания «документика»:
    // Скобки сходятся из центра к 4 краям документа, и проявляется контент
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      gsap.set(content, { opacity: 0, y: 15 });

      tl.fromTo(
        [bTl, bTr, bBl, bBr],
        { opacity: 0, scale: 0.2 },
        { opacity: 1, scale: 1, duration: 0.6 }
      ).to(
        content,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-10 px-8 sm:px-14 my-6 bg-white border border-[#E2E2DC] shadow-[0_10px_35px_rgba(0,0,0,0.05)] rounded-none overflow-hidden"
    >
      {/* 1. Верхний-Левый угол — строго заподлицо с внешним краем (top-0 left-0) */}
      <svg
        ref={bTlRef}
        className="absolute top-0 left-0 pointer-events-none z-20 overflow-visible text-[#2C3E50]"
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
      >
        <path d="M 0 44 V 0 H 44" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      </svg>

      {/* 2. Верхний-Правый угол — строго заподлицо с внешним краем (top-0 right-0) */}
      <svg
        ref={bTrRef}
        className="absolute top-0 right-0 pointer-events-none z-20 overflow-visible text-[#2C3E50]"
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
      >
        <path d="M 0 0 H 44 V 44" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      </svg>

      {/* 3. Нижний-Левый угол — строго заподлицо с внешним краем (bottom-0 left-0) */}
      <svg
        ref={bBlRef}
        className="absolute bottom-0 left-0 pointer-events-none z-20 overflow-visible text-[#2C3E50]"
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
      >
        <path d="M 0 0 V 44 H 44" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      </svg>

      {/* 4. Нижний-Правый угол — строго заподлицо с внешним краем (bottom-0 right-0) */}
      <svg
        ref={bBrRef}
        className="absolute bottom-0 right-0 pointer-events-none z-20 overflow-visible text-[#2C3E50]"
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
      >
        <path d="M 44 0 V 44 H 0" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      </svg>

      {/* Содержимое документа */}
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
    </div>
  );
}
