'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const VERSIONS = [
  {
    num: '1',
    ver: 'v2.0',
    title: 'Классика',
    subtitle: 'Академический стиль, монохром, классическая сетка',
    href: '/v2',
    preview: '/previews/v2_preview.webp',
    tag: 'Архитектурная база',
  },
  {
    num: '2',
    ver: 'v2.6',
    title: 'Сетка 20/40/40',
    subtitle: 'Хамелеон-логотип, ритм секций, интерактивный квиз в первом экране',
    href: '/v2-6',
    preview: '/previews/v26_preview.webp',
    tag: 'Флагманский лендинг',
  },
  {
    num: '3',
    ver: 'v2.7',
    title: 'Split Editorial',
    subtitle: 'Закреплённое меню, 3D переходы Codrops, горизонтальный скролл',
    href: '/v2-7',
    preview: '/previews/v27_preview.webp',
    tag: 'Журнальный сплит',
  },
];

export default function MinimalistHub() {
  return (
    <div className="min-h-screen w-full bg-[#0D1117] text-[#E6EDF3] font-sans antialiased flex flex-col justify-between selection:bg-[#C5A059] selection:text-black">
      {/* Top Bar */}
      <header className="border-b border-white/10 px-6 sm:px-12 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="ETLEGIS"
            className="h-7 w-auto object-contain invert brightness-200"
          />
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-white/50 border-l border-white/20 pl-3">
            Design Showcase
          </span>
        </div>
        <div className="text-xs font-mono text-white/50">
          GitHub Repository · <span className="text-[#C5A059] font-bold">max1m369 / etlegis</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-16 flex-1 flex flex-col justify-center w-full">
        <div className="mb-10 text-center sm:text-left">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A059] mb-2 font-bold">
            // КОНЦЕПЦИИ И ВЕРСИИ ДИЗАЙНА
          </div>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Адвокатское бюро <span className="font-semibold text-[#E6EDF3]">ETLEGIS</span>
          </h1>
          <p className="text-sm sm:text-base text-white/60 mt-2 max-w-2xl font-light">
            Выберите версию для интерактивного просмотра или переключайтесь между ними с помощью виджета в левом нижнем углу.
          </p>
        </div>

        {/* 3 Large Numbered Version Cards (1, 2, 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {VERSIONS.map((item) => (
            <Link
              key={item.num}
              href={item.href}
              className="group relative bg-[#161B22] border border-white/10 hover:border-[#C5A059] transition-all duration-300 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-[0_0_30px_rgba(197,160,89,0.15)] hover:-translate-y-1"
            >
              <div>
                {/* Preview Thumbnail Container */}
                <div className="relative aspect-[16/10] w-full bg-black/40 overflow-hidden border-b border-white/10">
                  <Image
                    src={item.preview}
                    alt={`${item.ver} — ${item.title}`}
                    fill
                    className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-transparent to-transparent opacity-80" />
                  
                  {/* Huge Minimalist Number Badge */}
                  <div className="absolute top-4 left-4 font-mono text-3xl sm:text-4xl font-extrabold text-white/90 bg-[#0D1117]/80 backdrop-blur-md px-3.5 py-1 rounded border border-white/15">
                    {item.num}
                  </div>

                  {/* Version & Tag */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-1 bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30 rounded font-semibold">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#C5A059]">
                      {item.ver}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold text-white group-hover:text-[#C5A059] transition-colors mb-2">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom Launch Button */}
              <div className="p-6 pt-0">
                <div className="w-full py-3 px-4 bg-white/5 group-hover:bg-[#C5A059] text-white group-hover:text-[#0D1117] font-mono text-xs uppercase tracking-wider font-bold rounded transition-all duration-200 flex items-center justify-between">
                  <span>Открыть концепцию {item.num}</span>
                  <span className="text-base font-normal group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="border-t border-white/10 px-6 sm:px-12 py-6 text-center text-xs font-mono text-white/40 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          © 2019 — 2026 Адвокатское бюро ETLEGIS
        </div>
        <div>
          Static Deployment · GitHub Pages · Next.js Export
        </div>
      </footer>
    </div>
  );
}
