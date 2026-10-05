'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import TeamProfileDrawer from './TeamProfileDrawer';

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  practice: string;
  description: string;
  photo: string;
  fallbackPhoto: string;
  position: string;
  experience?: string;
  education?: string[];
  email?: string;
  bioFull?: string;
  palette?: string[];
}

export const team: TeamMember[] = [
  {
    id: 'biryukov-alexey',
    slug: 'biryukov-alexey',
    name: 'Алексей Бирюков',
    role: 'Управляющий партнёр, адвокат',
    practice: 'Стратегия защиты бизнеса',
    description: '16 лет практики. Комплексная защита бенефициаров и генеральных директоров при уголовных и налоговых рисках высокой сложности.',
    photo: '/team/t1.webp',
    fallbackPhoto: '/assets/t1.png',
    position: '50% 30%',
    experience: '16 лет практики',
    education: ['МГУ им. М.В. Ломоносова (Юридический факультет)', 'Аспирантура ИЗиСП при Правительстве РФ'],
    email: 'biryukov@etlegis.ru',
    bioFull: 'Специализируется на комплексной защите бенефициаров и генеральных директоров при уголовных и налоговых рисках высокой сложности. Представляет интересы доверителей в Верховном Суде РФ и арбитражных судах всех инстанций.',
    palette: ['#C5A880', '#9B815C', '#141517'],
  },
  {
    id: 'luchnikov-konstantin',
    slug: 'luchnikov-konstantin',
    name: 'Константин Лучников',
    role: 'Партнёр',
    practice: 'Корпоративное право и арбитраж',
    description: '12 лет практики. Разрешение многомиллиардных корпоративных споров, ведение банкротства и защита от субсидиарной ответственности.',
    photo: '/team/t2.webp',
    fallbackPhoto: '/assets/t2.png',
    position: '50% 30%',
    experience: '12 лет практики',
    education: ['МГЮА им. О.Е. Кутафина (Институт адвокатуры)'],
    email: 'luchnikov@etlegis.ru',
    bioFull: 'Ведущий эксперт бюро по разрешению сложных корпоративных конфликтов, сопровождению комплексных процедур банкротства и защите топ-менеджеров от многомиллиардной субсидиарной ответственности.',
    palette: ['#C5A880', '#8B704C', '#171A21'],
  },
  {
    id: 'sokolov-mikhail',
    slug: 'sokolov-mikhail',
    name: 'Михаил Соколов',
    role: 'Партнёр, адвокат',
    practice: 'Уголовно-правовая защита',
    description: '15 лет практики. Предотвращение уголовных рисков на стадии доследственных проверок ОБЭП и СК РФ, экстренная помощь при обысках.',
    photo: '/team/t3.webp',
    fallbackPhoto: '/assets/t3.png',
    position: '50% 30%',
    experience: '15 лет практики',
    education: ['СПбГУ (Юридический факультет)'],
    email: 'sokolov@etlegis.ru',
    bioFull: 'Специализируется на уголовно-правовой защите бизнеса при доследственных проверках и расследовании экономических преступлений Следственным комитетом и МВД РФ. Руководит группой экстренного реагирования при следственных действиях.',
    palette: ['#C5A880', '#9B815C', '#11141A'],
  },
  {
    id: 'romanova-ekaterina',
    slug: 'romanova-ekaterina',
    name: 'Екатерина Романова',
    role: 'Партнёр',
    practice: 'Защита бизнеса и активов',
    description: '14 лет практики. Уголовно-правовой аудит бизнеса, защита топ-менеджмента по сложным экономическим и должностным делам.',
    photo: '/team/t4.webp',
    fallbackPhoto: '/assets/t4.png',
    position: '50% 30%',
    experience: '14 лет практики',
    education: ['МГУ им. М.В. Ломоносова'],
    email: 'romanova@etlegis.ru',
    bioFull: 'Руководитель практики уголовно-правового комплаенса и форензик-аудита. Сопровождает комплексные сделки с повышенным регуляторным риском и защищает активы доверителей от недружественных поглощений.',
    palette: ['#C5A880', '#A38762', '#141517'],
  },
  {
    id: 'dmitriev-sergey',
    slug: 'dmitriev-sergey',
    name: 'Сергей Дмитриев',
    role: 'Руководитель практики',
    practice: 'Банкротство и реструктуризация',
    description: '11 лет практики. Комплексное сопровождение банкротных процедур, оспаривание сделок должника и сохранение активов.',
    photo: '/team/t5.webp',
    fallbackPhoto: '/assets/t5.png',
    position: '50% 30%',
    experience: '11 лет практики',
    education: ['НИУ ВШЭ (Факультет права)'],
    email: 'dmitriev@etlegis.ru',
    bioFull: 'Курирует практику банкротства и санации бизнеса. Обладает прецедентным опытом возврата выведенных активов, оспаривания сделок должников и представления интересов мажоритарных кредиторов.',
    palette: ['#C5A880', '#8C7352', '#181B22'],
  },
  {
    id: 'bulatova-kseniya',
    slug: 'bulatova-kseniya',
    name: 'Ксения Булатова',
    role: 'Партнёр',
    practice: 'Налоговые споры и комплаенс',
    description: '13 лет практики. Налоговый консалтинг, сопровождение выездных проверок ФНС и защита от многомиллионных доначислений.',
    photo: '/team/t6.webp',
    fallbackPhoto: '/assets/t6.png',
    position: '50% 30%',
    experience: '13 лет практики',
    education: ['Финансовый университет при Правительстве РФ'],
    email: 'bulatova@etlegis.ru',
    bioFull: 'Адвокат и налоговый консультант с 13-летним стажем. Успешно защищает корпоративных клиентов в арбитражных спорах с налоговыми органами и сопровождает комплексные выездные налоговые проверки (ВНП).',
    palette: ['#C5A880', '#9B815C', '#141517'],
  },
  {
    id: 'morozova-anna',
    slug: 'morozova-anna',
    name: 'Анна Морозова',
    role: 'Старший юрист',
    practice: 'Коммерческие споры',
    description: '9 лет практики. Корпоративное управление, структурирование нестандартных сделок и защита от недружественного поглощения.',
    photo: '/team/t7.webp',
    fallbackPhoto: '/assets/t7.png',
    position: '50% 30%',
    experience: '9 лет практики',
    education: ['МГЮА им. О.Е. Кутафина'],
    email: 'morozova@etlegis.ru',
    bioFull: 'Специализируется на комплексном сопровождении коммерческих споров, структурировании инвестиционных контрактов и защите корпоративных прав акционеров и участников обществ.',
    palette: ['#C5A880', '#9B815C', '#161920'],
  },
  {
    id: 'orlov-dmitriy',
    slug: 'orlov-dmitriy',
    name: 'Дмитрий Орлов',
    role: 'Советник бюро, адвокат',
    practice: 'Защита в высших судах',
    description: '24 года практики. Прецедентная судебная защита в Верховном Суде РФ, разрешение комплексных арбитражных споров.',
    photo: '/team/t8.webp',
    fallbackPhoto: '/assets/t8.png',
    position: '50% 30%',
    experience: '24 года практики',
    education: ['МГУ им. М.В. Ломоносова'],
    email: 'orlov@etlegis.ru',
    bioFull: 'Советник бюро с 24-летним опытом сложнейших судебных баталий. Специализируется на формировании прецедентных правовых позиций в Верховном Суде РФ и Конституционном Суде РФ по экономическим спорам высшей категории сложности.',
    palette: ['#C5A880', '#8B704C', '#11141A'],
  },
];

export default function Team() {
  const router = useRouter();
  const [active, setActive] = useState<number>(0);
  const activeRef = useRef<number>(0);

  const galleryRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const resizeFrameRef = useRef<number | null>(null);

  // Gesture & swipe refs
  const isDraggingRef = useRef<boolean>(false);
  const isPointerDownRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartYRef = useRef<number>(0);
  const dragStartTimeRef = useRef<number>(0);
  const startScrollLeftRef = useRef<number>(0);
  const gestureLockRef = useRef<'horizontal' | 'vertical' | null>(null);
  const ignoreClickUntilRef = useRef<number>(0);

  // Mobile App-like Profile Drawer State
  const [drawerMember, setDrawerMember] = useState<TeamMember | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const openDrawer = useCallback((member: TeamMember) => {
    setDrawerMember(member);
    setIsDrawerOpen(true);
    if (typeof window !== 'undefined') {
      window.history.pushState({ profileDrawer: true, slug: member.slug }, '', `/team/${member.slug}`);
    }
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    if (typeof window !== 'undefined') {
      if (window.history.state?.profileDrawer) {
        window.history.back();
      } else {
        window.history.replaceState(null, '', '/#team');
      }
    }
  }, []);

  // Handle native mobile back gesture / Android Back button
  useEffect(() => {
    const handlePopState = () => {
      if (isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isDrawerOpen]);

  // Exact accordion layout logic from http://127.0.0.1:5173/team.html (D:\web\ET-CODEX\3D-Mark\src\team.js)
  const layout = useCallback((animate = true) => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const width = gallery.clientWidth;
    if (!width) return;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = animate && !reduce ? 0.82 : 0;
    const minNarrow = width < 1200 ? 30 : 42;
    const expanded = isMobile
      ? width * 0.86
      : Math.min(Math.max(width * 0.52, 450), width - (team.length - 1) * minNarrow);
    const narrow = isMobile ? expanded : (width - expanded) / (team.length - 1);
    let x = 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const selected = i === activeRef.current;
      const visibleWidth = selected || isMobile ? expanded : narrow;

      card.classList.toggle('is-active', selected);
      card.setAttribute('aria-expanded', String(selected));
      card.style.width = `${expanded}px`;

      // Animate clipped frames and translations; no per-frame layout recalculation.
      gsap.to(card, {
        x,
        clipPath: `inset(0px ${Math.max(0, expanded - visibleWidth)}px 0px 0px)`,
        duration,
        ease: 'power3.inOut',
        overwrite: true,
      });

      const img = card.querySelector('img');
      if (img) {
        gsap.to(img, {
          x: (visibleWidth - expanded) / 2,
          duration,
          ease: 'power3.inOut',
          overwrite: true,
        });
      }

      const caption = card.querySelector('.person-caption');
      if (caption) {
        gsap.to(caption, {
          opacity: selected ? 1 : 0,
          y: selected ? 0 : 12,
          duration: duration * 0.65,
          delay: selected ? duration * 0.22 : 0,
          overwrite: true,
        });
      }

      x += visibleWidth + (isMobile ? 8 : 0);
    });
  }, []);

  const select = useCallback((index: number, { scroll = false, animate = true } = {}) => {
    const nextIdx = Math.max(0, Math.min(team.length - 1, index));
    activeRef.current = nextIdx;
    setActive(nextIdx);
    layout(animate);

    const gallery = galleryRef.current;
    if (gallery && window.matchMedia('(max-width: 767px)').matches && scroll) {
      const cardStep = gallery.clientWidth * 0.86 + 8;
      gallery.scrollTo({
        left: nextIdx * cardStep,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    }
  }, [layout]);

  // Initial layout and resize observer + Touch / Pointer swipe gesture recognition
  useEffect(() => {
    select(0, { animate: false });

    const gallery = galleryRef.current;
    if (!gallery) return;

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (resizeFrameRef.current) cancelAnimationFrame(resizeFrameRef.current);
      resizeFrameRef.current = requestAnimationFrame(() => {
        layout(false);
        if (window.matchMedia('(max-width: 767px)').matches) {
          gallery.scrollTo({
            left: activeRef.current * (gallery.clientWidth * 0.86 + 8),
            behavior: 'instant',
          });
        }
      });
    });

    resizeObserver.observe(gallery);

    // Sync active card if user performs native momentum scroll
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (!window.matchMedia('(max-width: 767px)').matches) return;
      if (isDraggingRef.current || isPointerDownRef.current) return;

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const cardStep = gallery.clientWidth * 0.86 + 8;
        if (!cardStep) return;
        const nearestIdx = Math.round(gallery.scrollLeft / cardStep);
        const clampedIdx = Math.max(0, Math.min(team.length - 1, nearestIdx));
        if (clampedIdx !== activeRef.current) {
          select(clampedIdx, { scroll: false, animate: true });
        }
      }, 70);
    };

    gallery.addEventListener('scroll', onScroll, { passive: true });

    // TOUCH SWIPE HANDLERS (Mobile touchscreens)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      dragStartXRef.current = touch.clientX;
      dragStartYRef.current = touch.clientY;
      dragStartTimeRef.current = Date.now();
      startScrollLeftRef.current = gallery.scrollLeft;
      gestureLockRef.current = null;
      isDraggingRef.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStartXRef.current;
      const deltaY = touch.clientY - dragStartYRef.current;

      if (!gestureLockRef.current) {
        if (Math.hypot(deltaX, deltaY) < 7) return;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          gestureLockRef.current = 'horizontal';
          isDraggingRef.current = true;
        } else {
          gestureLockRef.current = 'vertical';
        }
      }

      if (gestureLockRef.current === 'horizontal') {
        // Prevent vertical scrolling jitter while swiping slider cards horizontally
        if (e.cancelable) e.preventDefault();
        isDraggingRef.current = true;
        // Live drag tracking
        gallery.scrollLeft = startScrollLeftRef.current - deltaX;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDraggingRef.current && gestureLockRef.current !== 'horizontal') {
        return;
      }

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - dragStartXRef.current;
      const deltaTime = Math.max(1, Date.now() - dragStartTimeRef.current);
      const velocityX = deltaX / deltaTime; // px/ms

      // Suppress synthesized button click events
      ignoreClickUntilRef.current = Date.now() + 250;
      isDraggingRef.current = true;
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 250);

      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      if (!isMobile) return;

      const cardStep = gallery.clientWidth * 0.86 + 8;
      const currentIndex = activeRef.current ?? 0;
      let targetIndex = currentIndex;

      // Swipe thresholds: either distance > 35px or quick swipe (distance > 15px with velocity > 0.22)
      if (deltaX < -35 || (deltaX < -15 && velocityX < -0.22)) {
        targetIndex = Math.min(team.length - 1, currentIndex + 1);
      } else if (deltaX > 35 || (deltaX > 15 && velocityX > 0.22)) {
        targetIndex = Math.max(0, currentIndex - 1);
      } else {
        // Fallback: snap to nearest visible card
        targetIndex = Math.max(0, Math.min(team.length - 1, Math.round(gallery.scrollLeft / cardStep)));
      }

      select(targetIndex, { scroll: true, animate: true });
    };

    // POINTER / MOUSE DRAG HANDLERS (for desktop / mouse testing)
    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return; // Handled by TouchEvent for optimal mobile response
      if (e.button !== 0) return;

      isPointerDownRef.current = true;
      dragStartXRef.current = e.clientX;
      dragStartYRef.current = e.clientY;
      dragStartTimeRef.current = Date.now();
      startScrollLeftRef.current = gallery.scrollLeft;
      gestureLockRef.current = null;
      isDraggingRef.current = false;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isPointerDownRef.current || e.pointerType === 'touch') return;

      const deltaX = e.clientX - dragStartXRef.current;
      const deltaY = e.clientY - dragStartYRef.current;

      if (!gestureLockRef.current) {
        if (Math.hypot(deltaX, deltaY) < 6) return;
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          gestureLockRef.current = 'horizontal';
          isDraggingRef.current = true;
        } else {
          gestureLockRef.current = 'vertical';
        }
      }

      if (gestureLockRef.current === 'horizontal') {
        e.preventDefault();
        isDraggingRef.current = true;
        gallery.scrollLeft = startScrollLeftRef.current - deltaX;
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isPointerDownRef.current || e.pointerType === 'touch') return;
      isPointerDownRef.current = false;

      if (isDraggingRef.current || gestureLockRef.current === 'horizontal') {
        const deltaX = e.clientX - dragStartXRef.current;
        const deltaTime = Math.max(1, Date.now() - dragStartTimeRef.current);
        const velocityX = deltaX / deltaTime;

        ignoreClickUntilRef.current = Date.now() + 250;
        isDraggingRef.current = true;
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 250);

        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        if (isMobile) {
          const cardStep = gallery.clientWidth * 0.86 + 8;
          const currentIdx = activeRef.current ?? 0;
          let targetIndex = currentIdx;
          if (deltaX < -35 || (deltaX < -15 && velocityX < -0.22)) {
            targetIndex = Math.min(team.length - 1, currentIdx + 1);
          } else if (deltaX > 35 || (deltaX > 15 && velocityX > 0.22)) {
            targetIndex = Math.max(0, currentIdx - 1);
          } else {
            targetIndex = Math.max(0, Math.min(team.length - 1, Math.round(gallery.scrollLeft / cardStep)));
          }
          select(targetIndex, { scroll: true, animate: true });
        }
      }
    };

    gallery.addEventListener('touchstart', handleTouchStart, { passive: true });
    gallery.addEventListener('touchmove', handleTouchMove, { passive: false });
    gallery.addEventListener('touchend', handleTouchEnd, { passive: true });
    gallery.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    gallery.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      resizeObserver.disconnect();
      gallery.removeEventListener('scroll', onScroll);
      gallery.removeEventListener('touchstart', handleTouchStart);
      gallery.removeEventListener('touchmove', handleTouchMove);
      gallery.removeEventListener('touchend', handleTouchEnd);
      gallery.removeEventListener('touchcancel', handleTouchEnd);

      gallery.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);

      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (resizeFrameRef.current) cancelAnimationFrame(resizeFrameRef.current);
      gsap.killTweensOf(cardsRef.current);
    };
  }, [select, layout]);

  // Handle card click:
  // - If user was swiping/dragging -> suppress click completely
  // - On mobile -> open App-like fullscreen profile drawer with canvas waves and mosaic
  // - On desktop -> navigate to full static lawyer page
  // - If card is inactive -> expand it
  const handleCardClick = (index: number) => {
    if (isDraggingRef.current || Date.now() < ignoreClickUntilRef.current) {
      return;
    }
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (index === activeRef.current) {
      if (isMobile) {
        openDrawer(team[index]);
      } else {
        router.push(`/team/${team[index].slug}`);
      }
    } else {
      select(index, { scroll: true, animate: true });
    }
  };

  const handlePointerEnter = (e: React.PointerEvent, index: number) => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const mobile = window.matchMedia('(max-width: 767px)');
    if (fine.matches && !mobile.matches && e.pointerType !== 'touch') {
      select(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next: number | undefined;
    if (e.key === 'ArrowRight') next = Math.min(team.length - 1, index + 1);
    if (e.key === 'ArrowLeft') next = Math.max(0, index - 1);
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = team.length - 1;
    if (next !== undefined) {
      e.preventDefault();
      cardsRef.current[next]?.focus({ preventScroll: true });
      select(next, { scroll: true });
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      if (isMobile) {
        openDrawer(team[index]);
      } else {
        router.push(`/team/${team[index].slug}`);
      }
    }
  };

  return (
    <section
      id="team"
      className="team-section w-full relative bg-et-bg text-et-dark border-t border-et-border py-16 md:py-24 px-[clamp(1.5rem,4vw,6rem)]"
      aria-labelledby="team-title"
    >
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-14 items-start w-full">
        {/* 1. Левая колонка: Заголовок + подзаголовок (до синей линии сетки, как в Ключевых практиках) */}
        <div className="w-full lg:w-[32%] xl:w-[30%] lg:sticky lg:top-28 shrink-0">
          <h2
            id="team-title"
            className="font-heading font-normal text-[clamp(2.5rem,4.4vw,6.5rem)] tracking-tight text-[#141517] dark:text-et-dark leading-[1.05] mb-4"
          >
            Команда бюро
          </h2>
          <p className="text-sm text-[#5E6267] dark:text-et-muted font-light leading-relaxed max-w-sm mb-6">
            Партнеры и адвокаты бюро с практическим опытом защиты бизнеса, активов и персональных интересов руководителей.
          </p>
          {/* Пустое пространство под заголовком */}
        </div>

        {/* 2. Правая колонка: Элементы управления над фото + Слайдер (начинается от синей линии) */}
        <div className="w-full lg:w-[68%] xl:w-[70%] flex flex-col gap-4">
          <div className="gallery-controls flex items-center justify-between lg:justify-end gap-4 pb-1" role="group" aria-label="Переключение сотрудников">
            <span className="counter font-mono text-xs tracking-wider" aria-hidden="true">
              <span id="current-number">
                {active !== null ? String(active + 1).padStart(2, '0') : '--'}
              </span>
              <span className="counter-divider"> / </span>
              08
            </span>
            <div className="flex items-center gap-2">
              <button
                id="prev-person"
                type="button"
                className="gallery-nav-btn"
                aria-label="Предыдущий сотрудник"
                disabled={active === 0}
                onClick={() => {
                  select(active - 1, { scroll: true });
                }}
              >
                ←
              </button>
              <button
                id="next-person"
                type="button"
                className="gallery-nav-btn"
                aria-label="Следующий сотрудник"
                disabled={active === team.length - 1}
                onClick={() => {
                  select(active + 1, { scroll: true });
                }}
              >
                →
              </button>
            </div>
          </div>

          {/* Анимированный слайдер-аккордеон */}
          <div
            className="team-gallery"
            aria-label="Сотрудники бюро"
            ref={galleryRef}
          >
            {team.map((p, i) => (
              <button
                key={p.id}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className={`person-card ${i === active ? 'is-active' : ''}`}
                data-index={i}
                aria-label={`${p.name}, ${p.role}. Открыть профиль`}
                type="button"
                onClick={() => handleCardClick(i)}
                onPointerEnter={(e) => handlePointerEnter(e, i)}
                onFocus={() => select(i, { scroll: true })}
                onKeyDown={(e) => handleKeyDown(e, i)}
              >
                <span className="photo-fallback" aria-hidden="true">
                  {p.name.split(' ').map((n) => n[0]).join('')}
                </span>
                <img
                  src={p.photo}
                  alt=""
                  width={800}
                  height={1100}
                  fetchPriority={i === 0 ? 'high' : undefined}
                  draggable={false}
                  style={{ objectPosition: p.position }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('.png')) {
                      target.src = p.fallbackPhoto;
                    }
                  }}
                />
                <span className="person-shade" aria-hidden="true" />
                
                {/* Карточка: Слева имя, справа - должность и краткая информация, в правом углу - стрелка перехода */}
                <span
                  className="person-caption"
                  aria-hidden="true"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(i);
                  }}
                >
                  <div className="person-caption-content">
                    <div className="person-caption-main">
                      <strong>
                        {p.name.split(' ')[0]}
                        <br />
                        {p.name.split(' ').slice(1).join(' ')}
                      </strong>
                    </div>

                    <div className="person-caption-desc">
                      <span className="caption-role">{p.role}</span>
                      <p className="caption-bio">{p.description}</p>
                    </div>

                    <div className="caption-corner-action" title="Открыть полный профиль">
                      <span className="caption-arrow">↗</span>
                    </div>
                  </div>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Мобильная полноэкранная шторка профиля */}
      <TeamProfileDrawer
        member={drawerMember}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
    </section>
  );
}
