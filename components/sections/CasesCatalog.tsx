'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useConsultationModal } from '@/lib/store/useConsultationModal';
import { getDynamicCases } from '@/lib/data/payload-api';
import SpotlightButton from '@/components/ui/SpotlightButton';

export interface CaseItem {
  id: string;
  slug: string;
  category: 'all' | 'liquidation' | 'arbitration' | 'bankruptcy';
  categoryLabel: string;
  title: string;
  claimAmount?: string;
  summary: string;
}

// Данные строго по оригинальной странице etlegis.ru
export const CASES_CATALOG_DATA: CaseItem[] = [
  {
    id: '1',
    slug: 'sudebnaya-likvidaciya-dolya',
    category: 'liquidation',
    categoryLabel: 'Судебная ликвидация',
    title: 'Защита интересов участника общества при выходе и взыскание действительной стоимости доли',
    summary: 'Успешно доказали реальную рыночную стоимость активов компании и предотвратили занижение выплаты.',
  },
  {
    id: '2',
    slug: 'arbitrazh-arenda-1',
    category: 'arbitration',
    categoryLabel: 'Арбитражное судопроизводство',
    title: 'Взыскание задолженности по договору аренды коммерческой недвижимости',
    claimAmount: '14+ млн ₽',
    summary: 'Полное удовлетворение требований арендодателя с компенсацией штрафных неустоек.',
  },
  {
    id: '3',
    slug: 'bankrotstvo-bank-1-2-bln',
    category: 'bankruptcy',
    categoryLabel: 'Банкротство',
    title: 'Победа в многолетней судебной тяжбе на 1,2 млрд руб.',
    claimAmount: '1,2 млрд ₽',
    summary: 'Доказали злоупотребление правом со стороны банка-кредитора. Отказ в удовлетворении требований.',
  },
  {
    id: '4',
    slug: 'kdl-subsidiarnaya-otvetstvennost',
    category: 'bankruptcy',
    categoryLabel: 'Банкротство',
    title: 'Привлечение / защита контролирующего должника лица к субсидиарной ответственности',
    claimAmount: '388 млн ₽',
    summary: 'Обоснована добросовестность бизнес-решений директора, с доверителя полностью сняты финансовые претензии.',
  },
  {
    id: '5',
    slug: 'arbitrazh-podryad-vzyskanie',
    category: 'arbitration',
    categoryLabel: 'Арбитражное судопроизводство',
    title: 'Взыскание денежных средств по договору строительного подряда',
    claimAmount: '20+ млн ₽',
    summary: 'Отразили встречные фальсифицированные акты и добились реального перечисления средств доверителю.',
  },
  {
    id: '6',
    slug: 'bankrotstvo-osparivanie-sdelki',
    category: 'bankruptcy',
    categoryLabel: 'Банкротство',
    title: 'Защита по оспариванию сделок должника перед процедурой банкротства',
    summary: 'Сохранено недвижимое имущество доверителя от включения в конкурсную массу недобросовестными кредиторами.',
  },
  {
    id: '7',
    slug: 'bankrotstvo-prekraschenie-protsedury',
    category: 'bankruptcy',
    categoryLabel: 'Банкротство',
    title: 'Введение процедуры банкротства гражданина с полным списанием долгов в арбитражном суде',
    summary: 'Завершение процедуры реализации имущества без обременений для доверителя.',
  },
  {
    id: '8',
    slug: 'arbitrazh-postavka-goskontrakt',
    category: 'arbitration',
    categoryLabel: 'Арбитражное судопроизводство',
    title: 'Урегулирование спора по договору поставки в рамках государственного заказа',
    summary: 'Сняты риски включения в Реестр недобросовестных поставщиков (РНП) и отбиты штрафные санкции.',
  },
  {
    id: '9',
    slug: 'likvidaciya-predpriyatiya-kompleks',
    category: 'liquidation',
    categoryLabel: 'Судебная ликвидация',
    title: 'Ликвидация предприятия с урегулированием всех претензий кредиторов и налоговых органов',
    summary: 'Комплексное закрытие бизнеса без уголовно-правовых и субсидиарных последствий для бенефициаров.',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Все кейсы' },
  { id: 'bankruptcy', label: 'Банкротство' },
  { id: 'arbitration', label: 'Арбитражное судопроизводство' },
  { id: 'liquidation', label: 'Судебная ликвидация' },
] as const;

function determineCategory(practice: any, title: string): { category: 'bankruptcy' | 'arbitration' | 'liquidation'; categoryLabel: string } {
  const pTitle = (typeof practice === 'object' ? practice?.title : '') || '';
  const pSlug = (typeof practice === 'object' ? practice?.slug : '') || '';
  const combined = `${pTitle} ${pSlug} ${title}`.toLowerCase();

  if (combined.includes('банкрот') || combined.includes('субсидиарн') || combined.includes('кдл')) {
    return { category: 'bankruptcy', categoryLabel: 'Банкротство' };
  }
  if (combined.includes('ликвидац')) {
    return { category: 'liquidation', categoryLabel: 'Судебная ликвидация' };
  }
  return { category: 'arbitration', categoryLabel: 'Арбитражное судопроизводство' };
}

function buildMergedCatalog(dynCases?: any[]): CaseItem[] {
  if (!dynCases || dynCases.length === 0) return CASES_CATALOG_DATA;

  const dynamicMapped: CaseItem[] = dynCases.map((c: any) => {
    const { category, categoryLabel } = determineCategory(c.practice || c.practiceId, c.title);
    return {
      id: String(c.id),
      slug: c.slug,
      category,
      categoryLabel,
      title: c.title,
      claimAmount: c.claimAmount,
      summary: c.resultSummary || c.challenge,
    };
  });

  const existingSlugs = new Set(dynamicMapped.map((item) => item.slug));
  return [
    ...dynamicMapped,
    ...CASES_CATALOG_DATA.filter((item) => !existingSlugs.has(item.slug)),
  ];
}

export function CasesCatalog({ initialDynamicCases }: { initialDynamicCases?: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [catalogItems, setCatalogItems] = useState<CaseItem[]>(() => buildMergedCatalog(initialDynamicCases));
  const { openModal } = useConsultationModal();

  useEffect(() => {
    getDynamicCases().then((dynCases) => {
      if (dynCases && dynCases.length > 0) {
        setCatalogItems(buildMergedCatalog(dynCases));
      }
    });
  }, []);

  const filteredCases = useMemo(() => {
    if (selectedCategory === 'all') return catalogItems;
    return catalogItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, catalogItems]);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
      {/* Верхнее таб-меню (вместо левой боковой колонки) */}
      <div className="border-b border-et-border mb-12">
        <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs uppercase tracking-widest px-5 py-3 transition-all whitespace-nowrap snap-start border ${
                  isActive
                    ? 'bg-et-dark text-white border-et-dark font-medium'
                    : 'bg-white text-et-muted border-et-border hover:border-et-dark hover:text-et-dark'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Сетка кейсов: 3 колонки на десктопе, 1 колонка на мобайле */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((item, index) => (
          <div
            key={`${item.slug}-${index}`}
            data-case-card
            className="bg-white border border-et-border p-7 sm:p-8 flex flex-col justify-between hover:border-et-dark hover:shadow-md transition-all duration-300 group"
          >
            <div>
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-et-border/60">
                <span className="text-[11px] font-mono uppercase tracking-wider text-et-accent font-medium">
                  {item.categoryLabel}
                </span>
                <span className="text-[10px] text-et-muted">Решение вступило в силу</span>
              </div>

              {item.claimAmount && (
                <div className="font-serif text-2xl sm:text-3xl font-bold text-et-dark mb-3 tracking-tight">
                  {item.claimAmount}
                </div>
              )}

              <h3 className="font-serif text-lg sm:text-xl font-medium text-et-dark leading-snug group-hover:text-et-accent transition-colors">
                <Link href={`/cases/${item.slug}`} className="hover:underline">
                  {item.title}
                </Link>
              </h3>

              <p className="text-xs text-et-muted mt-4 font-light leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-et-border/60">
              <Link href={`/cases/${item.slug}`} className="block w-full">
                <SpotlightButton className="w-full py-3.5 px-4 text-xs">
                  Детали кейса
                </SpotlightButton>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
