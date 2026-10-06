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

/**
 * ETLEGIS Version 2.6 - Full Landing Page Structure
 * Architectural Grid Proportions: 20% (Logo Chameleon Rail) / 40% (Main Lead) / 40% (Trust & Action)
 * Palette: Prototype 10 (Light #EAE6DF ⇄ Dark Slate #223243 / #1F2C3B / #192430 / #090C11)
 * Chameleon Monogram: Dynamic dual-layer liquid clipping without glows or filters
 * Chameleon Navigation: Pinned on the right, horizontally aligned with the logo, Jost font, hides on scroll down, shows on scroll up, switches color with section
 * Embedded Interactive Diagnostics Quiz: Prominently featured right on the Hero screen (Col 3: 40%)
 * Full Classic Sections in 20/40/40 Grid:
 * 1. Hero + Diagnostics Quiz (Light #EAE6DF)
 * 2. Factoids & Numbers (Dark #1F2C3B)
 * 3. Services / Practices (Dark #223243)
 * 4. Team / Bureau Roster (Light #EAE6DF - 4-card horizontal scroll with wheel & drag)
 * 5. Successful Cases / Precedents (Dark #192430)
 * 6. Blog & Publications (Light #EAE6DF)
 * 7. Classic Boardroom Footer (Dark #090C11 with /footer-bg.webp photo & lead form)
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

        {/* Main Content (Strictly starts at 20% across all sections) */}
        <main className="w-full">
          {/* Section 1: Hero with Embedded Diagnostics Quiz (Light #EAE6DF) */}
          <V26HeroSection />

          {/* Section 2: Numbers & Factoids (Dark #1F2C3B) */}
          <V26NumbersSection />

          {/* Section 3: Services / Practices (Dark #223243) */}
          <V26ServicesSection />

          {/* Section 4: About / Team 4-Card Horizontal Carousel (Light #EAE6DF) */}
          <V26AboutSection />

          {/* Section 5: Successful Cases (Dark #192430) */}
          <V26CasesSection />

          {/* Section 6: Blog & Publications (Light #EAE6DF) */}
          <V26BlogSection />

          {/* Section 7: Classic Boardroom Table Footer (Dark #090C11) */}
          <V26Footer />
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
