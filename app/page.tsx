import React from "react";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Numbers from "@/components/sections/Numbers";
import { PracticesSection } from "@/components/sections/PracticesSection";
import Team from "@/components/sections/Team";
import Cases from "@/components/sections/Cases";
import Blog from "@/components/sections/Blog";
import Footer from "@/components/layout/Footer";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ScrollFadeIn>
          <Hero />
        </ScrollFadeIn>
        <ScrollFadeIn delay={0.1}>
          <Numbers />
        </ScrollFadeIn>
        <ScrollFadeIn delay={0.15}>
          <PracticesSection />
        </ScrollFadeIn>
        <ScrollFadeIn delay={0.15}>
          <Team />
        </ScrollFadeIn>
        <ScrollFadeIn delay={0.15}>
          <Cases />
        </ScrollFadeIn>
        <ScrollFadeIn delay={0.15}>
          <Blog />
        </ScrollFadeIn>
      </main>
      <Footer />
    </div>
  );
}
