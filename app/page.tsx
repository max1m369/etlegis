'use client';

import React from 'react';
import HeronGridFrame from '@/components/ui/HeronGridFrame';
import HeronCursor from '@/components/ui/HeronCursor';
import HeronHeader from '@/components/layout/HeronHeader';
import HeronHero from '@/components/sections/HeronHero';
import HeronPractices from '@/components/sections/HeronPractices';
import HeronTeam from '@/components/sections/HeronTeam';
import HeronCases from '@/components/sections/HeronCases';
import HeronBlog from '@/components/sections/HeronBlog';
import HeronFooter from '@/components/layout/HeronFooter';

export default function HomePage() {
  return (
    <HeronGridFrame>
      <HeronCursor />
      <HeronHeader />
      <main className="w-full">
        <HeronHero />
        <HeronPractices />
        <HeronTeam />
        <HeronCases />
        <HeronBlog />
      </main>
      <HeronFooter />
    </HeronGridFrame>
  );
}
