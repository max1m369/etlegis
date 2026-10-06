'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useConsultationModal } from '@/components/providers/ModalProvider';

export default function V26Header() {
  const { openModal } = useConsultationModal();
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('ru-RU', {
          timeZone: 'Europe/Moscow',
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

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#1E242D]/95 backdrop-blur-md border-b border-white/10 text-white transition-colors duration-300">
      <div className="w-full grid grid-cols-1 lg:grid-cols-[20%_40%_40%] h-14 lg:h-16 items-center px-4 lg:px-0">
        
        {/* Col 1 (20%): Telemetry & Status in the logo rail */}
        <div className="hidden lg:flex items-center justify-between px-6 border-r border-white/10 h-full font-mono text-[11px] text-[#9CA3AF]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">24/7 ONLINE</span>
          </span>
          <span>{currentTime || '12:00:00'} MSK</span>
        </div>

        {/* Col 2 (40%): Navigation links (Starts strictly at 20%) */}
        <div className="flex items-center gap-6 lg:gap-8 px-4 lg:px-8 h-full border-r border-white/10">
          <Link
            href="#sec-hero"
            className="text-xs font-mono font-medium tracking-wider text-[#CBD5E1] hover:text-[#C5A059] transition-colors"
          >
            // ГЛАВНАЯ
          </Link>
          <Link
            href="#sec-services"
            className="text-xs font-mono font-medium tracking-wider text-[#CBD5E1] hover:text-[#C5A059] transition-colors"
          >
            // УСЛУГИ
          </Link>
          <Link
            href="#sec-about"
            className="text-xs font-mono font-medium tracking-wider text-[#CBD5E1] hover:text-[#C5A059] transition-colors"
          >
            // О КОМПАНИИ
          </Link>
          <Link
            href="#sec-contacts"
            className="text-xs font-mono font-medium tracking-wider text-[#CBD5E1] hover:text-[#C5A059] transition-colors"
          >
            // КОНТАКТЫ
          </Link>
        </div>

        {/* Col 3 (40%): Direct Contact & CTA Button */}
        <div className="flex items-center justify-between px-4 lg:px-8 h-full">
          <div className="hidden sm:flex flex-col font-mono">
            <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">
              Дежурный адвокат
            </span>
            <a
              href="tel:+74952150815"
              className="text-xs font-bold text-white hover:text-[#C5A059] transition-colors"
            >
              +7 (495) 215-08-15
            </a>
          </div>

          <button
            type="button"
            onClick={() => openModal('Запрос под NDA')}
            className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#D8B36E] text-[#12151D] px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 rounded-sm"
          >
            <span>Запрос под NDA</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </header>
  );
}
