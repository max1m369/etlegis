'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  DEFAULT_FAVICON_SETTINGS,
  FaviconSettings,
  COLOR_PRESETS,
  PresetId,
  renderFaviconToCanvas,
  SVG_MONOGRAM_PATH,
} from '@/lib/favicon-theme';

export default function AdminFaviconPage() {
  const [settings, setSettings] = useState<FaviconSettings>(DEFAULT_FAVICON_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTabPreview, setActiveTabPreview] = useState<'loop' | 'manual'>('loop');
  const [hasEyeDropper, setHasEyeDropper] = useState(false);

  // Preview canvas refs
  const largeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const tabCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cachedPathRef = useRef<Path2D | null>(null);

  // Animation state for the preview window
  const animFrameIdRef = useRef<number | null>(null);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPlayingRef = useRef(true);

  // Load initial settings
  useEffect(() => {
    try {
      cachedPathRef.current = new Path2D(SVG_MONOGRAM_PATH);
    } catch {
      // ignore
    }

    if (typeof window !== 'undefined' && 'EyeDropper' in window) {
      setHasEyeDropper(true);
    }

    // Try loading from localStorage first for instant response
    try {
      const stored = localStorage.getItem('etlegis_favicon_settings');
      if (stored) {
        setSettings({ ...DEFAULT_FAVICON_SETTINGS, ...JSON.parse(stored) });
      }
    } catch {
      // ignore
    }

    // Then sync with server
    fetch('/api/favicon-settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data === 'object') {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  // Universal render helper for preview canvases
  const renderPreviewFrame = useCallback(
    (glareProgress: number | null) => {
      const path = cachedPathRef.current;

      // 1. Render Large Canvas (128x128)
      if (largeCanvasRef.current) {
        const ctx = largeCanvasRef.current.getContext('2d');
        if (ctx) {
          renderFaviconToCanvas(ctx, 128, settings, glareProgress, path);
        }
      }

      // 2. Render Tab Canvas (32x32)
      if (tabCanvasRef.current) {
        const ctx = tabCanvasRef.current.getContext('2d');
        if (ctx) {
          renderFaviconToCanvas(ctx, 32, settings, glareProgress, path);
        }
      }
    },
    [settings]
  );

  // Trigger one-shot manual sweep in preview
  const triggerManualSweep = useCallback(() => {
    if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);

    const sweepDurationMs = Math.max(500, Math.min(15000, settings.sweepDuration * 1000));
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / sweepDurationMs);
      renderPreviewFrame(progress);

      if (progress < 1) {
        animFrameIdRef.current = requestAnimationFrame(step);
      } else {
        renderPreviewFrame(null);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(step);
  }, [settings.sweepDuration, renderPreviewFrame]);

  // Preview animation loop
  useEffect(() => {
    if (activeTabPreview === 'manual') {
      renderPreviewFrame(null);
      return;
    }

    isPlayingRef.current = true;
    let isCancelled = false;

    const runLoop = () => {
      if (isCancelled) return;

      const sweepDurationMs = Math.max(500, Math.min(15000, settings.sweepDuration * 1000));
      const cycleDurationMs = Math.max(sweepDurationMs, Math.min(15000, settings.cycleDuration * 1000));
      const startTime = performance.now();

      const sweepStep = (currentTime: number) => {
        if (isCancelled) return;
        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / sweepDurationMs);
        renderPreviewFrame(progress);

        if (progress < 1) {
          animFrameIdRef.current = requestAnimationFrame(sweepStep);
        } else {
          renderPreviewFrame(null);
          const pauseTime = Math.max(800, cycleDurationMs - sweepDurationMs);
          timeoutIdRef.current = setTimeout(runLoop, pauseTime);
        }
      };

      animFrameIdRef.current = requestAnimationFrame(sweepStep);
    };

    // Initial delay
    timeoutIdRef.current = setTimeout(runLoop, 400);

    return () => {
      isCancelled = true;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, [settings, activeTabPreview, renderPreviewFrame]);

  // Handle Preset Selection
  const handleSelectPreset = (presetId: 'silver' | 'gold' | 'brass' | 'graphite') => {
    const preset = COLOR_PRESETS[presetId];
    setSettings((prev) => ({
      ...prev,
      preset: presetId,
      customColor: preset.accent,
      glareColor: preset.defaultGlare,
    }));
  };

  // Handle Custom Color Pick
  const handleCustomColorChange = (hex: string) => {
    setSettings((prev) => ({
      ...prev,
      preset: 'custom',
      customColor: hex,
    }));
  };

  // Native EyeDropper API (if browser supports it)
  const openScreenEyeDropper = async () => {
    if (typeof window !== 'undefined' && 'EyeDropper' in window) {
      try {
        const eyeDropper = new (window as any).EyeDropper();
        const result = await eyeDropper.open();
        if (result?.sRGBHex) {
          handleCustomColorChange(result.sRGBHex);
        }
      } catch {
        // user cancelled or unsupported
      }
    }
  };

  // Save Settings to API, localStorage, and dispatch global event
  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // 1. POST to API
      const res = await fetch('/api/favicon-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      // 2. Persist in localStorage
      localStorage.setItem('etlegis_favicon_settings', JSON.stringify(settings));

      // 3. Dispatch dynamic event for instant tab update
      window.dispatchEvent(
        new CustomEvent('faviconSettingsChanged', { detail: settings })
      );

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to save favicon settings:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to default
  const handleReset = () => {
    setSettings(DEFAULT_FAVICON_SETTINGS);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#9B815C]/15 border border-[#9B815C]/30 text-[#C5A880] text-xs font-medium uppercase tracking-wider mb-2">
            Идентичность &bull; Иконка вкладки
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
            Настройка анимированного фавикона
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Управление цветом монограммы, кинематографическим бликом, скоростью анимации (до 15 сек) и визуальным рельефом.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-xs font-medium text-[#94A3B8] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
          >
            По умолчанию
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#9B815C] to-[#806B4D] hover:from-[#A88C64] hover:to-[#917957] active:scale-95 rounded-lg shadow-lg shadow-[#9B815C]/20 border border-[#C5A880]/30 transition-all disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Сохранение...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Сохранить настройки</span>
              </>
            )}
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-sm flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium">
              Настройки успешно сохранены и немедленно применены к вкладке вашего браузера!
            </span>
          </div>
          <span className="text-xs text-emerald-400/80">Синхронизировано</span>
        </div>
      )}

      {/* Main Grid: Left Controls, Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Color Presets */}
          <div className="bg-[#0F141C] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">1. Цвет монограммы</h2>
                <p className="text-xs text-[#94A3B8]">
                  Выберите благородный металл или задайте любой оттенок палитрой/пипеткой
                </p>
              </div>
              <span className="text-xs text-[#C5A880] uppercase tracking-wider font-mono">
                {settings.preset === 'custom' ? 'Пользовательский' : COLOR_PRESETS[settings.preset]?.name}
              </span>
            </div>

            {/* Presets Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(Object.keys(COLOR_PRESETS) as PresetId[]).map((key) => {
                const preset = COLOR_PRESETS[key];
                const isSelected = settings.preset === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleSelectPreset(key)}
                    className={`relative p-3 rounded-xl border text-left transition-all group ${
                      isSelected
                        ? 'border-[#C5A880] bg-[#1A2230] shadow-md shadow-[#9B815C]/10 ring-1 ring-[#C5A880]'
                        : 'border-white/10 bg-[#141A23] hover:border-white/20 hover:bg-[#18202B]'
                    }`}
                  >
                    {/* Metallic Swatch Bar */}
                    <div
                      className="h-7 w-full rounded-md mb-2.5 border border-white/10 shadow-inner flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${preset.baseStops[0]} 0%, ${preset.baseStops[1]} 25%, ${preset.baseStops[2]} 50%, ${preset.baseStops[3]} 75%, ${preset.baseStops[4]} 100%)`,
                      }}
                    >
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#0B0F17] shadow" />
                      )}
                    </div>
                    <div className="font-medium text-xs text-white">{preset.name}</div>
                    <div className="text-[10px] text-[#64748B] line-clamp-1 mt-0.5">
                      {preset.id === 'brass' ? 'Стиль бюро' : preset.accent}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Color Picker & Eyedropper */}
            <div className="pt-2 border-t border-white/5">
              <label className="block text-xs font-medium text-[#CBD5E1] mb-2">
                Или собственный цвет (пипетка / цветовая панель):
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {/* HTML5 Native Color Picker */}
                <div className="relative flex items-center">
                  <input
                    type="color"
                    id="customColorPicker"
                    value={settings.customColor || '#CBD5E1'}
                    onChange={(e) => handleCustomColorChange(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/20 p-0.5"
                    title="Открыть цветовую панель"
                  />
                </div>

                {/* Hex Text Input */}
                <div className="flex items-center rounded-lg bg-[#141A23] border border-white/10 px-3 py-1.5 focus-within:border-[#C5A880]">
                  <span className="text-[#64748B] text-xs font-mono mr-1">#</span>
                  <input
                    type="text"
                    value={(settings.customColor || '').replace('#', '')}
                    onChange={(e) => handleCustomColorChange('#' + e.target.value)}
                    placeholder="CBD5E1"
                    maxLength={7}
                    className="w-20 bg-transparent text-xs text-white font-mono focus:outline-none uppercase"
                  />
                </div>

                {/* Eyedropper API Button */}
                {hasEyeDropper && (
                  <button
                    type="button"
                    onClick={openScreenEyeDropper}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#CBD5E1] hover:text-white transition-colors"
                    title="Взять цвет пипеткой с экрана"
                  >
                    <svg className="w-3.5 h-3.5 text-[#C5A880]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                    <span>Пипетка с экрана</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Glare Angle & Direction */}
          <div className="bg-[#0F141C] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-white">2. Угол прохождения блика</h2>
                <p className="text-xs text-[#94A3B8]">
                  Направление световой волны (угол наклона луча)
                </p>
              </div>
              <span className="text-sm font-mono font-semibold text-[#C5A880]">
                {settings.glareAngle}°
              </span>
            </div>

            {/* Slider */}
            <div className="space-y-1">
              <input
                type="range"
                min="-180"
                max="180"
                step="5"
                value={settings.glareAngle}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, glareAngle: Number(e.target.value) }))
                }
                className="w-full accent-[#C5A880] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#64748B] font-mono">
                <span>-180° (Справа налево)</span>
                <span>0° (Слева направо)</span>
                <span>+180°</span>
              </div>
            </div>

            {/* Quick Angle Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-xs text-[#64748B] self-center mr-1">Быстрый выбор:</span>
              {[
                { label: '135° (Зеркально, кино)', value: 135 },
                { label: '45° (Классика)', value: 45 },
                { label: '90° (Сверху вниз)', value: 90 },
                { label: '0° (По горизонтали)', value: 0 },
                { label: '-45° (Снизу вверх)', value: -45 },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, glareAngle: item.value }))
                  }
                  className={`px-2.5 py-1 text-xs rounded-md border transition-all ${
                    settings.glareAngle === item.value
                      ? 'border-[#C5A880] bg-[#C5A880]/15 text-[#C5A880] font-medium'
                      : 'border-white/10 bg-white/5 text-[#94A3B8] hover:text-white hover:border-white/20'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Speed & Duration Controls (Bounded to 15s) */}
          <div className="bg-[#0F141C] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-white">3. Скорость и цикл анимации</h2>
                  <p className="text-xs text-[#94A3B8]">
                    Длительность прохода блика и период повтора (строго до 15 секунд)
                  </p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono">
                  Лимит: 15.0 сек
                </span>
              </div>
            </div>

            {/* Sweep Duration Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#CBD5E1] font-medium">
                  Скорость / длительность движения блика:
                </span>
                <span className="font-mono text-sm text-[#C5A880] font-semibold">
                  {settings.sweepDuration.toFixed(1)} сек
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="15.0"
                step="0.1"
                value={settings.sweepDuration}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSettings((prev) => ({
                    ...prev,
                    sweepDuration: val,
                    cycleDuration: Math.max(val, prev.cycleDuration),
                  }));
                }}
                className="w-full accent-[#C5A880] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#64748B] font-mono">
                <span>0.5 сек (Быстро)</span>
                <span>3.0 сек (Кинематографично)</span>
                <span>15.0 сек (Предел)</span>
              </div>
            </div>

            {/* Cycle Duration Slider (Max 15s) */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#CBD5E1] font-medium">
                  Полный цикл анимации (повтор через):
                </span>
                <span className="font-mono text-sm text-[#C5A880] font-semibold">
                  {settings.cycleDuration.toFixed(1)} сек
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="15.0"
                step="0.5"
                value={settings.cycleDuration}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSettings((prev) => ({
                    ...prev,
                    cycleDuration: Math.min(15.0, val),
                    sweepDuration: Math.min(prev.sweepDuration, val),
                  }));
                }}
                className="w-full accent-[#C5A880] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#64748B] font-mono">
                <span>1.0 сек</span>
                <span>10.0 сек (Оптимально)</span>
                <span>15.0 сек (Максимум)</span>
              </div>
            </div>
          </div>

          {/* Section 4: Glare Width & Glare Color */}
          <div className="bg-[#0F141C] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
            <div>
              <h2 className="text-base font-semibold text-white">4. Оптика и свет блика</h2>
              <p className="text-xs text-[#94A3B8]">
                Ширина светового пучка и оттенок рефлекторного сияния
              </p>
            </div>

            {/* Glare Width Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#CBD5E1] font-medium">Ширина светового блика:</span>
                <span className="font-mono text-sm text-[#C5A880] font-semibold">
                  {settings.glareWidth} px
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="2"
                value={settings.glareWidth}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, glareWidth: Number(e.target.value) }))
                }
                className="w-full accent-[#C5A880] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#64748B] font-mono">
                <span>10 px (Тонкая лазерная грань)</span>
                <span>46 px (Мягкое благородное сияние)</span>
                <span>80 px (Широкая волна)</span>
              </div>
            </div>

            {/* Glare Color Picker */}
            <div className="pt-2 border-t border-white/5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#CBD5E1] font-medium">Цвет луча блика:</span>
                <span className="font-mono text-xs text-[#94A3B8] uppercase">
                  {settings.glareColor}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.glareColor || '#FFFFFF'}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, glareColor: e.target.value }))
                  }
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-white/20 p-0.5"
                />

                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Чистый белый', color: '#FFFFFF' },
                    { label: 'Шампань', color: '#FFFDF5' },
                    { label: 'Тёплый отблеск', color: '#FEF3C7' },
                    { label: 'Ледяной сапфир', color: '#E0F2FE' },
                  ].map((chip) => (
                    <button
                      key={chip.color}
                      type="button"
                      onClick={() =>
                        setSettings((prev) => ({ ...prev, glareColor: chip.color }))
                      }
                      className={`px-2.5 py-1 rounded text-xs border transition-colors flex items-center gap-1.5 ${
                        settings.glareColor === chip.color
                          ? 'border-[#C5A880] bg-[#C5A880]/15 text-white'
                          : 'border-white/10 bg-white/5 text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20"
                        style={{ backgroundColor: chip.color }}
                      />
                      <span>{chip.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3D Relief Toggle */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-white">3D-рельеф и микрофаска</div>
                <div className="text-[11px] text-[#64748B]">
                  Добавляет тактильную глубину, тень и контурный скос к знаку
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.reliefEnabled}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, reliefEnabled: e.target.checked }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9B815C]" />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Preview (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="bg-[#0F141C] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-semibold text-white">Превью в реальном времени</h3>
                <p className="text-xs text-[#94A3B8]">
                  Точное математическое отображение на Canvas
                </p>
              </div>
              <div className="flex items-center gap-1.5 p-0.5 rounded-lg bg-black/40 border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTabPreview('loop')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTabPreview === 'loop'
                      ? 'bg-[#C5A880]/20 text-[#C5A880] font-medium'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Цикл
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTabPreview('manual')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeTabPreview === 'manual'
                      ? 'bg-[#C5A880]/20 text-[#C5A880] font-medium'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Статика
                </button>
              </div>
            </div>

            {/* High-res Monogram Preview Canvas (128x128) */}
            <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-gradient-to-b from-[#141A23] to-[#0A0E15] border border-white/5 relative overflow-hidden group">
              {/* Subtle background glow */}
              <div
                className="absolute inset-0 opacity-20 blur-3xl pointer-events-none transition-all duration-700"
                style={{
                  background: `radial-gradient(circle, ${
                    settings.preset === 'custom'
                      ? settings.customColor
                      : COLOR_PRESETS[settings.preset]?.accent || '#CBD5E1'
                  } 0%, transparent 70%)`,
                }}
              />

              <div className="relative p-4 rounded-2xl bg-[#080B10]/80 border border-white/10 shadow-2xl backdrop-blur-sm">
                <canvas
                  ref={largeCanvasRef}
                  width={128}
                  height={128}
                  className="w-32 h-32 image-render-crisp block"
                />
              </div>

              <div className="mt-4 text-center">
                <div className="text-xs font-serif font-semibold text-white tracking-wider">
                  Знак ETLEGIS &bull; 128&times;128 px
                </div>
                <div className="text-[11px] text-[#64748B] mt-0.5">
                  Угол: {settings.glareAngle}° &bull; Ход: {settings.sweepDuration}с &bull; Цикл: {settings.cycleDuration}с
                </div>
              </div>

              {/* Action buttons under canvas */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={triggerManualSweep}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-xs text-white font-medium transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-[#C5A880]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Запустить блик сейчас</span>
                </button>
              </div>
            </div>

            {/* Browser Tab Mockup */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-[#94A3B8]">
                Как фавикон выглядит в реальной вкладке браузера:
              </div>

              <div className="rounded-xl border border-white/10 bg-[#161B22] p-2 overflow-hidden shadow-lg">
                {/* Simulated Chrome tab bar */}
                <div className="flex items-center gap-2 bg-[#21262D] px-3 py-2 rounded-lg border border-white/5 max-w-[280px]">
                  {/* Tab Favicon Canvas (32x32 rendered at 16x16) */}
                  <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                    <canvas
                      ref={tabCanvasRef}
                      width={32}
                      height={32}
                      className="w-4 h-4 block"
                    />
                  </div>
                  <span className="text-xs text-[#E6EDF3] truncate font-sans font-normal">
                    Адвокатское бюро Etlegis
                  </span>
                  <span className="text-[#8B949E] text-xs ml-auto hover:text-white cursor-default">
                    &times;
                  </span>
                </div>
              </div>
            </div>

            {/* Save & Apply Banner */}
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-gradient-to-r from-[#9B815C] to-[#806B4D] hover:from-[#A88C64] hover:to-[#917957] active:scale-[0.99] rounded-xl shadow-xl shadow-[#9B815C]/20 border border-[#C5A880]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSaving ? 'Сохранение...' : 'Применить и сохранить изменения'}
              </button>
              <p className="text-[11px] text-[#64748B] text-center mt-2">
                Изменения мгновенно отобразятся на вкладке сайта в этом и других окнах
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
