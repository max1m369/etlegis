'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  type?: 'fade-up' | 'mask-line' | 'stagger' | 'hairline';
  delay?: number;
  duration?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  type = 'fade-up',
  delay = 0,
  duration = 0.8,
}: ScrollRevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    let ctx = gsap.context(() => {
      if (type === 'fade-up') {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      } else if (type === 'mask-line') {
        gsap.fromTo(
          el,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: duration * 1.1,
            delay,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      } else if (type === 'hairline') {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.0,
            delay,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      } else if (type === 'stagger') {
        const children = el.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration,
            stagger: 0.12,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, elRef);

    return () => ctx.revert();
  }, [type, delay, duration]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}
