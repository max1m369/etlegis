"use client";

import React from "react";
import { useConsultationModal } from "@/components/providers/ModalProvider";

export default function Hero() {
  const { openModal } = useConsultationModal();

  return (
    <section className="relative bg-et-bg min-h-[86vh] flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-32 pb-24 sm:pb-36 max-w-[1600px] mx-auto">
      {/* 1. Главный заголовок в точности по скриншоту (Cormorant Garamond с курсивом во 2-й строке) */}
      <div className="pt-4 sm:pt-8">
        <h1 className="font-heading font-normal text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] tracking-tight text-et-dark leading-[1.12] max-w-5xl">
          Защита бизнеса <br />
          <span className="italic font-serif text-et-muted">в уголовных и сложных</span> <br />
          арбитражных процессах.
        </h1>
      </div>

      {/* 2. Правая часть экрана по макету: частичная линия + подзаголовок и рамочная кнопка */}
      <div className="mt-auto pt-16 sm:pt-24">
        {/* Частичная линия-разделитель (от середины экрана к правому краю) */}
        <div className="flex justify-end mb-6 sm:mb-8">
          <div className="w-full md:w-7/12 lg:w-[55%] border-t border-et-dark/70" />
        </div>

        {/* Под чертой справа: текст слева, рамочная кнопка «ОБСУДИТЬ СИТУАЦИЮ →» справа */}
        <div className="flex justify-end">
          <div className="w-full md:w-7/12 lg:w-[55%] flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
            <p className="text-xs sm:text-sm text-et-muted font-sans leading-relaxed max-w-md font-light">
              Стратегическое ведение дел, защита активов и топ-менеджмента. Практика с подтвержденным результатом в 1,2+ млрд ₽ сохраненных средств.
            </p>

            <button
              onClick={() => openModal()}
              className="group inline-flex items-center justify-center gap-4 text-xs font-mono font-medium uppercase tracking-[0.18em] text-et-dark border border-et-dark px-6 py-3.5 hover:bg-et-dark hover:text-white transition-all duration-300 rounded-[2px] shrink-0"
            >
              <span>Обсудить ситуацию</span>
              <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
