'use client';

import React from 'react';
import Link from 'next/link';

interface VersionSwitcherProps {
  currentVersion: '2.0' | '2.5' | '2.6' | '2.7';
}

export default function VersionSwitcher({ currentVersion }: VersionSwitcherProps) {
  const versions: Array<{ id: 'hub' | '2.0' | '2.5' | '2.6' | '2.7'; label: string; href: string }> = [
    { id: 'hub', label: 'ХАБ', href: '/hub' },
    { id: '2.0', label: '1', href: '/v2' },
    { id: '2.6', label: '2', href: '/v2-6' },
    { id: '2.7', label: '3', href: '/v2-7' },
  ];

  return (
    <aside
      aria-label="Переключатель версий дизайна"
      className="fixed bottom-4 left-4 z-[9999] flex items-center gap-1 p-1 bg-[#12151D]/90 backdrop-blur-md border border-white/20 rounded-full shadow-2xl font-mono text-[12px] select-none pointer-events-auto"
    >
      {versions.map((ver) => {
        const isActive = currentVersion === ver.id;
        return (
          <Link
            key={ver.id}
            href={ver.href}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all duration-200 ${
              isActive
                ? 'bg-[#C5A059] text-[#12151D] shadow-md font-bold scale-105'
                : 'text-[#E2E8F0] hover:text-white hover:bg-white/10'
            }`}
          >
            {ver.label}
          </Link>
        );
      })}
    </aside>
  );
}
