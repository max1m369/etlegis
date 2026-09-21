'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function KineticReticle() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const masterTlRef = useRef<gsap.core.Timeline | null>(null);
  const idleTlRef = useRef<gsap.core.Timeline | null>(null);

  // SVG Refs — Все анимируемые группы расположены прямо на верхнем уровне <svg viewBox="0 0 600 600">
  const reticleGroupRef = useRef<SVGGElement | null>(null);
  const outerRingRef = useRef<SVGGElement | null>(null);
  const innerRingRef = useRef<SVGGElement | null>(null);
  const lockRingRef = useRef<SVGCircleElement | null>(null);
  const monogramRef = useRef<SVGGElement | null>(null);
  const haloRef = useRef<HTMLDivElement | null>(null);

  // 4 Угловые скобки (Corner Brackets)
  const bTlRef = useRef<SVGPathElement | null>(null);
  const bTrRef = useRef<SVGPathElement | null>(null);
  const bBlRef = useRef<SVGPathElement | null>(null);
  const bBrRef = useRef<SVGPathElement | null>(null);

  const startIdleMode = () => {
    if (idleTlRef.current) {
      idleTlRef.current.kill();
      idleTlRef.current = null;
    }

    const outerRing = outerRingRef.current;
    const innerRing = innerRingRef.current;
    const bTl = bTlRef.current;
    const bTr = bTrRef.current;
    const bBl = bBlRef.current;
    const bBr = bBrRef.current;
    const halo = haloRef.current;

    if (!bTl || !bTr || !bBl || !bBr) return;

    const idle = gsap.timeline();

    // 1. Плавное вращение внешнего большого кольца по часовой стрелке строго вокруг (300 300)
    if (outerRing) {
      idle.to(
        outerRing,
        {
          rotation: '+=360',
          duration: 52,
          ease: 'none',
          repeat: -1,
          svgOrigin: '300 300',
        },
        0
      );
    }

    // 2. Плавное вращение внутреннего бронзового кольца против часовой стрелки строго вокруг (300 300)
    if (innerRing) {
      idle.to(
        innerRing,
        {
          rotation: '-=360',
          duration: 32,
          ease: 'none',
          repeat: -1,
          svgOrigin: '300 300',
        },
        0
      );
    }

    // 3. Микро-автофокусное дыхание скобок прицела (±5px)
    const breath = 5;
    idle.to(bTl, { x: -breath, y: -breath, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0);
    idle.to(bTr, { x: breath, y: -breath, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0);
    idle.to(bBl, { x: -breath, y: breath, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0);
    idle.to(bBr, { x: breath, y: breath, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }, 0);

    // 4. Едва заметное фоновое дыхание ореола
    if (halo) {
      idle.to(
        halo,
        {
          scale: 1.05,
          opacity: 0.45,
          duration: 4.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        },
        0
      );
    }

    idleTlRef.current = idle;
  };

  const runScenario = () => {
    if (idleTlRef.current) {
      idleTlRef.current.kill();
      idleTlRef.current = null;
    }
    if (masterTlRef.current) {
      masterTlRef.current.kill();
      masterTlRef.current = null;
    }

    const reticleGroup = reticleGroupRef.current;
    const outerRing = outerRingRef.current;
    const innerRing = innerRingRef.current;
    const lockRing = lockRingRef.current;
    const monogram = monogramRef.current;
    const halo = haloRef.current;
    const bTl = bTlRef.current;
    const bTr = bTrRef.current;
    const bBl = bBlRef.current;
    const bBr = bBrRef.current;

    if (!reticleGroup || !outerRing || !innerRing || !lockRing || !monogram || !bTl || !bTr || !bBl || !bBr) {
      return;
    }

    // Исходные установки — все трансформации берут отсчет от центра (300 300)
    gsap.set(monogram, { opacity: 0, scale: 0.88, svgOrigin: '300 300' });
    gsap.set(reticleGroup, { rotation: 45, scale: 0.65, opacity: 0, svgOrigin: '300 300' });
    gsap.set(outerRing, { rotation: -45, svgOrigin: '300 300' });
    gsap.set(innerRing, { rotation: 0, svgOrigin: '300 300' });
    gsap.set(lockRing, { scale: 0.6, opacity: 0, svgOrigin: '300 300' });
    gsap.set([bTl, bTr, bBl, bBr], { x: 0, y: 0 });
    if (halo) gsap.set(halo, { scale: 0.85, opacity: 0.25 });

    const master = gsap.timeline({
      onComplete: () => {
        gsap.set(monogram, { opacity: 1, scale: 1.0 });
        startIdleMode();
      },
    });

    // 0.00 – 0.65 · Сборка из центра: появление ромба 45°
    master.to(
      reticleGroup,
      {
        duration: 0.65,
        scale: 1.06,
        opacity: 0.9,
        ease: 'power2.out',
        svgOrigin: '300 300',
      },
      0
    );

    // 0.65 – 3.75 · ФАЗА 1: «Как на водице» — превращение ромба в компактный квадрат 300x300 вокруг монограммы (45° -> 0°)
    master.to(
      reticleGroup,
      {
        duration: 3.1,
        rotation: 0,
        scale: 1.0,
        opacity: 1,
        ease: 'power2.inOut',
        svgOrigin: '300 300',
      },
      0.65
    );

    master.to(
      outerRing,
      {
        duration: 3.1,
        rotation: 0,
        ease: 'power2.inOut',
        svgOrigin: '300 300',
      },
      0.65
    );

    // 3.75 – 4.85 · ФАЗА 2: Смыкание скобок к центру на 45px со сжатием рамы
    master.to(bTl, { x: 45, y: 45, duration: 1.1, ease: 'power2.inOut' }, 3.75);
    master.to(bTr, { x: -45, y: 45, duration: 1.1, ease: 'power2.inOut' }, 3.75);
    master.to(bBl, { x: 45, y: -45, duration: 1.1, ease: 'power2.inOut' }, 3.75);
    master.to(bBr, { x: -45, y: -45, duration: 1.1, ease: 'power2.inOut' }, 3.75);
    master.to(reticleGroup, { scale: 0.97, duration: 1.1, ease: 'power2.inOut', svgOrigin: '300 300' }, 3.75);

    // 4.85 – 5.75 · ФАЗА 3: Упругий отскок скобок обратно в углы квадрата 300x300 (back.out(1.4)) + вспышка замка
    master.to([bTl, bTr, bBl, bBr], { x: 0, y: 0, duration: 0.9, ease: 'back.out(1.4)' }, 4.85);
    master.to(reticleGroup, { scale: 1.0, duration: 0.8, ease: 'power2.out', svgOrigin: '300 300' }, 4.85);

    master.fromTo(
      lockRing,
      { scale: 0.75, opacity: 0.8, svgOrigin: '300 300' },
      { duration: 0.5, scale: 1.25, opacity: 0, ease: 'power2.out', svgOrigin: '300 300' },
      4.95
    );

    if (halo) {
      master.to(
        halo,
        {
          scale: 1.25,
          opacity: 0.75,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
        },
        4.95
      );
    }

    // 5.40 – 6.70 · ФАЗА 4: Плавное рождение монограммы ETLEGIS точно в фокусе прицела
    master.to(
      monogram,
      {
        duration: 1.3,
        opacity: 1,
        scale: 1.0,
        ease: 'power2.out',
        svgOrigin: '300 300',
      },
      5.40
    );

    masterTlRef.current = master;
  };

  useEffect(() => {
    runScenario();

    return () => {
      if (masterTlRef.current) masterTlRef.current.kill();
      if (idleTlRef.current) idleTlRef.current.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={runScenario}
      title="Кликните для повторной калибровки прицела"
      style={{
        width: 'clamp(360px, min(42vw, 60vh), 1050px)',
        height: 'clamp(360px, min(42vw, 60vh), 1050px)',
      }}
      className="relative flex items-center justify-center cursor-pointer select-none group max-w-full aspect-square shrink-0"
    >
      {/* Ореол мягкого свечения вокруг центра (из animcros.md) */}
      <div
        ref={haloRef}
        className="absolute w-[360px] h-[360px] rounded-full pointer-events-none select-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(146, 123, 80, 0.18) 0%, rgba(80, 113, 146, 0.08) 50%, transparent 75%)',
          filter: 'blur(40px)',
          opacity: 0.35,
        }}
      />

      <svg
        viewBox="0 0 600 600"
        className="relative z-10 w-full h-full pointer-events-none overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. Направляющие оси (перекрестие по центру 300, 300) */}
        <g stroke="#3E5871" strokeWidth="1" opacity="0.35" strokeDasharray="3 5">
          <line x1="300" y1="20" x2="300" y2="70" />
          <line x1="300" y1="530" x2="300" y2="580" />
          <line x1="20" y1="300" x2="70" y2="300" />
          <line x1="530" y1="300" x2="580" y2="300" />
        </g>

        {/* 2. Круги 1 и 2 (Первые 2 круга) — Вращение ПО ЧАСОВОЙ СТРЕЛКЕ (outerRing) */}
        <g id="outerRing" ref={outerRingRef}>
          {/* Круг 1 (Самый внешний r=255) */}
          <circle cx="300" cy="300" r="255" fill="none" stroke="#507192" strokeWidth="0.85" strokeDasharray="2 12" opacity="0.5" />
          {/* Круг 2 (Второй внешний r=215) */}
          <circle cx="300" cy="300" r="215" fill="none" stroke="#507192" strokeWidth="0.6" strokeDasharray="4 16" opacity="0.4" />
          <g stroke="#507192" strokeWidth="1" opacity="0.5">
            <line x1="300" y1="42" x2="300" y2="54" />
            <line x1="300" y1="546" x2="300" y2="558" />
            <line x1="42" y1="300" x2="54" y2="300" />
            <line x1="546" y1="300" x2="558" y2="300" />
          </g>
        </g>

        {/* 3. Круги 3 и 4 (Третий и четвёртый круги) — Вращение ПРОТИВ ЧАСОВОЙ СТРЕЛКИ (innerRing) */}
        <g id="innerRing" ref={innerRingRef}>
          {/* Круг 3 (Третий внутренний r=170) */}
          <circle cx="300" cy="300" r="170" fill="none" stroke="#927B50" strokeWidth="0.85" strokeDasharray="4 14" opacity="0.45" />
          {/* Круг 4 (Самый внутренний r=85 вокруг монограммы) */}
          <circle cx="300" cy="300" r="85" fill="none" stroke="#507192" strokeWidth="0.75" strokeDasharray="3 6" opacity="0.45" />
          <g stroke="#927B50" strokeWidth="1" opacity="0.5">
            <line x1="300" y1="124" x2="300" y2="136" />
            <line x1="300" y1="464" x2="300" y2="476" />
            <line x1="124" y1="300" x2="136" y2="300" />
            <line x1="464" y1="300" x2="476" y2="300" />
          </g>
        </g>

        {/* 4. Главная кинетическая группа прицела — 2 Квадрата (300x300 и 200x200) + аккуратно укороченные скобки */}
        <g id="reticleGroup" ref={reticleGroupRef}>
          {/* Квадрат 1 (Внешний прицельный квадрат 300x300) */}
          <rect x="150" y="150" width="300" height="300" fill="none" stroke="#2C3E50" strokeWidth="1.2" strokeDasharray="6 8" opacity="0.6" />

          {/* Квадрат 2 (Внутренний прицельный квадрат 200x200) */}
          <rect x="200" y="200" width="200" height="200" fill="none" stroke="#507192" strokeWidth="0.75" strokeDasharray="4 10" opacity="0.4" />

          {/* Насечки на гранях внешнего квадрата */}
          <g stroke="#2C3E50" strokeWidth="1.5" opacity="0.75">
            <line x1="300" y1="142" x2="300" y2="158" />
            <line x1="300" y1="442" x2="300" y2="458" />
            <line x1="142" y1="300" x2="158" y2="300" />
            <line x1="442" y1="300" x2="458" y2="300" />
          </g>

          {/* 4 Укороченные аккуратные угловые скобки (слегка обрезаны концы граней) */}
          <g id="bracketsGroup">
            {/* Верхняя левая */}
            <path ref={bTlRef} d="M 150 180 L 150 150 L 180 150" fill="none" stroke="#2C3E50" strokeWidth="1.8" strokeLinecap="square" />
            {/* Верхняя правая */}
            <path ref={bTrRef} d="M 420 150 L 450 150 L 450 180" fill="none" stroke="#2C3E50" strokeWidth="1.8" strokeLinecap="square" />
            {/* Нижняя левая */}
            <path ref={bBlRef} d="M 150 420 L 150 450 L 180 450" fill="none" stroke="#2C3E50" strokeWidth="1.8" strokeLinecap="square" />
            {/* Нижняя правая */}
            <path ref={bBrRef} d="M 420 450 L 450 450 L 450 420" fill="none" stroke="#2C3E50" strokeWidth="1.8" strokeLinecap="square" />
          </g>
        </g>

        {/* 5. Кольцо фокуса/захвата при замке (Lock Ring) */}
        <circle
          ref={lockRingRef}
          cx="300"
          cy="300"
          r="110"
          fill="none"
          stroke="#927B50"
          strokeWidth="1.6"
          opacity="0"
        />

        {/* 6. Оригинальная монограмма ETLEGIS по центру (исходный цвет #BEC4CD) */}
        <g id="monogramGroup" ref={monogramRef} opacity="0">
          <g transform="translate(300, 300)">
            <g transform="scale(2.35) translate(-62.95, -62.35)">
              <path
                fill="#BEC4CD"
                d="M113.4,31.3V11.9H35.8v19.4H12.5v81.5H94V89.5h19.4V70.1H55.2V58.4h58.2V42.9H55.2V31.3H113.4z M86.2,89.5V105h-66V39h15.5v50.4H86.2z"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
