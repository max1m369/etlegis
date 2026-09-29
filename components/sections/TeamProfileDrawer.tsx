'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import type { TeamMember } from './Team';

interface TeamProfileDrawerProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TeamProfileDrawer({ member, isOpen, onClose }: TeamProfileDrawerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mosaicRef = useRef<HTMLDivElement | null>(null);
  const [mosaicBlocks, setMosaicBlocks] = useState<number[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize 36 mosaic blocks (6x6 grid)
  useEffect(() => {
    setMosaicBlocks(Array.from({ length: 36 }, (_, i) => i));
  }, []);

  // Run Chromatic Wave Canvas Animation
  useEffect(() => {
    if (!isOpen || !member) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.offsetHeight || 420);
    let tick = 0;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      w = canvas.width = canvas.parentElement.offsetWidth;
      h = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const palette = member.palette || ['#C5A880', '#9B815C', '#141517'];

    const render = () => {
      tick += 0.018;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, h);

        for (let x = 0; x <= w; x += 12) {
          const y =
            Math.sin(x * 0.004 + tick + i * 0.9) * 45 +
            Math.cos(x * 0.007 - tick * 0.5) * 35 +
            h * 0.48 +
            i * 24 -
            30;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, palette[0]);
        grad.addColorStop(0.5, palette[1]);
        grad.addColorStop(1, palette[2]);

        ctx.fillStyle = grad;
        ctx.globalAlpha = 0.28;
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isOpen, member]);

  // Run Staggered Pixel Mosaic Reveal Animation
  useEffect(() => {
    if (!isOpen || !mosaicRef.current) return;

    const blocks = mosaicRef.current.querySelectorAll<HTMLDivElement>('.mosaic-block');
    // Reset all blocks initially
    blocks.forEach((b) => {
      b.style.transform = 'scale(1) rotate(0deg)';
      b.style.opacity = '1';
      const delay = Math.random() * 450 + 100;
      b.style.transitionDelay = `${delay}ms`;
    });

    // Trigger dissolution after a short delay
    const timer = setTimeout(() => {
      blocks.forEach((b) => {
        b.style.transform = 'scale(0) rotate(14deg)';
        b.style.opacity = '0';
      });
    }, 180);

    return () => clearTimeout(timer);
  }, [isOpen, member]);

  // Body scroll lock & Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', onKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!member) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Профиль адвоката: ${member.name}`}
      className={`fixed inset-0 z-50 overflow-y-auto bg-[#0E1013] text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      {/* 1. Верхняя навигационная панель */}
      <div className="sticky top-0 z-40 bg-[#0E1013]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="group flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-neutral-400 hover:text-white transition-colors"
          aria-label="Назад к списку команды"
        >
          <span className="text-base transform group-hover:-translate-x-1 transition-transform">←</span>
          <span>Назад к списку</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase font-mono tracking-wider px-3 py-1 border border-accent-bronze/40 rounded-full text-accent-bronze bg-accent-bronze/10">
            {member.practice}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-sm"
            aria-label="Закрыть профиль"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 pb-20">
        {/* 2. Hero-секция с портретом, мозаикой и Chromatic Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#14161C] border border-white/10 rounded-sm overflow-hidden relative min-h-[460px]">
          {/* Фон: Chromatic Waves Canvas */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0E1013]/90 via-[#0E1013]/60 to-transparent z-[1]" />
          </div>

          {/* Левая колонка: Основные данные юриста */}
          <div className="relative z-10 md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="inline-block text-[11px] font-mono tracking-widest uppercase text-accent-bronze mb-2">
                {member.role}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.08] text-white tracking-tight mb-4">
                {member.name}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6 max-w-lg">
                {member.bioFull || member.description}
              </p>
            </div>

            {/* Быстрые факты */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/15 text-xs font-mono uppercase tracking-wider mb-6">
              <div>
                <span className="text-neutral-400 block text-[10px] mb-0.5">Опыт в судах:</span>
                <span className="text-white font-semibold">{member.experience || 'Более 10 лет'}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] mb-0.5">Специализация:</span>
                <span className="text-white font-semibold">{member.practice}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] mb-0.5">Прямой email:</span>
                <span className="text-white font-semibold truncate block">{member.email || 'info@etlegis.ru'}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px] mb-0.5">Локация:</span>
                <span className="text-white font-semibold">Москва, Пресненская наб.</span>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                onClick={onClose}
                className="bg-[#C5A880] text-black hover:bg-[#d6bc97] font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-sm transition-transform hover:scale-[1.02] shadow-xl"
              >
                Обсудить дело
              </a>
              <Link
                href={`/team/${member.slug}`}
                className="text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white px-4 py-3.5 border border-white/20 hover:border-white/50 rounded-sm transition-colors"
              >
                Полная страница кейсов ↗
              </Link>
            </div>
          </div>

          {/* Правая колонка: Портрет с мозаичным распадом плиток */}
          <div className="relative z-10 md:col-span-5 h-[360px] md:h-full min-h-[360px] bg-neutral-900 overflow-hidden flex items-center justify-center">
            <img
              src={member.photo}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: member.position }}
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('.png')) {
                  target.src = member.fallbackPhoto;
                }
              }}
            />

            {/* Мозаичная сетка распадающихся блоков (6x6) */}
            <div
              ref={mosaicRef}
              className="absolute inset-0 grid grid-cols-6 grid-rows-6 z-20 pointer-events-none"
              aria-hidden="true"
            >
              {mosaicBlocks.map((idx) => (
                <div
                  key={idx}
                  className="mosaic-block bg-white dark:bg-[#1f242d] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1013] via-transparent to-transparent md:hidden" />
          </div>
        </div>

        {/* 3. Детальный блок: Образование и профессиональный подход */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#12141A] border border-white/10 p-6 sm:p-8 rounded-sm">
          <div className="md:col-span-4 text-xs font-mono uppercase tracking-widest text-neutral-400">
            Опыт и образование
          </div>
          <div className="md:col-span-8 text-neutral-300 text-sm leading-relaxed space-y-4">
            <p>
              {member.bioFull || member.description}
            </p>
            {member.education && member.education.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs uppercase font-mono tracking-wider text-accent-bronze block mb-2">
                  Академическая квалификация:
                </span>
                <ul className="space-y-1 text-xs text-neutral-400 font-light">
                  {member.education.map((edu, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-bronze inline-block" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-xs text-neutral-400 font-mono pt-2">
              Защита интересов осуществляется на территории Москвы, Московской области и во всех арбитражных округах РФ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
