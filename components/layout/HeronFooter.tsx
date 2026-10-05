'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useConsultationModal } from '@/components/providers/ModalProvider';
import { companyContacts } from '@/lib/data/mock-data';
import HeronButton from '@/components/ui/HeronButton';

export default function HeronFooter() {
  const { openModal } = useConsultationModal();

  return (
    <footer id="contacts" className="relative w-full border-t border-[#D1D1CB] dark:border-[#222528] bg-[#0A0B0D] text-white py-16 sm:py-24 overflow-hidden">
      
      {/* 1. Authentic High-Resolution Executive Boardroom Background Image */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <Image
          src="/footer-bg.webp"
          alt="Офис адвокатского бюро Etlegis"
          fill
          priority={false}
          className="object-cover object-right opacity-35 filter brightness-75 contrast-125"
        />
        {/* Cinematic gradient scrims to ensure 100% typographic contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0B0D] via-[#0A0B0D]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0D] via-transparent to-[#0A0B0D]/80" />
      </div>

      <div className="relative z-10 mx-2 sm:mx-4 px-4 sm:px-8">
        
        {/* 2. Top Telemetry Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/15 pb-6 mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FA3600] tracking-widest uppercase mb-2">
              <span>// 06 КОНТАКТЫ И СВЯЗЬ</span>
              <span className="w-8 h-px bg-[#FA3600]" />
              <span className="text-white/60">ОПЕРАТИВНЫЙ ШТАБ БЮРО</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-white tracking-tight">
              Обсудить ситуацию
            </h2>
          </div>
          <div className="text-xs font-mono text-white/50 text-right">
            [ КОНФИДЕНЦИАЛЬНОСТЬ // СТ. 8 ФЗ №63-ФЗ ]
          </div>
        </div>

        {/* 3. Modular Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/15 divide-y lg:divide-y-0 lg:divide-x divide-white/15 bg-black/40 backdrop-blur-sm">
          
          {/* Col 1: Direct CTA Card (6 Cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-[#FA3600] uppercase mb-4 tracking-wider">
                ПРЕДВАРИТЕЛЬНЫЙ ПРАВОВОЙ АНАЛИЗ
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white mb-4">
                Защитите бизнес и персональные активы руководства
              </h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed mb-8">
                Оставьте запрос для экстренной оценки рисков. Адвокат бюро свяжется с вами в течение 15 минут с готовой картой первоочередных процессуальных действий.
              </p>
            </div>

            <div className="pt-6 border-t border-white/15">
              <HeronButton
                variant="brand"
                size="lg"
                onClick={openModal}
                className="w-full text-center"
              >
                ОБСУДИТЬ СИТУАЦИЮ С АДВОКАТОМ
              </HeronButton>
            </div>
          </div>

          {/* Col 2: Telemetry Specifications & Contacts (6 Cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-8">
            
            {/* Direct Channels */}
            <div>
              <div className="text-xs font-mono text-white/60 uppercase mb-4 tracking-wider">
                ПРЯМЫЕ КАНАЛЫ СВЯЗИ
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-white/50 uppercase block mb-1">ТЕЛЕФОН БЮРО:</span>
                  <a
                    href={`tel:${companyContacts.phoneRaw}`}
                    className="text-2xl sm:text-3xl font-mono font-bold text-white hover:text-[#FA3600] transition-colors"
                  >
                    {companyContacts.phone}
                  </a>
                  <div className="text-xs text-neutral-400 font-mono mt-1">
                    Круглосуточный прием экстренных обращений 24/7
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={companyContacts.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-white/20 font-mono text-xs uppercase tracking-wider text-white hover:border-[#FA3600] hover:text-[#FA3600] hover:bg-white/5 transition-all"
                  >
                    TELEGRAM →
                  </a>
                  <a
                    href={companyContacts.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-white/20 font-mono text-xs uppercase tracking-wider text-white hover:border-[#FA3600] hover:text-[#FA3600] hover:bg-white/5 transition-all"
                  >
                    WHATSAPP →
                  </a>
                  <a
                    href={`mailto:${companyContacts.email}`}
                    className="px-4 py-2 border border-white/20 font-mono text-xs uppercase tracking-wider text-white hover:border-[#FA3600] hover:text-[#FA3600] hover:bg-white/5 transition-all"
                  >
                    EMAIL →
                  </a>
                </div>
              </div>
            </div>

            {/* Office Coordinates */}
            <div className="pt-6 border-t border-white/15">
              <div className="text-[10px] font-mono text-white/50 uppercase mb-2">АДРЕС ОФИСА:</div>
              <div className="text-sm font-sans text-neutral-200">
                {companyContacts.address}
              </div>
              <div className="text-xs text-neutral-400 font-mono mt-1">
                Метро: {companyContacts.metro} // Прием по предварительной записи
              </div>
            </div>

          </div>

        </div>

        {/* 4. Bottom Tier: Original Logo & Requisites */}
        <div className="mt-12 pt-8 border-t border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs text-white/60">
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/" className="inline-block" aria-label="Адвокатское бюро ETLEGIS">
              <img
                src="/logo.svg"
                alt="Адвокатское бюро ETLEGIS"
                className="h-6 w-auto invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <div>
              © 2026 {companyContacts.legalName}. Все права защищены.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>ОГРН: <strong className="text-white">{companyContacts.ogrn}</strong></span>
            <span>·</span>
            <span>ИНН: <strong className="text-white">{companyContacts.inn}</strong></span>
            <span>·</span>
            <a href="#privacy" className="hover:text-white underline">
              Политика конфиденциальности
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
