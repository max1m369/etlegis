'use client';

import React from 'react';
import { useConsultationModal } from '@/components/providers/ModalProvider';

export default function V26HeroSection() {
  const { openModal } = useConsultationModal();

  return (
    <section
      id="sec-hero"
      data-bg="light"
      className="relative w-full min-h-screen bg-[#EAE6DF] text-[#19212C] pt-24 lg:pt-32 border-b border-[#19212C]/15"
    >
      {/* 20% - 40% - 40% Architectural Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[20%_40%_40%] min-h-[calc(100vh-5rem)]">
        
        {/* Col 1 (20%): Reserved rail for Chameleon Logo */}
        <div className="hidden lg:block w-full border-r border-[#19212C]/10 pointer-events-none" />

        {/* Content Area: Cols 2 & 3 (Starts strictly at 20%) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col justify-between">
          
          {/* Top Bar spanning across Cols 2 & 3 (80% width) */}
          <div className="mx-4 lg:mx-8 mt-6 lg:mt-8 mb-6 lg:mb-8 bg-[#8E969F] h-10 rounded-sm flex items-center px-4 font-mono text-[11px] font-bold text-white tracking-wider uppercase shadow-inner">
            АДВОКАТСКОЕ БЮРО ETLEGIS · ЗАЩИТА БИЗНЕСА И БЕНЕФИЦИАРОВ В СУДАХ ВЫСШЕЙ ЮРИСДИКЦИИ
          </div>

          {/* Main 2-Column Content Row (40% + 40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-8 pb-10 items-center">
            
            {/* Col 2 (40%): Main Offer & Lead */}
            <div className="flex flex-col justify-center">
              {/* 3 Horizontal Architectural Lead Bars (from Prototype 10 sketch) */}
              <div className="flex flex-col gap-2 mb-6">
                <div className="bg-[#8E969F] h-6 rounded-sm w-full" />
                <div className="bg-[#8E969F] h-6 rounded-sm w-full" />
                <div className="bg-[#8E969F] h-6 rounded-sm w-[76%]" />
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl xl:text-4xl font-semibold leading-[1.25] text-[#19212C] mb-4">
                Исход сложного дела решает одна формулировка. Находим аргумент, меняющий положение бизнеса.
              </h1>

              <p className="text-sm sm:text-base leading-relaxed text-[#5A6472] mb-6">
                Специализированная судебная коллегия адвокатов Москвы. Защита собственников и генеральных 
                директоров по налоговым, уголовным (ст. 159, 199 УК РФ) и субсидиарным спорам.
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => openModal('Консультация под NDA — Hero')}
                  className="inline-flex items-center gap-2 bg-[#19212C] hover:bg-[#C5A059] text-white hover:text-[#19212C] px-6 py-3.5 text-xs font-mono font-bold tracking-wider uppercase rounded-sm transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <span>Назначить консультацию под NDA</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Col 3 (40%): Institutional Trust & Proven Competence */}
            <div className="flex flex-col justify-center">
              <div className="bg-[#E2DDD5] border border-[#19212C]/12 rounded-sm p-6 sm:p-8 flex flex-col gap-5 shadow-sm">
                <div className="font-mono text-[11px] font-bold text-[#475569] uppercase tracking-wider pb-2 border-b border-[#19212C]/10">
                  ФАКТИЧЕСКИЙ СТАТУС БЮРО
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="font-heading text-3xl font-bold text-[#19212C] min-w-[120px]">
                    16 лет
                  </span>
                  <span className="text-xs text-[#5A6472] leading-tight">
                    Непрерывной судебной практики в арбитраже и уголовном процессе
                  </span>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="font-heading text-3xl font-bold text-[#19212C] min-w-[120px]">
                    1,2 млрд ₽
                  </span>
                  <span className="text-xs text-[#5A6472] leading-tight">
                    Крупнейшая победа над МИФНС с полной отменой доначислений
                  </span>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="font-heading text-3xl font-bold text-[#19212C] min-w-[120px]">
                    94,7%
                  </span>
                  <span className="text-xs text-[#5A6472] leading-tight">
                    Успешных решений в кассационных судах и Верховном Суде РФ
                  </span>
                </div>

                <div className="pt-3 border-t border-[#19212C]/10 font-mono text-[11px] text-[#475569]">
                  🔒 100% соблюдение ст. 8 Федерального закона «Об адвокатуре» (адвокатская тайна)
                </div>
              </div>
            </div>

          </div>

          {/* Giant Spanning Typography across Cols 2 & 3: E T L E G I S */}
          <div className="w-full border-t border-[#19212C]/10 px-4 lg:px-8 py-4 sm:py-6 flex justify-between items-baseline select-none">
            <span className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[#24303F] tracking-widest leading-none">
              E
            </span>
            <span className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[#24303F] tracking-widest leading-none">
              T
            </span>
            <span className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[#24303F] tracking-widest leading-none">
              L
            </span>
            <span className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[#24303F] tracking-widest leading-none">
              E
            </span>
            <span className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[#24303F] tracking-widest leading-none">
              G
            </span>
            <span className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[#24303F] tracking-widest leading-none">
              I
            </span>
            <span className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[#24303F] tracking-widest leading-none">
              S
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
