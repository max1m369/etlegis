'use client';

import React from 'react';

export default function V26Footer() {
  return (
    <footer className="w-full bg-[#19212C] text-[#94A3B8] border-t border-white/10 font-mono text-xs">
      <div className="w-full grid grid-cols-1 lg:grid-cols-[20%_40%_40%] py-8 px-4 lg:px-0">
        
        {/* Col 1 (20%): Rail spacing */}
        <div className="hidden lg:flex items-center px-6 border-r border-white/10 text-[11px] text-[#5A6472]">
          <span>ETLEGIS // 2026</span>
        </div>

        {/* Col 2 (40%): Copyright & Licensing */}
        <div className="px-4 lg:px-12 py-2 lg:py-0 lg:border-r border-white/10 flex flex-col gap-1 justify-center">
          <div className="text-white font-medium">
            © ETLEGIS 2019–2026. Адвокатское бюро г. Москвы.
          </div>
          <div className="text-[11px] text-[#64748B]">
            Реестровый статус адвокатов подтверждён Адвокатской палатой города Москвы.
          </div>
        </div>

        {/* Col 3 (40%): Statutory Legal Privilege Clause */}
        <div className="px-4 lg:px-12 py-2 lg:py-0 flex flex-col justify-center text-[11px] text-[#64748B] leading-relaxed">
          Адвокатская тайна гарантирована ст. 8 Федерального закона от 31.05.2002 № 63-ФЗ 
          «Об адвокатской деятельности и адвокатуре в Российской Федерации».
        </div>

      </div>
    </footer>
  );
}
