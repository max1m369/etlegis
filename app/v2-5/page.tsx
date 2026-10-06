'use client';

import React from 'react';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import HeronGridFrame from '@/components/ui/HeronGridFrame';
import HeronCursor from '@/components/ui/HeronCursor';
import HeronHeader from '@/components/layout/HeronHeader';
import HeronHero from '@/components/sections/HeronHero';
import HeronPractices from '@/components/sections/HeronPractices';
import HeronTeam from '@/components/sections/HeronTeam';
import HeronCases from '@/components/sections/HeronCases';
import HeronBlog from '@/components/sections/HeronBlog';
import HeronFooter from '@/components/layout/HeronFooter';
import VersionSwitcher from '@/components/ui/VersionSwitcher';

/**
 * Version 2.5 (Heron AI Architecture)
 * 3D Monument, GSAP 19-step discrete dither pixel-mask button wipe, weightless 0.42 lerp cursor,
 * and Apple-style tactile grain overlay.
 */
export default function V25Page() {
  return (
    <SmoothScrollProvider>
      <HeronGridFrame>
        <VersionSwitcher currentVersion="2.5" />
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
    </SmoothScrollProvider>
  );
}
