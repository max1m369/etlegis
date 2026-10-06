'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import VersionSwitcher from '@/components/ui/VersionSwitcher';
import { useConsultationModal } from '@/components/providers/ModalProvider';
import { TEAM_MEMBERS_FULL } from '@/lib/data/team-blueprint';
import { CASES_CATALOG_DATA } from '@/components/sections/CasesCatalog';
import { articles as mockArticles } from '@/lib/data/mock-data';
import { ChevronDown, ArrowUpRight, SlidersHorizontal, RefreshCw, LayoutGrid, Rows } from 'lucide-react';
import '@/styles/transitions3d.css';

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
    lead: 'Инициирование и защита в делах о банкротстве физических и юридических лиц. Мы работаем с обеими сторонами процедуры — и на стороне должника, сохраняя контроль над процедурой, и на стороне кредитора, добиваясь включения в реестр и выплат.',
    details: 'Ведём весь цикл: подача заявления, выбор арбитражного управляющего, инвентаризация имущества, оспаривание необоснованных требований кредиторов, участие в собраниях кредиторов и проведение торгов.',
    howWeWork: 'Партнёр ведёт дело от первой встречи до итогового распределения конкурсной массы. Еженедельные процессуальные брифы, полный доступ к материалам и прозрачная фиксация каждого шага.',
  },
  {
    no: '02',
    id: 'p02',
    title: 'Субсидиарная КДЛ',
    count: '42 дела',
    fullTitle: 'Субсидиарная ответственность КДЛ',
    lead: 'Привлечение или защита контролирующих должника лиц — одна из самых чувствительных тем для первых лиц компании. Работаем в двух режимах: защита руководителя от привлечения к субсидиарной ответственности и оспаривание подозрительных сделок.',
    details: 'Анализ финансово-хозяйственной деятельности предприятия на дату сделок, подготовка доказательств добросовестности и разумности управленческих решений, доказывание отсутствия причинно-следственной связи с банкротством.',
    howWeWork: 'Собираем доказательную базу до подачи оппонентами заявления о привлечении. Работаем через экономическую оценку финансового положения на дату каждой конкретной сделки.',
  },
  {
    no: '03',
    id: 'p03',
    title: 'Налоги · ВНП',
    count: '36 дел',
    fullTitle: 'Налоговый комплаенс и ВНП',
    lead: 'Подготовка к камеральным и выездным проверкам, снижение доначислений, сопровождение ВНП до вынесения решения. Иногда начинаем работать до того, как проверка назначена: находим слабые места в структуре бизнеса и закрываем их.',
    details: 'Защита при претензиях по дроблению бизнеса, необоснованной налоговой выгоде (ст. 54.1 НК РФ), спорах по НДС и налогу на прибыль. Досудебное урегулирование в вышестоящих налоговых органах.',
    howWeWork: 'Полное сопровождение проверки: подготовка сотрудников к допросам, мотивированные ответы на требования, разработка возражений на акт проверки и участие в их рассмотрении.',
  },
  {
    no: '04',
    id: 'p04',
    title: 'Уголовные дела',
    count: '24 дела',
    fullTitle: 'Уголовные дела в бизнесе',
    lead: 'Работа со сложным составом на стороне защиты: ст. 159, 160, 171, 199 УК РФ и смежные составы. Отстройка прочной правовой позиции против доминирующего обвинения, разбор доказательственной базы следствия.',
    details: 'Участие в следственных действиях (обыски, выемки, допросы), обжалование незаконных действий следователей, отмена мер пресечения в виде заключения под стражу, защита на этапе судебного следствия.',
    howWeWork: 'Первые 48 часов — ключевые для всего исхода дела. Партнёр включается в дело незамедлительно в круглосуточном режиме, работает со следственными органами лично и без посредников.',
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

type TransitionEffect =
  | 'cube-right'
  | 'cube-left'
  | 'cube-up'
  | 'cube-down'
  | 'carousel-right'
  | 'carousel-left'
  | 'flip'
  | 'slide-horizontal';

export default function V27Page() {
  const { openModal } = useConsultationModal();

  // Navigation Spoilers in Left Rail
  const [isPracticesOpen, setIsPracticesOpen] = useState(true);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isCasesOpen, setIsCasesOpen] = useState(false);

  // Active view in Right Column:
  // 'overview' | 'practices-all' | 'practice-p01'.. | 'team-all' | 'cases-catalog' | 'blog-catalog'
  const [currentView, setCurrentView] = useState<string>('practices-all');
  const [prevView, setPrevView] = useState<string>('practices-all');
  const [isAnimating, setIsAnimating] = useState(false);

  // Layout mode for practices: horizontal slider vs grid
  const [practicesLayout, setPracticesLayout] = useState<'horizontal' | 'grid'>('horizontal');

  // Filter for cases catalog
  const [activeCaseCategory, setActiveCaseCategory] = useState<'arbitration' | 'bankruptcy' | 'liquidation'>('arbitration');

  // Animation configuration
  const [activeEffect, setActiveEffect] = useState<TransitionEffect>('cube-right');
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({ name: '', company: '', phone: '', task: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Container refs for scrollable pages
  const currentPageRef = useRef<HTMLDivElement>(null);

  // Trigger 3D Page Transition
  const navigateTo = (newView: string) => {
    if (newView === currentView || isAnimating) return;
    setPrevView(currentView);
    setCurrentView(newView);
    setIsAnimating(true);

    const duration = activeEffect.startsWith('carousel') ? 800 : 650;
    setTimeout(() => {
      setIsAnimating(false);
      if (currentPageRef.current) {
        currentPageRef.current.scrollTop = 0;
      }
    }, duration);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const filteredCases = CASES_CATALOG_DATA.filter(c => c.category === activeCaseCategory);

  // Animation class mapping based on exact Codrops classes
  const getOutClass = () => {
    switch (activeEffect) {
      case 'cube-right': return 'pt-page-rotateCubeRightOut pt-page-ontop';
      case 'cube-left': return 'pt-page-rotateCubeLeftOut pt-page-ontop';
      case 'cube-up': return 'pt-page-rotateCubeTopOut pt-page-ontop';
      case 'cube-down': return 'pt-page-rotateCubeBottomOut pt-page-ontop';
      case 'carousel-right': return 'pt-page-rotateCarouselRightOut pt-page-ontop';
      case 'carousel-left': return 'pt-page-rotateCarouselLeftOut pt-page-ontop';
      case 'flip': return 'pt-page-flipOutRight pt-page-ontop';
      case 'slide-horizontal': return 'pt-page-moveToLeft pt-page-ontop';
      default: return 'pt-page-rotateCubeRightOut pt-page-ontop';
    }
  };

  const getInClass = () => {
    switch (activeEffect) {
      case 'cube-right': return 'pt-page-rotateCubeRightIn';
      case 'cube-left': return 'pt-page-rotateCubeLeftIn';
      case 'cube-up': return 'pt-page-rotateCubeTopIn';
      case 'cube-down': return 'pt-page-rotateCubeBottomIn';
      case 'carousel-right': return 'pt-page-rotateCarouselRightIn';
      case 'carousel-left': return 'pt-page-rotateCarouselLeftIn';
      case 'flip': return 'pt-page-flipInLeft pt-page-delay500';
      case 'slide-horizontal': return 'pt-page-moveFromRight';
      default: return 'pt-page-rotateCubeRightIn';
    }
  };

  // Render content of a given view
  const renderViewContent = (view: string) => {
    // -------------------------------------------------------------
    // 1. ALL PRACTICES VIEW (Нажимаю на «Практики бюро» — открывается справа)
    // -------------------------------------------------------------
    if (view === 'practices-all') {
      return (
        <div className="pt-page-scrollable h-full p-8 sm:p-14 lg:p-16 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#D5CFBF]">
              <div>
                <div className="font-v27-mono text-[11px] tracking-[0.16em] uppercase text-[#798696] font-medium flex items-center gap-2">
                  <span className="w-6 h-px bg-[#2C3E50]" />
                  <span>Шесть ключевых направлений · Адвокатское бюро ETLEGIS</span>
                </div>
                <h2 className="font-v27-display font-medium text-3xl sm:text-5xl text-[#1C242E] mt-2">
                  Практики бюро
                </h2>
              </div>

              {/* Layout Switcher (Горизонтальный скролл / Сетка) */}
              <div className="flex items-center gap-2 bg-[#ECE8E0] p-1 rounded-sm border border-[#D5CFBF]">
                <button
                  type="button"
                  onClick={() => setPracticesLayout('horizontal')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-v27-mono uppercase font-semibold transition-colors cursor-pointer ${
                    practicesLayout === 'horizontal' ? 'bg-[#2C3E50] text-white shadow-sm' : 'text-[#485464] hover:text-[#1C242E]'
                  }`}
                >
                  <Rows className="w-3.5 h-3.5" />
                  <span>Горизонтальный ряд</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPracticesLayout('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-v27-mono uppercase font-semibold transition-colors cursor-pointer ${
                    practicesLayout === 'grid' ? 'bg-[#2C3E50] text-white shadow-sm' : 'text-[#485464] hover:text-[#1C242E]'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Сетка 2×3</span>
                </button>
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#485464] max-w-[62ch] leading-relaxed mb-8">
              Каждая практика — отдельный подход и закреплённый партнёр. Выберите нужное направление для детального разбора регламента или листайте карточки.
            </p>

            {/* Practices Presentation */}
            {practicesLayout === 'horizontal' ? (
              <div className="relative">
                <div className="horizontal-scroll-container gap-6 pb-6 pt-2">
                  {PRACTICES_DATA.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => navigateTo(`practice-${p.id}`)}
                      className="horizontal-scroll-item w-[360px] sm:w-[420px] bg-[#EFECE4] border border-[#D5CFBF] p-7 flex flex-col justify-between hover:border-[#2C3E50] hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <div>
                        <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-[#D5CFBF]">
                          <span className="font-v27-mono text-xs font-bold text-[#798696]">
                            Practice №{p.no}
                          </span>
                          <span className="font-v27-mono text-xs font-bold text-[#2C3E50]">
                            {p.count}
                          </span>
                        </div>
                        <h3 className="font-v27-display text-2xl font-medium text-[#1C242E] group-hover:text-[#2C3E50] transition-colors mb-3 leading-snug">
                          {p.fullTitle}
                        </h3>
                        <p className="text-sm text-[#485464] line-clamp-4 leading-relaxed mb-4">
                          {p.lead}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#D5CFBF] flex items-center justify-between text-xs font-v27-mono text-[#5A738E] group-hover:text-[#2C3E50] font-bold">
                        <span>Подробный регламент</span>
                        <span>→</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] font-v27-mono text-[#798696] mt-2 flex items-center gap-2">
                  <span>← Прокручивайте карточки практик горизонтально колесом мыши или свайпом →</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRACTICES_DATA.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => navigateTo(`practice-${p.id}`)}
                    className="bg-[#EFECE4] border border-[#D5CFBF] p-6 flex flex-col justify-between hover:border-[#2C3E50] hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-baseline justify-between mb-3 pb-2 border-b border-[#D5CFBF]">
                        <span className="font-v27-mono text-xs font-bold text-[#798696]">
                          №{p.no}
                        </span>
                        <span className="font-v27-mono text-xs font-bold text-[#2C3E50]">
                          {p.count}
                        </span>
                      </div>
                      <h3 className="font-v27-display text-xl font-medium text-[#1C242E] group-hover:text-[#2C3E50] transition-colors mb-2">
                        {p.fullTitle}
                      </h3>
                      <p className="text-xs text-[#485464] line-clamp-3 leading-relaxed mb-4">
                        {p.lead}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#D5CFBF] flex items-center justify-between text-xs font-v27-mono text-[#5A738E] group-hover:text-[#2C3E50] font-bold">
                      <span>Открыть практику</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-8 mt-8 border-t border-[#D5CFBF] flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => openModal('Консультация по практикам бюро')}
              className="py-3 px-6 bg-[#2C3E50] hover:bg-[#3D5A73] text-white font-v27-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
            >
              Запросить правовой анализ ситуации →
            </button>
            <button
              type="button"
              onClick={() => navigateTo('cases-catalog')}
              className="font-v27-mono text-xs uppercase tracking-wider text-[#5A738E] hover:text-[#2C3E50] font-semibold cursor-pointer"
            >
              Смотреть выигранные дела бюро →
            </button>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // 2. SPECIFIC PRACTICE DETAIL VIEW
    // -------------------------------------------------------------
    if (view.startsWith('practice-')) {
      const pracId = view.replace('practice-', '');
      const prac = PRACTICES_DATA.find(p => p.id === pracId) || PRACTICES_DATA[0];
      return (
        <div className="pt-page-scrollable h-full p-8 sm:p-14 lg:p-20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D5CFBF]">
              <button
                type="button"
                onClick={() => navigateTo('practices-all')}
                className="font-v27-mono text-xs uppercase tracking-wider text-[#5A738E] hover:text-[#2C3E50] font-bold flex items-center gap-1 cursor-pointer"
              >
                ← Назад ко всем практикам
              </button>
              <span className="font-v27-mono text-xs uppercase tracking-wider text-[#798696]">
                Направление №{prac.no} из 06
              </span>
            </div>

            <div className="flex items-baseline justify-between gap-6 mb-6">
              <h2 className="font-v27-display font-medium text-3xl sm:text-5xl lg:text-6xl text-[#1C242E] leading-[1.05] tracking-[-0.02em]">
                {prac.fullTitle}
              </h2>
              <div className="font-v27-display text-4xl sm:text-5xl text-[#2C3E50] text-right shrink-0">
                {prac.count.split(' ')[0]}
                <small className="block font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#798696] font-medium mt-1">
                  дел с 2019
                </small>
              </div>
            </div>

            <div className="space-y-6 max-w-[62ch] my-10">
              <p className="text-lg sm:text-xl leading-[1.6] text-[#1C242E] font-medium">
                {prac.lead}
              </p>
              <p className="text-base sm:text-lg leading-[1.65] text-[#485464]">
                {prac.details}
              </p>
              <div className="p-6 bg-[#ECE8E0] border-l-4 border-[#2C3E50] text-base italic text-[#485464] leading-[1.6]">
                <strong className="block not-italic font-v27-mono text-[11px] tracking-[0.16em] uppercase text-[#2C3E50] font-bold mb-2">
                  Процессуальный регламент ведения:
                </strong>
                {prac.howWeWork}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#D5CFBF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => openModal(`Консультация: ${prac.fullTitle}`)}
              className="py-3.5 px-6 bg-[#2C3E50] hover:bg-[#3D5A73] text-white font-v27-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
            >
              Обсудить судебную защиту →
            </button>
            <button
              type="button"
              onClick={() => navigateTo('cases-catalog')}
              className="font-v27-mono text-xs uppercase tracking-wider text-[#5A738E] hover:text-[#2C3E50] font-semibold cursor-pointer"
            >
              Смотреть выигранные дела по практике →
            </button>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // 3. TEAM VIEW (Все 8 адвокатов и партнёров бюро)
    // -------------------------------------------------------------
    if (view === 'team-all') {
      return (
        <div className="pt-page-scrollable h-full p-8 sm:p-14 lg:p-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D5CFBF]">
            <div>
              <div className="font-v27-mono text-[11px] tracking-[0.16em] uppercase text-[#798696] font-medium flex items-center gap-2">
                <span className="w-6 h-px bg-[#2C3E50]" />
                <span>Партнёрская модель управления · Адвокатское бюро ETLEGIS</span>
              </div>
              <h2 className="font-v27-display font-medium text-3xl sm:text-5xl text-[#1C242E] mt-2">
                Команда бюро
              </h2>
            </div>
            <span className="font-v27-mono text-xs uppercase tracking-wider text-[#2C3E50] font-bold">
              8 ведущих адвокатов
            </span>
          </div>

          <p className="text-base sm:text-lg text-[#485464] max-w-[60ch] leading-relaxed mb-10">
            Ваше дело ведёт партнёр лично — от первой консультации до вынесения решения в Верховном Суде РФ. Мы не передаём процессы младшим юристам.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS_FULL.map((member, idx) => (
              <div
                key={member.id}
                className="bg-[#EFECE4] border border-[#D5CFBF] p-5 flex flex-col justify-between hover:border-[#2C3E50] hover:shadow-md transition-all group"
              >
                <div>
                  <div className="relative aspect-[3/4] w-full bg-[#D5CFBF]/40 overflow-hidden mb-4 border border-[#D5CFBF]">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-[#1C242E]/80 backdrop-blur-xs text-white font-v27-mono text-[10px] px-2 py-0.5">
                      0{idx + 1}
                    </div>
                  </div>

                  <h3 className="font-v27-display text-lg font-medium text-[#1C242E] group-hover:text-[#2C3E50] transition-colors mb-1 leading-snug">
                    {member.name}
                  </h3>
                  <p className="font-v27-mono text-[11px] text-[#2C3E50] font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-xs text-[#798696] mb-3 font-medium">
                    {member.experience}
                  </p>
                  <p className="text-xs text-[#485464] line-clamp-3 leading-relaxed">
                    {member.specialization}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D5CFBF]">
                  <button
                    type="button"
                    onClick={() => openModal(`Консультация с адвокатом: ${member.name}`)}
                    className="w-full py-2 bg-[#ECE8E0] hover:bg-[#2C3E50] hover:text-white text-[#1C242E] font-v27-mono text-[10px] uppercase tracking-wider font-bold transition-colors cursor-pointer text-center"
                  >
                    Записаться на приём
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // 4. CASES CATALOG VIEW (Успешные кейсы — выбор из 3 категорий)
    // -------------------------------------------------------------
    if (view === 'cases-catalog') {
      return (
        <div className="pt-page-scrollable h-full p-8 sm:p-14 lg:p-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D5CFBF]">
            <div>
              <div className="font-v27-mono text-[11px] tracking-[0.14em] uppercase text-[#2C3E50] font-bold mb-1">
                // СУДЕБНАЯ ПРАКТИКА И ПРЕЦЕДЕНТЫ С 2019 ГОДА
              </div>
              <h2 className="font-v27-display font-medium text-3xl sm:text-5xl text-[#1C242E]">
                Успешные кейсы
              </h2>
            </div>
            <span className="font-v27-mono text-xs uppercase tracking-wider text-[#798696]">
              Судебная база etlegis
            </span>
          </div>

          <p className="text-base sm:text-lg text-[#485464] max-w-[60ch] leading-relaxed mb-6">
            Подтверждённые победы в арбитражных инстанциях, защита топ-менеджеров от субсидиарной ответственности и прекращение претензий кредиторов.
          </p>

          {/* 3 Categories as requested */}
          <div className="flex flex-wrap gap-2 mb-8 pt-4 border-t border-[#D5CFBF]">
            {[
              { id: 'arbitration', label: 'Арбитражные процессы (58)' },
              { id: 'bankruptcy', label: 'Банкротство и субсидиарка (68)' },
              { id: 'liquidation', label: 'Ликвидация и споры долей (14)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCaseCategory(tab.id as any)}
                className={`py-2 px-4 font-v27-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  activeCaseCategory === tab.id
                    ? 'bg-[#2C3E50] text-white shadow-sm'
                    : 'bg-[#ECE8E0] text-[#485464] hover:bg-[#D5CFBF]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCases.map((c) => (
              <div
                key={c.id}
                className="bg-[#EFECE4] border border-[#D5CFBF] p-6 sm:p-7 flex flex-col justify-between hover:border-[#2C3E50] hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D5CFBF]">
                    <span className="font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#2C3E50] font-bold">
                      {c.categoryLabel}
                    </span>
                    {c.claimAmount && (
                      <span className="font-v27-mono text-xs font-bold text-[#1C242E]">
                        {c.claimAmount}
                      </span>
                    )}
                  </div>
                  <h3 className="font-v27-display text-xl font-medium text-[#1C242E] group-hover:text-[#2C3E50] transition-colors mb-3 leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-sm text-[#485464] leading-relaxed mb-4">
                    {c.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#D5CFBF] flex justify-between items-center text-xs font-v27-mono text-[#798696]">
                  <span>Решение вступило в законную силу ✓</span>
                  <span className="text-[#2C3E50] font-bold">Победа</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // 5. BLOG & MEDIA CATALOG VIEW (Пресс-центр и экспертные статьи)
    // -------------------------------------------------------------
    if (view === 'blog-catalog') {
      return (
        <div className="pt-page-scrollable h-full p-8 sm:p-14 lg:p-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#D5CFBF]">
            <div>
              <div className="font-v27-mono text-[11px] tracking-[0.14em] uppercase text-[#2C3E50] font-bold mb-1">
                // ПРЕСС-ЦЕНТР, АНАЛИТИКА И МЕДИА
              </div>
              <h2 className="font-v27-display font-medium text-3xl sm:text-5xl text-[#1C242E]">
                Блог и медиа
              </h2>
            </div>
            <span className="font-v27-mono text-xs uppercase tracking-wider text-[#798696]">
              Экспертиза ETLEGIS
            </span>
          </div>

          <p className="text-base sm:text-lg text-[#485464] max-w-[60ch] leading-relaxed mb-10">
            Практические комментарии изменений законодательства, разборы прецедентов Высших судов и авторские колонки адвокатов.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockArticles.map((art) => (
              <article
                key={art.id}
                className="bg-[#EFECE4] border border-[#D5CFBF] p-6 sm:p-7 flex flex-col justify-between hover:border-[#2C3E50] hover:shadow-md transition-all group"
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
                  <h3 className="font-v27-display text-xl font-medium text-[#1C242E] group-hover:text-[#2C3E50] transition-colors mb-3 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-sm text-[#485464] leading-relaxed mb-4">
                    {art.previewText || 'Подробный анализ правоприменительной практики и рекомендации по снижению регуляторных рисков.'}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#D5CFBF] flex justify-between items-center text-xs font-v27-mono text-[#798696]">
                  <span>Экспертиза бюро</span>
                  <span className="text-[#2C3E50] font-bold flex items-center gap-1">
                    Читать материал →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // 6. OVERVIEW / BUREAU EDITORIAL VIEW (Концепт-06 Split с кейсом и формой)
    // -------------------------------------------------------------
    return (
      <div className="pt-page-scrollable h-full flex flex-col">
        {/* Intro */}
        <section className="p-8 sm:p-14 lg:p-16 border-b border-[#D5CFBF]">
          <div className="font-v27-mono text-[11px] tracking-[0.14em] uppercase text-[#798696] font-medium flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#1C242E]" />
            <span>Адвокатское бюро · Москва · <em className="not-italic text-[#2C3E50] font-bold">с 2019 года</em></span>
          </div>
          <h2 className="font-v27-display font-normal text-3xl sm:text-5xl lg:text-[56px] leading-[1.02] tracking-[-0.03em] text-[#1C242E] mb-6 max-w-[20ch]">
            Каталог практик — слева. Здесь — как мы с ними работаем.
          </h2>
          <p className="text-lg leading-[1.55] text-[#485464] max-w-[50ch]">
            Каждая практика — отдельный подход и отдельная команда. Кликните по названию в панели слева, чтобы перейти к разделу с 3D-переходом.
          </p>
        </section>

        {/* Flagship Case */}
        <section className="p-8 sm:p-14 lg:p-16 bg-[#EFECE4] border-b border-[#D5CFBF]">
          <div className="font-v27-mono text-[11px] tracking-[0.14em] uppercase text-[#798696] font-medium flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#1C242E]" />
            <span>Флагманский кейс · <em className="not-italic text-[#2C3E50] font-bold">Case File № 24-A-0117</em></span>
          </div>
          
          <div className="font-v27-display font-normal text-6xl sm:text-8xl lg:text-[100px] leading-[0.85] tracking-[-0.045em] text-[#1C242E] mb-5">
            1,2
            <small className="block mt-4 font-v27-mono text-xs tracking-[0.14em] uppercase text-[#798696] font-medium">
              млрд ₽ · требование банка · снято
            </small>
          </div>

          <div className="inline-flex flex-col py-2 px-3.5 mb-6 border-2 border-[#2C3E50] text-[#2C3E50] font-v27-mono text-xs tracking-[0.18em] uppercase font-bold">
            Case Closed · Ruling in favor
          </div>

          <h3 className="font-v27-display font-medium text-2xl sm:text-3xl leading-[1.2] text-[#1C242E] mb-4 max-w-[28ch]">
            Победа в многолетней тяжбе против крупного банка.
          </h3>
          <p className="text-[17px] text-[#485464] max-w-[56ch] mb-4 leading-relaxed">
            Банк требовал с доверителя — производственной компании — 1,2 миллиарда рублей. Защита строилась на доказательстве того, что банк злоупотребляет процессуальными правами.
          </p>
          <p className="text-[17px] text-[#485464] max-w-[56ch] mb-6 leading-relaxed">
            Суд первой инстанции и апелляция полностью поддержали позицию защиты. Клиент сохранил операционный бизнес и активы.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6 mt-6 border-t border-[#D5CFBF] max-w-[650px]">
            <div>
              <dt className="font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#798696] mb-1">Практика</dt>
              <dd className="font-v27-display font-medium text-lg text-[#1C242E]">Арбитраж</dd>
            </div>
            <div>
              <dt className="font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#798696] mb-1">Период</dt>
              <dd className="font-v27-display font-medium text-lg text-[#1C242E]">2024 — 2025</dd>
            </div>
            <div>
              <dt className="font-v27-mono text-[10px] tracking-[0.14em] uppercase text-[#798696] mb-1">Инстанции</dt>
              <dd className="font-v27-display font-medium text-lg text-[#1C242E]">Первая, апелляция</dd>
            </div>
          </dl>
        </section>

        {/* Bureau Model */}
        <section className="p-8 sm:p-14 lg:p-16 border-b border-[#D5CFBF]">
          <div className="font-v27-mono text-[11px] tracking-[0.14em] uppercase text-[#798696] font-medium flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#1C242E]" />
            <span>О бюро · <em className="not-italic text-[#2C3E50] font-bold">Как мы устроены</em></span>
          </div>
          <h2 className="font-v27-display font-normal text-3xl sm:text-5xl leading-[1.05] tracking-[-0.03em] text-[#1C242E] mb-6">
            Партнёрская модель.
          </h2>
          <p className="text-lg leading-[1.55] text-[#485464] max-w-[46ch] mb-8">
            Ваше дело ведёт партнёр — от первой встречи до последней инстанции. Один голос, один человек, отвечающий за результат.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 items-baseline py-8 my-8 border-y border-[#D5CFBF]">
            <div className="font-v27-display font-normal text-6xl sm:text-8xl text-[#1C242E] whitespace-nowrap">
              240<sup className="font-v27-mono text-[0.24em] text-[#2C3E50] font-bold align-super">+</sup>
            </div>
            <div className="font-v27-display text-xl sm:text-2xl leading-[1.35] text-[#485464] max-w-[36ch]">
              За 7 лет — <strong className="text-[#1C242E] font-medium">240 завершённых дел</strong> с подтверждённым результатом. Мы держим одновременно <strong className="text-[#1C242E] font-medium">шесть ключевых направлений</strong> и не выходим за их границы.
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="p-8 sm:p-14 lg:p-16 border-b border-[#D5CFBF]">
          <div className="font-v27-mono text-[11px] tracking-[0.14em] uppercase text-[#798696] font-medium flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#1C242E]" />
            <span>Связь · <em className="not-italic text-[#2C3E50] font-bold">Первая консультация — 0 ₽</em></span>
          </div>
          <h2 className="font-v27-display font-normal text-3xl sm:text-5xl leading-[1.05] tracking-[-0.03em] text-[#1C242E] mb-4">
            Обсудим задачу.
          </h2>
          <p className="text-lg leading-[1.55] text-[#485464] max-w-[46ch] mb-10">
            Опишите ситуацию любым удобным способом. Мы подтвердим получение и назначим встречу в течение 24 часов.
          </p>

          <div className="bg-[#EFECE4] p-6 sm:p-8 border border-[#D5CFBF] max-w-xl">
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
                    className="py-3 px-6 bg-[#2C3E50] hover:bg-[#3D5A73] text-white font-v27-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                  >
                    Отправить заявку →
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-10 h-10 mx-auto bg-[#2C3E50] text-white flex items-center justify-center font-bold text-lg">
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
        </section>

        {/* Footer */}
        <footer className="bg-[#1C242E] text-[#F6F4EF] p-8 sm:p-12 lg:p-16 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center mt-auto">
          <div className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="ETLEGIS"
              className="h-8 w-auto object-contain invert brightness-200"
            />
          </div>
          <div className="font-v27-mono text-[11px] tracking-[0.14em] uppercase text-white/60 sm:text-right leading-relaxed">
            © 2019 — 2026 · Адвокатское бюро · Москва<br />
            <span>Политика конфиденциальности · Адвокатская тайна</span>
          </div>
        </footer>
      </div>
    );
  };

  return (
    <>
      <VersionSwitcher currentVersion="2.7" />

      {/* Global Fonts & Colors Matching the Blue Slate Brand Palette */}
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
          --v27-accent: #2C3E50;
          --v27-accent-hover: #3D5A73;
          --font-display: 'Fraunces', Georgia, serif;
          --font-body: 'Source Serif 4', Georgia, serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        .font-v27-display { font-family: var(--font-display); }
        .font-v27-body { font-family: var(--font-body); }
        .font-v27-mono { font-family: var(--font-mono); }
      `}</style>

      {/* Fixed Full-Viewport Split Layout: Zero Window Scroll */}
      <div className="w-screen h-screen overflow-hidden bg-[#F6F4EF] text-[#1C242E] font-v27-body antialiased">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(360px,500px)_1fr] h-full w-full">
          
          {/* ========================================================
              LEFT RAIL — Fixed/Pinned Navigation Menu
             ======================================================== */}
          <aside className="bg-[#ECE8E0] border-r border-[#D5CFBF] h-full overflow-y-auto flex flex-col p-6 sm:p-8 z-30 select-none">
            
            {/* Full Brand Wordmark / Logo */}
            <div className="pb-6 border-b border-[#D5CFBF] mb-6 flex justify-between items-center">
              <Link
                href="/v2-7"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('practices-all');
                }}
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
                Est. 2019
              </span>
            </div>

            {/* Headline as requested: «Мы команда профессионалов, которые знают, как защитить ваш бизнес» */}
            <h1 className="font-v27-display font-normal text-2xl sm:text-[32px] leading-[1.08] tracking-[-0.02em] text-[#1C242E] mb-3">
              Мы команда профессионалов, которые знают, как защитить ваш бизнес.
            </h1>

            {/* Subtitle */}
            <p className="text-sm leading-[1.55] text-[#485464] mb-7 max-w-[40ch]">
              Работаем на стороне тех, кто отвечает за компанию. 240 завершённых дел, шесть направлений, партнёр ведёт лично.
            </p>

            {/* Navigation Menus with Spoilers */}
            <nav className="flex flex-col flex-1 divide-y divide-[#D5CFBF] border-y border-[#D5CFBF] mb-6">
              
              {/* 1. ПРАКТИКИ БЮРО: Кликая по названию — сразу открываем страницу практик справа */}
              <div className="py-3">
                <div className="w-full flex items-center justify-between py-1">
                  <button
                    type="button"
                    onClick={() => navigateTo('practices-all')}
                    className={`flex items-center gap-2 group cursor-pointer text-left ${
                      currentView === 'practices-all' ? 'text-[#2C3E50]' : ''
                    }`}
                  >
                    <span className={`font-v27-mono text-[11px] tracking-[0.16em] uppercase font-semibold transition-colors ${
                      currentView === 'practices-all' ? 'text-[#2C3E50] underline underline-offset-4' : 'text-[#798696] group-hover:text-[#1C242E]'
                    }`}>
                      Практики бюро
                    </span>
                    <span className="font-v27-mono text-[10px] text-[#2C3E50] font-bold">
                      ({PRACTICES_DATA.length})
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPracticesOpen(!isPracticesOpen)}
                    aria-label="Развернуть список практик"
                    className="p-1 text-[#798696] hover:text-[#2C3E50] cursor-pointer"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isPracticesOpen ? 'rotate-180 text-[#2C3E50]' : ''
                      }`}
                    />
                  </button>
                </div>

                {isPracticesOpen && (
                  <ul className="mt-3 flex flex-col divide-y divide-[#D5CFBF]/60 pt-1">
                    {PRACTICES_DATA.map((prac) => {
                      const isCurrent = currentView === `practice-${prac.id}`;
                      return (
                        <li key={prac.id}>
                          <button
                            type="button"
                            onClick={() => navigateTo(`practice-${prac.id}`)}
                            className={`w-full text-left grid grid-cols-[30px_1fr_auto] gap-3 items-baseline py-2.5 transition-all duration-150 cursor-pointer ${
                              isCurrent ? 'pl-2 border-l-2 border-[#2C3E50] bg-white/40' : 'hover:pl-1'
                            }`}
                          >
                            <span className={`font-v27-mono text-[11px] tracking-[0.14em] font-medium ${
                              isCurrent ? 'text-[#2C3E50]' : 'text-[#798696]'
                            }`}>
                              {prac.no}
                            </span>
                            <span className={`font-v27-display text-[16px] leading-[1.2] tracking-[-0.01em] transition-colors ${
                              isCurrent ? 'text-[#2C3E50] font-bold' : 'text-[#485464] hover:text-[#1C242E]'
                            }`}>
                              {prac.title}
                            </span>
                            <span className="font-v27-mono text-[10px] tracking-[0.12em] uppercase text-[#798696] font-medium whitespace-nowrap">
                              {prac.count}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* 2. КОМАНДА БЮРО: Кликая по названию — сразу открываем страницу команды из 8 человек справа */}
              <div className="py-3">
                <div className="w-full flex items-center justify-between py-1">
                  <button
                    type="button"
                    onClick={() => navigateTo('team-all')}
                    className={`flex items-center gap-2 group cursor-pointer text-left ${
                      currentView === 'team-all' ? 'text-[#2C3E50]' : ''
                    }`}
                  >
                    <span className={`font-v27-mono text-[11px] tracking-[0.16em] uppercase font-semibold transition-colors ${
                      currentView === 'team-all' ? 'text-[#2C3E50] underline underline-offset-4' : 'text-[#798696] group-hover:text-[#1C242E]'
                    }`}>
                      Команда бюро
                    </span>
                    <span className="font-v27-mono text-[10px] text-[#2C3E50] font-bold">
                      ({TEAM_MEMBERS_FULL.length})
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsTeamOpen(!isTeamOpen)}
                    aria-label="Развернуть список команды"
                    className="p-1 text-[#798696] hover:text-[#2C3E50] cursor-pointer"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isTeamOpen ? 'rotate-180 text-[#2C3E50]' : ''
                      }`}
                    />
                  </button>
                </div>

                {isTeamOpen && (
                  <ul className="mt-3 flex flex-col divide-y divide-[#D5CFBF]/60 pt-1">
                    {TEAM_MEMBERS_FULL.map((member, idx) => (
                      <li key={member.id}>
                        <button
                          type="button"
                          onClick={() => navigateTo('team-all')}
                          className="w-full text-left grid grid-cols-[24px_1fr] gap-3 items-baseline py-2 hover:pl-1 transition-all duration-150 cursor-pointer"
                        >
                          <span className="font-v27-mono text-[10px] text-[#798696]">
                            0{idx + 1}
                          </span>
                          <div>
                            <div className="font-v27-display text-[15px] font-medium text-[#1C242E] hover:text-[#2C3E50] transition-colors">
                              {member.name}
                            </div>
                            <div className="text-[11px] text-[#798696] font-v27-body truncate max-w-[280px]">
                              {member.role}
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 3. УСПЕШНЫЕ КЕЙСЫ: Кликая по названию — сразу открываем страницу кейсов справа */}
              <div className="py-3">
                <div className="w-full flex items-center justify-between py-1">
                  <button
                    type="button"
                    onClick={() => navigateTo('cases-catalog')}
                    className={`flex items-center gap-2 group cursor-pointer text-left ${
                      currentView === 'cases-catalog' ? 'text-[#2C3E50]' : ''
                    }`}
                  >
                    <span className={`font-v27-mono text-[11px] tracking-[0.16em] uppercase font-semibold transition-colors ${
                      currentView === 'cases-catalog' ? 'text-[#2C3E50] underline underline-offset-4' : 'text-[#798696] group-hover:text-[#1C242E]'
                    }`}>
                      Успешные кейсы
                    </span>
                    <span className="font-v27-mono text-[10px] text-[#2C3E50] font-bold">
                      (100+)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCasesOpen(!isCasesOpen)}
                    aria-label="Развернуть подкатегории кейсов"
                    className="p-1 text-[#798696] hover:text-[#2C3E50] cursor-pointer"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isCasesOpen ? 'rotate-180 text-[#2C3E50]' : ''
                      }`}
                    />
                  </button>
                </div>

                {isCasesOpen && (
                  <div className="mt-3 flex flex-col space-y-1.5 pt-1 pl-1">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCaseCategory('arbitration');
                        navigateTo('cases-catalog');
                      }}
                      className={`text-left text-xs font-v27-mono py-1 px-2 rounded-xs transition-colors flex items-center justify-between cursor-pointer ${
                        currentView === 'cases-catalog' && activeCaseCategory === 'arbitration'
                          ? 'bg-[#2C3E50] text-white font-bold'
                          : 'text-[#485464] hover:text-[#1C242E] hover:bg-[#D5CFBF]/50'
                      }`}
                    >
                      <span>— Арбитражные процессы</span>
                      <span>58</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveCaseCategory('bankruptcy');
                        navigateTo('cases-catalog');
                      }}
                      className={`text-left text-xs font-v27-mono py-1 px-2 rounded-xs transition-colors flex items-center justify-between cursor-pointer ${
                        currentView === 'cases-catalog' && activeCaseCategory === 'bankruptcy'
                          ? 'bg-[#2C3E50] text-white font-bold'
                          : 'text-[#485464] hover:text-[#1C242E] hover:bg-[#D5CFBF]/50'
                      }`}
                    >
                      <span>— Банкротство и субсидиарка</span>
                      <span>68</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveCaseCategory('liquidation');
                        navigateTo('cases-catalog');
                      }}
                      className={`text-left text-xs font-v27-mono py-1 px-2 rounded-xs transition-colors flex items-center justify-between cursor-pointer ${
                        currentView === 'cases-catalog' && activeCaseCategory === 'liquidation'
                          ? 'bg-[#2C3E50] text-white font-bold'
                          : 'text-[#485464] hover:text-[#1C242E] hover:bg-[#D5CFBF]/50'
                      }`}
                    >
                      <span>— Ликвидация и споры долей</span>
                      <span>14</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 4. БЛОГ И МЕДИА (Прямой переход справа без разворота) */}
              <div className="py-3">
                <button
                  type="button"
                  onClick={() => navigateTo('blog-catalog')}
                  className={`w-full flex items-center justify-between py-1 text-left group cursor-pointer focus:outline-none ${
                    currentView === 'blog-catalog' ? 'text-[#2C3E50]' : ''
                  }`}
                >
                  <span className={`font-v27-mono text-[11px] tracking-[0.16em] uppercase font-semibold transition-colors ${
                    currentView === 'blog-catalog' ? 'text-[#2C3E50] underline underline-offset-4' : 'text-[#798696] group-hover:text-[#1C242E]'
                  }`}>
                    Блог и медиа
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#798696] group-hover:text-[#2C3E50] transition-colors" />
                </button>
              </div>

            </nav>

            {/* Bottom Channels (Clean: NO crossed-out lines, NO "Контакты" text) */}
            <div className="mt-auto pt-2 flex flex-col gap-2">
              <div className="font-v27-mono text-[10px] tracking-[0.16em] uppercase text-[#798696] font-medium mb-1">
                Прямая связь
              </div>
              <a
                href="tel:+74952150815"
                className="grid grid-cols-[64px_1fr] gap-2 py-1 text-xs text-[#1C242E] hover:text-[#2C3E50] transition-colors"
              >
                <span className="font-v27-mono text-[9px] tracking-[0.14em] uppercase text-[#798696] self-center">
                  Тел.
                </span>
                <span className="font-semibold">+7 (495) 215-08-15</span>
              </a>
              <a
                href="mailto:info@etlegis.ru"
                className="grid grid-cols-[64px_1fr] gap-2 py-1 text-xs text-[#1C242E] hover:text-[#2C3E50] transition-colors"
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
                className="grid grid-cols-[64px_1fr] gap-2 py-1 text-xs text-[#1C242E] hover:text-[#2C3E50] transition-colors"
              >
                <span className="font-v27-mono text-[9px] tracking-[0.14em] uppercase text-[#798696] self-center">
                  TG
                </span>
                <span>@etlegis</span>
              </a>

              <button
                type="button"
                onClick={() => openModal('Обсудить задачу — Концепция 2.7')}
                className="mt-3 inline-flex items-center justify-center gap-2 py-3 px-4 font-v27-mono text-xs font-semibold tracking-[0.14em] uppercase text-white bg-[#2C3E50] hover:bg-[#3D5A73] transition-all duration-200 cursor-pointer shadow-sm"
              >
                Обсудить задачу →
              </button>
            </div>

          </aside>


          {/* ========================================================
              RIGHT COLUMN — 3D Perspective Stage (Codrops / Tympanus)
             ======================================================== */}
          <main className="relative w-full h-full min-w-0 bg-[#F6F4EF] overflow-hidden">
            
            {/* 3D Perspective Container */}
            <div className="pt-perspective">
              
              {/* Previous page (animating OUT) */}
              {isAnimating && (
                <div key={`prev-${prevView}`} className={`pt-page ${getOutClass()}`}>
                  {renderViewContent(prevView)}
                </div>
              )}

              {/* Current page (animating IN or static current) */}
              <div
                key={`current-${currentView}`}
                ref={currentPageRef}
                className={`pt-page ${isAnimating ? getInClass() : 'pt-page-current'}`}
              >
                {renderViewContent(currentView)}
              </div>

            </div>

            {/* ========================================================
                3D TRANSITION CONFIGURATION WIDGET (HUD)
               ======================================================== */}
            <div className="absolute top-4 right-4 z-50">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsWidgetOpen(!isWidgetOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-[#2C3E50] hover:bg-[#3D5A73] text-white rounded-md font-v27-mono text-xs font-semibold shadow-xl transition-all cursor-pointer border border-white/20"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#8BE69C]" />
                  <span>3D Эффект перехода:</span>
                  <span className="text-[#8BE69C] uppercase font-bold">
                    {activeEffect === 'cube-right' && 'Куб вправо (3D ⭐)'}
                    {activeEffect === 'cube-left' && 'Куб влево (3D)'}
                    {activeEffect === 'cube-up' && 'Куб вверх (3D)'}
                    {activeEffect === 'cube-down' && 'Куб вниз (3D)'}
                    {activeEffect === 'carousel-right' && 'Карусель вправо'}
                    {activeEffect === 'carousel-left' && 'Карусель влево'}
                    {activeEffect === 'flip' && '3D Flip'}
                    {activeEffect === 'slide-horizontal' && 'Скольжение'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isWidgetOpen ? 'rotate-180' : ''}`} />
                </button>

                {isWidgetOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-[#1C242E]/95 backdrop-blur-md border border-white/15 rounded-md shadow-2xl p-3 text-white font-v27-mono text-xs z-50">
                    <div className="font-bold text-[10px] uppercase tracking-wider text-[#9CA3AF] mb-2 pb-1 border-b border-white/10 flex justify-between items-center">
                      <span>Выберите 3D-анимацию</span>
                      <span className="text-[#8BE69C]">Codrops</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      {[
                        { id: 'cube-right', label: 'Куб вправо (3D-куб ⭐)' },
                        { id: 'cube-left', label: 'Куб влево (3D-куб)' },
                        { id: 'cube-up', label: 'Куб вверх (3D-куб)' },
                        { id: 'cube-down', label: 'Куб вниз (3D-куб)' },
                        { id: 'carousel-right', label: 'Карусель 3D вправо' },
                        { id: 'carousel-left', label: 'Карусель 3D влево' },
                        { id: 'flip', label: '3D Flip (Вращение)' },
                        { id: 'slide-horizontal', label: 'Горизонтальный сдвиг' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setActiveEffect(item.id as TransitionEffect);
                            setIsWidgetOpen(false);
                            // Test transition to another view
                            const next = currentView === 'practices-all' ? 'cases-catalog' : 'practices-all';
                            navigateTo(next);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded transition-colors flex items-center justify-between cursor-pointer ${
                            activeEffect === item.id
                              ? 'bg-[#2C3E50] text-[#8BE69C] font-bold border border-[#8BE69C]/40'
                              : 'text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span>{item.label}</span>
                          {activeEffect === item.id && <span className="text-xs">✓</span>}
                        </button>
                      ))}
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400">
                      <span>Проверить переход:</span>
                      <button
                        type="button"
                        onClick={() => {
                          const next = currentView === 'practices-all' ? 'cases-catalog' : 'practices-all';
                          navigateTo(next);
                        }}
                        className="text-[#8BE69C] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                      >
                        <RefreshCw className="w-2.5 h-2.5" />
                        Запустить сейчас
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </main>

        </div>
      </div>
    </>
  );
}
