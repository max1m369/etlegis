"use client";

import React from "react";
import { useConsultationModal } from "@/components/providers/ModalProvider";
import SpotlightButton from "@/components/ui/SpotlightButton";
import Monument3D from "@/components/ui/Monument3D";
import AfternoonSunlightShader from "@/components/ui/AfternoonSunlightShader";
import SeregaGentleText from "@/components/ui/SeregaGentleText";

export default function Hero() {
  const { openModal } = useConsultationModal();

  return (
    <section className="relative bg-[#FAF6EE] dark:bg-[#0D0F12] min-h-screen lg:h-screen flex flex-col justify-between px-[clamp(1.5rem,4vw,6rem)] pt-[clamp(5.5rem,11vh,7.5rem)] pb-[clamp(2.5rem,6vh,4.5rem)] w-full overflow-hidden transition-colors duration-500">
      {/* Слой 0: Галерейный мягкий градиент фоновой стены (как в 3D-Mark/monument.html) */}
      <div 
        className="absolute inset-0 pointer-events-none select-none z-0 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(ellipse at 39% 21%, #f5f1e8 0%, #ece7dd 44%, #dfd8cb 100%)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none select-none z-0 opacity-0 dark:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(ellipse at 42% 28%, #1c1f24 0%, #121418 52%, #0a0b0d 100%)',
        }}
      />

      {/* Слой 1: 3D Монумент (Знак ETLEGIS + Римский бюст + Студийный HDR свет + Параллакс курсора) */}
      <Monument3D className="z-10 top-[33%] bottom-auto h-[45%] md:top-0 md:bottom-0 md:h-full" />

      {/* Слой 2: Шейдер полуденного света (Afternoon Sunlight) НА СЛОЙ ВЫШЕ 3D-знака */}
      <AfternoonSunlightShader overlay className="z-20 pointer-events-none" />

      {/* Слой 3: Контент интерфейса */}
      <div className="relative z-30 flex flex-col lg:flex-row items-center justify-between gap-6 w-full my-auto pointer-events-none">
        <div className="w-full lg:w-auto pointer-events-auto">
          <h1 className="font-heading font-normal text-[clamp(1.85rem,7.5vw,2.3rem)] lg:text-[clamp(2.15rem,4.15vw,9.5rem)] tracking-tight text-et-dark leading-[1.12] w-full max-w-[clamp(340px,52vw,1750px)]">
            <span className="block">
              <SeregaGentleText delay={120} stagger={18}>
                Мы — команда экспертов,
              </SeregaGentleText>
            </span>
            <span className="block">
              <SeregaGentleText delay={560} stagger={16} className="italic font-serif text-et-muted">
                которая знает, как защитить
              </SeregaGentleText>
            </span>
            <span className="block">
              <SeregaGentleText delay={1020} stagger={20}>
                ваш бизнес.
              </SeregaGentleText>
            </span>
          </h1>
        </div>
      </div>

      {/* Правая часть экрана: чёткая линия на 78-80% высоты экрана + читаемый подзаголовок и кнопка */}
      <div className="relative z-30 w-full mt-4 pointer-events-none">
        {/* Частичная линия-разделитель (от середины экрана до правого края) */}
        <div className="flex justify-end mb-[clamp(1rem,1.8vh,2.5rem)]">
          <div className="w-full md:w-7/12 lg:w-[clamp(420px,48vw,1850px)] border-t-2 border-et-dark/85" />
        </div>

        {/* Блок под чертой: контрастные текст и кнопка в точных пропорциях скриншота */}
        <div className="flex justify-end">
          <div className="w-full md:w-7/12 lg:w-[clamp(420px,48vw,1850px)] flex flex-col md:flex-row md:items-center justify-between gap-[clamp(1rem,1.8vw,3rem)] pointer-events-auto">
            <p className="text-[clamp(0.85rem,0.75vw,1.15rem)] text-et-dark/90 font-sans leading-[1.6] max-w-[clamp(280px,28vw,700px)] font-normal">
              Стратегическое ведение дел, защита активов и&nbsp;топ-менеджмента. Практика с&nbsp;подтверждённым результатом в&nbsp;1,2+&nbsp;млрд&nbsp;₽ сохранённых средств.
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
