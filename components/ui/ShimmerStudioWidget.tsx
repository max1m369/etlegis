'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Sliders, X, RotateCcw, Eye, Palette, Clock, Maximize2 } from 'lucide-react';

interface ShimmerSettings {
  baseColor: string;
  highlightColor: string;
  duration: number;
  size: number;
  thickness: number;
  logoShimmer: boolean;
}

const DEFAULT_SETTINGS: ShimmerSettings = {
  baseColor: '#2C3E50', // Цвет логотипа Etlegis
  highlightColor: '#CBD5E1', // Светло-серебристый благородный блик
  duration: 10, // 10 секунд
  size: 44, // 44px
  thickness: 1.5, // 1.5px
  logoShimmer: true, // Включен перелив по логотипу
};

export default function ShimmerStudioWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<ShimmerSettings>(DEFAULT_SETTINGS);

  // При монтировании читаем сохраненные настройки из localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('etlegis_shimmer_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch (e) {
      // Игнорируем ошибки парсинга
    }
  }, []);

  // Синхронизация с CSS-переменными в :root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--bracket-base-color', settings.baseColor);
    root.style.setProperty('--bracket-highlight-color', settings.highlightColor);
    root.style.setProperty('--bracket-shimmer-duration', `${settings.duration}s`);
    root.style.setProperty('--bracket-size', `${settings.size}px`);
    root.style.setProperty('--bracket-thickness', `${settings.thickness}px`);
    root.style.setProperty('--logo-shimmer-enabled', settings.logoShimmer ? '1' : '0');

    try {
      localStorage.setItem('etlegis_shimmer_settings', JSON.stringify(settings));
    } catch (e) {
      // localStorage quota
    }
  }, [settings]);

  const updateSetting = <K extends keyof ShimmerSettings>(key: K, value: ShimmerSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* 🔘 Кнопка открытия виджета */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-2.5 bg-[#141517] text-white text-xs font-medium tracking-wide uppercase rounded-full shadow-2xl hover:bg-[#2C3E50] border border-white/20 transition-all hover:scale-105 group"
          title="Открыть панель настроек скобок и анимации логотипа"
        >
          <Sparkles size={14} className="text-[#C5A880] animate-pulse" />
          <span>Настройки скобок и блика</span>
        </button>
      )}

      {/* 🎛️ Развернутая панель управления */}
      {isOpen && (
        <div className="w-84 sm:w-96 bg-white/95 backdrop-blur-md border border-[#141517]/20 rounded-xl shadow-2xl p-5 text-[#141517] animate-in fade-in zoom-in-95 duration-200">
          {/* Шапка */}
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E2E2DC]">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#9B815C]" />
              <h4 className="font-serif text-base font-semibold tracking-tight">
                Настройки скобок и анимации
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#5E6267] hover:text-[#141517] hover:bg-[#ECECE8] rounded-full transition-colors"
              aria-label="Закрыть"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* 1. Цвет основы скобок */}
            <div>
              <div className="flex justify-between items-center mb-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-[#5E6267]">
                  <Palette size={13} />
                  <span>Цвет основы (как логотип):</span>
                </span>
                <span className="font-mono text-[11px] text-[#141517] bg-[#F5F5F3] px-2 py-0.5 rounded border border-[#E2E2DC]">
                  {settings.baseColor}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.baseColor}
                  onChange={(e) => updateSetting('baseColor', e.target.value)}
                  className="w-8 h-8 rounded border border-[#E2E2DC] cursor-pointer p-0 bg-transparent shrink-0"
                />
                {/* Быстрые пресеты цвета */}
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { label: 'Логотип Navy', color: '#2C3E50' },
                    { label: 'Латунь / Золото', color: '#8C6F47' },
                    { label: 'Графит', color: '#141517' },
                    { label: 'Сапфир', color: '#1E293B' },
                  ].map((p) => (
                    <button
                      key={p.color}
                      type="button"
                      onClick={() => updateSetting('baseColor', p.color)}
                      className="px-2 py-1 bg-[#F5F5F3] hover:bg-[#E2E2DC] border border-[#E2E2DC] rounded text-[10px] text-[#141517] transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Цвет светового блика */}
            <div>
              <div className="flex justify-between items-center mb-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-[#5E6267]">
                  <Sparkles size={13} />
                  <span>Цвет блика (перелива):</span>
                </span>
                <span className="font-mono text-[11px] text-[#141517] bg-[#F5F5F3] px-2 py-0.5 rounded border border-[#E2E2DC]">
                  {settings.highlightColor}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={settings.highlightColor}
                  onChange={(e) => updateSetting('highlightColor', e.target.value)}
                  className="w-8 h-8 rounded border border-[#E2E2DC] cursor-pointer p-0 bg-transparent shrink-0"
                />
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { label: 'Серебро', color: '#CBD5E1' },
                    { label: 'Золотой блик', color: '#FFFDF9' },
                    { label: 'Шампань', color: '#DFCE9F' },
                  ].map((p) => (
                    <button
                      key={p.color}
                      type="button"
                      onClick={() => updateSetting('highlightColor', p.color)}
                      className="px-2 py-1 bg-[#F5F5F3] hover:bg-[#E2E2DC] border border-[#E2E2DC] rounded text-[10px] text-[#141517] transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Скорость анимации блика */}
            <div>
              <div className="flex justify-between items-center mb-1 font-medium">
                <span className="flex items-center gap-1.5 text-[#5E6267]">
                  <Clock size={13} />
                  <span>Скорость перелива (длительность):</span>
                </span>
                <span className="font-mono text-[11px] font-semibold text-[#9B815C]">
                  {settings.duration} сек
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                step="0.5"
                value={settings.duration}
                onChange={(e) => updateSetting('duration', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#E2E2DC] rounded-lg appearance-none cursor-pointer accent-[#2C3E50]"
              />
              <div className="flex justify-between text-[10px] text-[#5E6267] mt-0.5">
                <span>2 с (быстро)</span>
                <span>10 с (плавно)</span>
                <span>20 с (ультра-медленно)</span>
              </div>
            </div>

            {/* 4. Размер скобок */}
            <div>
              <div className="flex justify-between items-center mb-1 font-medium">
                <span className="flex items-center gap-1.5 text-[#5E6267]">
                  <Maximize2 size={13} />
                  <span>Размер скобок:</span>
                </span>
                <span className="font-mono text-[11px] font-semibold text-[#9B815C]">
                  {settings.size} px
                </span>
              </div>
              <input
                type="range"
                min="24"
                max="72"
                step="2"
                value={settings.size}
                onChange={(e) => updateSetting('size', parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-[#E2E2DC] rounded-lg appearance-none cursor-pointer accent-[#2C3E50]"
              />
            </div>

            {/* 5. Толщина линий */}
            <div>
              <div className="flex justify-between items-center mb-1 font-medium">
                <span className="flex items-center gap-1.5 text-[#5E6267]">
                  <Sliders size={13} />
                  <span>Толщина линий (одинаковая):</span>
                </span>
                <span className="font-mono text-[11px] font-semibold text-[#9B815C]">
                  {settings.thickness} px
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="0.25"
                value={settings.thickness}
                onChange={(e) => updateSetting('thickness', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#E2E2DC] rounded-lg appearance-none cursor-pointer accent-[#2C3E50]"
              />
            </div>

            {/* 6. Тумблер блика по логотипу */}
            <div className="flex items-center justify-between pt-2 pb-1 border-t border-[#E2E2DC]">
              <div>
                <span className="font-medium text-[#141517] block">Анимация блика по логотипу</span>
                <span className="text-[10px] text-[#5E6267]">Градиентный перелив в шапке сайта</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.logoShimmer}
                  onChange={(e) => updateSetting('logoShimmer', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#E2E2DC] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E2E2DC] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2C3E50]"></div>
              </label>
            </div>
          </div>

          {/* Футер */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#E2E2DC]">
            <button
              onClick={resetDefaults}
              className="flex items-center gap-1.5 text-[11px] text-[#5E6267] hover:text-[#141517] font-medium transition-colors"
            >
              <RotateCcw size={12} />
              <span>По умолчанию</span>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-3.5 py-1.5 bg-[#141517] text-white text-[11px] uppercase tracking-wider font-semibold rounded hover:bg-[#2C3E50] transition-colors"
            >
              Готово
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
