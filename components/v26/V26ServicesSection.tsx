'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface PracticeCardItem {
  code: string;
  title: string;
  desc: string;
  metric: string;
  slug?: string;
}

const PRACTICES_COL1: PracticeCardItem[] = [
  {
    code: 'P-199 · НАЛОГОВЫЙ АРБИТРАЖ',
    title: 'Защита при выездных проверках ФНС',
    desc: 'Сопровождение допросов, выемок, снятие претензий по дроблению бизнеса и ст. 54.1 НК РФ. Отмена доначислений на досудебной стадии.',
    metric: '• 1,2 млрд ₽ защищено по одному акту',
    slug: 'tax-disputes',
  },
  {
    code: 'P-159 · УГОЛОВНАЯ ЗАЩИТА БИЗНЕСА',
    title: 'Экономические и должностные статьи',
    desc: 'Защита первых лиц при обысках и следственных действиях по ст. 159 ч. 4, 160, 201 УК РФ. Предотвращение мер пресечения.',
    metric: '• 340 млн ₽ · Прекращение дела на стадии следствия',
    slug: 'criminal-defense',
  },
  {
    code: 'P-KDL · СУБСИДИАРНАЯ ОТВЕТСТВЕННОСТЬ',
    title: 'Защита бенефициаров и КДЛ',
    desc: 'Освобождение учредителей и директоров от субсидиарной ответственности при банкротстве. Оспаривание презумпций вины.',
    metric: '• 840 млн ₽ · Полный отказ в иске конкурсному',
    slug: 'subsidiary-liability',
  },
];

const PRACTICES_COL2: PracticeCardItem[] = [
  {
    code: 'P-CORP · КОРПОРАТИВНЫЕ СПОРЫ',
    title: 'Конфликты акционеров и M&A защита',
    desc: 'Блокировка недружественных поглощений, защита ключевых долей и производственных активов. Сохранение контроля над бизнесом.',
    metric: '• 100% сохранение операционного контроля',
    slug: 'corporate-disputes',
  },
  {
    code: 'P-ARB · СЛОЖНЫЙ АРБИТРАЖ',
    title: 'Судебные процессы высшей категории',
    desc: 'Взыскание убытков в строительном подряде, споры по 44-ФЗ/223-ФЗ в кассации и ВС РФ. Разрешение нестандартных коллизий.',
    metric: '• 94,7% выигранных дел в пользу доверителя',
    slug: 'corporate-disputes',
  },
  {
    code: 'P-BANKR · САНАЦИЯ И БАНКРОТСТВО',
    title: 'Управление процедурой несостоятельности',
    desc: 'Оспаривание сделок с предпочтением, защита залоговых кредиторов, возврат активов и санация предприятий.',
    metric: '• 210 млн ₽ · Возврат незаконно выведенного имущества',
    slug: 'subsidiary-liability',
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

        {/* Content Area across Cols 2 & 3 (Starts strictly at 20%) */}
        <div className="col-span-1 lg:col-span-2 flex flex-col min-w-0">
          
          {/* 1. Big Unified Section Header spanning across Cols 2 & 3 */}
          <div className="p-6 lg:p-12 pb-8 lg:pb-10 border-b border-white/10">
            <div className="font-mono text-xs text-[#C5A059] uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
              <span>// 03 КЛЮЧЕВЫЕ НАПРАВЛЕНИЯ ЗАЩИТЫ</span>
              <span className="w-8 h-px bg-[#C5A059]" />
              <span className="text-[#94A3B8]">СПЕЦИАЛИЗАЦИЯ БЮРО</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
              Практики бюро
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl leading-relaxed mt-2 font-light">
              Специализированные судебные коллегии адвокатов высшей квалификации для защиты первого лица, топ-менеджмента и активов бизнеса.
            </p>
          </div>

          {/* 2. Symmetric Grid of Enlarged Cards (Col 2: 40% + Col 3: 40%) strictly aligned horizontally */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10 p-6 lg:p-12 gap-8 lg:gap-12">
            
            {/* Col 2 (40%): Left 3 Big Practice Cards */}
            <div className="flex flex-col gap-6 sm:gap-7">
              {PRACTICES_COL1.map((srv) => (
                <div
                  key={srv.code}
                  className="bg-[#5C6E80] hover:bg-[#66798C] border border-white/15 rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 shadow-sm min-h-[220px] group"
                >
                  <div>
                    <div className="font-mono text-[11px] text-[#C5A059] font-bold tracking-wider mb-2.5">
                      {srv.code}
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-3 leading-snug group-hover:text-[#F3F5F8] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed mb-4 font-light">
                      {srv.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[#CBD5E1]">
                    <span className="font-medium">{srv.metric}</span>
                    <Link
                      href="/practices"
                      className="text-white hover:text-[#C5A059] transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span>Подробнее</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Col 3 (40%): Right 3 Big Practice Cards */}
            <div className="flex flex-col gap-6 sm:gap-7">
              {PRACTICES_COL2.map((srv) => (
                <div
                  key={srv.code}
                  className="bg-[#5C6E80] hover:bg-[#66798C] border border-white/15 rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 shadow-sm min-h-[220px] group"
                >
                  <div>
                    <div className="font-mono text-[11px] text-[#C5A059] font-bold tracking-wider mb-2.5">
                      {srv.code}
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-3 leading-snug group-hover:text-[#F3F5F8] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed mb-4 font-light">
                      {srv.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[#CBD5E1]">
                    <span className="font-medium">{srv.metric}</span>
                    <Link
                      href="/practices"
                      className="text-white hover:text-[#C5A059] transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span>Подробнее</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* 3. Bottom Action Bar: «Смотреть все 11 практик» shifted lower and perfectly centered/even */}
          <div className="px-6 lg:px-12 pb-12 pt-2">
            <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-xs sm:text-sm text-[#CBD5E1] font-light">
                Включая налоговый комплаенс, форензик, защиту интеллектуальной собственности и таможенный контроль.
              </p>
              <Link
                href="/practices"
                className="w-full sm:w-auto bg-white/10 hover:bg-[#C5A059] text-white hover:text-[#19212C] border border-white/20 hover:border-transparent px-8 py-3.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group text-center shrink-0 cursor-pointer"
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
