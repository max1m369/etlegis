"use client";

import React from "react";
import { useConsultationModal } from "@/components/providers/ModalProvider";

export default function Hero() {
  const { openModal } = useConsultationModal();

  return (
    <section className="relative bg-et-bg min-h-screen flex flex-col justify-start px-6 sm:px-10 lg:px-[clamp(2.5rem,4vw,6rem)] pt-[clamp(10rem,18vh,24rem)] pb-[clamp(5rem,10vh,14rem)] w-full">
      {/* 1. Главный заголовок: опущен ниже с большим запасом воздуха сверху */}
      <div>
        <h1 className="font-heading font-normal text-[clamp(2.75rem,5vw,9.5rem)] tracking-tight text-et-dark leading-[1.1] w-full max-w-[clamp(480px,48vw,1750px)]">
          Защита бизнеса <br />
          <span className="italic font-serif text-et-muted">в уголовных и сложных</span> <br />
          арбитражных процессах.
        </h1>
      </div>

      {/* 2. Правая часть экрана: линия поднята выше (до уровня красной линии на эскизе) */}
      <div className="mt-[clamp(5rem,10vh,15rem)]">
        {/* Частичная линия-разделитель (от середины экрана до правого края) */}
        <div className="flex justify-end mb-[clamp(1.25rem,1.8vh,2.5rem)]">
          <div className="w-full md:w-7/12 lg:w-[clamp(450px,48vw,1850px)] border-t border-et-dark/60" />
        </div>

        {/* Блок под чертой: уменьшенные, аккуратные текст и кнопка (выделенные синим) */}
        <div className="flex justify-end">
          <div className="w-full md:w-7/12 lg:w-[clamp(450px,48vw,1850px)] flex flex-col md:flex-row md:items-center justify-between gap-[clamp(1.25rem,1.8vw,3rem)]">
            <p className="text-[clamp(0.75rem,0.72vw,1.1rem)] text-et-muted font-sans leading-[1.65] max-w-[clamp(260px,22vw,600px)] font-light">
              Стратегическое ведение дел, защита активов и топ-менеджмента. Практика с подтвержденным результатом в 1,2+ млрд ₽ сохраненных средств.
            </p>

            <button
              onClick={() => openModal()}
              className="group inline-flex items-center justify-center gap-[clamp(0.6rem,0.8vw,1.25rem)] text-[clamp(0.6875rem,0.7vw,0.95rem)] font-mono font-medium uppercase tracking-[0.18em] text-et-dark border border-et-dark/70 px-[clamp(1.25rem,1.25vw,2.25rem)] py-[clamp(0.65rem,0.75vw,1.15rem)] bg-transparent hover:border-[#507192] hover:text-[#507192] transition-all duration-300 rounded-[2px] shrink-0 hover:shadow-[0_0_15px_rgba(80,113,146,0.18)]"
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
