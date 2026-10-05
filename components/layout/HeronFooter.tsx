'use client';

import React from 'react';
import Link from 'next/link';
import { useConsultationModal } from '@/components/providers/ModalProvider';
import { companyContacts } from '@/lib/data/mock-data';
import HeronButton from '@/components/ui/HeronButton';

export default function HeronFooter() {
  const { openModal } = useConsultationModal();

  return (
    <footer id="contacts" className="relative w-full border-t border-[#D1D1CB] dark:border-[#222528] bg-white/40 dark:bg-black/40 py-16 sm:py-24">
      <div className="mx-2 sm:mx-4 px-4 sm:px-8">
        
        {/* Top Telemetry Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D1D1CB] dark:border-[#222528] pb-6 mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FA3600] tracking-widest uppercase mb-2">
              <span>// 06 КОНТАКТЫ И СВЯЗЬ</span>
              <span className="w-8 h-px bg-[#FA3600]" />
              <span className="text-[#7E7E7A]">ОПЕРАТИВНЫЙ ШТАБ БЮРО</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold text-[#282828] dark:text-white tracking-tight">
              Обсудить ситуацию
            </h2>
          </div>
          <div className="text-xs font-mono text-[#7E7E7A] text-right">
            [ КОНФИДЕНЦИАЛЬНОСТЬ // АДВОКАТСКАЯ ТАЙНА ]
          </div>
        </div>

        {/* Modular Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#D1D1CB] dark:border-[#222528] divide-y lg:divide-y-0 lg:divide-x divide-[#D1D1CB] dark:divide-[#222528]">
          
          {/* Col 1: Direct CTA Card (6 Cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between bg-white/50 dark:bg-black/20">
            <div>
              <div className="text-xs font-mono text-[#7E7E7A] uppercase mb-4">
                ПРЕДВАРИТЕЛЬНЫЙ ПРАВОВОЙ АНАЛИЗ
              </div>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-[#282828] dark:text-white mb-4">
                Защитите бизнес и персональные активы руководства
              </h3>
              <p className="text-sm text-[#414140] dark:text-[#A0A09C] font-light leading-relaxed mb-8">
                Оставьте запрос для экстренной оценки рисков. Адвокат бюро свяжется с вами в течение 15 минут с готовой картой первоочередных процессуальных действий.
              </p>
            </div>

            <div className="pt-6 border-t border-[#D1D1CB] dark:border-[#222528]">
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
              <div className="text-xs font-mono text-[#7E7E7A] uppercase mb-4">
                ПРЯМЫЕ КАНАЛЫ СВЯЗИ
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-[#7E7E7A] uppercase block">ТЕЛЕФОН БЮРО:</span>
                  <a
                    href={`tel:${companyContacts.phoneRaw}`}
                    className="text-xl sm:text-2xl font-mono font-bold text-[#282828] dark:text-white hover:text-[#FA3600] transition-colors"
                  >
                    {companyContacts.phone}
                  </a>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={companyContacts.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#D1D1CB] dark:border-[#222528] font-mono text-xs uppercase tracking-wider text-[#282828] dark:text-white hover:border-[#FA3600] hover:text-[#FA3600] transition-colors"
                  >
                    TELEGRAM →
                  </a>
                  <a
                    href={companyContacts.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#D1D1CB] dark:border-[#222528] font-mono text-xs uppercase tracking-wider text-[#282828] dark:text-white hover:border-[#FA3600] hover:text-[#FA3600] transition-colors"
                  >
                    WHATSAPP →
                  </a>
                  <a
                    href={`mailto:${companyContacts.email}`}
                    className="px-4 py-2 border border-[#D1D1CB] dark:border-[#222528] font-mono text-xs uppercase tracking-wider text-[#282828] dark:text-white hover:border-[#FA3600] hover:text-[#FA3600] transition-colors"
                  >
                    EMAIL →
                  </a>
                </div>
              </div>
            </div>

            {/* Requisites Table */}
            <div className="pt-6 border-t border-[#D1D1CB] dark:border-[#222528] text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-[#7E7E7A]">АДРЕС:</span>
                <span className="text-[#282828] dark:text-white text-right">{companyContacts.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7E7E7A]">РЕЖИМ:</span>
                <span className="text-[#282828] dark:text-white text-right">{companyContacts.workingHours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7E7E7A]">ОГРН / ИНН:</span>
                <span className="text-[#282828] dark:text-white text-right">{companyContacts.ogrn} / {companyContacts.inn}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Legal Copyright */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#7E7E7A] gap-4">
          <div>
            © {new Date().getFullYear()} {companyContacts.legalName}. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
          </div>
          <div className="flex items-center gap-6">
            <span>[ ETLEGIS VERSION 2.5 // HERON SYSTEM ]</span>
            <span>55°45&apos;N 37°37&apos;E</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
