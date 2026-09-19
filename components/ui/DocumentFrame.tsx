'use client';

import React from 'react';

export default function DocumentFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full py-8 px-0 sm:px-2 my-4">
      {/* 🌟 Top-Left Corner Bracket (Сверху-Слева) — выровнен точно по левой границе блока */}
      <div
        className="absolute top-0 left-0 pointer-events-none z-20"
        style={{
          width: 'var(--bracket-size, 44px)',
          height: 'var(--bracket-size, 44px)',
        }}
      >
        {/* Top Horizontal Arm */}
        <div
          className="absolute top-0 left-0 w-full luxury-gradient-line"
          style={{ height: 'var(--bracket-thickness, 1.5px)' }}
        />
        {/* Left Vertical Arm */}
        <div
          className="absolute top-0 left-0 h-full luxury-gradient-line"
          style={{ width: 'var(--bracket-thickness, 1.5px)' }}
        />
      </div>

      {/* 🌟 Bottom-Right Corner Bracket (Снизу-Справа) — выровнен точно по правой границе блока */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none z-20"
        style={{
          width: 'var(--bracket-size, 44px)',
          height: 'var(--bracket-size, 44px)',
        }}
      >
        {/* Bottom Horizontal Arm */}
        <div
          className="absolute bottom-0 right-0 w-full luxury-gradient-line"
          style={{ height: 'var(--bracket-thickness, 1.5px)' }}
        />
        {/* Right Vertical Arm */}
        <div
          className="absolute bottom-0 right-0 h-full luxury-gradient-line"
          style={{ width: 'var(--bracket-thickness, 1.5px)' }}
        />
      </div>

      {/* Контент кейса без белой подложки (на чистом фоне страницы) */}
      <div className="relative z-10 px-3 sm:px-6">
        {children}
      </div>
    </div>
  );
}
