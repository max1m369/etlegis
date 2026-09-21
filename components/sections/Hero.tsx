"use client";

import React from "react";
import { useConsultationModal } from "@/components/providers/ModalProvider";
import SpotlightButton from "@/components/ui/SpotlightButton";
import HeroBackgroundShader from "@/components/ui/HeroBackgroundShader";
import KineticReticle from "@/components/ui/KineticReticle";

export default function Hero() {
  const { openModal } = useConsultationModal();

  return (
    <section className="relative bg-et-bg min-h-screen lg:h-screen flex flex-col justify-between px-[clamp(1.5rem,4vw,6rem)] pt-[clamp(5.5rem,11vh,7.5rem)] pb-[clamp(2.5rem,6vh,4.5rem)] w-full overflow-hidden">
      {/* Background Animated Shader */}
      <HeroBackgroundShader />

      {/* 1. Верхний блок: Главный заголовок слева и Кинетический прицел справа */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 w-full my-auto">
        <div className="w-full lg:w-auto">
          <h1 className="font-heading font-normal text-[clamp(2.5rem,4.4vw,9.5rem)] tracking-tight text-et-dark leading-[1.12] w-full max-w-[clamp(440px,46vw,1750px)]">
            Защита бизнеса <br />
            <span className="italic font-serif text-et-muted">в уголовных и сложных</span> <br />
            арбитражных процессах.
          </h1>
        </div>
        <div className="w-full lg:w-auto flex items-center justify-center lg:justify-end shrink-0">
          <KineticReticle />
        </div>
      </div>

      {/* 2. Правая часть экрана: чёткая линия на 78-80% высоты экрана + читаемый подзаголовок и кнопка */}
      <div className="relative z-20 w-full mt-4">
        {/* Частичная линия-разделитель (от середины экрана до правого края) */}
        <div className="flex justify-end mb-[clamp(1rem,1.8vh,2.5rem)]">
          <div className="w-full md:w-7/12 lg:w-[clamp(420px,48vw,1850px)] border-t-2 border-[#141517]/85" />
        </div>

        {/* Блок под чертой: контрастные текст и кнопка в точных пропорциях скриншота */}
        <div className="flex justify-end">
          <div className="w-full md:w-7/12 lg:w-[clamp(420px,48vw,1850px)] flex flex-col md:flex-row md:items-center justify-between gap-[clamp(1rem,1.8vw,3rem)]">
            <p className="text-[clamp(0.85rem,0.75vw,1.15rem)] text-[#141517]/90 font-sans leading-[1.6] max-w-[clamp(280px,28vw,700px)] font-normal">
              Стратегическое ведение дел, защита активов и топ-менеджмента. Практика с подтвержденным результатом в 1,2+ млрд ₽ сохраненных средств.
            </p>

            <SpotlightButton
              onClick={() => openModal()}
              className="px-[clamp(1.2rem,1.4vw,2.4rem)] py-[clamp(0.65rem,0.75vw,1.1rem)] text-[clamp(0.7rem,0.6vw,0.9rem)] shrink-0"
            >
              Обсудить ситуацию
            </SpotlightButton>
          </div>
        </div>
      </div>
    </section>
  );
}
