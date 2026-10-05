'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useConsultationModal } from '@/components/providers/ModalProvider';
import HeronButton from '@/components/ui/HeronButton';

export default function HeronHero() {
  const { openModal } = useConsultationModal();
  const [timeStr, setTimeStr] = useState('');
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, coordX: 420.5, coordY: 280.2 });
  const inspectCanvasRef = useRef<HTMLDivElement>(null);

  // Live Moscow Time (UTC+3) Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const moscowTime = new Date(now.getTime() + (now.getTimezoneOffset() + 180) * 60000);
      setTimeStr(
        moscowTime.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mouse Crosshair Tracking inside Inspection Stage
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!inspectCanvasRef.current) return;
    const rect = inspectCanvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    const coordX = Math.round((e.clientX - rect.left) * 10) / 10;
    const coordY = Math.round((e.clientY - rect.top) * 10) / 10;
    setMousePos({ x, y, coordX, coordY });
  };

  return (
    <section className="relative w-full border-b border-[#D1D1CB] dark:border-[#222528] pt-4 sm:pt-6 pb-12 sm:pb-16 overflow-hidden">
      
      {/* 1. Technical Telemetry Top Bar */}
      <div className="mx-2 sm:mx-4 mb-6 sm:mb-8 border border-[#D1D1CB] dark:border-[#222528] bg-white/40 dark:bg-black/20 text-xs font-mono">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#D1D1CB] dark:divide-[#222528]">
          
          <div className="px-4 py-2 flex items-center justify-between">
            <span className="text-[#7E7E7A]">БЮРО</span>
            <span className="font-semibold text-[#282828] dark:text-white">ETLEGIS // 2019</span>
          </div>

          <div className="px-4 py-2 flex items-center justify-between">
            <span className="text-[#7E7E7A]">ЛОКАЦИЯ</span>
            <span className="text-[#282828] dark:text-white">МОСКВА, СИТИ</span>
          </div>

          <div className="px-4 py-2 flex items-center justify-between hidden md:flex">
            <span className="text-[#7E7E7A]">ВРЕМЯ (МСК)</span>
            <span className="font-semibold text-[#282828] dark:text-white">{timeStr || '16:50:38'}</span>
          </div>

          <div className="px-4 py-2 flex items-center justify-between">
            <span className="text-[#7E7E7A]">СТАТУС</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FA3600] animate-pulse" />
              <span className="text-[#FA3600] font-semibold">24/7 ДЕЖУРНЫЙ</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Hero Content Layout */}
      <div className="mx-2 sm:mx-4 px-4 sm:px-8">
        
        {/* Monospace Over-Title */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-[#FA3600] tracking-widest uppercase">
            // АДВОКАТСКОЕ БЮРО ЭТЛЕГИС
          </span>
          <span className="h-px w-12 bg-[#FA3600]" />
          <span className="text-xs font-mono text-[#7E7E7A] hidden sm:inline">
            АРБИТРАЖ, НАЛОГИ, УГОЛОВНАЯ ЗАЩИТА
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-[#282828] dark:text-white leading-[1.08] max-w-5xl mb-6">
          ЗАЩИТА ИНТЕРЕСОВ БИЗНЕСА В СЛОЖНЫХ СУДЕБНЫХ И КОРПОРАТИВНЫХ КОНФЛИКТАХ
        </h1>

        {/* 3. Split Row: Interactive Inspection Canvas & Side Telemetry Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8 sm:mt-12">
          
          {/* A. Left & Center: Interactive Technical Inspection Stage (8 Cols) */}
          <div
            ref={inspectCanvasRef}
            onMouseMove={handleMouseMove}
            className="lg:col-span-8 relative h-[380px] sm:h-[480px] border border-[#D1D1CB] dark:border-[#222528] bg-white/70 dark:bg-black/40 overflow-hidden cursor-crosshair group select-none"
          >
            {/* Corner Crosshairs inside stage */}
            <span className="absolute top-2 left-2 text-[10px] font-mono text-[#7E7E7A]">+</span>
            <span className="absolute top-2 right-2 text-[10px] font-mono text-[#7E7E7A]">+</span>
            <span className="absolute bottom-2 left-2 text-[10px] font-mono text-[#7E7E7A]">+</span>
            <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[#7E7E7A]">+</span>

            {/* Subtle stage grid */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to right, #7E7E7A 1px, transparent 1px), linear-gradient(to bottom, #7E7E7A 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Kinetic Laser Crosshair Lines tracking mouse */}
            <div
              className="absolute left-0 right-0 h-px bg-[#FA3600]/60 pointer-events-none transition-all duration-75"
              style={{ top: `${mousePos.y}%` }}
            />
            <div
              className="absolute top-0 bottom-0 w-px bg-[#FA3600]/60 pointer-events-none transition-all duration-75"
              style={{ left: `${mousePos.x}%` }}
            />

            {/* Live Telemetry Coordinate Box */}
            <div
              className="absolute pointer-events-none px-2 py-1 bg-[#282828] text-white text-[10px] font-mono tracking-widest shadow-md z-20"
              style={{
                left: `clamp(10px, ${mousePos.x}%, calc(100% - 130px))`,
                top: `clamp(10px, ${mousePos.y + 4}%, calc(100% - 35px))`,
              }}
            >
              X: {mousePos.coordX} | Y: {mousePos.coordY}
            </div>

            {/* Center Monogram / Precision Emblem */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 border border-[#B3B3AF]/60 dark:border-white/20 flex items-center justify-center">
                {/* Precision optical reticle brackets */}
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#FA3600]" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#FA3600]" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#FA3600]" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#FA3600]" />

                {/* Rotating Azimuth Rings */}
                <div className="absolute inset-4 rounded-full border border-dashed border-[#7E7E7A]/40 animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-10 rounded-full border border-[#7E7E7A]/30" />

                {/* ETLEGIS Vector Monogram */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-24 h-24 sm:w-32 sm:h-32 text-[#282828] dark:text-white transition-transform duration-500 group-hover:scale-105"
                  fill="currentColor"
                >
                  <path d="M85 24V10H27v14H10v60h60V70h15V55H42V46h43V34H42V24H85z M65 68V80H16V30h11v38H65z" />
                </svg>

                {/* Calibration Status Badge */}
                <div className="absolute -bottom-4 bg-[#F5F5ED] dark:bg-[#0C0D0E] border border-[#D1D1CB] dark:border-[#222528] px-3 py-0.5 text-[9px] font-mono tracking-widest text-[#7E7E7A] uppercase">
                  CALIBRATED // RF-ARBITRAGE
                </div>
              </div>
            </div>

            {/* Bottom Left Watermark */}
            <div className="absolute bottom-3 left-4 text-[10px] font-mono text-[#7E7E7A] tracking-wider">
              [ PRECISION LEGAL DEFENSE ENGINE v2.5 ]
            </div>

          </div>

          {/* B. Right: Technical Spec Sheet & Action CTAs (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between border border-[#D1D1CB] dark:border-[#222528] bg-white/50 dark:bg-black/30 p-6 sm:p-8">
            
            <div>
              <div className="text-xs font-mono text-[#7E7E7A] uppercase tracking-wider mb-4 border-b border-[#D1D1CB] dark:border-[#222528] pb-2">
                СПЕЦИФИКАЦИЯ БЮРО // METRICS
              </div>

              {/* Data Table with Dotted Leaders */}
              <div className="space-y-3.5 text-xs font-mono">
                <div className="flex justify-between items-baseline">
                  <span className="text-[#7E7E7A]">ОСНОВАНО:</span>
                  <span className="border-b border-dotted border-[#B3B3AF] flex-1 mx-2" />
                  <span className="font-semibold text-[#282828] dark:text-white">2019 ГОД</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-[#7E7E7A]">ЗАЩИЩЕНО:</span>
                  <span className="border-b border-dotted border-[#B3B3AF] flex-1 mx-2" />
                  <span className="font-semibold text-[#FA3600]">1,2+ МЛРД ₽</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-[#7E7E7A]">ВЫИГРАНО:</span>
                  <span className="border-b border-dotted border-[#B3B3AF] flex-1 mx-2" />
                  <span className="font-semibold text-[#282828] dark:text-white">94% ПРОЦЕССОВ</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-[#7E7E7A]">АРБИТРАЖ:</span>
                  <span className="border-b border-dotted border-[#B3B3AF] flex-1 mx-2" />
                  <span className="font-semibold text-[#282828] dark:text-white">150+ КЕЙСОВ</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-[#7E7E7A]">РЕАКЦИЯ:</span>
                  <span className="border-b border-dotted border-[#B3B3AF] flex-1 mx-2" />
                  <span className="font-semibold text-[#FA3600]">ЭКСТРЕННО 24/7</span>
                </div>
              </div>

              {/* Subtitle Description */}
              <p className="mt-8 text-sm text-[#414140] dark:text-[#A0A09C] font-light leading-relaxed">
                Адвокатское бюро Etlegis обеспечивает стратегический судебный консалтинг, снижение персональных рисков топ-менеджмента и защиту корпоративных активов.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-6 border-t border-[#D1D1CB] dark:border-[#222528] flex flex-col gap-3">
              <HeronButton
                variant="brand"
                size="lg"
                onClick={openModal}
                className="w-full text-center"
              >
                ОБСУДИТЬ СИТУАЦИЮ
              </HeronButton>
              <HeronButton
                variant="outline"
                size="md"
                href="#cases"
                className="w-full text-center"
              >
                СМОТРЕТЬ КЕЙСЫ
              </HeronButton>
            </div>

          </div>

        </div>

      </div>

      {/* 4. Marquee Ticker */}
      <div className="mt-12 sm:mt-16 border-t border-b border-[#D1D1CB] dark:border-[#222528] bg-white/40 dark:bg-black/30 py-3 overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-[marqueeLeft_35s_linear_infinite] text-xs font-mono tracking-widest text-[#414140] dark:text-[#A0A09C]">
          <span className="mx-6">◷ 1,2+ МЛРД ₽ СОХРАНЕННЫХ АКТИВОВ</span>
          <span className="mx-6 text-[#FA3600]">///</span>
          <span className="mx-6">◷ КОРПОРАТИВНЫЕ СПОРЫ И ЗАЩИТА АКТИВОВ</span>
          <span className="mx-6 text-[#FA3600]">///</span>
          <span className="mx-6">◷ БАНКРОТСТВО И СУБСИДИАРНАЯ ОТВЕТСТВЕННОСТЬ КДЛ</span>
          <span className="mx-6 text-[#FA3600]">///</span>
          <span className="mx-6">◷ НАЛОГОВЫЙ КОНСАЛТИНГ И ПРОВЕРКИ ФНС</span>
          <span className="mx-6 text-[#FA3600]">///</span>
          <span className="mx-6">◷ УГОЛОВНО-ПРАВОВАЯ ЗАЩИТА БИЗНЕСА</span>
          <span className="mx-6 text-[#FA3600]">///</span>
          <span className="mx-6">◷ 150+ ВЫИГРАННЫХ РАЗБИРАТЕЛЬСТВ</span>
          <span className="mx-6 text-[#FA3600]">///</span>
          {/* Duplicate loop */}
          <span className="mx-6">◷ 1,2+ МЛРД ₽ СОХРАНЕННЫХ АКТИВОВ</span>
          <span className="mx-6 text-[#FA3600]">///</span>
          <span className="mx-6">◷ КОРПОРАТИВНЫЕ СПОРЫ И ЗАЩИТА АКТИВОВ</span>
          <span className="mx-6 text-[#FA3600]">///</span>
          <span className="mx-6">◷ БАНКРОТСТВО И СУБСИДИАРНАЯ ОТВЕТСТВЕННОСТЬ КДЛ</span>
        </div>
      </div>

    </section>
  );
}
