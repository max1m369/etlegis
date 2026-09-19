"use client";

import React from "react";
import { useConsultationModal } from "@/components/providers/ModalProvider";

export default function Hero() {
  const { openModal } = useConsultationModal();

  return (
    <section className="relative bg-et-bg min-h-screen flex flex-col justify-between px-6 sm:px-10 lg:px-[clamp(2.5rem,4vw,6rem)] pt-[clamp(8rem,14vh,18rem)] pb-[clamp(3.5rem,6vh,8rem)] w-full">
      {/* 1. Главный заголовок: масштабируется в процентном соотношении от вьюпорта (идеально для 1080p, 2K, 4K) */}
      <div className="pt-2 sm:pt-4">
        <h1 className="font-heading font-normal text-[clamp(2.75rem,5.2vw,10.5rem)] tracking-tight text-et-dark leading-[1.08] w-full max-w-[clamp(480px,48vw,1850px)]">
          Защита бизнеса <br />
          <span className="italic font-serif text-et-muted">в уголовных и сложных</span> <br />
          арбитражных процессах.
        </h1>
      </div>

      {/* 2. Правая часть экрана: частичная черта + подзаголовок и масштабируемая кнопка */}
      <div className="mt-auto pt-[clamp(3rem,6vh,7rem)]">
        {/* Частичная линия-разделитель (занимает ровно правую половину экрана до края) */}
        <div className="flex justify-end mb-[clamp(1.5rem,2.2vh,3rem)]">
          <div className="w-full md:w-7/12 lg:w-[clamp(450px,48vw,1850px)] border-t border-et-dark/60" />
        </div>

        {/* Блок под чертой: описание слева, рамочная кнопка справа (масштабируются под 4K) */}
        <div className="flex justify-end">
          <div className="w-full md:w-7/12 lg:w-[clamp(450px,48vw,1850px)] flex flex-col md:flex-row md:items-center justify-between gap-[clamp(1.5rem,2vw,3.5rem)]">
            <p className="text-[clamp(0.875rem,0.95vw,1.5rem)] text-et-muted font-sans leading-[1.6] max-w-[clamp(300px,26vw,850px)] font-light">
              Стратегическое ведение дел, защита активов и топ-менеджмента. Практика с подтвержденным результатом в 1,2+ млрд ₽ сохраненных средств.
            </p>

            <button
              onClick={() => openModal()}
              className="group inline-flex items-center justify-center gap-[clamp(0.75rem,1vw,1.5rem)] text-[clamp(0.75rem,0.85vw,1.25rem)] font-mono font-medium uppercase tracking-[0.18em] text-et-dark border border-et-dark/70 px-[clamp(1.5rem,1.8vw,3.25rem)] py-[clamp(0.875rem,1.1vw,1.85rem)] bg-transparent hover:border-[#507192] hover:text-[#507192] transition-all duration-300 rounded-[2px] shrink-0 hover:shadow-[0_0_20px_rgba(80,113,146,0.2)]"
            >
              <span>Обсудить ситуацию</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 group-hover:animate-pulse text-[#507192]">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
