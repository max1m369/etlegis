'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useConsultationModal } from '@/components/providers/ModalProvider';

export default function V26AboutSection() {
  const { openModal } = useConsultationModal();

  return (
    <section
      id="sec-about"
      data-bg="light"
      className="relative w-full bg-[#EAE6DF] text-[#19212C] border-b border-[#19212C]/15"
    >
      {/* 20% - 40% - 40% Architectural Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[20%_40%_40%]">
        
        {/* Col 1 (20%): Reserved rail for Chameleon Logo */}
        <div className="hidden lg:block w-full border-r border-[#19212C]/10 pointer-events-none" />

        {/* Content Area across Cols 2 & 3 (Starts strictly at 20%) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col">
          
          {/* Section Header across Cols 2 & 3 */}
          <div className="p-6 lg:p-12 pb-6 lg:pb-8 border-b border-[#19212C]/10">
            <div className="font-mono text-xs text-[#C5A059] uppercase tracking-widest mb-2 font-bold">
              // ИНСТИТУЦИОНАЛЬНЫЙ СОСТАВ
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#19212C] mb-3">
              О Компании
            </h2>
            <p className="text-sm text-[#5A6472] max-w-2xl leading-relaxed">
              Бюро создано практическими адвокатами высшей квалификации для защиты первого лица бизнеса. 
              Ниже представлены ведущие партнёры, лично руководящие судебной защитой.
            </p>
          </div>

          {/* 2 Schematic Partner Cards (Col 2 & Col 3: 40% + 40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Col 2 (40%): Partner 1 - Алексей Бирюков */}
            <div className="p-6 lg:p-12 lg:border-r border-[#19212C]/10">
              <div className="bg-white border border-[#19212C]/12 rounded-sm p-6 sm:p-8 flex flex-col gap-5 shadow-sm h-full">
                
                {/* Header with Photo & Credentials */}
                <div className="flex gap-4 items-center">
                  <div className="relative w-20 h-20 rounded-sm overflow-hidden bg-[#E2E8F0] border border-[#CBD5E1] shrink-0">
                    <Image
                      src="/team/t1.webp"
                      alt="Алексей Бирюков"
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#0F172A] leading-tight">
                      Алексей Бирюков
                    </h3>
                    <div className="font-mono text-xs text-[#C5A059] uppercase font-bold mt-1">
                      Управляющий партнёр · Адвокат
                    </div>
                    <div className="font-mono text-[11px] text-[#64748B] mt-0.5">
                      Рег. № 77/14820 АП г. Москвы
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="text-xs sm:text-sm text-[#334155] leading-relaxed py-3 border-y border-[#F1F5F9]">
                  МГЮА им. О.Е. Кутафина. 16 лет судебной практики. Специализация: комплексная защита 
                  собственников при выездных налоговых проверках (ст. 199 УК РФ) и особо крупных экономических 
                  обвинениях (ст. 159 ч. 4 УК РФ).
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-sm">
                    <div className="font-heading text-lg font-bold text-[#0F172A]">
                      1,2 млрд ₽
                    </div>
                    <div className="font-mono text-[10px] text-[#64748B] uppercase">
                      Победа над МИФНС
                    </div>
                  </div>
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-sm">
                    <div className="font-heading text-lg font-bold text-[#0F172A]">
                      16 лет
                    </div>
                    <div className="font-mono text-[10px] text-[#64748B] uppercase">
                      Стаж в судах
                    </div>
                  </div>
                </div>

                {/* Contacts Box */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-sm flex flex-col gap-2 font-mono text-[11px]">
                  <div className="flex justify-between text-[#475569]">
                    <span>Телефон:</span>
                    <strong className="text-[#0F172A]">+7 (495) 215-08-15 (доб. 101)</strong>
                  </div>
                  <div className="flex justify-between text-[#475569]">
                    <span>Email:</span>
                    <strong className="text-[#0F172A]">a.biryukov@etlegis.ru</strong>
                  </div>
                  <div className="flex justify-between text-[#475569]">
                    <span>Локация:</span>
                    <strong className="text-[#0F172A]">Башня Федерация, эт. 46</strong>
                  </div>
                </div>

                {/* Dossier Button */}
                <button
                  type="button"
                  onClick={() => openModal('Досье адвоката: Алексей Бирюков')}
                  className="w-full bg-[#0F172A] hover:bg-[#C5A059] text-white hover:text-[#0F172A] py-2.5 px-4 rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-200 mt-auto text-center"
                >
                  Открыть судебное досье →
                </button>

              </div>
            </div>

            {/* Col 3 (40%): Partner 2 - Ксения Булатова */}
            <div className="p-6 lg:p-12">
              <div className="bg-white border border-[#19212C]/12 rounded-sm p-6 sm:p-8 flex flex-col gap-5 shadow-sm h-full">
                
                {/* Header with Photo & Credentials */}
                <div className="flex gap-4 items-center">
                  <div className="relative w-20 h-20 rounded-sm overflow-hidden bg-[#E2E8F0] border border-[#CBD5E1] shrink-0">
                    <Image
                      src="/team/bulatova.jpg"
                      alt="Ксения Булатова"
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-[#0F172A] leading-tight">
                      Ксения Булатова
                    </h3>
                    <div className="font-mono text-xs text-[#C5A059] uppercase font-bold mt-1">
                      Партнёр · Адвокат
                    </div>
                    <div className="font-mono text-[11px] text-[#64748B] mt-0.5">
                      Рег. № 77/15291 АП г. Москвы
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="text-xs sm:text-sm text-[#334155] leading-relaxed py-3 border-y border-[#F1F5F9]">
                  СПбГУ. 14 лет практики. Специализация: комплексная защита контролирующих должника лиц 
                  (КДЛ) в банкротстве, предотвращение субсидиарной ответственности бенефициаров и оспаривание 
                  подозрительных сделок.
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-sm">
                    <div className="font-heading text-lg font-bold text-[#0F172A]">
                      840 млн ₽
                    </div>
                    <div className="font-mono text-[10px] text-[#64748B] uppercase">
                      Отбитый иск КДЛ
                    </div>
                  </div>
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-sm">
                    <div className="font-heading text-lg font-bold text-[#0F172A]">
                      14 лет
                    </div>
                    <div className="font-mono text-[10px] text-[#64748B] uppercase">
                      Судебный стаж
                    </div>
                  </div>
                </div>

                {/* Contacts Box */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-sm flex flex-col gap-2 font-mono text-[11px]">
                  <div className="flex justify-between text-[#475569]">
                    <span>Телефон:</span>
                    <strong className="text-[#0F172A]">+7 (495) 215-08-15 (доб. 102)</strong>
                  </div>
                  <div className="flex justify-between text-[#475569]">
                    <span>Email:</span>
                    <strong className="text-[#0F172A]">k.bulatova@etlegis.ru</strong>
                  </div>
                  <div className="flex justify-between text-[#475569]">
                    <span>Локация:</span>
                    <strong className="text-[#0F172A]">Башня Федерация, эт. 46</strong>
                  </div>
                </div>

                {/* Dossier Button */}
                <button
                  type="button"
                  onClick={() => openModal('Досье адвоката: Ксения Булатова')}
                  className="w-full bg-[#0F172A] hover:bg-[#C5A059] text-white hover:text-[#0F172A] py-2.5 px-4 rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-200 mt-auto text-center"
                >
                  Открыть судебное досье →
                </button>

              </div>
            </div>

          </div>

          {/* Full Team Footer Bar */}
          <div className="px-6 lg:px-12 py-4 border-t border-[#19212C]/10 flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-xs text-[#5A6472]">
            <span>В коллегии бюро 8 профильных адвокатов и аналитиков</span>
            <Link
              href="/team"
              className="text-[#19212C] font-bold hover:text-[#C5A059] transition-colors"
            >
              Смотреть всех адвокатов бюро →
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
