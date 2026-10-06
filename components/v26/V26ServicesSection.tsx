'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface PracticeCardItem {
  code: string;
  title: string;
  desc: string;
  metric: string;
  courtRef: string;
  slug?: string;
}

const PRACTICES_COL1: PracticeCardItem[] = [
  {
    code: 'P-199 · НАЛОГИ',
    title: 'Защита при выездных проверках ФНС',
    desc: 'Сопровождение допросов, выемок, снятие претензий по дроблению бизнеса и ст. 54.1 НК РФ. Отмена доначислений на досудебной стадии.',
    metric: '• 1,2 млрд ₽ защищено по одному акту',
    courtRef: 'ФНС РОССИИ // СТ. 54.1 НК РФ',
    slug: 'tax-disputes',
  },
  {
    code: 'P-159 · УГОЛОВНОЕ',
    title: 'Экономические и должностные статьи',
    desc: 'Защита первых лиц при обысках и следственных действиях по ст. 159 ч. 4, 160, 201 УК РФ. Предотвращение мер пресечения.',
    metric: '• 340 млн ₽ · Прекращение дела на стадии следствия',
    courtRef: 'ГСУ СК РФ // СТ. 159 Ч. 4 УК РФ',
    slug: 'criminal-defense',
  },
  {
    code: 'P-KDL · СУБСИДИАРКА',
    title: 'Защита бенефициаров и КДЛ',
    desc: 'Освобождение учредителей и директоров от субсидиарной ответственности при банкротстве. Оспаривание презумпций вины.',
    metric: '• 840 млн ₽ · Полный отказ в иске конкурсному',
    courtRef: 'АС ГОРОДА МОСКВЫ // 127-ФЗ',
    slug: 'subsidiary-liability',
  },
];

const PRACTICES_COL2: PracticeCardItem[] = [
  {
    code: 'P-CORP · КОРП. СПОРЫ',
    title: 'Конфликты акционеров и M&A защита',
    desc: 'Блокировка недружественных поглощений, защита ключевых долей и производственных активов. Сохранение контроля над бизнесом.',
    metric: '• 100% сохранение операционного контроля',
    courtRef: 'КОРПОРАТИВНЫЙ АРБИТРАЖ // 208-ФЗ',
    slug: 'corporate-disputes',
  },
  {
    code: 'P-ARB · АРБИТРАЖ',
    title: 'Судебные процессы высшей категории',
    desc: 'Взыскание убытков в строительном подряде, споры по 44-ФЗ/223-ФЗ в кассации и ВС РФ. Разрешение нестандартных коллизий.',
    metric: '• 94,7% выигранных дел в пользу доверителя',
    courtRef: 'ВЕРХОВНЫЙ СУД РФ // АПК РФ',
    slug: 'corporate-disputes',
  },
  {
    code: 'P-BANKR · БАНКРОТСТВО',
    title: 'Управление процедурой несостоятельности',
    desc: 'Оспаривание сделок с предпочтением, защита залоговых кредиторов, возврат активов и санация предприятий.',
    metric: '• 210 млн ₽ · Возврат незаконно выведенного имущества',
    courtRef: 'РЕЕСТР КРЕДИТОРОВ // САНАЦИЯ',
    slug: 'subsidiary-liability',
  },
];

export default function V26ServicesSection() {
  return (
    <section
      id="sec-services"
      data-bg="light"
      className="relative w-full bg-[#EAE6DF] text-[#19212C] border-b border-[#19212C]/15"
    >
      {/* 20% - 40% - 40% Architectural Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[20%_40%_40%]">
        
        {/* Col 1 (20%): Reserved rail for Chameleon Logo */}
        <div className="hidden lg:block w-full bg-[#EAE6DF] border-r border-[#19212C]/10 relative z-20 pointer-events-none" />

        {/* Content Area across Cols 2 & 3 (Starts strictly at 20%) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col min-w-0">
          
          {/* 1. Big Unified Section Header spanning across Cols 2 & 3 */}
          <div className="p-6 lg:p-12 pb-8 lg:pb-10 border-b border-[#19212C]/10">
            <div className="font-mono text-xs text-[#C5A059] uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
              <span>// 03 КЛЮЧЕВЫЕ НАПРАВЛЕНИЯ ЗАЩИТЫ</span>
              <span className="w-8 h-px bg-[#C5A059]" />
              <span className="text-[#5A6472]">СПЕЦИАЛИЗАЦИЯ БЮРО</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#19212C] tracking-tight leading-tight">
              Практики бюро
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6472] max-w-2xl leading-relaxed mt-2 font-light">
              Специализированные судебные коллегии адвокатов высшей квалификации для защиты первого лица, топ-менеджмента и активов бизнеса.
            </p>
          </div>

          {/* 2. Symmetric Grid of Editorial Cards (Reference 2 Layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#19212C]/10 p-6 lg:p-12 gap-8 lg:gap-12">
            
            {/* Col 2 (40%): Left 3 Practice Cards */}
            <div className="flex flex-col gap-8">
              {PRACTICES_COL1.map((srv) => (
                <div
                  key={srv.code}
                  className="bg-white border border-[#19212C]/15 rounded-sm flex flex-col justify-between shadow-sm hover:border-[#C5A059] transition-all group min-h-[320px]"
                >
                  {/* Top Header Block with crisp divider line */}
                  <div className="p-6 sm:p-7 pb-5 border-b border-[#19212C]/10">
                    <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#0F172A] leading-snug group-hover:text-[#C5A059] transition-colors mb-2">
                      {srv.title}
                    </h3>
                    <div className="font-mono text-xs text-[#64748B] flex items-center gap-1.5">
                      <span>Направление:</span>
                      <strong className="text-[#19212C] font-semibold">{srv.code.split('·')[1]?.trim() || srv.code}</strong>
                    </div>
                  </div>

                  {/* Middle Content */}
                  <div className="p-6 sm:p-7 py-5 flex-1 flex flex-col justify-between gap-4">
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3 font-light">
                      {srv.desc}
                    </p>

                    {/* Metric / key result badge */}
                    <div className="bg-[#F8F7F4] border border-[#19212C]/10 p-3 rounded-xs flex items-center justify-between font-mono text-xs text-[#19212C]">
                      <span className="font-semibold">{srv.metric}</span>
                    </div>

                    {/* Right-aligned 'Смотреть' link */}
                    <div className="flex justify-end pt-1">
                      <Link
                        href={`/practices/${srv.slug || ''}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#0F172A] hover:text-[#C5A059] transition-colors"
                      >
                        <span>Смотреть</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Line & Bottom-Left Nadzagolovok Box (like Reference 2) */}
                  <div className="border-t border-[#19212C]/15 flex items-stretch font-mono text-[11px]">
                    <div className="border-r border-[#19212C]/15 px-4 py-2.5 text-[#C5A059] font-bold uppercase tracking-wider bg-[#F8FAFC]">
                      {srv.code}
                    </div>
                    <div className="px-4 py-2.5 text-[#64748B] text-[10px] flex items-center">
                      {srv.courtRef}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Col 3 (40%): Right 3 Practice Cards */}
            <div className="flex flex-col gap-8 lg:pl-4">
              {PRACTICES_COL2.map((srv) => (
                <div
                  key={srv.code}
                  className="bg-white border border-[#19212C]/15 rounded-sm flex flex-col justify-between shadow-sm hover:border-[#C5A059] transition-all group min-h-[320px]"
                >
                  {/* Top Header Block with crisp divider line */}
                  <div className="p-6 sm:p-7 pb-5 border-b border-[#19212C]/10">
                    <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#0F172A] leading-snug group-hover:text-[#C5A059] transition-colors mb-2">
                      {srv.title}
                    </h3>
                    <div className="font-mono text-xs text-[#64748B] flex items-center gap-1.5">
                      <span>Направление:</span>
                      <strong className="text-[#19212C] font-semibold">{srv.code.split('·')[1]?.trim() || srv.code}</strong>
                    </div>
                  </div>

                  {/* Middle Content */}
                  <div className="p-6 sm:p-7 py-5 flex-1 flex flex-col justify-between gap-4">
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3 font-light">
                      {srv.desc}
                    </p>

                    {/* Metric / key result badge */}
                    <div className="bg-[#F8F7F4] border border-[#19212C]/10 p-3 rounded-xs flex items-center justify-between font-mono text-xs text-[#19212C]">
                      <span className="font-semibold">{srv.metric}</span>
                    </div>

                    {/* Right-aligned 'Смотреть' link */}
                    <div className="flex justify-end pt-1">
                      <Link
                        href={`/practices/${srv.slug || ''}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#0F172A] hover:text-[#C5A059] transition-colors"
                      >
                        <span>Смотреть</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Line & Bottom-Left Nadzagolovok Box (like Reference 2) */}
                  <div className="border-t border-[#19212C]/15 flex items-stretch font-mono text-[11px]">
                    <div className="border-r border-[#19212C]/15 px-4 py-2.5 text-[#C5A059] font-bold uppercase tracking-wider bg-[#F8FAFC]">
                      {srv.code}
                    </div>
                    <div className="px-4 py-2.5 text-[#64748B] text-[10px] flex items-center">
                      {srv.courtRef}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* 3. Bottom Action Bar: «Смотреть все 11 практик» shifted lower and perfectly centered/even */}
          <div className="px-6 lg:px-12 pb-12 pt-2">
            <div className="pt-6 border-t border-[#19212C]/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-xs sm:text-sm text-[#5A6472] font-light">
                Включая налоговый комплаенс, форензик, защиту интеллектуальной собственности и таможенный контроль.
              </p>
              <Link
                href="/practices"
                className="w-full sm:w-auto bg-[#19212C] hover:bg-[#C5A059] text-white hover:text-[#19212C] border border-[#19212C] hover:border-transparent px-8 py-3.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group text-center shrink-0 cursor-pointer shadow-sm"
              >
                <span>Смотреть все 11 практик бюро</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
