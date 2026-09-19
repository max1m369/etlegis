"use client";

import React from "react";
import { useConsultationModal } from "@/components/providers/ModalProvider";

export default function Hero() {
  const { openModal } = useConsultationModal();

  return (
    <section className="relative bg-et-bg min-h-screen flex flex-col justify-between px-6 sm:px-10 lg:px-14 pt-36 sm:pt-44 pb-12 sm:pb-16 w-full">
      {/* 1. Главный заголовок в точности по скриншоту с дополнительным воздухом сверху */}
      <div className="pt-2 sm:pt-6">
        <h1 className="font-heading font-normal text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] tracking-tight text-et-dark leading-[1.12] max-w-5xl">
          Защита бизнеса <br />
          <span className="italic font-serif text-et-muted">в уголовных и сложных</span> <br />
          арбитражных процессах.
        </h1>
      </div>

      {/* 2. Правая часть экрана: частичная линия + подзаголовок и рамочная синяя кнопка */}
      <div className="mt-auto pt-16 sm:pt-20">
        {/* Частичная линия-разделитель (начинается с середины и идёт до правого края экрана) */}
        <div className="flex justify-end mb-6 sm:mb-8">
          <div className="w-full md:w-7/12 lg:w-[52%] border-t border-et-dark/60" />
        </div>

        {/* Блок под чертой: описание слева, лёгкая кнопка с синей обводкой и моргающей стрелкой справа */}
        <div className="flex justify-end">
          <div className="w-full md:w-7/12 lg:w-[52%] flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
            <p className="text-xs sm:text-sm text-et-muted font-sans leading-relaxed max-w-md font-light">
              Стратегическое ведение дел, защита активов и топ-менеджмента. Практика с подтвержденным результатом в 1,2+ млрд ₽ сохраненных средств.
            </p>

            <button
              onClick={() => openModal()}
              className="group inline-flex items-center justify-center gap-4 text-xs font-mono font-medium uppercase tracking-[0.18em] text-et-dark border border-et-dark/70 px-6 py-3.5 bg-transparent hover:border-[#507192] hover:text-[#507192] transition-all duration-300 rounded-[2px] shrink-0 hover:shadow-[0_0_15px_rgba(80,113,146,0.15)]"
            >
              <span>Обсудить ситуацию</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:animate-pulse text-[#507192]">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
