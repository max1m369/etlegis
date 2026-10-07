'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const VERSIONS = [
  {
    num: '1',
    href: '/v2',
    preview: '/previews/v2_preview.webp',
  },
  {
    num: '2',
    href: '/v2-6',
    preview: '/previews/v26_preview.webp',
  },
  {
    num: '3',
    href: '/v2-7',
    preview: '/previews/v27_preview.webp',
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
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-20 flex-1 flex flex-col justify-center w-full">
        {/* 3 Large Numbered Version Cards (1, 2, 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 items-stretch">
          {VERSIONS.map((item) => (
            <Link
              key={item.num}
              href={item.href}
              className="group relative bg-[#161B22] border border-white/10 hover:border-[#C5A059] transition-all duration-300 rounded-xl overflow-hidden flex flex-col justify-between hover:shadow-[0_0_35px_rgba(197,160,89,0.2)] hover:-translate-y-1.5"
            >
              <div>
                {/* Large Thumbnail */}
                <div className="relative aspect-[16/11] w-full bg-black/40 overflow-hidden border-b border-white/10">
                  <Image
                    src={item.preview}
                    alt={`Концепция ${item.num}`}
                    fill
                    className="object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-transparent to-transparent opacity-60" />
                  
                  {/* Big bold number */}
                  <div className="absolute top-4 left-4 font-mono text-4xl sm:text-5xl font-black text-white bg-[#0D1117]/85 backdrop-blur-md px-4 py-1 rounded-lg border border-white/20">
                    {item.num}
                  </div>
                </div>

                <div className="p-6 text-center">
                  <div className="font-mono text-5xl font-black text-white group-hover:text-[#C5A059] transition-colors">
                    {item.num}
                  </div>
                </div>
              </div>

              {/* Bottom Launch Button */}
              <div className="p-6 pt-0">
                <div className="w-full py-3.5 px-4 bg-white/10 group-hover:bg-[#C5A059] text-white group-hover:text-[#0D1117] font-mono text-xs uppercase tracking-widest font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-center">
                  <span>Открыть концепцию</span>
                  <span className="text-base font-normal group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="border-t border-white/10 px-6 sm:px-12 py-6 text-center text-xs font-mono text-white/40">
        © 2019 — 2026 ETLEGIS
      </footer>
    </div>
  );
}
