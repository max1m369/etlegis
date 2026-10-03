'use client';

import React, { useState, useEffect } from 'react';

export type FontId = 'amstelvar' | 'jun' | 'synerga' | 'metrika';

export interface FontOption {
  id: FontId;
  name: string;
  subtitle: string;
  category: string;
  designer: string;
  description: string;
  previewClass: string;
  features: string[];
}

export const FONT_OPTIONS: FontOption[] = [
  {
    id: 'amstelvar',
    name: 'Amstelvar',
    subtitle: 'Параметрическая антиква',
    category: 'Variable Serif',
    designer: 'David Berlow (Font Bureau)',
    description: 'Классическая редакционная антиква с широким диапазоном оптических размеров, утонченными засечками и академической строгостью.',
    previewClass: 'font-preview-amstelvar',
    features: ['Классический премиум', 'Высокий контраст', 'Элегантные засечки'],
  },
  {
    id: 'jun',
    name: 'Jun',
    subtitle: 'Современная строгая антиква',
    category: 'Modern Serif',
    designer: 'Jun Type',
    description: 'Острая, выразительная современная антиква с элегантными каллиграфическими деталями, каплевидными элементами и четким европейским ритмом.',
    previewClass: 'font-preview-jun',
    features: ['Современная эстетика', 'Острые засечки', 'Свежий ритм'],
  },
  {
    id: 'synerga',
    name: 'Synerga Pro',
    subtitle: 'Брусковый журнальный шрифт',
    category: 'Slab / Modern Serif',
    designer: 'Mint Type',
    description: 'Современный гибридный брусковый шрифт от студии Mint Type. Уверенный, технологичный, деловой характер для монолитной юридической практики.',
    previewClass: 'font-preview-synerga',
    features: ['Уверенные бруски', 'Деловой авторитет', 'Монолитная плотность'],
  },
  {
    id: 'metrika',
    name: 'Метрика',
    subtitle: 'Архитектурный акцидентный дисплей',
    category: 'Display / Geometric',
    designer: 'Metrika Foundry',
    description: 'Мощный акцидентный шрифт с архитектурными геометрическими формами, монументальной плотностью и бескомпромиссным характером.',
    previewClass: 'font-preview-metrika',
    features: ['Монументальность', 'Архитектурная форма', 'Плотный акцент'],
  },
];

export default function FontSwitcherToolbar() {
  const [activeFont, setActiveFont] = useState<FontId>('amstelvar');
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [customSampleText, setCustomSampleText] = useState('Мы — команда экспертов, которая знает, как защитить ваш бизнес.');

  // Initialize from localStorage or default
  useEffect(() => {
    try {
      const saved = localStorage.getItem('etlegis_heading_font') as FontId | null;
      if (saved && FONT_OPTIONS.some((f) => f.id === saved)) {
        applyFont(saved);
      } else {
        applyFont('amstelvar');
      }
    } catch {
      applyFont('amstelvar');
    }
  }, []);

  // Keyboard shortcut listener (1, 2, 3, 4, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (e.key === 'Escape' && isCanvasOpen) {
          setIsCanvasOpen(false);
        }
        return;
      }

      if (e.key === '1') applyFont('amstelvar');
      if (e.key === '2') applyFont('jun');
      if (e.key === '3') applyFont('synerga');
      if (e.key === '4') applyFont('metrika');
      if (e.key === 'Escape' && isCanvasOpen) setIsCanvasOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCanvasOpen]);

  const applyFont = (fontId: FontId) => {
    setActiveFont(fontId);
    document.documentElement.setAttribute('data-heading-font', fontId);
    document.documentElement.style.setProperty('--font-heading', `var(--font-${fontId}), serif`);
    try {
      localStorage.setItem('etlegis_heading_font', fontId);
    } catch {}
  };

  return (
    <>
      {/* 1. ПЛАВАЮЩАЯ ПАНЕЛЬ ПЕРЕКЛЮЧЕНИЯ ВНИЗУ ЭКРАНА */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9000] flex flex-col items-center pointer-events-auto transition-all duration-300"
        role="region"
        aria-label="Переключатель шрифтов заголовков"
      >
        {isMinimized ? (
          // Свернутое состояние: аккуратная круглая плавающая кнопка
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#141517]/90 text-white shadow-2xl backdrop-blur-md border border-[#9B815C]/40 hover:border-[#9B815C] transition-all hover:scale-105 group"
            title="Развернуть переключатель шрифтов (1-4)"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[#C5A880]">Шрифты</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#9B815C]" />
            <span className="text-xs font-medium text-white/90">
              {FONT_OPTIONS.find((f) => f.id === activeFont)?.name}
            </span>
            <span className="text-xs text-white/50 group-hover:text-white transition-colors">↑</span>
          </button>
        ) : (
          // Развернутая панель
          <div className="flex flex-col sm:flex-row items-center gap-2 px-3 py-2 bg-[#141517]/95 dark:bg-[#11141A]/95 text-white backdrop-blur-xl border border-white/15 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl w-auto max-w-[95vw] whitespace-nowrap">
            {/* Лейбл и подсказка */}
            <div className="flex items-center gap-2 pr-3 shrink-0 border-b sm:border-b-0 sm:border-r border-white/10 w-full sm:w-auto justify-between sm:justify-start">
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#C5A880]">
                  Шрифт:
                </span>
                <span className="font-mono text-[10px] text-white/40">
                  Клавиши [1-4]
                </span>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                className="sm:hidden text-xs text-white/40 hover:text-white p-1"
                aria-label="Свернуть панель"
              >
                ✕
              </button>
            </div>

            {/* 4 КНОПКИ ВЫБОРА ШРИФТА */}
            <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto no-scrollbar py-0.5">
              {FONT_OPTIONS.map((f, index) => {
                const isActive = activeFont === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => applyFont(f.id)}
                    className={`relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all duration-200 shrink-0 whitespace-nowrap ${
                      isActive
                        ? 'bg-[#9B815C] text-white shadow-md font-medium border border-[#BCA685]'
                        : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/5'
                    }`}
                    aria-pressed={isActive}
                    title={`${f.name} — ${f.subtitle}`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 ${
                        isActive ? 'bg-white/20 text-white font-bold' : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className={`text-[13px] tracking-wide ${f.previewClass}`}>
                      {f.name}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white ml-0.5 shrink-0 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Кнопка открытия канваса сравнения */}
            <div className="flex items-center gap-1.5 pl-2 shrink-0 border-t sm:border-t-0 sm:border-l border-white/10 w-full sm:w-auto justify-end">
              <button
                onClick={() => setIsCanvasOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider bg-white/10 hover:bg-[#C5A880]/20 hover:border-[#C5A880]/40 text-[#C5A880] border border-white/10 transition-all hover:scale-[1.02] shrink-0 whitespace-nowrap"
              >
                <span>Канвас ⊞</span>
              </button>

              <button
                onClick={() => setIsMinimized(true)}
                className="hidden sm:flex items-center justify-center w-7 h-7 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white text-xs transition-colors shrink-0"
                title="Свернуть панель"
                aria-label="Свернуть панель"
              >
                —
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. ПОЛНОЭКРАННЫЙ ОБЩИЙ КАНВАС СРАВНЕНИЯ (OVERLAY MODAL) */}
      {isCanvasOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-[#0C0E12]/85 backdrop-blur-2xl overflow-y-auto flex flex-col p-4 sm:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Канвас сравнения 4 шрифтов"
        >
          {/* Header канваса */}
          <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs uppercase tracking-widest text-[#C5A880]">
                  ETLEGIS • Typography Studio
                </span>
                <span className="text-white/30">•</span>
                <span className="font-mono text-xs text-white/50">
                  Сравнение 4 вариантов заголовков
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal text-white tracking-tight">
                Общий канвас сравнения шрифтов
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-white/50 hidden md:inline">
                Переключение на сайте: клавиши 1, 2, 3, 4
              </span>
              <button
                onClick={() => setIsCanvasOpen(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider rounded-lg border border-white/20 transition-colors flex items-center gap-2"
              >
                <span>Закрыть канвас</span>
                <span>✕</span>
              </button>
            </div>
          </div>

          {/* Интерактивное поле ввода произвольного текста */}
          <div className="max-w-7xl mx-auto w-full my-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
              <label htmlFor="custom-sample" className="font-mono text-xs uppercase tracking-wider text-[#C5A880]">
                Тестовая фраза для живой примерки во всех 4 вариантах:
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCustomSampleText('Мы — команда экспертов, которая знает, как защитить ваш бизнес.')}
                  className="text-[11px] font-mono text-white/60 hover:text-white underline underline-offset-2"
                >
                  Главный заголовок
                </button>
                <span className="text-white/30">•</span>
                <button
                  type="button"
                  onClick={() => setCustomSampleText('Команда бюро • Защита корпоративных активов')}
                  className="text-[11px] font-mono text-white/60 hover:text-white underline underline-offset-2"
                >
                  Практика
                </button>
                <span className="text-white/30">•</span>
                <button
                  type="button"
                  onClick={() => setCustomSampleText('Адвокатское бюро «ЭТЛЕГИС»: 1,2+ млрд ₽ сохранённых средств')}
                  className="text-[11px] font-mono text-white/60 hover:text-white underline underline-offset-2"
                >
                  Кейс / Цифры
                </button>
              </div>
            </div>
            <input
              id="custom-sample"
              type="text"
              value={customSampleText}
              onChange={(e) => setCustomSampleText(e.target.value)}
              placeholder="Введите любой заголовок на русском или латинице..."
              className="w-full bg-[#141517] border border-white/20 rounded-lg px-4 py-2.5 text-white text-sm sm:text-base focus:outline-none focus:border-[#C5A880] transition-colors"
            />
          </div>

          {/* СЕТКА ИЗ 4 КОЛОНОК СО ШРИФТАМИ */}
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-16">
            {FONT_OPTIONS.map((f, idx) => {
              const isSelected = activeFont === f.id;
              return (
                <div
                  key={f.id}
                  className={`flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 relative ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#201D19] to-[#141517] border-2 border-[#C5A880] shadow-[0_0_30px_rgba(197,168,128,0.15)]'
                      : 'bg-[#141517]/70 border border-white/10 hover:border-white/25'
                  }`}
                >
                  {/* Верхняя шапка карточки шрифта */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-[#C5A880]">
                        Вариант {idx + 1}
                      </span>
                      {isSelected ? (
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#9B815C] text-white">
                          Активен на сайте ✓
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-white/40">
                          {f.category}
                        </span>
                      )}
                    </div>

                    <h3 className={`text-3xl text-white mb-1 ${f.previewClass}`}>
                      {f.name}
                    </h3>
                    <p className="text-xs text-white/60 mb-3">{f.subtitle}</p>
                    <p className="text-xs text-white/50 leading-relaxed mb-4 min-h-[48px]">
                      {f.description}
                    </p>

                    {/* Теги характеристик */}
                    <div className="flex flex-wrap gap-1 mb-6">
                      {f.features.map((feat) => (
                        <span
                          key={feat}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/70 border border-white/5"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    <div className="h-px w-full bg-white/10 my-4" />

                    {/* ПРИМЕРЫ ВЕРСТКИ В ЭТОМ ШРИФТЕ */}
                    <div className="flex flex-col gap-5">
                      {/* 1. Пользовательский текст / Главный заголовок */}
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block mb-1.5">
                          Пользовательская фраза:
                        </span>
                        <div
                          className={`text-2xl leading-tight text-white transition-all break-words ${f.previewClass}`}
                        >
                          {customSampleText || 'Мы — команда экспертов...'}
                        </div>
                      </div>

                      {/* 2. Заголовок раздела */}
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block mb-1.5">
                          Заголовок раздела (H2):
                        </span>
                        <div className={`text-xl text-[#F5F5F3] leading-snug ${f.previewClass}`}>
                          Команда бюро • Лидеры практик
                        </div>
                      </div>

                      {/* 3. Имя адвоката / карточка */}
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block mb-1.5">
                          Имя адвоката (Карточка):
                        </span>
                        <div className={`text-lg text-white ${f.previewClass}`}>
                          Алексей Бирюков ↗
                        </div>
                        <span className="text-[11px] font-mono text-[#C5A880] block mt-0.5">
                          Управляющий партнёр, адвокат
                        </span>
                      </div>

                      {/* 4. Цифры и акценты */}
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block mb-1.5">
                          Цифры и статистика:
                        </span>
                        <div className={`text-2xl text-[#C5A880] tracking-tight ${f.previewClass}`}>
                          1,2+ млрд ₽ / 94% / 2019
                        </div>
                      </div>

                      {/* 5. Алфавит кириллицы */}
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block mb-1.5">
                          Глифы русского алфавита:
                        </span>
                        <div
                          className={`text-xs text-white/60 tracking-wider break-all leading-relaxed ${f.previewClass}`}
                        >
                          АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ
                          <br />
                          абвгдеёжзийклмнопрстуфхцчшщъыьэюя
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Кнопка действия: Применить на сайте */}
                  <div className="pt-6 mt-6 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        applyFont(f.id);
                        setIsCanvasOpen(false);
                      }}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-[#9B815C] text-white font-medium border border-[#BCA685] shadow-lg'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                      }`}
                    >
                      <span>{isSelected ? 'Шрифт уже выбран ✓' : 'Выбрать этот вариант'}</span>
                      <span className="text-sm">→</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
