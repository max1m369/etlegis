'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { PRACTICES_DATA } from '@/lib/data/etlegis-data';
import SpotlightButton from '@/components/ui/SpotlightButton';

export function PracticesSection() {
  const [activePracticeId, setActivePracticeId] = useState<string>(PRACTICES_DATA[0].id);

  return (
    <section id="practices" className="py-16 md:py-24 px-[clamp(1.5rem,4vw,6rem)] w-full bg-[#F8F9FA]">
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-14 items-start w-full">
        {/* Левая колонка: Большой заголовок (соразмерный с Hero) */}
        <div className="w-full lg:w-[32%] xl:w-[30%] lg:sticky lg:top-28 shrink-0">
          <span className="text-xs uppercase tracking-widest text-[#9B815C] font-mono font-semibold block mb-3">
            Компетенции
          </span>
          <h2 className="font-heading font-normal text-[clamp(2.5rem,4.4vw,6.5rem)] tracking-tight text-[#141517] leading-[1.08]">
            Ключевые практики
          </h2>
        </div>

        {/* Правая колонка: 4 вида практики (сетка 2х2) */}
        <div className="w-full lg:w-[68%] xl:w-[70%] flex flex-col gap-10">
          <div 
            data-testid="practices-carousel"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
          >
            {PRACTICES_DATA.slice(0, 4).map((practice, index) => {
              const isActive = activePracticeId === practice.id;
              const formattedIndex = `0${index + 1}`;

              return (
                <div
                  key={practice.id}
                  data-practice-card
                  role="region"
                  aria-roledescription="card"
                  aria-label={`Практика ${formattedIndex}: ${practice.title}`}
                  onMouseEnter={() => setActivePracticeId(practice.id)}
                  className={`group bg-white border transition-all duration-300 rounded-[2px] overflow-hidden flex flex-col justify-between cursor-pointer ${
                    isActive ? 'border-[#141517] shadow-md' : 'border-[#E2E2DC] hover:border-[#141517]'
                  }`}
                >
                  {/* Изображение с подложкой фирменного цвета при ховере */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900">
                    {practice.image && (
                      <Image
                        src={practice.image}
                        alt={practice.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
                      />
                    )}

                    {/* Фирменный номер 01, 02, 03, 04 на изображении */}
                    <div className="absolute top-4 left-4 z-10 bg-[#141517]/80 backdrop-blur-md px-3 py-1 border border-white/10 rounded-[2px]">
                      <span className="text-xs font-mono font-bold tracking-wider text-white">
                        {formattedIndex}
                      </span>
                    </div>

                    {/* Всплывающая подложка фирменного цвета (#2F4858 / #101c22) с детальным текстом прямо на изображении */}
                    <div className="absolute inset-0 bg-[#2F4858]/92 backdrop-blur-md p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-400 ease-in-out z-20 overflow-y-auto">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#A0AEC0] block mb-2">
                          Услуги & Направления
                        </span>
                        <h4 className="font-serif text-lg font-medium text-white mb-3 leading-snug">
                          {practice.title}
                        </h4>
                        <ul className="space-y-2 mt-3">
                          {practice.services.map((service) => (
                            <li key={service.id} className="text-xs text-neutral-200 flex items-start gap-2">
                              <CheckCircle size={12} className="text-[#9B815C] mt-0.5 shrink-0" />
                              <span className="line-clamp-2">{service.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-white/15 mt-4">
                        <span className="text-[11px] font-mono text-[#A0AEC0] uppercase tracking-wider">
                          Нажмите для изучения практики
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Заголовок практики под изображением (в обычном состоянии) */}
                  <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                    <div>
                      <Link href={`/practices/${practice.slug}`} className="block">
                        <h3 className="font-serif text-xl font-medium leading-snug text-[#141517] group-hover:text-[#507192] transition-colors">
                          {practice.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-[#5E6267] mt-2.5 leading-relaxed font-light line-clamp-2">
                        {practice.shortDescription}
                      </p>
                    </div>

                    {/* Кнопка в едином стиле "ПОДРОБНЕЕ О ПРАКТИКЕ →" */}
                    <div className="mt-6 pt-4 border-t border-[#ECECE8]">
                      <Link href={`/practices/${practice.slug}`} className="block w-full">
                        <SpotlightButton className="w-full py-3 px-4 text-xs">
                          Подробнее о практике
                        </SpotlightButton>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Нижний блок: Текст о практиках слева, кнопка "Смотреть все" справа */}
          <div className="pt-6 border-t border-[#E2E2DC] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-sm text-[#5E6267] max-w-xl font-light leading-relaxed">
              Объединяем направления работы в монолитные практики для комплексной защиты активов и топ-менеджмента.
            </p>
            <Link href="/practices" className="shrink-0">
              <SpotlightButton className="px-6 py-3.5 text-xs">
                Все направления практик
              </SpotlightButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
