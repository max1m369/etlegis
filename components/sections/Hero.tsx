"use client";

import React from "react";
import { useConsultationModal } from "@/components/providers/ModalProvider";

export default function Hero() {
  const { openModal } = useConsultationModal();

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between px-8 md:px-20 pt-32 pb-20 max-w-[1700px] mx-auto">
      {/* Верхний парящий статус */}
      <div className="flex items-center gap-4">
        <span className="w-8 h-[1px] bg-et-accent" />
        <span className="text-[11px] uppercase tracking-[0.3em] text-et-muted font-medium">
          Адвокатское бюро · С 2019 года
        </span>
      </div>

      {/* Главная типографика с огромным воздухом */}
      <div className="my-auto py-16">
        <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl lg:text-[6.5rem] font-light leading-[1.05] tracking-[-0.02em] text-et-dark max-w-5xl">
          Защита бизнеса <br />
          <span className="italic font-normal font-serif text-et-muted/90">в уголовных и сложных</span> <br />
          арбитражных процессах.
        </h1>
      </div>

      {/* Нижняя панель действий со свободным пространством */}
      <div className="pt-12 border-t border-et-border/70 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <p className="text-sm md:text-base text-et-muted max-w-md font-light leading-relaxed">
          Стратегическое ведение дел, защита активов и топ-менеджмента. Практика с подтвержденным результатом в 1,2+ млрд ₽ сохраненных средств.
        </p>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => openModal()}
            className="group relative inline-flex items-center gap-4 text-xs uppercase tracking-[0.2em] font-medium text-et-dark py-4 px-8 border border-et-dark bg-transparent hover:bg-et-dark hover:text-white transition-all duration-500"
          >
            <span>Обсудить ситуацию</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
