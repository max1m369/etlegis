'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useConsultationModal } from '@/components/providers/ModalProvider';
import HeronButton from '@/components/ui/HeronButton';

// Dynamically import Monument3D to ensure WebGL/SSR safety
const Monument3D = dynamic(() => import('@/components/ui/Monument3D'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-[#7E7E7A]">
      <span className="inline-block animate-pulse">[ INITIALIZING 3D ENGINE... ]</span>
    </div>
  ),
});

interface AnchorPin {
  id: string;
  x: number;
  y: number;
  label: string;
  metric: string;
  status: string;
}

export default function HeronHero() {
  const { openModal } = useConsultationModal();
  const [timeStr, setTimeStr] = useState('');
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, coordX: 512.4, coordY: 340.8 });
  const [activePin, setActivePin] = useState<string | null>(null);
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

  // Strategic Anchor Points on 3D Model
  const anchorPins: AnchorPin[] = [
    {
      id: 'pin-1',
      x: 32,
      y: 42,
      label: 'АРБИТРАЖНЫЙ ТРИБУНАЛ',
      metric: '1.2+ МЛРД ₽ ЗАЩИЩЕНО',
      status: 'ПРОЦЕССУАЛЬНЫЙ ПАРИТЕТ',
    },
    {
      id: 'pin-2',
      x: 64,
      y: 38,
      label: 'УГОЛОВНО-ПРАВОВАЯ ЗАЩИТА',
      metric: '24/7 ЭКСТРЕННЫЙ ВЫЕЗД',
      status: 'СТ. 8 ФЗ №63-ФЗ',
    },
    {
      id: 'pin-3',
      x: 52,
      y: 68,
      label: 'СТРАТЕГИЯ И АУДИТ',
      metric: '94% УСПЕШНЫХ ДЕЛ',
      status: 'ВЫСШИЙ СТАНДАРТ',
    },
  ];

  return (
    <section className="relative w-full border-b border-[#D1D1CB] dark:border-[#222528] pt-2 sm:pt-4 pb-12 sm:pb-16 overflow-hidden">
      
      {/* 1. Technical Telemetry Top Bar (Heron AI header telemetry) */}
      <div className="mx-2 sm:mx-4 mb-4 sm:mb-6 border border-[#D1D1CB] dark:border-[#222528] bg-white/40 dark:bg-black/20 text-xs font-mono">
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
            <span className="font-semibold text-[#282828] dark:text-white">{timeStr || '17:00:00'}</span>
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

      <div className="mx-2 sm:mx-4 px-2 sm:px-4">
        
        {/* 2. Gigantic Technical Inspection Stage (True 3D Spatial Centerpiece) */}
        <div
          ref={inspectCanvasRef}
          onMouseMove={handleMouseMove}
          className="relative w-full h-[440px] sm:h-[560px] lg:h-[640px] border border-[#D1D1CB] dark:border-[#222528] bg-[#EFEFE7] dark:bg-[#070809] overflow-hidden cursor-crosshair select-none group"
        >
          {/* Corner Crosshairs '+' */}
          <span className="absolute top-3 left-3 z-30 text-[11px] font-mono text-[#7E7E7A]">+</span>
          <span className="absolute top-3 right-3 z-30 text-[11px] font-mono text-[#7E7E7A]">+</span>
          <span className="absolute bottom-3 left-3 z-30 text-[11px] font-mono text-[#7E7E7A]">+</span>
          <span className="absolute bottom-3 right-3 z-30 text-[11px] font-mono text-[#7E7E7A]">+</span>

          {/* Millimeter Ruler Marks along Top and Bottom borders (Heron style) */}
          <div
            className="absolute top-0 left-8 right-8 h-2 z-20 opacity-30 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #7E7E7A 1px, transparent 1px)',
              backgroundSize: '16px 100%',
            }}
          />
          <div
            className="absolute bottom-0 left-8 right-8 h-2 z-20 opacity-30 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #7E7E7A 1px, transparent 1px)',
              backgroundSize: '16px 100%',
            }}
          />
          <div
            className="absolute left-0 top-8 bottom-8 w-2 z-20 opacity-30 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #7E7E7A 1px, transparent 1px)',
              backgroundSize: '100% 16px',
            }}
          />
          <div
            className="absolute right-0 top-8 bottom-8 w-2 z-20 opacity-30 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #7E7E7A 1px, transparent 1px)',
              backgroundSize: '100% 16px',
            }}
          />

          {/* Subtle Precision Cartesian Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #7E7E7A 1px, transparent 1px), linear-gradient(to bottom, #7E7E7A 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* 3D WebGL Spatial Monument (True 3D depth, studio lighting, bust, floating fragments) */}
          <div className="absolute inset-0 z-10 pointer-events-auto">
            <Monument3D className="w-full h-full" showBust={true} showFragments={true} />
          </div>

          {/* Kinetic Laser Crosshairs (Orange Tracking Beam) */}
          <div
            className="absolute left-0 right-0 h-px bg-[#FA3600]/70 z-20 pointer-events-none transition-all duration-75"
            style={{ top: `${mousePos.y}%` }}
          />
          <div
            className="absolute top-0 bottom-0 w-px bg-[#FA3600]/70 z-20 pointer-events-none transition-all duration-75"
            style={{ left: `${mousePos.x}%` }}
          />

          {/* Live Telemetry Coordinate HUD Box */}
          <div
            className="absolute pointer-events-none px-2.5 py-1 bg-[#282828] text-white text-[10px] font-mono tracking-widest shadow-lg z-30 transition-all duration-75"
            style={{
              left: `clamp(12px, ${mousePos.x}%, calc(100% - 140px))`,
              top: `clamp(12px, ${mousePos.y + 4}%, calc(100% - 40px))`,
            }}
          >
            X: {mousePos.coordX} | Y: {mousePos.coordY}
          </div>

          {/* Interactive Inspection Anchor Pins (Glowing Orange Marker Nodes) */}
          {anchorPins.map((pin) => (
            <div
              key={pin.id}
              className="absolute z-20 cursor-pointer pointer-events-auto"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              onMouseEnter={() => setActivePin(pin.id)}
              onMouseLeave={() => setActivePin(null)}
            >
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                {/* Glowing Marker Square */}
                <div className="w-3.5 h-3.5 bg-[#FA3600] border-2 border-white dark:border-[#282828] shadow-md transition-transform duration-300 hover:scale-125" />
                <div className="absolute -inset-1 border border-[#FA3600]/40 animate-ping pointer-events-none" />

                {/* Tactical Telemetry Tooltip on Hover */}
                {activePin === pin.id && (
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 w-56 p-2.5 bg-[#282828] text-white border border-[#FA3600] font-mono text-[10px] shadow-2xl z-40 animate-in fade-in duration-150">
                    <div className="text-[#FA3600] font-bold mb-1">// {pin.label}</div>
                    <div className="text-white font-semibold mb-0.5">{pin.metric}</div>
                    <div className="text-[#A0A09C] text-[9px]">{pin.status}</div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Top Left Stage Stamp */}
          <div className="absolute top-3 left-8 z-20 text-[10px] font-mono text-[#7E7E7A] tracking-widest uppercase">
            [ 3D SPATIAL MONUMENTUM // STAGE 01 ]
          </div>

          {/* Bottom Right Stage Status */}
          <div className="absolute bottom-3 right-8 z-20 flex items-center gap-3 text-[10px] font-mono text-[#7E7E7A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FA3600] animate-pulse" />
            <span>RENDER: THREE.JS // WEBGL 2.0</span>
          </div>

        </div>

        {/* 3. Heron-Style 3-Column Structured Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-x border-b border-[#D1D1CB] dark:border-[#222528] bg-white/40 dark:bg-black/20 divide-y lg:divide-y-0 lg:divide-x divide-[#D1D1CB] dark:divide-[#222528]">
          
          {/* Col 1 (7 Cols): Bold Monumental Statement */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono text-[#FA3600] tracking-widest uppercase mb-3">
                // СУДЕБНЫЙ КОНСАЛТИНГ И ЗАЩИТА АКТИВОВ
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-[#282828] dark:text-white leading-[1.08]">
                БЕЗУПРЕЧНАЯ ПРАВОВАЯ ЗАЩИТА БИЗНЕСА И АКТИВОВ В СЛОЖНЫХ СУДЕБНЫХ И КОРПОРАТИВНЫХ КОНФЛИКТАХ
              </h1>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-6 border-t border-[#D1D1CB] dark:border-[#222528] font-mono text-xs">
              <div>
                <span className="text-[#7E7E7A] block text-[10px] uppercase">ЗАЩИЩЕНО:</span>
                <span className="text-lg sm:text-xl font-bold text-[#FA3600]">1,2+ МЛРД ₽</span>
              </div>
              <div>
                <span className="text-[#7E7E7A] block text-[10px] uppercase">ВЫИГРАНО:</span>
                <span className="text-lg sm:text-xl font-bold text-[#282828] dark:text-white">94%</span>
              </div>
              <div>
                <span className="text-[#7E7E7A] block text-[10px] uppercase">РЕАКЦИЯ:</span>
                <span className="text-lg sm:text-xl font-bold text-[#282828] dark:text-white">24/7 МСК</span>
              </div>
            </div>
          </div>

          {/* Col 2 (5 Cols): Editorial Rationale & Action Cell */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-[11px] font-mono text-[#7E7E7A] uppercase tracking-wider mb-3">
                ПРИНЦИП РАБОТЫ // METHODOLOGY
              </div>
              <p className="text-sm sm:text-base text-[#414140] dark:text-[#A0A09C] font-light leading-relaxed mb-6">
                Адвокатское бюро <strong className="font-semibold text-[#282828] dark:text-white">Etlegis</strong> обеспечивает глубокий процессуальный консалтинг, превентивное купирование уголовных и субсидиарных рисков бенефициаров, а также эффективное сопровождение сделок особой сложности.
              </p>
              
              <ul className="space-y-2 text-xs font-mono text-[#7E7E7A]">
                <li className="flex items-center gap-2">
                  <span className="text-[#FA3600]">■</span>
                  <span>Абсолютная конфиденциальность (ст. 8 ФЗ №63-ФЗ)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FA3600]">■</span>
                  <span>Персональный контроль управляющего партнера</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FA3600]">■</span>
                  <span>Правовая защита в арбитражных судах всех инстанций</span>
                </li>
              </ul>
            </div>

            {/* CTA Action Cell */}
            <div className="pt-6 border-t border-[#D1D1CB] dark:border-[#222528]">
              <HeronButton
                variant="brand"
                size="lg"
                onClick={openModal}
                className="w-full text-center"
              >
                ОБСУДИТЬ СИТУАЦИЮ С АДВОКАТОМ
              </HeronButton>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
