"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { practices } from "@/lib/data/mock-data";
import {
  ShieldAlert,
  Briefcase,
  Scale,
  Gavel,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";

// Icon mapping helper
const iconMap: Record<string, React.ReactNode> = {
  ShieldAlert: <ShieldAlert className="w-6 h-6 text-[#9B815C]" />,
  Briefcase: <Briefcase className="w-6 h-6 text-[#9B815C]" />,
  Scale: <Scale className="w-6 h-6 text-[#9B815C]" />,
  Gavel: <Gavel className="w-6 h-6 text-[#9B815C]" />,
};

export default function Practices() {
  const [activePracticeIndex, setActivePracticeIndex] = useState(0);
  const [currentMobileSlide, setCurrentMobileSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Monitor mobile scroll to update slide indicator
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    if (clientWidth > 0) {
      const index = Math.round(scrollLeft / clientWidth);
      setCurrentMobileSlide(Math.max(0, Math.min(index, practices.length - 1)));
    }
  };

  const scrollToSlide = (index: number) => {
    if (!carouselRef.current) return;
    const slideWidth = carouselRef.current.clientWidth;
    carouselRef.current.scrollTo({
      left: index * slideWidth,
      behavior: "smooth",
    });
    setCurrentMobileSlide(index);
  };

  return (
    <section id="practices" className="py-20 sm:py-28 bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-[#141517] leading-tight">
              Практики адвокатского бюро
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href="/practices"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#141517] hover:text-[#9B815C] transition-colors group"
            >
              <span>Все направления практик</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Desktop View: Interactive High-End Grid with Hover Expansion */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {practices.map((practice, index) => {
            const isHovered = activePracticeIndex === index;
            return (
              <div
                key={practice.id}
                onMouseEnter={() => setActivePracticeIndex(index)}
                className={`bg-white border rounded-[2px] p-8 flex flex-col justify-between transition-all duration-300 ${
                  isHovered
                    ? "border-[#141517] shadow-card -translate-y-1.5"
                    : "border-[#E2E2DC] shadow-subtle hover:border-[#9B815C]"
                }`}
              >
                <div>
                  <div className="w-12 h-12 bg-[#F8F9FA] border border-[#ECECE8] rounded-[2px] flex items-center justify-center mb-6">
                    {iconMap[practice.iconName] || <Scale className="w-6 h-6 text-[#9B815C]" />}
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#5E6267] block mb-2">
                    0{index + 1} / ПРАКТИКА
                  </span>

                  <h3 className="text-xl font-heading font-medium text-[#141517] mb-3 leading-snug">
                    {practice.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5E6267] leading-relaxed mb-6">
                    {practice.shortDescription}
                  </p>

                  {/* Key Services in this Practice */}
                  <div className="border-t border-[#ECECE8] pt-4 mb-6">
                    <span className="text-[11px] uppercase tracking-wider text-[#141517] font-semibold block mb-2.5">
                      Услуги практики:
                    </span>
                    <ul className="space-y-2">
                      {practice.services.slice(0, 3).map((service) => (
                        <li key={service.id} className="text-xs text-[#5E6267] flex items-start gap-2">
                          <CheckCircle size={12} className="text-[#9B815C] mt-0.5 shrink-0" />
                          <span className="line-clamp-2">{service.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={`/practices/${practice.slug}`}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-[#ECECE8] text-xs font-semibold uppercase tracking-wider text-[#141517] group hover:text-[#9B815C] transition-colors"
                >
                  <span>Подробнее о практике</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Mobile View: Touch-Swipe Carousel with Zero Horizontal Overflow */}
        <div className="lg:hidden">
          <div
            ref={carouselRef}
            data-testid="practices-carousel"
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 pb-4 gap-4 touch-pan-x"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {practices.map((practice, index) => (
              <div
                key={practice.id}
                role="region"
                aria-roledescription="slide"
                aria-label={`Практика ${index + 1} из ${practices.length}: ${practice.title}`}
                className="w-[86vw] max-w-[340px] shrink-0 snap-center bg-white border border-[#E2E2DC] rounded-[2px] p-6 shadow-card flex flex-col justify-between select-none"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 bg-[#F8F9FA] border border-[#ECECE8] rounded-[2px] flex items-center justify-center">
                      {iconMap[practice.iconName] || <Scale className="w-5 h-5 text-[#9B815C]" />}
                    </div>
                    <span className="text-[10px] font-mono text-[#9B815C] font-semibold">
                      0{index + 1} / 0{practices.length}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-semibold text-[#141517] mb-2 leading-snug">
                    {practice.title}
                  </h3>

                  <p className="text-xs text-[#5E6267] leading-relaxed mb-4">
                    {practice.shortDescription}
                  </p>

                  <div className="border-t border-[#ECECE8] pt-3 mb-4">
                    <span className="text-[10px] uppercase tracking-wider text-[#141517] font-semibold block mb-2">
                      Ключевые услуги:
                    </span>
                    <ul className="space-y-1.5">
                      {practice.services.slice(0, 3).map((service) => (
                        <li key={service.id} className="text-[11px] text-[#5E6267] flex items-start gap-1.5">
                          <span className="text-[#9B815C]">•</span>
                          <span className="line-clamp-2">{service.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={`/practices/${practice.slug}`}
                  className="btn-legal-primary w-full py-3 text-xs uppercase tracking-wider text-center"
                >
                  Подробнее о практике
                </Link>
              </div>
            ))}
          </div>

          {/* Carousel Mobile Navigation Controls & Indicators */}
          <div className="flex items-center justify-between pt-4 px-1">
            <div className="flex items-center gap-1.5">
              {practices.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  aria-label={`Перейти к слайду ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentMobileSlide === idx
                      ? "w-6 bg-[#141517]"
                      : "w-1.5 bg-[#E2E2DC]"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToSlide(Math.max(0, currentMobileSlide - 1))}
                disabled={currentMobileSlide === 0}
                aria-label="Предыдущая практика"
                className="w-9 h-9 flex items-center justify-center rounded-[2px] border border-[#E2E2DC] bg-white text-[#141517] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollToSlide(Math.min(practices.length - 1, currentMobileSlide + 1))}
                disabled={currentMobileSlide === practices.length - 1}
                aria-label="Следующая практика"
                className="w-9 h-9 flex items-center justify-center rounded-[2px] border border-[#E2E2DC] bg-white text-[#141517] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
