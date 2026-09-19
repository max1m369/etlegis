'use client';

import React from 'react';

export default function DocumentFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-6 sm:p-10 md:p-14 bg-white border border-et-border/80 shadow-sm rounded-[2px] my-6 overflow-hidden">
      {/* 🌟 Top-Left Corner Bracket (Сверху-Слева) */}
      <div className="absolute top-4 left-4 w-12 h-12 pointer-events-none z-20">
        {/* Top Horizontal Stroke */}
        <div className="absolute top-0 left-0 w-full h-[1.5px] luxury-gradient-line" />
        {/* Left Vertical Stroke */}
        <div className="absolute top-0 left-0 h-full w-[1.5px] luxury-gradient-line" />
      </div>

      {/* 🌟 Bottom-Right Corner Bracket (Снизу-Справа) */}
      <div className="absolute bottom-4 right-4 w-12 h-12 pointer-events-none z-20">
        {/* Bottom Horizontal Stroke */}
        <div className="absolute bottom-0 right-0 w-full h-[1.5px] luxury-gradient-line" />
        {/* Right Vertical Stroke */}
        <div className="absolute bottom-0 right-0 h-full w-[1.5px] luxury-gradient-line" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
