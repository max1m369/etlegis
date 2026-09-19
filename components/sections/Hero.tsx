"use client";

import React from "react";
import { useConsultationModal } from "@/components/providers/ModalProvider";

export default function Hero() {
  const { openModal } = useConsultationModal();

  return (
    <section className="relative bg-et-bg min-h-[85vh] flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-32 pb-16 max-w-[1600px] mx-auto">
      {/* 1. Верхний лаконичный статусный маркер */}
      <div className="flex items-center gap-3 mb-8">
        <span className="w-6 h-[1.5px] bg-et-accent" />
        <span className="text-[11px] uppercase tracking-[0.25em] text-et-muted font-mono font-medium">
          Адвокатское бюро • С 2019 года
        </span>
      </div>

      {/* 2. Огромный заголовок в стиле DWRÅ (высокая акцентная типографика) */}
      <div className="my-auto py-6">
        <h1 className="font-heading font-medium text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight text-et-dark uppercase leading-[1.06] max-w-6xl">
          Защита бизнеса <br />
          в уголовных и сложных <br />
          арбитражных процессах.
        </h1>
      </div>

      {/* 3. Горизонтальная черта-разделитель (аккуратная линия под заголовком) */}
      <div className="w-full border-t border-et-border/90 my-6 sm:my-10" />

      {/* 4. Блок под чертой: текст слева, кнопка «Обсудить ситуацию» в правой части экрана */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <p className="text-xs sm:text-sm text-et-muted max-w-lg font-light leading-relaxed">
          Стратегическое ведение дел, защита активов и топ-менеджмента. Практика с подтвержденным результатом в 1,2+ млрд ₽ сохраненных средств.
        </p>

        {/* Правая часть экрана: кнопка действия в точности по макету DWRÅ */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => openModal()}
            className="group inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-et-dark hover:text-et-accent transition-colors py-4 px-8 border border-et-dark bg-transparent hover:bg-et-dark hover:text-white transition-all duration-300 rounded-[2px]"
          >
            <span>Обсудить ситуацию</span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
