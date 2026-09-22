'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { lawyers } from '@/lib/data/mock-data';
import { getDynamicEmployees } from '@/lib/data/payload-api';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SpotlightButton from '@/components/ui/SpotlightButton';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Team() {
  const [teamLawyers, setTeamLawyers] = useState(lawyers);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const activeIdxRef = useRef<number>(0);

  // Fetch dynamic employees sorted: 1st Biryukov, 2nd Luchnikov, others at end
  useEffect(() => {
    getDynamicEmployees().then((data) => {
      if (data && data.length > 0) {
        setTeamLawyers(data);
      }
    });
  }, []);

  // GSAP ScrollTrigger horizontal scroll with 100vh section pinning
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!section || !track || !viewport) return;

    let ctx: gsap.Context;

    const timer = setTimeout(() => {
      // Kill previous instance if exists to avoid ghost triggers
      ScrollTrigger.getById('team-scroll')?.kill();

      ctx = gsap.context(() => {
        const getScrollAmount = () => Math.max(0, track.scrollWidth - viewport.clientWidth + 48);
        const totalCards = teamLawyers.length;

        const scrollAmount = getScrollAmount();
        if (scrollAmount <= 0) return;

        const tween = gsap.to(track, {
          x: () => -scrollAmount,
          ease: 'none', // Линейное перемещение strictly 1:1 со скроллом
        });

        ScrollTrigger.create({
          id: 'team-scroll',
          trigger: section,
          animation: tween,
          pin: true,
          pinSpacing: true,
          start: 'top top', // Точная фиксация вверху экрана
          end: () => `+=${scrollAmount * 1.25}`,
          scrub: 1, // Мягкое сглаживание без рывков
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(totalCards - 1, Math.floor(self.progress * totalCards));
            activeIdxRef.current = idx;
            if (counterRef.current) {
              counterRef.current.textContent = String(idx + 1).padStart(2, '0');
            }
          },
        });
      }, section);

      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
      ScrollTrigger.getById('team-scroll')?.kill();
    };
  }, [teamLawyers]);

  const scrollToCard = (index: number) => {
    const st = ScrollTrigger.getById('team-scroll');
    if (st) {
      const progress = index / Math.max(1, teamLawyers.length - 1);
      const targetScroll = st.start + (st.end - st.start) * progress;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    } else {
      activeIdxRef.current = index;
      if (counterRef.current) {
        counterRef.current.textContent = String(index + 1).padStart(2, '0');
      }
      const track = trackRef.current;
      if (!track) return;
      const cardWidth = 384;
      gsap.to(track, {
        x: -index * cardWidth,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const handlePrev = () => {
    const current = activeIdxRef.current;
    const nextIdx = current === 0 ? teamLawyers.length - 1 : current - 1;
    scrollToCard(nextIdx);
  };

  const handleNext = () => {
    const current = activeIdxRef.current;
    const nextIdx = current === teamLawyers.length - 1 ? 0 : current + 1;
    scrollToCard(nextIdx);
  };

  return (
    <section
      ref={sectionRef}
      id="team"
      className="team-section min-h-screen lg:h-screen w-full relative overflow-hidden bg-[#FFFFFF] dark:bg-et-bg border-t border-[#E2E2DC] dark:border-border-subtle flex flex-col justify-between pt-20 pb-10 px-[clamp(1.5rem,4vw,6rem)]"
    >
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-14 items-start w-full my-auto">
        {/* 1. Левая закрепленная колонка (team-sidebar) */}
        <div className="team-sidebar w-full lg:w-[32%] xl:w-[30%] shrink-0 z-10 flex flex-col justify-between pt-1">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#9B815C] dark:text-accent-bronze font-mono font-semibold block mb-3">
              Лидеры практик
            </span>
            <h2 className="font-heading font-normal text-[clamp(2.5rem,4.4vw,6.5rem)] tracking-tight text-[#141517] dark:text-et-dark leading-[1.05] mb-6">
              Команда бюро
            </h2>
            <p className="text-sm text-[#5E6267] dark:text-et-muted font-light leading-relaxed mb-8 max-w-sm">
              Партнеры и адвокаты бюро с практическим опытом защиты бизнеса, активов и персональных интересов руководителей.
            </p>
          </div>
        </div>

        {/* 2. Правая область (team-slider-viewport): Окно просмотра карточек */}
        <div
          ref={viewportRef}
          className="team-slider-viewport w-full lg:w-[68%] xl:w-[70%] overflow-hidden flex flex-col"
        >
          {/* Длинная лента с карточками (team-track) */}
          <div
            ref={trackRef}
            className="team-track flex gap-6 will-change-transform pt-1"
          >
            {teamLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="team-card w-[300px] sm:w-[340px] xl:w-[360px] shrink-0 bg-[#F8F9FA] dark:bg-bg-surface border border-[#E2E2DC] dark:border-border-subtle rounded-[2px] p-5 sm:p-6 flex flex-col justify-between shadow-subtle hover:shadow-card hover:border-[#141517] dark:hover:border-accent-bronze transition-all duration-300 group cursor-pointer"
              >
                <div>
                  {/* Портретная фотография адвоката */}
                  <div className="relative aspect-[3/4] max-h-[380px] w-full overflow-hidden bg-[#ECECE8] dark:bg-bg-subtle rounded-[2px] mb-4 group/photo">
                    {lawyer.photoUrl ? (
                      <img
                        src={lawyer.photoUrl}
                        alt={lawyer.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/photo:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#5E6267] dark:text-et-muted bg-[#ECECE8] dark:bg-bg-subtle">
                        Да, фотография
                      </div>
                    )}

                    <div className="absolute top-3 left-3 bg-[#141517]/85 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest rounded-[2px] z-10">
                      Стаж {lawyer.experienceYears} лет
                    </div>

                    {/* Выплывающая всплывашка при наведении на фотографию: «Смотреть полный профиль» */}
                    <Link
                      href={`/team/${lawyer.slug}`}
                      className="absolute inset-0 bg-[#141517]/75 backdrop-blur-sm opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center z-20"
                    >
                      <span className="text-white text-[11px] font-mono font-medium uppercase tracking-widest border border-white/40 px-4 py-2.5 bg-white/10 hover:bg-white hover:text-[#141517] transition-all rounded-[2px]">
                        Смотреть полный профиль →
                      </span>
                    </Link>
                  </div>

                  {/* Описание под фотографией: Статус, Имя, Специализация */}
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#9B815C] dark:text-accent-bronze block mb-1">
                    {lawyer.status}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#141517] dark:text-et-dark leading-snug mb-2 group-hover:text-[#507192] dark:group-hover:text-accent-bronze transition-colors">
                    <Link href={`/team/${lawyer.slug}`}>
                      {lawyer.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-[#5E6267] dark:text-et-muted font-light leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4">
                    {Array.isArray((lawyer as any).specializations)
                      ? (lawyer as any).specializations.join(', ')
                      : lawyer.specialization || (lawyer as any).quote || (lawyer as any).bio}
                  </p>
                </div>

                {/* Ссылка под карточкой */}
                <div className="pt-4 border-t border-[#ECECE8] dark:border-border-subtle">
                  <Link href={`/team/${lawyer.slug}`} className="block w-full">
                    <SpotlightButton className="w-full py-3 px-4 text-xs">
                      Смотреть профиль
                    </SpotlightButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Нижняя плашка прямо под карточками */}
          <div className="mt-6 pt-5 border-t border-[#E2E2DC] dark:border-border-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
            {/* Текст слева */}
            <p className="text-sm text-[#5E6267] dark:text-et-muted max-w-md xl:max-w-lg font-light leading-relaxed">
              Практический опыт и высокая личная экспертиза партнеров бюро для защиты вашего бизнеса.
            </p>

            {/* Справа: Переключатель слайдов (01 / 05 < >) + Кнопка "ВСЯ КОМАНДА БЮРО" */}
            <div className="flex items-center gap-6 shrink-0">
              <div className="text-xs font-mono font-medium text-[#141517] dark:text-et-dark tracking-wider flex items-center gap-4">
                <div>
                  <span ref={counterRef} className="text-sm font-bold text-[#507192] dark:text-accent-bronze">01</span>
                  <span className="text-[#5E6267] dark:text-et-muted mx-1">/</span>
                  <span className="text-[#5E6267] dark:text-et-muted">{String(teamLawyers.length).padStart(2, '0')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Предыдущий адвокат"
                    className="w-10 h-10 border border-[#141517]/30 dark:border-border-subtle hover:border-[#507192] dark:hover:border-accent-bronze hover:text-[#507192] dark:hover:text-accent-bronze rounded-[2px] flex items-center justify-center transition-colors bg-white dark:bg-bg-surface text-[#141517] dark:text-et-dark"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Следующий адвокат"
                    className="w-10 h-10 border border-[#141517]/30 dark:border-border-subtle hover:border-[#507192] dark:hover:border-accent-bronze hover:text-[#507192] dark:hover:text-accent-bronze rounded-[2px] flex items-center justify-center transition-colors bg-white dark:bg-bg-surface text-[#141517] dark:text-et-dark"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <Link href="/team" className="shrink-0">
                <SpotlightButton className="px-6 py-3.5 text-xs uppercase tracking-wider">
                  Вся команда бюро
                </SpotlightButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
