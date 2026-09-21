'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface MetricItem {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  description: string;
  staticText?: string;
}

const STATS: MetricItem[] = [
  {
    value: 2019,
    label: 'Год основания бюро',
    description: 'Стабильный рост и безупречная судебная репутация.',
  },
  {
    value: 1.2,
    suffix: '+ млрд ₽',
    decimals: 1,
    label: 'Сохраненных активов',
    description: 'В арбитражных спорах и процедурах банкротства.',
  },
  {
    value: 94,
    suffix: '%',
    label: 'Успешно разрешенных споров',
    description: 'В судах всех уровней и инстанций.',
  },
];

export default function Numbers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Анимация проявления карточек
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Анимация счетчиков прокрутки (@motion/stats-counters style)
      const obj = { val0: 0, val1: 0, val2: 0 };
      gsap.to(obj, {
        val0: 2019,
        val1: 1.2,
        val2: 94,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          setCounts([obj.val0, obj.val1, obj.val2]);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 py-24 sm:py-36 lg:py-48 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans"
    >
      {/* Прямоугольная плашка с 3 метриками: мягкая, плавная тень */}
      <div className="bg-white border border-[#E8E8E2] rounded-none shadow-[0_8px_30px_rgba(20,21,23,0.035),0_1px_4px_rgba(20,21,23,0.02)] p-8 sm:p-12 lg:p-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#ECECE8]">
          {STATS.map((item, index) => {
            let displayVal = '';
            if (item.staticText) {
              displayVal = item.staticText;
            } else if (item.decimals) {
              displayVal = counts[index].toFixed(item.decimals).replace('.', ',');
            } else {
              displayVal = Math.floor(counts[index]).toString();
            }

            return (
              <div
                key={item.label}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`flex flex-col justify-between ${
                  index > 0 ? 'pt-8 md:pt-0 md:pl-8 lg:pl-12' : ''
                } ${index < 2 ? 'md:pr-8 lg:pr-12' : ''}`}
              >
                <div>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="font-sans font-bold text-4xl sm:text-5xl lg:text-[52px] text-[#141517] tracking-tight leading-none">
                      {displayVal}
                    </span>
                    {item.suffix && (
                      <span className="font-sans font-medium text-xl sm:text-2xl text-[#9B815C]">
                        {item.suffix}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-[15px] font-sans font-semibold text-[#141517] mb-1.5 leading-snug">
                    {item.label}
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] font-sans text-[#5E6267] leading-relaxed mt-2 font-normal">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
