import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Управление брендингом и фавиконом — Etlegis Admin',
  description: 'Панель управления визуальными настройками и анимацией фавикона адвокатского бюро Etlegis',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#080B10] text-[#E2E8F0] antialiased flex flex-col font-sans selection:bg-[#9B815C]/30 selection:text-white">
      {/* Top executive navigation bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0F17]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              {/* Geometric monogram icon */}
              <div className="w-9 h-9 rounded-lg bg-[#141A23] border border-[#9B815C]/30 flex items-center justify-center text-[#C5A880] font-serif font-bold text-lg group-hover:border-[#9B815C] transition-colors shadow-inner">
                Э
              </div>
              <div>
                <div className="text-sm font-semibold tracking-wider text-white uppercase font-sans">
                  ETLEGIS
                </div>
                <div className="text-[11px] text-[#94A3B8] tracking-widest uppercase">
                  Адвокатское бюро
                </div>
              </div>
            </Link>

            <span className="text-white/20 hidden sm:inline">/</span>

            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#CBD5E1]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Панель управления</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-[#CBD5E1] hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Вернуться на сайт</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Admin footer */}
      <footer className="border-t border-white/5 bg-[#05070B] px-6 py-4 text-center text-xs text-[#64748B]">
        Адвокатское бюро города Москвы «ЭТЛЕГИС» &copy; {new Date().getFullYear()} &bull; Система оперативного управления
      </footer>
    </div>
  );
}
