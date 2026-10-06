'use client';

import React from 'react';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import ChameleonLogo from '@/components/v26/ChameleonLogo';
import V26ChameleonNav from '@/components/v26/V26ChameleonNav';
import V26HeroSection from '@/components/v26/V26HeroSection';
import V26ServicesSection from '@/components/v26/V26ServicesSection';
import V26AboutSection from '@/components/v26/V26AboutSection';
import V26ContactsSection from '@/components/v26/V26ContactsSection';
import V26Footer from '@/components/v26/V26Footer';
import VersionSwitcher from '@/components/ui/VersionSwitcher';

/**
 * ETLEGIS Version 2.6 - Landing Page
 * Architectural Grid Proportions: 20% (Logo Chameleon Rail) / 40% (Main Lead) / 40% (Trust & Action)
 * Palette: Prototype 10 (Light #EAE6DF ⇄ Dark Slate #223243)
 * Chameleon Monogram: Dynamic dual-layer liquid clipping without glows or filters ("Без всяких свечений, без всего")
 * Chameleon Navigation: Pinned on the right, horizontally aligned with the logo, Jost font, hides on scroll down, shows on scroll up, switches color with section
 * Typography: Amstelvar, Jost & Space Mono/Oswald from the main project
 */
export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <div className="relative w-full min-h-screen bg-[#EAE6DF] font-body selection:bg-[#C5A059] selection:text-black">
        {/* Version Switcher HUD */}
        <VersionSwitcher currentVersion="2.6" />

        {/* Dual-layer Chameleon Monogram in Column 1 (20% rail) */}
        <ChameleonLogo />

        {/* Floating Chameleon Navigation on the right, aligned with logo */}
        <V26ChameleonNav />

        {/* Main Content (Strictly starts at 20% across all 4 sections) */}
        <main className="w-full">
          {/* Section 1: Hero (Light #EAE6DF) */}
          <V26HeroSection />

          {/* Section 2: Services / Practices (Dark #223243) */}
          <V26ServicesSection />

          {/* Section 3: About / Team (Light #EAE6DF) */}
          <V26AboutSection />

          {/* Section 4: Contacts & Intake (Dark #223243) */}
          <V26ContactsSection />
        </main>

        {/* Architectural 20/40/40 Footer */}
        <V26Footer />
      </div>
    </SmoothScrollProvider>
  );
}
