'use client';

import React from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Numbers from "@/components/sections/Numbers";
import { PracticesSection } from "@/components/sections/PracticesSection";
import Team from "@/components/sections/Team";
import Cases from "@/components/sections/Cases";
import DiagnosticsQuiz from "@/components/sections/DiagnosticsQuiz";
import Blog from "@/components/sections/Blog";
import Footer from "@/components/layout/Footer";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
import VersionSwitcher from "@/components/ui/VersionSwitcher";

/**
 * Version 2.0 (Baseline Complete)
 * Complete classic structure with team card alignments, bottom cases/blog buttons, and favicon admin settings.
 */
export default function V2Page() {
  return (
    <div className="flex flex-col min-h-screen bg-et-bg text-et-dark">
      <VersionSwitcher currentVersion="2.0" />
      <Header />
      <main className="flex-grow">
        <ScrollFadeIn>
          <Hero />
        </ScrollFadeIn>
        <Numbers />
        <ScrollFadeIn delay={0.15}>
          <PracticesSection />
        </ScrollFadeIn>
        <Team />
        <ScrollFadeIn delay={0.15}>
          <Cases />
        </ScrollFadeIn>
        <ScrollFadeIn delay={0.15}>
          <DiagnosticsQuiz />
        </ScrollFadeIn>
        <ScrollFadeIn delay={0.15}>
          <Blog />
        </ScrollFadeIn>
      </main>
      <Footer />
    </div>
  );
}
