'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import VersionSwitcher from '@/components/ui/VersionSwitcher';
import { useConsultationModal } from '@/components/providers/ModalProvider';
import { TEAM_MEMBERS_FULL } from '@/lib/data/team-blueprint';
import { CASES_CATALOG_DATA } from '@/components/sections/CasesCatalog';
import { articles as mockArticles } from '@/lib/data/mock-data';
import { ChevronDown, ChevronRight, Phone, Mail, Send, ArrowUpRight } from 'lucide-react';

interface PracticeItem {
  no: string;
  id: string;
  title: string;
  count: string;
  fullTitle: string;
  lead: string;
  details: string;
  howWeWork: string;
}

const PRACTICES_DATA: PracticeItem[] = [
  {
    no: '01',
    id: 'p01',
    title: 'Банкротство',
    count: '68 дел',
    fullTitle: 'Банкротство и несостоятельность',
    lead: 'Инициирование и защита в делах о банкротстве физических и юридических лиц. Мы работаем с обеими сторонами процедуры — и на стороне должника, сохраняя контроль над процедурой, и на стороне кредитора, добиваясь включения в реестр и получения выплат.',
    details: 'Ведём весь цикл: подача заявления, назначение арбитражного управляющего, инвентаризация, работа с торгами и конкурсной массой, собрания кредиторов.',
    howWeWork: 'Партнёр ведёт дело от первой встречи до итогового распределения конкурсной массы. Еженедельные процессуальные брифы, круглосуточный доступ к материалам дела.',
  },
  {
    no: '02',
    id: 'p02',
    title: 'Субсидиарная КДЛ',
    count: '42 дела',
    fullTitle: 'Субсидиарная ответственность КДЛ',
    lead: 'Привлечение или защита контролирующих должника лиц — одна из самых чувствительных тем для первых лиц компании. Работаем в двух режимах: защита руководителя от привлечения к субсидиарной ответственности и оспаривание сделок должника в рамках дела о банкротстве.',
    details: 'Доказываем экономическую обоснованность управленческих решений, отсутствие причинно-следственной связи между действиями директора и банкротством предприятия.',
    howWeWork: 'Собираем доказательную базу до подачи заявления о привлечении. Работаем через экспертную оценку финансового положения на дату каждой конкретной сделки.',
  },
  {
    no: '03',
    id: 'p03',
    title: 'Налоги · ВНП',
    count: '36 дел',
    fullTitle: 'Налоговый комплаенс и ВНП',
    lead: 'Подготовка к камеральным и выездным проверкам, снижение доначислений, сопровождение ВНП до вынесения решения. Иногда начинаем работать до того, как проверка назначена: разбираем структуру, находим слабые места и закрываем их.',
    details: 'Защита от искусственного дробления бизнеса, необоснованной налоговой выгоды по ст. 54.1 НК РФ и претензий по сделкам с проблемными контрагентами.',
    howWeWork: 'Полное сопровождение проверки: подготовка к допросам сотрудников, правовые ответы на требования, разработка мотивированных возражений на акт налоговой проверки.',
  },
  {
    no: '04',
    id: 'p04',
    title: 'Уголовные дела',
    count: '24 дела',
    fullTitle: 'Уголовно-правовая защита бизнеса',
    lead: 'Работа со сложным составом на стороне защиты. Ст. 159, 160, 171, 199 УК РФ и смежные составы экономических преступлений. Отстройка позиции против доминирующего обвинения, разбор доказательственной базы.',
    details: 'Адвокатское присутствие на обысках, выемках и допросах руководителей. Обжалование незаконных действий следственных органов и меры пресечения.',
    howWeWork: 'Первые 48 часов — ключевые. Партнёр включается в дело незамедлительно, лично выезжает на следственные действия и формирует защитную позицию.',
  },
  {
    no: '05',
    id: 'p05',
    title: 'Коррупция',
    count: '12 дел',
    fullTitle: 'Коррупционные расследования',
    lead: 'Защита по делам о злоупотреблении полномочиями, получении и даче взятки, коммерческом подкупе. Ст. 285, 290, 291, 204 УК РФ.',
    details: 'Тщательный анализ оперативно-розыскных мероприятий (ОРМ) на предмет законности и отсутствия признаков провокации со стороны правоохранительных органов.',
    howWeWork: 'Первая неделя после возбуждения определяет исход всего дела. Работаем плотно, конфиденциально и строго в рамках закона об адвокатуре.',
  },
  {
    no: '06',
    id: 'p06',
    title: 'Арбитраж',
    count: '58 дел',
    fullTitle: 'Арбитраж и корпоративные споры',
    lead: 'Ведение сложных многолетних тяжб. Взыскания, оспаривание сделок, корпоративные конфликты между участниками. Наш крупнейший арбитражный процесс — победа против крупного банка на 1,2 миллиарда рублей.',
    details: 'Споры об исключении участников, взыскании убытков с директоров, оспаривании крупных сделок и возврате контроля над активами предприятия.',
    howWeWork: 'Ведём дело с расчётом на все судебные инстанции сразу — от первой до кассации и Верховного Суда РФ. Не относимся к апелляции как к формальности.',
  },
];

export default function V27Page() {
  const { openModal } = useConsultationModal();

  // Left rail accordion spoiler states
  const [isPracticesOpen, setIsPracticesOpen] = useState(true);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isCasesOpen, setIsCasesOpen] = useState(false);

  // Active view on the right: 'overview' (classic split stream), 'cases-catalog', or 'blog-catalog'
  const [rightView, setRightView] = useState<'overview' | 'cases-catalog' | 'blog-catalog'>('overview');
  const [activeCaseCategory, setActiveCaseCategory] = useState<'all' | 'liquidation' | 'arbitration' | 'bankruptcy'>('all');
  const [activePracticeId, setActivePracticeId] = useState<string>('p01');

  // Contact form state
  const [formData, setFormData] = useState({ name: '', company: '', phone: '', email: '', task: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle intersection observer to highlight current practice link when in overview mode
  useEffect(() => {
    if (rightView !== 'overview') return;
    const links = PRACTICES_DATA.map(p => document.getElementById(p.id)).filter(Boolean) as HTMLElement[];
    if (!links.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActivePracticeId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    links.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [rightView]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const filteredCases = activeCaseCategory === 'all'
    ? CASES_CATALOG_DATA
    : CASES_CATALOG_DATA.filter(c => c.category === activeCaseCategory);

  return (
    <>
      <VersionSwitcher currentVersion="2.7" />

      {/* Inject Fraunces and Source Serif 4 fonts matching concept-06-split.html */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Source+Serif+4:opsz,ital,wght@8..60,0,400;8..60,0,500;8..60,0,600;8..60,1,400&family=JetBrains+Mono:wght@400;500;700&display=swap');

        :root {
          --v27-paper: #F6F4EF;
          --v27-paper-2: #EFECE4;
          --v27-rail-bg: #ECE8E0;
          --v27-ink: #1C242E;
          --v27-ink-2: #485464;
          --v27-muted: #798696;
          --v27-rule: #D5CFBF;
          --v27-accent: #C5A059;
          --font-display: 'Fraunces', Georgia, serif;
          --font-body: 'Source Serif 4', Georgia, serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        .font-v27-display { font-family: var(--font-display); }
        .font-v27-body { font-family: var(--font-body); }
        .font-v27-mono { font-family: var(--font-mono); }
      `}</style>

      <div className="w-full min-h-screen bg-[#F6F4EF] text-[#1C242E] font-v27-body antialiased">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(360px,500px)_1fr] min-h-screen">
          
          {/* ========================================================
              LEFT RAIL — Fixed/Sticky Navigation with Accordion Spoilers
             ======================================================== */}
          <aside className="bg-[#ECE8E0] border-r border-[#D5CFBF] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto flex flex-col p-6 sm:p-8 z-30 select-none">
            
            {/* Full Brand Wordmark / Logo */}
            <div className="pb-6 border-b border-[#D5CFBF] mb-6 flex justify-between items-center">
              <Link
                href="/v2-7"
                onClick={() => setRightView('overview')}
                className="inline-flex items-center text-[#1C242E] hover:opacity-80 transition-opacity"
                aria-label="Адвокатское бюро ETLEGIS"
              >
                <img
                  src="/logo.svg"
                  alt="ETLEGIS"
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </Link>
              <span className="font-v27-mono text-[10px] tracking-[0.16em] uppercase text-[#798696] font-medium">
                Est. 2008
              </span>
            </div>

            {/* Headline as requested: «Мы команда профессионалов, которые знают, как защитить ваш бизнес» */}
            <h1 className="font-v27-display font-normal text-2xl sm:text-[32px] leading-[1.08] tracking-[-0.02em] text-[#1C242E] mb-3">
              Мы команда профессионалов, которые знают, как защитить ваш бизнес.
            </h1>

            {/* Subtitle as requested: «Работаем на стороне тех, кто отвечает за компанию...» */}
            <p className="text-sm leading-[1.55] text-[#485464] mb-7 max-w-[40ch]">
              Работаем на стороне тех, кто отвечает за компанию. 240 завершённых дел, шесть направлений, партнёр ведёт лично.
            </p>

            {/* Navigation Menus with Spoilers */}
            <nav className="flex flex-col flex-1 divide-y divide-[#D5CFBF] border-y border-[#D5CFBF] mb-8">
              
              {/* 1. ПРАКТИКИ БЮРО (Спойлер скрыть / раскрыть) */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => setIsPracticesOpen(!isPracticesOpen)}
                  className="w-full flex items-center justify-between py-1 text-left group cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-v27-mono text-[11px] tracking-[0.16em] uppercase text-[#798696] font-semibold group-hover:text-[#1C242E] transition-colors">
                      Практики бюро
                    </span>
                    <span className="font-v27-mono text-[10px] text-[#C5A059] font-bold">
                      ({PRACTICES_DATA.length})
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#798696] transition-transform duration-200 ${
                      isPracticesOpen ? 'rotate-180 text-[#C5A059]' : ''
                    }`}
                  />
                </button>

                {isPracticesOpen && (
                  <ul className="mt-3 flex flex-col divide-y divide-[#D5CFBF]/60 pt-1">
                    {PRACTICES_DATA.map((prac) => {
                      const isCurrent = rightView === 'overview' && activePracticeId === prac.id;
                      return (
                        <li key={prac.id}>
                          <a
                            href={`#${prac.id}`}
                            onClick={(e) => {
                              if (rightView !== 'overview') {
                                e.preventDefault();
                                setRightView('overview');
                                setTimeout(() => {
                                  const el = document.getElementById(prac.id);
                                  el?.scrollIntoView({ behavior: 'smooth' });
                                }, 80);
                              }
                            }}
                            className={`grid grid-cols-[30px_1fr_auto] gap-3 items-baseline py-2.5 transition-all duration-150 cursor-pointer ${
                              isCurrent ? 'pl-2 border-l-2 border-[#C5A059]' : 'hover:pl-1'
                            }`}
                          >
                            <span className={`font-v27-mono text-[11px] tracking-[0.14em] font-medium ${
                              isCurrent ? 'text-[#C5A059]' : 'text-[#798696]'
                            }`}>
                              {prac.no}
                            </span>
                            <span className={`font-v27-display text-[16px] leading-[1.2] tracking-[-0.01em] transition-colors ${
                              isCurrent ? 'text-[#C5A059] font-semibold' : 'text-[#485464] hover:text-[#1C242E]'
                            }`}>
                              {prac.title}
                            </span>
                            <span className="font-v27-mono text-[10px] tracking-[0.12em] uppercase text-[#798696] font-medium whitespace-nowrap">
                              {prac.count}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* 2. КОМАНДА БЮРО (Спойлер скрыть / раскрыть: все 8 человек) */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => setIsTeamOpen(!isTeamOpen)}
                  className="w-full flex items-center justify-between py-1 text-left group cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-v27-mono text-[11px] tracking-[0.16em] uppercase text-[#798696] font-semibold group-hover:text-[#1C242E] transition-colors">
                      Команда бюро
                    </span>
                    <span className="font-v27-mono text-[10px] text-[#C5A059] font-bold">
                      ({TEAM_MEMBERS_FULL.length})
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#798696] transition-transform duration-200 ${
                      isTeamOpen ? 'rotate-180 text-[#C5A059]' : ''
                    }`}
                  />
                </button>

                {isTeamOpen && (
                  <ul className="mt-3 flex flex-col divide-y divide-[#D5CFBF]/60 pt-1">
                    {TEAM_MEMBERS_FULL.map((member, idx) => (
                      <li key={member.id}>
                        <a
                          href="#bureau"
                          onClick={(e) => {
                            if (rightView !== 'overview') {
                              e.preventDefault();
                              setRightView('overview');
                              setTimeout(() => {
                                const el = document.getElementById('bureau');
                                el?.scrollIntoView({ behavior: 'smooth' });
                              }, 80);
                            }
                          }}
                          className="grid grid-cols-[24px_1fr] gap-3 items-baseline py-2 hover:pl-1 transition-all duration-150 cursor-pointer"
                        >
                          <span className="font-v27-mono text-[10px] text-[#798696]">
                            0{idx + 1}
                          </span>
                          <div>
                            <div className="font-v27-display text-[15px] font-medium text-[#1C242E] hover:text-[#C5A059] transition-colors">
                              {member.name}
                            </div>
                            <div className="text-[11px] text-[#798696] font-v27-body truncate max-w-[280px]">
                              {member.role}
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 3. УСПЕШНЫЕ КЕЙСЫ (Спойлер с 3 подпунктами: Арбитраж, Банкротство, Ликвидация + страница справа) */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => setIsCasesOpen(!isCasesOpen)}
                  className="w-full flex items-center justify-between py-1 text-left group cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-v27-mono text-[11px] tracking-[0.16em] uppercase text-[#798696] font-semibold group-hover:text-[#1C242E] transition-colors">
                      Успешные кейсы
                    </span>
                    <span className="font-v27-mono text-[10px] text-[#C5A059] font-bold">
                      (100+)
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#798696] transition-transform duration-200 ${
                      isCasesOpen ? 'rotate-180 text-[#C5A059]' : ''
                    }`}
                  />
                </button>

                {isCasesOpen && (
                  <div className="mt-3 flex flex-col space-y-2 pt-1 pl-1">
                    {/* Кнопка "Смотреть все кейсы" */}
                    <button
                      type="button"
                      onClick={() => {
                        setRightView('cases-catalog');
                        setActiveCaseCategory('all');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`text-left font-v27-display text-[15px] py-1.5 px-2 rounded-sm transition-colors flex items-center justify-between ${
                        rightView === 'cases-catalog' && activeCaseCategory === 'all'
                          ? 'bg-[#C5A059]/15 text-[#1C242E] font-bold'
                          : 'text-[#485464] hover:text-[#1C242E]'
                      }`}
                    >
                      <span>Все прецеденты бюро</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A059]" />
                    </button>

                    {/* 3 подпункта */}
                    <button
                      type="button"
                      onClick={() => {
                        setRightView('cases-catalog');
                        setActiveCaseCategory('arbitration');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`text-left text-xs font-v27-mono py-1 px-2 transition-colors flex items-center justify-between ${
                        rightView === 'cases-catalog' && activeCaseCategory === 'arbitration'
                          ? 'text-[#C5A059] font-bold'
                          : 'text-[#798696] hover:text-[#1C242E]'
                      }`}
                    >
                      <span>— Арбитражные процессы</span>
                      <span>58</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setRightView('cases-catalog');
                        setActiveCaseCategory('bankruptcy');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`text-left text-xs font-v27-mono py-1 px-2 transition-colors flex items-center justify-between ${
                        rightView === 'cases-catalog' && activeCaseCategory === 'bankruptcy'
                          ? 'text-[#C5A059] font-bold'
                          : 'text-[#798696] hover:text-[#1C242E]'
                      }`}
                    >
                      <span>— Банкротство и субсидиарка</span>
                      <span>68</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setRightView('cases-catalog');
                        setActiveCaseCategory('liquidation');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`text-left text-xs font-v27-mono py-1 px-2 transition-colors flex items-center justify-between ${
                        rightView === 'cases-catalog' && activeCaseCategory === 'liquidation'
                          ? 'text-[#C5A059] font-bold'
                          : 'text-[#798696] hover:text-[#1C242E]'
                      }`}
                    >
                      <span>— Ликвидация и споры долей</span>
                      <span>14</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 4. БЛОГ И МЕДИА (Прямая ссылка на страницу справа без разворота) */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => {
                    setRightView('blog-catalog');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center justify-between py-1 text-left group cursor-pointer focus:outline-none ${
                    rightView === 'blog-catalog' ? 'text-[#C5A059]' : ''
                  }`}
                >
                  <span className={`font-v27-mono text-[11px] tracking-[0.16em] uppercase font-semibold transition-colors ${
                    rightView === 'blog-catalog' ? 'text-[#C5A059]' : 'text-[#798696] group-hover:text-[#1C242E]'
                  }`}>
                    Блог и медиа
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#798696] group-hover:text-[#C5A059] transition-colors" />
                </button>
              </div>

              {/* 5. КОНТАКТЫ (Скролл к футеру) */}
              <div className="py-3">
                <a
                  href="#contact"
                  onClick={() => {
                    if (rightView !== 'overview') setRightView('overview');
                  }}
                  className="w-full flex items-center justify-between py-1 text-left group cursor-pointer"
                >
                  <span className="font-v27-mono text-[11px] tracking-[0.16em] uppercase text-[#798696] font-semibold group-hover:text-[#1C242E] transition-colors">
                    Контакты
                  </span>
                  <span className="font-v27-mono text-[10px] text-[#798696]">↓</span>
                </a>
              </div>

            </nav>

            {/* Bottom Channels & Quick Action Button */}
            <div className="mt-auto pt-4 border-t border-[#D5CFBF] flex flex-col gap-2">
              <div className="font-v27-mono text-[10px] tracking-[0.16em] uppercase text-[#798696] font-medium mb-1">
                Прямая связь
              </div>
              <a
                href="tel:+74952150815"
                className="grid grid-cols-[64px_1fr] gap-2 py-1 text-xs text-[#1C242E] hover:text-[#C5A059] transition-colors"
              >
                <span className="font-v27-mono text-[9px] tracking-[0.14em] uppercase text-[#798696] self-center">
                  Тел.
                </span>
                <span className="font-semibold">+7 (495) 215-08-15</span>
              </a>
              <a
                href="mailto:info@etlegis.ru"
                className="grid grid-cols-[64px_1fr] gap-2 py-1 text-xs text-[#1C242E] hover:text-[#C5A059] transition-colors"
              >
                <span className="font-v27-mono text-[9px] tracking-[0.14em] uppercase text-[#798696] self-center">
                  Почта
                </span>
                <span>info@etlegis.ru</span>
              </a>
              <a
                href="https://t.me/etlegis"
                target="_blank"
                rel="noreferrer"
                className="grid grid-cols-[64px_1fr] gap-2 py-1 text-xs text-[#1C242E] hover:text-[#C5A059] transition-colors"
              >
                <span className="font-v27-mono text-[9px] tracking-[0.14em] uppercase text-[#798696] self-center">
                  TG
                </span>
                <span>@etlegis</span>
              </a>

              <button
                type="button"
                onClick={() => openModal('Обсудить задачу — Концепция 2.7')}
                className="mt-4 inline-flex items-center justify-center gap-2 py-3 px-4 font-v27-mono text-xs font-semibold tracking-[0.14em] uppercase text-white bg-[#1C242E] hover:bg-[#C5A059] hover:text-[#1C242E] transition-all duration-200 cursor-pointer shadow-sm"
              >
                Обсудить задачу →
              </button>
            </div>

          </aside>


          {/* ========================================================
              RIGHT COLUMN — Dynamic Views: Overview / Cases / Blog
             ======================================================== */}
          <main className="min-w-0 bg-[#F6F4EF]">
            
            {/* VIEW A: OVERVIEW (Exact concept-06-split stream) */}
            {rightView === 'overview' && (
              <div className="flex flex-col">
                
                {/* Intro Section */}
                <section id="intro" className="p-8 sm:p-16 lg:p-24 border-b border-[#D5CFBF]">
                  <div className="font-v27-mono text-[11px] tracking-[0.14em] uppercase text-[#798696] font-medium flex items-center gap-3 mb-5">
                    <span className="w-8 h-px bg-[#1C242E]" />
                    <span>Адвокатское бюро · Москва · <em className="not-italic text-[#C5A059] font-medium">с 2008 года</em></span>
                  </div>
                  <h2 className="font-v27-display font-normal text-3xl sm:text-5xl lg:text-[64px] leading-[0.98] tracking-[-0.03em] text-[#1C242E] mb-6 max-w-[18ch]">
                    Каталог практик — слева. Здесь — как мы с ними работаем.
                  </h2>
                  <p className="text-lg leading-[1.55] text-[#485464] max-w-[48ch]">
                    Каждая практика — отдельный подход и отдельная команда. Кликните по названию в панели слева, чтобы перейти к разделу. Или пролистайте всё подряд.
                  </p>
                </section>

                {/* 6 Practice Detailed Sections */}
                {PRACTICES_DATA.map((prac) => (
                  <section
                    key={prac.id}
                    id={prac.id}
                    className="p-8 sm:p-16 lg:p-24 border-b border-[#D5CFBF] scroll-mt-6"
                  >
                    <div className="py-2">
                      <div className="grid grid-cols-[60px_1fr_auto] gap-5 items-baseline mb-6">
                        <span className="font-v27-mono text-xs tracking-[0.14em] uppercase text-[#798696] font-medium">
                          Practice №{prac.no}
                        </span>
                        <h3 className="font-v27-display font-medium text-2xl sm:text-[32px] leading-[1.1] tracking-[-0.015em] text-[#1C242E] m-0">
                          {prac.fullTitle}
                        </h3>
                        <div className="font-v27-display text-2xl sm:text-3xl text-[#1C242E] text-right">
                          {prac.count.split(' ')[0]}
                          <small className="block font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#798696] font-medium mt-1">
                            дел с 2019
                          </small>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-[60px_1fr] gap-4 sm:gap-5">
                        <div className="hidden sm:block" />
                        <div className="space-y-4 max-w-[56ch]">
                          <p className="text-base sm:text-[17px] leading-[1.6] text-[#485464]">
                            {prac.lead}
                          </p>
                          <p className="text-base sm:text-[17px] leading-[1.6] text-[#485464]">
                            {prac.details}
                          </p>
                          <div className="mt-4 pt-3 border-t border-[#D5CFBF] text-sm italic text-[#798696] leading-[1.5]">
                            <strong className="inline not-italic font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#1C242E] mr-2">
                              Как работаем:
                            </strong>
                            {prac.howWeWork}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                ))}

                {/* Flagship Case Section */}
                <section id="case" className="p-8 sm:p-16 lg:p-24 bg-[#EFECE4] border-b border-[#D5CFBF]">
                  <div className="font-v27-mono text-[11px] tracking-[0.14em] uppercase text-[#798696] font-medium flex items-center gap-3 mb-5">
                    <span className="w-8 h-px bg-[#1C242E]" />
                    <span>Флагманский кейс · <em className="not-italic text-[#C5A059] font-medium">Case File № 24-A-0117</em></span>
                  </div>
                  
                  <div className="font-v27-display font-normal text-6xl sm:text-8xl lg:text-[120px] leading-[0.85] tracking-[-0.045em] text-[#1C242E] mb-5">
                    1,2
                    <small className="block mt-4 font-v27-mono text-xs tracking-[0.14em] uppercase text-[#798696] font-medium">
                      млрд ₽ · требование банка · снято
                    </small>
                  </div>

                  <div className="inline-flex flex-col py-2 px-3.5 mb-6 border-2 border-[#C5A059] text-[#C5A059] font-v27-mono text-xs tracking-[0.18em] uppercase font-medium rotate-[-2deg]">
                    Case Closed
                    <small className="text-[9px] tracking-[0.16em] mt-0.5">Ruling · in favor</small>
                  </div>

                  <h3 className="font-v27-display font-medium text-2xl sm:text-3xl leading-[1.2] tracking-[-0.015em] text-[#1C242E] mb-4 max-w-[28ch]">
                    Победа в многолетней тяжбе против крупного банка.
                  </h3>
                  <p className="text-[17px] text-[#485464] max-w-[56ch] mb-4 leading-relaxed">
                    Банк требовал с доверителя — производственной компании — 1,2 миллиарда рублей. Защита строилась на доказательстве того, что банк злоупотребляет процессуальными правами.
                  </p>
                  <p className="text-[17px] text-[#485464] max-w-[56ch] mb-6 leading-relaxed">
                    Суд первой инстанции и апелляция поддержали позицию защиты. Клиент сохранил активы и операционную деятельность.
                  </p>

                  <dl className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 mt-6 border-t border-[#D5CFBF] max-w-[700px]">
                    <div>
                      <dt className="font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#798696] mb-1.5">Практика</dt>
                      <dd className="m-0 font-v27-display font-medium text-lg text-[#1C242E]">Арбитраж</dd>
                    </div>
                    <div>
                      <dt className="font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#798696] mb-1.5">Годы</dt>
                      <dd className="m-0 font-v27-display font-medium text-lg text-[#1C242E]">2024 — 2025</dd>
                    </div>
                    <div>
                      <dt className="font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#798696] mb-1.5">Инстанции</dt>
                      <dd className="m-0 font-v27-display font-medium text-lg text-[#1C242E]">Первая, апелляция</dd>
                    </div>
                  </dl>
                </section>

                {/* Bureau / Model & Team Section */}
                <section id="bureau" className="p-8 sm:p-16 lg:p-24 border-b border-[#D5CFBF]">
                  <div className="font-v27-mono text-[11px] tracking-[0.14em] uppercase text-[#798696] font-medium flex items-center gap-3 mb-5">
                    <span className="w-8 h-px bg-[#1C242E]" />
                    <span>О бюро · <em className="not-italic text-[#C5A059] font-medium">Как мы устроены</em></span>
                  </div>
                  <h2 className="font-v27-display font-normal text-3xl sm:text-5xl leading-[1.05] tracking-[-0.03em] text-[#1C242E] mb-6">
                    Партнёрская модель.
                  </h2>
                  <p className="text-lg leading-[1.55] text-[#485464] max-w-[46ch] mb-8">
                    Ваше дело ведёт партнёр — от первой встречи до последней инстанции. Один голос, один человек, отвечающий за результат.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 items-baseline py-8 my-8 border-y border-[#D5CFBF]">
                    <div className="font-v27-display font-normal text-6xl sm:text-8xl text-[#1C242E] whitespace-nowrap">
                      240<sup className="font-v27-mono text-[0.24em] text-[#C5A059] font-medium align-super">+</sup>
                    </div>
                    <div className="font-v27-display text-xl sm:text-2xl leading-[1.35] text-[#485464] max-w-[36ch]">
                      За 16 лет практики — <strong className="text-[#1C242E] font-medium">240 завершённых дел</strong> с подтверждённым результатом. Мы держим одновременно <strong className="text-[#1C242E] font-medium">шесть ключевых направлений</strong> и не выходим за их границы.
                    </div>
                  </div>

                  <p className="text-[17px] leading-relaxed text-[#485464] max-w-[54ch]">
                    Первая консультация бесплатна. Мы проводим её не для того, чтобы «продать», а для того, чтобы честно оценить перспективы. Если по нашему опыту ситуация вам невыгодна для судебного пути, мы скажем об этом на первой встрече.
                  </p>
                </section>

                {/* Publications Teaser Section */}
                <section id="insights" className="p-8 sm:p-16 lg:p-24 border-b border-[#D5CFBF]">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                    <div>
                      <div className="font-v27-mono text-[11px] tracking-[0.14em] uppercase text-[#798696] font-medium flex items-center gap-3 mb-3">
                        <span className="w-8 h-px bg-[#1C242E]" />
                        <span>Публикации · <em className="not-italic text-[#C5A059] font-medium">Что мы пишем</em></span>
                      </div>
                      <h2 className="font-v27-display font-normal text-3xl sm:text-5xl leading-[1.05] tracking-[-0.03em] text-[#1C242E]">
                        Разборы законодательства и практики.
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setRightView('blog-catalog');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="font-v27-mono text-xs uppercase tracking-wider text-[#C5A059] font-bold hover:underline"
                    >
                      Все статьи и медиа →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[#D5CFBF]">
                    {mockArticles.slice(0, 4).map((art, idx) => (
                      <div
                        key={art.id}
                        onClick={() => {
                          setRightView('blog-catalog');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`p-6 cursor-pointer border-b border-[#D5CFBF] group ${
                          idx % 2 === 0 ? 'sm:border-r sm:pr-8 sm:pl-0' : 'sm:pl-8 sm:pr-0'
                        }`}
                      >
                        <span className="font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#798696] font-medium mb-2.5 block">
                          {art.date}
                        </span>
                        <h3 className="font-v27-display font-medium text-lg leading-[1.25] text-[#1C242E] group-hover:text-[#C5A059] transition-colors">
                          {art.title}
                        </h3>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="p-8 sm:p-16 lg:p-24 border-b border-[#D5CFBF]">
                  <div className="font-v27-mono text-[11px] tracking-[0.14em] uppercase text-[#798696] font-medium flex items-center gap-3 mb-5">
                    <span className="w-8 h-px bg-[#1C242E]" />
                    <span>Связь · <em className="not-italic text-[#C5A059] font-medium">Первая консультация — 0 ₽</em></span>
                  </div>
                  <h2 className="font-v27-display font-normal text-3xl sm:text-5xl leading-[1.05] tracking-[-0.03em] text-[#1C242E] mb-4">
                    Обсудим задачу.
                  </h2>
                  <p className="text-lg leading-[1.55] text-[#485464] max-w-[46ch] mb-10">
                    Опишите ситуацию любым удобным способом. Мы подтвердим получение и назначим встречу в течение 24 часов.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div>
                      <p className="italic text-[15px] leading-[1.55] text-[#798696] max-w-[34ch] mb-6">
                        Все обращения защищены адвокатской тайной согласно ст. 8 Федерального закона «Об адвокатуре». Первый разговор не обязывает вас к сотрудничеству.
                      </p>
                      <div className="font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#798696] mb-3 font-medium">
                        Каналы
                      </div>
                      <div className="space-y-2 text-sm">
                        <a href="tel:+74952150815" className="grid grid-cols-[80px_1fr] text-[#1C242E] hover:text-[#C5A059]">
                          <span className="font-v27-mono text-[9px] uppercase tracking-wider text-[#798696]">Тел.</span>
                          <span>+7 (495) 215-08-15</span>
                        </a>
                        <a href="mailto:info@etlegis.ru" className="grid grid-cols-[80px_1fr] text-[#1C242E] hover:text-[#C5A059]">
                          <span className="font-v27-mono text-[9px] uppercase tracking-wider text-[#798696]">Почта</span>
                          <span>info@etlegis.ru</span>
                        </a>
                        <a href="https://t.me/etlegis" target="_blank" rel="noreferrer" className="grid grid-cols-[80px_1fr] text-[#1C242E] hover:text-[#C5A059]">
                          <span className="font-v27-mono text-[9px] uppercase tracking-wider text-[#798696]">Telegram</span>
                          <span>@etlegis</span>
                        </a>
                      </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-[#EFECE4] p-6 sm:p-8 border border-[#D5CFBF]">
                      {!formSubmitted ? (
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-[90px_1fr] gap-2 items-baseline py-2 border-b border-[#D5CFBF]">
                            <label className="font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#798696]">Имя</label>
                            <input
                              type="text"
                              required
                              placeholder="Как к вам обращаться"
                              value={formData.name}
                              onChange={e => setFormData({ ...formData, name: e.target.value })}
                              className="bg-transparent border-none outline-none text-[#1C242E] text-base placeholder-[#798696]/60 w-full"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-[90px_1fr] gap-2 items-baseline py-2 border-b border-[#D5CFBF]">
                            <label className="font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#798696]">Компания</label>
                            <input
                              type="text"
                              placeholder="Название организации"
                              value={formData.company}
                              onChange={e => setFormData({ ...formData, company: e.target.value })}
                              className="bg-transparent border-none outline-none text-[#1C242E] text-base placeholder-[#798696]/60 w-full"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-[90px_1fr] gap-2 items-baseline py-2 border-b border-[#D5CFBF]">
                            <label className="font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#798696]">Телефон</label>
                            <input
                              type="tel"
                              required
                              placeholder="+7 (___) ___-__-__"
                              value={formData.phone}
                              onChange={e => setFormData({ ...formData, phone: e.target.value })}
                              className="bg-transparent border-none outline-none text-[#1C242E] text-base placeholder-[#798696]/60 w-full"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-[90px_1fr] gap-2 items-baseline py-2 border-b border-[#D5CFBF]">
                            <label className="font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#798696]">Задача</label>
                            <textarea
                              required
                              rows={2}
                              placeholder="Кратко о ситуации или споре"
                              value={formData.task}
                              onChange={e => setFormData({ ...formData, task: e.target.value })}
                              className="bg-transparent border-none outline-none text-[#1C242E] text-base placeholder-[#798696]/60 w-full resize-none"
                            />
                          </div>

                          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <span className="font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#798696]">
                              Отклик в течение 15 минут
                            </span>
                            <button
                              type="submit"
                              className="py-3 px-6 bg-[#1C242E] hover:bg-[#C5A059] text-white hover:text-[#1C242E] font-v27-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                            >
                              Отправить заявку →
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="py-8 text-center space-y-3">
                          <div className="w-10 h-10 mx-auto bg-[#1C242E] text-[#C5A059] flex items-center justify-center font-bold text-lg">
                            ✓
                          </div>
                          <h4 className="font-v27-display text-xl font-bold text-[#1C242E]">
                            Заявка принята под NDA
                          </h4>
                          <p className="text-sm text-[#485464]">
                            Дежурный партнёр бюро свяжется с вами в течение 15 минут.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* Footer Strip */}
                <footer className="bg-[#1C242E] text-[#F6F4EF] p-8 sm:p-12 lg:p-16 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo.svg"
                      alt="ETLEGIS"
                      className="h-9 w-auto object-contain invert brightness-200"
                    />
                  </div>
                  <div className="font-v27-mono text-[11px] tracking-[0.14em] uppercase text-white/60 sm:text-right leading-relaxed">
                    © 2008 — 2026 · Адвокатское бюро · Москва<br />
                    <span>Политика конфиденциальности · Адвокатская тайна</span>
                  </div>
                </footer>

              </div>
            )}

            {/* VIEW B: CASES CATALOG (Opens on the right when user clicks cases) */}
            {rightView === 'cases-catalog' && (
              <div className="p-8 sm:p-16 lg:p-20">
                {/* Back to overview button */}
                <div className="mb-8">
                  <button
                    type="button"
                    onClick={() => setRightView('overview')}
                    className="inline-flex items-center gap-2 font-v27-mono text-xs tracking-[0.16em] uppercase text-[#798696] hover:text-[#1C242E] transition-colors cursor-pointer"
                  >
                    ← Назад к обзору практик
                  </button>
                </div>

                <div className="mb-10">
                  <div className="font-v27-mono text-[11px] tracking-[0.14em] uppercase text-[#C5A059] font-bold mb-2">
                    // СУДЕБНАЯ ПРАКТИКА И ПРЕЦЕДЕНТЫ
                  </div>
                  <h2 className="font-v27-display font-normal text-3xl sm:text-5xl leading-tight text-[#1C242E] mb-4">
                    Более 100 успешных дел — подтверждённый результат защиты
                  </h2>
                  <p className="text-base sm:text-lg text-[#485464] max-w-[50ch] leading-relaxed">
                    Все выигранные арбитражные процессы, защита от субсидиарной ответственности и прекращение уголовных рисков.
                  </p>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-[#D5CFBF]">
                    {[
                      { id: 'all', label: 'Все дела' },
                      { id: 'arbitration', label: 'Арбитраж' },
                      { id: 'bankruptcy', label: 'Банкротство и КДЛ' },
                      { id: 'liquidation', label: 'Корпоративные споры' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveCaseCategory(tab.id as any)}
                        className={`py-2 px-4 font-v27-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                          activeCaseCategory === tab.id
                            ? 'bg-[#1C242E] text-white shadow-sm'
                            : 'bg-[#ECE8E0] text-[#485464] hover:bg-[#D5CFBF]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cases Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCases.map((c) => (
                    <div
                      key={c.id}
                      className="bg-[#EFECE4] border border-[#D5CFBF] p-6 sm:p-7 flex flex-col justify-between hover:border-[#C5A059] transition-all group"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D5CFBF]">
                          <span className="font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#C5A059] font-bold">
                            {c.categoryLabel}
                          </span>
                          {c.claimAmount && (
                            <span className="font-v27-mono text-xs font-bold text-[#1C242E]">
                              {c.claimAmount}
                            </span>
                          )}
                        </div>
                        <h3 className="font-v27-display text-xl font-medium text-[#1C242E] group-hover:text-[#C5A059] transition-colors mb-3 leading-snug">
                          {c.title}
                        </h3>
                        <p className="text-sm text-[#485464] leading-relaxed mb-4">
                          {c.summary}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-[#D5CFBF] flex justify-between items-center text-xs font-v27-mono text-[#798696]">
                        <span>Решение вступило в силу ✓</span>
                        <span className="text-[#C5A059] font-bold">Победа</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW C: BLOG & MEDIA CATALOG (Opens on the right when user clicks blog) */}
            {rightView === 'blog-catalog' && (
              <div className="p-8 sm:p-16 lg:p-20">
                {/* Back to overview button */}
                <div className="mb-8">
                  <button
                    type="button"
                    onClick={() => setRightView('overview')}
                    className="inline-flex items-center gap-2 font-v27-mono text-xs tracking-[0.16em] uppercase text-[#798696] hover:text-[#1C242E] transition-colors cursor-pointer"
                  >
                    ← Назад к обзору практик
                  </button>
                </div>

                <div className="mb-10">
                  <div className="font-v27-mono text-[11px] tracking-[0.14em] uppercase text-[#C5A059] font-bold mb-2">
                    // ПРЕСС-ЦЕНТР И АНАЛИТИКА
                  </div>
                  <h2 className="font-v27-display font-normal text-3xl sm:text-5xl leading-tight text-[#1C242E] mb-4">
                    Экспертные материалы, публикации и медиа-комментарии
                  </h2>
                  <p className="text-base sm:text-lg text-[#485464] max-w-[50ch] leading-relaxed">
                    Практические разборы прецедентов, изменения законодательства и аналитика от ведущих адвокатов бюро.
                  </p>
                </div>

                {/* Articles & Media List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockArticles.map((art) => (
                    <article
                      key={art.id}
                      className="bg-[#EFECE4] border border-[#D5CFBF] p-6 sm:p-7 flex flex-col justify-between hover:border-[#C5A059] transition-all group"
                    >
                      <div>
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D5CFBF]">
                          <span className="font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#798696]">
                            {art.category || 'Аналитика'}
                          </span>
                          <span className="font-v27-mono text-[10px] text-[#798696]">
                            {art.date}
                          </span>
                        </div>
                        <h3 className="font-v27-display text-xl font-medium text-[#1C242E] group-hover:text-[#C5A059] transition-colors mb-3 leading-snug">
                          {art.title}
                        </h3>
                        <p className="text-sm text-[#485464] leading-relaxed mb-4">
                          {art.previewText || 'Подробный анализ правоприменительной практики и рекомендации по снижению регуляторных рисков.'}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-[#D5CFBF] flex justify-between items-center text-xs font-v27-mono text-[#798696]">
                        <span>Экспертиза бюро</span>
                        <span className="text-[#C5A059] font-bold flex items-center gap-1">
                          Читать →
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

          </main>

        </div>
      </div>
    </>
  );
}
