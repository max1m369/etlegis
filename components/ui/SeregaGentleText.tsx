'use client';

import React, { useEffect, useRef } from 'react';

interface SeregaGentleTextProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: 'span' | 'h1' | 'h2' | 'p' | 'div';
}

function splitGraphemes(value: string): string[] {
  if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    return Array.from(segmenter.segment(value), ({ segment }) => segment);
  }
  return Array.from(value);
}

export default function SeregaGentleText({
  children,
  className = '',
  delay = 0,
  stagger = 15,
  duration = 500,
  as: Component = 'span',
}: SeregaGentleTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const units = el.querySelectorAll<HTMLElement>('.serega-unit');
    if (!units || units.length === 0) return;

    // Serega Gentle WAAPI animation
    const animations: Animation[] = [];
    units.forEach((unit, idx) => {
      const anim = unit.animate(
        [
          { opacity: 0, transform: 'translate3d(0, 15px, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ],
        {
          delay: delay + idx * stagger,
          duration,
          easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          fill: 'forwards',
        }
      );
      animations.push(anim);
    });

    return () => {
      animations.forEach((anim) => anim.cancel());
    };
  }, [delay, stagger, duration, children]);

  // Split into words and graphemes
  const graphemes = splitGraphemes(children);
  const words: string[][] = [];
  let currentWord: string[] = [];

  for (const g of graphemes) {
    currentWord.push(g);
    if (/^\s+$/u.test(g)) {
      words.push(currentWord);
      currentWord = [];
    }
  }
  if (currentWord.length > 0) {
    words.push(currentWord);
  }

  return (
    <Component
      ref={containerRef as any}
      aria-label={children}
      className={`inline-block ${className}`}
    >
      <span aria-hidden="true" className="inline">
        {words.map((word, wIdx) => (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {word.map((char, cIdx) => (
              <span
                key={cIdx}
                className="serega-unit inline-block opacity-0 will-change-[transform,opacity]"
                style={{ whiteSpace: 'pre' }}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </span>
    </Component>
  );
}
