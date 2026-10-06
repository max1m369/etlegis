'use client';

import React from 'react';

const STATS_DATA = [
  {
    id: 'foundation',
    number: '2019',
    eyebrow: 'ОПЫТ ПРАКТИКИ',
    label: 'ГОД ОСНОВАНИЯ БЮРО',
    desc: 'Адвокатское бюро объединило ведущих судебных представителей и практиков Москвы.',
  },
  {
    id: 'deals',
    number: '1,2+',
    suffix: 'МЛРД ₽',
    eyebrow: 'СОХРАНЁННЫЕ АКТИВЫ',
    label: 'В СУДАХ И СПОРАХ',
    desc: 'Суммарный объем отбитых налоговых доначислений, субсидиарных исков и требований контрагентов.',
  },
  {
    id: 'disputes',
    number: '94%',
    eyebrow: 'РЕЗУЛЬТАТИВНОСТЬ',
    label: 'ВЫИГРАННЫХ ДЕЛ И СПОРОВ',
    desc: 'Победное завершение споров в арбитражных судах всех инстанций и Верховном Суде РФ.',
  },
];

export default function V26NumbersSection() {
  return (
    <section
      id="sec-numbers"
      data-bg="dark"
      className="relative w-full bg-[#1F2C3B] text-[#F3F5F8] border-b border-white/10"
    >
      {/* 20% - 40% - 40% Architectural Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[20%_40%_40%]">
        
        {/* Col 1 (20%): Reserved rail for Chameleon Logo */}
        <div className="hidden lg:block w-full border-r border-white/10 pointer-events-none" />

        {/* Content Area across Cols 2 & 3 (Starts strictly at 20%) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col">
          
          {/* Section Header */}
          <div className="p-6 lg:p-12 pb-6 lg:pb-8 border-b border-white/10">
            <div className="font-mono text-xs text-[#C5A059] uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
              <span>// 02 ПОКАЗАТЕЛИ И РЕЗУЛЬТАТИВНОСТЬ</span>
              <span className="w-8 h-px bg-[#C5A059]" />
              <span className="text-[#94A3B8]">ФАКТОИДЫ БЮРО</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-white mb-3">
              Цифры и результаты практики
            </h2>
            <p className="text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
              Материальные подтверждения эффективности судебной защиты в высших судебных и следственных инстанциях.
            </p>
          </div>

          {/* 3 Factoid Cards laid out in 20/40/40 proportion */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 p-6 lg:p-12">
            {STATS_DATA.map((item) => (
              <div key={item.id} className="p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[10px] text-[#C5A059] uppercase tracking-wider font-bold mb-2">
                    {item.eyebrow}
                  </div>
                  <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight mb-2">
                    {item.number}
                    {item.suffix && <span className="text-xl sm:text-2xl font-normal text-[#C5A059] ml-1.5">{item.suffix}</span>}
                  </div>
                  <div className="font-mono text-xs text-white uppercase font-bold tracking-wider mb-2">
                    {item.label}
                  </div>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed font-light mt-4 pt-4 border-t border-white/5">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
