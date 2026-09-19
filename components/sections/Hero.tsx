"use client";

import React from "react";
import { useConsultationModal } from "@/components/providers/ModalProvider";

export default function Hero() {
  const { openModal } = useConsultationModal();

  return (
    <section className="relative bg-et-bg h-screen min-h-[680px] flex flex-col justify-between px-[clamp(1.5rem,4vw,6rem)] pt-[clamp(6rem,24vh,16rem)] pb-[clamp(2.5rem,12vh,7.5rem)] w-full overflow-hidden">
      {/* 1. Главный заголовок: точно выверен по высоте и ширине под скриншот */}
      <div>
        <h1 className="font-heading font-normal text-[clamp(2.5rem,4.4vw,9.5rem)] tracking-tight text-et-dark leading-[1.12] w-full max-w-[clamp(440px,46vw,1750px)]">
          Защита бизнеса <br />
          <span className="italic font-serif text-et-muted">в уголовных и сложных</span> <br />
          арбитражных процессах.
        </h1>
      </div>

      {/* 2. Правая часть экрана: линия на 78-80% высоты экрана + аккуратные подзаголовок и кнопка */}
      <div>
        {/* Частичная линия-разделитель (от середины экрана до правого края) */}
        <div className="flex justify-end mb-[clamp(1rem,1.8vh,2.5rem)]">
          <div className="w-full md:w-7/12 lg:w-[clamp(420px,48vw,1850px)] border-t border-et-dark/40" />
        </div>

        {/* Блок под чертой: компактные текст и кнопка в точных пропорциях скриншота */}
        <div className="flex justify-end">
          <div className="w-full md:w-7/12 lg:w-[clamp(420px,48vw,1850px)] flex flex-col md:flex-row md:items-center justify-between gap-[clamp(1rem,1.8vw,3rem)]">
            <p className="text-[clamp(0.7rem,0.62vw,1.05rem)] text-et-muted font-sans leading-[1.55] max-w-[clamp(240px,23vw,600px)] font-light">
              Стратегическое ведение дел, защита активов и топ-менеджмента. Практика с подтвержденным результатом в 1,2+ млрд ₽ сохраненных средств.
            </p>

            <button
              onClick={() => openModal()}
              className="group inline-flex items-center justify-center gap-[clamp(0.5rem,0.7vw,1.2rem)] text-[clamp(0.625rem,0.56vw,0.875rem)] font-mono font-medium uppercase tracking-[0.18em] text-et-dark border border-et-dark/60 px-[clamp(1rem,1.1vw,2rem)] py-[clamp(0.5rem,0.55vw,1rem)] bg-transparent hover:border-[#507192] hover:text-[#507192] transition-all duration-300 rounded-[2px] shrink-0 hover:shadow-[0_0_15px_rgba(80,113,146,0.18)]"
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
