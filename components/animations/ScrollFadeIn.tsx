'use client';

import { useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollFadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 35,
      opacity: 0,
      duration: 0.9,
      delay,
      ease: 'power2.out',
    });
  }, { scope: containerRef });

  return <div ref={containerRef}>{children}</div>;
}
