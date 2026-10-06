'use client';

import React from 'react';
import Link from 'next/link';

interface ServiceItem {
  code: string;
  title: string;
  desc: string;
  metric: string;
}

const SERVICES_LEFT: ServiceItem[] = [
  {
    code: 'P-199 · НАЛОГОВЫЙ АРБИТРАЖ',
    title: 'Защита при выездных проверках ФНС',
    desc: 'Сопровождение допросов, выемок, снятие претензий по дроблению бизнеса и ст. 54.1 НК РФ.',
    metric: '• 1,2 млрд ₽ защищено по одному акту',
  },
  {
    code: 'P-159 · УГОЛОВНАЯ ЗАЩИТА БИЗНЕСА',
    title: 'Экономические и должностные статьи',
    desc: 'Защита первых лиц при обысках и следственных действиях по ст. 159 ч. 4, 160, 201 УК РФ.',
    metric: '• 340 млн ₽ · Прекращение дела на стадии следствия',
  },
  {
    code: 'P-KDL · СУБСИДИАРНАЯ ОТВЕТСТВЕННОСТЬ',
    title: 'Защита бенефициаров и КДЛ',
    desc: 'Освобождение учредителей и директоров от субсидиарной ответственности при банкротстве.',
    metric: '• 840 млн ₽ · Полный отказ в иске конкурсному',
  },
];

const SERVICES_RIGHT: ServiceItem[] = [
  {
    code: 'P-CORP · КОРПОРАТИВНЫЕ СПОРЫ',
    title: 'Конфликты акционеров и M&A защита',
    desc: 'Блокировка недружественных поглощений, защита ключевых долей и производственных активов.',
    metric: '• 100% сохранение операционного контроля',
  },
  {
    code: 'P-ARB · СЛОЖНЫЙ АРБИТРАЖ',
    title: 'Судебные процессы высшей категории',
    desc: 'Взыскание убытков в строительном подряде, споры по 44-ФЗ/223-ФЗ в кассации и ВС РФ.',
    metric: '• 94,7% выигранных дел в пользу доверителя',
  },
  {
    code: 'P-BANKR · САНАЦИЯ И БАНКРОТСТВО',
    title: 'Управление процедурой несостоятельности',
    desc: 'Оспаривание сделок с предпочтением, защита залоговых кредиторов и санация предприятий.',
    metric: '• 210 млн ₽ · Возврат незаконно выведенного имущества',
  },
];

export default function V26ServicesSection() {
  return (
    <section
      id="sec-services"
      data-bg="dark"
      className="relative w-full bg-[#223243] text-[#F3F5F8] border-b border-white/10"
    >
      {/* 20% - 40% - 40% Architectural Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[20%_40%_40%]">
        
        {/* Col 1 (20%): Reserved rail for Chameleon Logo */}
        <div className="hidden lg:block w-full border-r border-white/10 pointer-events-none" />

        {/* Col 2 (40%): Title & First 3 Service Blocks */}
        <div className="p-6 lg:p-12 lg:border-r border-white/10 flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-[#C5A059] uppercase tracking-widest mb-2 font-bold">
              // ПРАКТИКИ БЮРО
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-white mb-8">
              Услуги
            </h2>

            <div className="flex flex-col gap-5">
              {SERVICES_LEFT.map((srv) => (
                <div
                  key={srv.code}
                  className="bg-[#5C6E80] hover:bg-[#66798C] border border-white/15 rounded-sm p-6 transition-all duration-200 shadow-sm"
                >
                  <div className="font-mono text-[11px] text-[#C5A059] font-bold tracking-wider mb-2">
                    {srv.code}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed mb-3">
                    {srv.desc}
                  </p>
                  <div className="font-mono text-xs text-[#CBD5E1] font-medium">
                    {srv.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 3 (40%): Second 3 Service Blocks & Bottom Action Bar */}
        <div className="p-6 lg:p-12 lg:pt-24 flex flex-col justify-between">
          <div className="flex flex-col gap-5">
            {SERVICES_RIGHT.map((srv) => (
              <div
                key={srv.code}
                className="bg-[#5C6E80] hover:bg-[#66798C] border border-white/15 rounded-sm p-6 transition-all duration-200 shadow-sm"
              >
                <div className="font-mono text-[11px] text-[#C5A059] font-bold tracking-wider mb-2">
                  {srv.code}
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed mb-3">
                  {srv.desc}
                </p>
                <div className="font-mono text-xs text-[#CBD5E1] font-medium">
                  {srv.metric}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Link */}
          <Link
            href="/practices"
            className="mt-6 bg-white/10 hover:bg-white/15 border border-dashed border-white/20 rounded-sm p-4 flex justify-between items-center font-mono text-xs text-[#CBD5E1] hover:text-white transition-all group"
          >
            <span>Смотреть все 18 практик и реестр судебных решений</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
