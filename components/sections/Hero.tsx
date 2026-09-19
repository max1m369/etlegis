"use client";

import React from "react";
import { useConsultationModal } from "@/components/providers/ModalProvider";

export default function Hero() {
  const { openModal } = useConsultationModal();

  return (
    <section className="relative bg-et-bg min-h-[82vh] flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-28 pb-14 max-w-[1600px] mx-auto">
      {/* 1. Огромный заголовок в стиле DWRÅ (аккуратный размер, верхний левый блок) */}
      <div className="pt-6 sm:pt-10">
        <h1 className="font-heading font-medium text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] tracking-tight text-et-dark uppercase leading-[1.08] max-w-5xl">
          Защита бизнеса <br />
          в уголовных и сложных <br />
          арбитражных процессах
        </h1>
      </div>

      {/* 2. Правая часть экрана по макету DWRÅ: частичная линия + блок с текстом и кнопкой */}
      <div className="mt-auto pt-10 sm:pt-14">
        {/* Частичная линия-разделитель (только над правым блоком) */}
        <div className="flex justify-end mb-6">
          <div className="w-full md:w-7/12 lg:w-1/2 border-t border-et-border/80" />
        </div>

        {/* Под чертой справа: Стратегия ведения дел слева, «Обсудить ситуацию →» справа */}
        <div className="flex justify-end">
          <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-xs sm:text-sm text-et-muted font-mono leading-relaxed max-w-sm">
              Стратегическое ведение дел, защита активов и топ-менеджмента.
            </p>

            <button
              onClick={() => openModal()}
              className="group inline-flex items-center gap-3 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-et-dark hover:text-et-accent transition-colors shrink-0 py-2 border-b border-transparent hover:border-et-dark"
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
