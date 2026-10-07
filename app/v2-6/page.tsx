'use client';

import React from 'react';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import ChameleonLogo from '@/components/v26/ChameleonLogo';
import V26ChameleonNav from '@/components/v26/V26ChameleonNav';
import V26HeroSection from '@/components/v26/V26HeroSection';
import V26NumbersSection from '@/components/v26/V26NumbersSection';
import V26ServicesSection from '@/components/v26/V26ServicesSection';
import V26AboutSection from '@/components/v26/V26AboutSection';
import V26CasesSection from '@/components/v26/V26CasesSection';
import V26BlogSection from '@/components/v26/V26BlogSection';
import V26Footer from '@/components/v26/V26Footer';
import VersionSwitcher from '@/components/ui/VersionSwitcher';

export default function V26Page() {
  return (
    <SmoothScrollProvider>
      <div className="relative w-full min-h-screen bg-[#EAE6DF] font-body selection:bg-[#C5A059] selection:text-black">
        {/* Version Switcher HUD */}
        <VersionSwitcher currentVersion="2.6" />

        {/* Dual-layer Chameleon Monogram in Column 1 (20% rail) */}
        <ChameleonLogo />

        {/* Floating Chameleon Navigation on the right, aligned with logo */}
        <V26ChameleonNav />

        {/* Main Content (Strictly starts at 20% across all sections) */}
        <main className="w-full">
          <V26HeroSection />
          <V26NumbersSection />
          <V26ServicesSection />
          <V26AboutSection />
          <V26CasesSection />
          <V26BlogSection />
          <V26Footer />
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
