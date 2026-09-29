'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface StatItem {
  id: string;
  number: string;
  initialVal: number;
  targetVal: number;
  decimals: number;
  suffix?: string;
  prefix?: string;
  label: string;
  labelMobileLines: [string, string];
  viewBox: string;
  width: number;
  textX: string;
  textY: number;
  fontSize: number;
}

const STATS_DATA: StatItem[] = [
  {
    id: 'foundation',
    number: '2019',
    initialVal: 1960,
    targetVal: 2019,
    decimals: 0,
    label: 'ГОД ОСНОВАНИЯ',
    labelMobileLines: ['ГОД', 'ОСНОВАНИЯ'],
    viewBox: '0 0 280 120',
    width: 280,
    textX: '50%',
    textY: 96,
    fontSize: 122,
  },
  {
    id: 'deals',
    number: '1,2+',
    initialVal: 0.0,
    targetVal: 1.2,
    decimals: 1,
    suffix: '+',
    label: 'СОВЕРШЁННЫХ СДЕЛОК',
    labelMobileLines: ['СОВЕРШЁННЫХ', 'СДЕЛОК'],
    viewBox: '0 0 240 120',
    width: 240,
    textX: '50%',
    textY: 96,
    fontSize: 122,
  },
  {
    id: 'disputes',
    number: '94%',
    initialVal: 0,
    targetVal: 94,
    decimals: 0,
    suffix: '%',
    label: 'ВЫИГРАННЫХ СПОРОВ',
    labelMobileLines: ['ВЫИГРАННЫХ', 'СПОРОВ'],
    viewBox: '0 0 260 120',
    width: 260,
    textX: '50%',
    textY: 96,
    fontSize: 122,
  },
];

export default function Numbers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(SVGTextElement | null)[]>([]);
  const gradRefs = useRef<(SVGLinearGradientElement | null)[]>([]);
  const dividerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Setup initial linearGradient positions (glare hidden before trigger)
      gradRefs.current.forEach((grad) => {
        if (grad) {
          grad.setAttribute('x1', '-100%');
          grad.setAttribute('x2', '0%');
        }
      });

      // Master Timeline triggered when section enters viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });

      // 1. Вращение и 3D-появление карточек с цифрами
      tl.fromTo(
        cardRefs.current,
        {
          rotateX: -75,
          scale: 0.86,
          y: 45,
          opacity: 0,
        },
        {
          rotateX: 0,
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.14,
          ease: 'power3.out',
        }
      );

      // 2. Вращение/прокрутка счётчика цифр (циферки крутятся)
      STATS_DATA.forEach((stat, idx) => {
        const textEl = textRefs.current[idx];
        if (!textEl) return;

        const counterObj = { val: stat.initialVal };

        tl.to(
          counterObj,
          {
            val: stat.targetVal,
            duration: 1.35,
            ease: 'power2.out',
            onUpdate: () => {
              if (textEl) {
                let formatted =
                  stat.decimals > 0
                    ? counterObj.val.toFixed(stat.decimals).replace('.', ',')
                    : Math.round(counterObj.val).toString();

                if (stat.suffix) formatted += stat.suffix;
                textEl.textContent = formatted;
              }
            },
          },
          '<+=0.05'
        );
      });

      // 3. Вырастание вертикальных разделителей
      tl.fromTo(
        dividerRefs.current,
        {
          scaleY: 0,
          opacity: 0,
        },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.inOut',
          transformOrigin: 'top center',
        },
        '-=0.45'
      );

      // 4. Появление текста подзаголовков
      tl.fromTo(
        labelRefs.current,
        {
          y: 16,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.35'
      );

      // 5. Градиентный световой блик, пробегающий прямо по контуру всех цифр
      const gradState = { offset: -90 };

      const updateGradients = () => {
        const x1 = `${gradState.offset}%`;
        const x2 = `${gradState.offset + 100}%`;
        gradRefs.current.forEach((g) => {
          if (g) {
            g.setAttribute('x1', x1);
            g.setAttribute('x2', x2);
          }
        });
      };

      // Первичный яркий пробег блика после появления
      tl.to(
        gradState,
        {
          offset: 120,
          duration: 1.8,
          ease: 'power1.inOut',
          onUpdate: updateGradients,
        },
        '+=0.1'
      );

      // 6. Цикличный лёгкий блик каждые 3.5 секунды
      gsap.to(gradState, {
        offset: 120,
        duration: 2.1,
        ease: 'power1.inOut',
        repeat: -1,
        repeatDelay: 3.5,
        onUpdate: updateGradients,
        delay: 2.6,
      });

      // 7. Постоянное плавное дыхание / парение ("чтобы всё было в движении")
      gsap.to(cardRefs.current, {
        y: '-=4',
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.28,
        delay: 1.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about-numbers"
      ref={sectionRef}
      className="relative z-20 py-16 sm:py-24 lg:py-32 w-full overflow-hidden bg-et-bg transition-colors"
      aria-label="О бюро в цифрах"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Сетка с 3 колонками и тонкими вертикальными разделителями между ними */}
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center justify-items-center w-full">
          {STATS_DATA.map((stat, idx) => (
            <React.Fragment key={stat.id}>
              {/* Колонка показателя */}
              <div
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="stat-col flex flex-col items-center justify-center text-center w-full px-1 sm:px-3 lg:px-4 group cursor-default"
                style={{ perspective: 1200 }}
              >
                {/* SVG-контур числа с градиентным световым бликом */}
                <div className="stat-svg-wrap w-full max-w-[170px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[300px] select-none transition-transform duration-300 group-hover:scale-105">
                  <svg
                    viewBox={stat.viewBox}
                    className="w-full h-auto overflow-visible select-none pointer-events-none drop-shadow-sm filter"
                  >
                    <defs>
                      <linearGradient
                        id={`contour-shimmer-${idx}`}
                        ref={(el) => {
                          gradRefs.current[idx] = el;
                        }}
                        x1="-100%"
                        y1="0%"
                        x2="0%"
                        y2="0%"
                      >
                        {/* Базовый благородный бронзовый контур */}
                        <stop offset="0%" stopColor="var(--accent-bronze, #9B815C)" />
                        <stop offset="32%" stopColor="var(--accent-bronze, #9B815C)" />
                        {/* Световой блик, пробегающий прямо по контуру */}
                        <stop offset="46%" stopColor="#FFFFFF" stopOpacity="0.95" />
                        <stop offset="50%" stopColor="#FFE082" stopOpacity="1" />
                        <stop offset="54%" stopColor="#FFFFFF" stopOpacity="0.95" />
                        {/* Возврат в бронзовый контур */}
                        <stop offset="68%" stopColor="var(--accent-bronze, #9B815C)" />
                        <stop offset="100%" stopColor="var(--accent-bronze, #9B815C)" />
                      </linearGradient>
                    </defs>
                    <text
                      ref={(el) => {
                        textRefs.current[idx] = el;
                      }}
                      x={stat.textX}
                      y={stat.textY}
                      textAnchor="middle"
                      fontFamily="var(--font-condensed), 'Oswald', sans-serif"
                      fontWeight="700"
                      fontSize={stat.fontSize}
                      letterSpacing="1"
                      fill="none"
                      stroke={`url(#contour-shimmer-${idx})`}
                      strokeWidth="2.5"
                      className="transition-colors"
                    >
                      {stat.number}
                    </text>
                  </svg>
                </div>

                {/* Подзаголовок */}
                <span
                  ref={(el) => {
                    labelRefs.current[idx] = el;
                  }}
                  className="font-sans text-[10px] sm:text-xs md:text-[13px] tracking-[0.22em] text-[#141517]/80 dark:text-[#E4E6DE]/80 font-medium mt-3 sm:mt-5 lg:mt-7 uppercase text-center leading-tight sm:leading-normal"
                >
                  <span className="sm:hidden block">
                    {stat.labelMobileLines[0]}
                    <br />
                    {stat.labelMobileLines[1]}
                  </span>
                  <span className="hidden sm:inline">{stat.label}</span>
                </span>
              </div>

              {/* Вертикальный разделитель (кроме последней колонки) */}
              {idx < STATS_DATA.length - 1 && (
                <div
                  ref={(el) => {
                    dividerRefs.current[idx] = el;
                  }}
                  className="w-[1px] h-[90px] sm:h-[135px] md:h-[170px] lg:h-[200px] bg-[#9B815C]/40 dark:bg-accent-bronze/45 origin-top shrink-0 mx-1 sm:mx-3 md:mx-6"
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
