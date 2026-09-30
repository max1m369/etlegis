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
  eyebrow: string;
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
    eyebrow: 'ОПЫТ ПРАКТИКИ',
    label: 'ГОД ОСНОВАНИЯ БЮРО',
    labelMobileLines: ['ГОД', 'ОСНОВАНИЯ'],
    viewBox: '0 0 300 120',
    width: 300,
    textX: '50%',
    textY: 96,
    fontSize: 104,
  },
  {
    id: 'deals',
    number: '1,2+',
    initialVal: 0.0,
    targetVal: 1.2,
    decimals: 1,
    suffix: '+',
    eyebrow: 'СОХРАНЁННЫЕ АКТИВЫ',
    label: 'МЛРД ₽ В СУДАХ И СПОРАХ',
    labelMobileLines: ['МЛРД ₽', 'СОХРАНЕНО'],
    viewBox: '0 0 260 120',
    width: 260,
    textX: '50%',
    textY: 96,
    fontSize: 104,
  },
  {
    id: 'disputes',
    number: '94%',
    initialVal: 0,
    targetVal: 94,
    decimals: 0,
    suffix: '%',
    eyebrow: 'РЕЗУЛЬТАТИВНОСТЬ',
    label: 'ВЫИГРАННЫХ ДЕЛ И СПОРОВ',
    labelMobileLines: ['ВЫИГРАННЫХ', 'ПРОЦЕССОВ'],
    viewBox: '0 0 280 120',
    width: 280,
    textX: '50%',
    textY: 96,
    fontSize: 104,
  },
];

export default function Numbers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(SVGTextElement | null)[]>([]);
  const gradRefs = useRef<(SVGLinearGradientElement | null)[]>([]);
  const dividerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const eyebrowRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Setup initial linearGradient positions at 45 degrees
      gradRefs.current.forEach((grad) => {
        if (grad) {
          grad.setAttribute('x1', '-100%');
          grad.setAttribute('y1', '-100%');
          grad.setAttribute('x2', '0%');
          grad.setAttribute('y2', '0%');
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

      // 1. Появление карточек фактоидов
      tl.fromTo(
        cardRefs.current,
        {
          rotateX: -60,
          scale: 0.88,
          y: 40,
          opacity: 0,
        },
        {
          rotateX: 0,
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );

      // 2. Вращение/прокрутка счётчика цифр
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

      // 4. Появление верхних коротких текстов (eyebrows)
      tl.fromTo(
        eyebrowRefs.current,
        {
          y: -10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // 5. Появление нижних подзаголовков
      tl.fromTo(
        labelRefs.current,
        {
          y: 14,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.35'
      );

      // 6. Градиентный световой блик под углом 45 градусов сверху вниз
      // Медленный, аккуратный и редкий блик, плавно проходящий по граням
      const gradStates = [
        { p: -120 },
        { p: -120 },
        { p: -120 },
      ];

      const applyGrad45 = (idx: number) => {
        const grad = gradRefs.current[idx];
        if (grad) {
          const p = gradStates[idx].p;
          grad.setAttribute('x1', `${p}%`);
          grad.setAttribute('y1', `${p}%`);
          grad.setAttribute('x2', `${p + 100}%`);
          grad.setAttribute('y2', `${p + 100}%`);
        }
      };

      // Первичный плавный каскадный пробег бликов
      gradStates.forEach((state, idx) => {
        tl.to(
          state,
          {
            p: 130,
            duration: 2.4,
            ease: 'power2.inOut',
            onUpdate: () => applyGrad45(idx),
          },
          `+=0.${idx * 3 + 2}`
        );
      });

      // 7. Постоянный цикличный блик в РАЗНОЕ ВРЕМЯ на всех 3 фактоидах:
      // Спокойный, не частый и не резкий цикл (длительность 2.8s, пауза 5.2s, интервал 2.2s)
      // Фактоид 0 (2019): delay 2.5s
      // Фактоид 1 (1,2+): delay 4.7s
      // Фактоид 2 (94%):  delay 6.9s
      gradStates.forEach((state, idx) => {
        gsap.to(state, {
          p: 130,
          duration: 2.8,
          ease: 'power2.inOut',
          repeat: -1,
          repeatDelay: 5.2,
          delay: 2.5 + idx * 2.2,
          onUpdate: () => applyGrad45(idx),
          onRepeat: () => {
            state.p = -120;
            applyGrad45(idx);
          },
        });
      });

      // 8. Постоянное плавное парение
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
                {/* Верхний короткий текст для смыслового контекста */}
                <span
                  ref={(el) => {
                    eyebrowRefs.current[idx] = el;
                  }}
                  className="font-sans text-[8px] sm:text-[10px] md:text-[11px] tracking-[0.22em] text-[#9B815C] dark:text-[#C5A880] font-semibold uppercase text-center mb-1.5 sm:mb-2.5 opacity-90 select-none"
                >
                  {stat.eyebrow}
                </span>

                {/* SVG-контур числа шрифтом Jost (black 900) с градиентным световым бликом под 45 градусов */}
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
                        y1="-100%"
                        x2="0%"
                        y2="0%"
                      >
                        {/* Базовый бронзовый благородный цвет */}
                        <stop offset="0%" stopColor="var(--accent-bronze, #9B815C)" />
                        <stop offset="38%" stopColor="var(--accent-bronze, #9B815C)" />
                        {/* Мягкий аккуратный световой блик под углом 45 градусов */}
                        <stop offset="47%" stopColor="#DFBF7A" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#FFF5E0" stopOpacity="1" />
                        <stop offset="53%" stopColor="#DFBF7A" stopOpacity="0.9" />
                        {/* Плавный переход обратно в бронзу */}
                        <stop offset="62%" stopColor="var(--accent-bronze, #9B815C)" />
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
                      style={{
                        fontFamily: "var(--font-body), 'Jost', -apple-system, BlinkMacSystemFont, sans-serif",
                        fontWeight: 900,
                      }}
                      fontSize={stat.fontSize}
                      letterSpacing="0.5"
                      fill={`url(#contour-shimmer-${idx})`}
                      stroke={`url(#contour-shimmer-${idx})`}
                      strokeWidth="0.8"
                      className="transition-colors font-body"
                    >
                      {stat.number}
                    </text>
                  </svg>
                </div>

                {/* Нижний подзаголовок */}
                <span
                  ref={(el) => {
                    labelRefs.current[idx] = el;
                  }}
                  className="font-sans text-[10px] sm:text-xs md:text-[13px] tracking-[0.20em] text-[#141517]/80 dark:text-[#E4E6DE]/80 font-medium mt-2 sm:mt-4 lg:mt-6 uppercase text-center leading-tight sm:leading-normal select-none"
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
