"use client";

import React, { useRef, useEffect } from "react";
import { useConsultationModal } from "@/components/providers/ModalProvider";
import { useLenisScroll } from "@/components/providers/SmoothScrollProvider";
import { ArrowDown, ShieldCheck } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const { openModal } = useConsultationModal();
  const { scrollTo } = useLenisScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1.0 },
          "-=0.5"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Magnetic button effect on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.innerWidth < 768 || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(buttonRef.current, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-[#F8F9FA]"
    >
      {/* Subtle architectural atmosphere with soft vignette */}
      <div
        className="absolute inset-0 opacity-[0.035] bg-cover bg-center pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8F9FA]/60 to-[#F8F9FA] pointer-events-none" />

      {/* Decorative vertical boutique gridlines */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none flex justify-between opacity-15">
        <div className="w-[1px] h-full bg-[#141517]" />
        <div className="w-[1px] h-full bg-[#141517] hidden sm:block" />
        <div className="w-[1px] h-full bg-[#141517]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="max-w-4xl">
          {/* Trust Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E2E2DC] rounded-[2px] shadow-subtle mb-6"
          >
            <ShieldCheck size={14} className="text-[#9B815C]" />
            <span className="text-[11px] uppercase tracking-widest text-[#5E6267] font-medium">
              Адвокатское бюро города Москвы «Этлегис»
            </span>
          </div>

          {/* Heading */}
          <h1
            ref={titleRef}
            className="text-3xl sm:text-5xl lg:text-6xl font-heading font-normal text-[#141517] tracking-tight leading-[1.12] mb-6"
          >
            Защита интересов бизнеса в сложных судебных и уголовных процессах
          </h1>

          {/* Subtitle */}
          <p
            ref={descRef}
            className="text-base sm:text-lg text-[#5E6267] font-normal leading-relaxed max-w-2xl mb-10"
          >
            Стратегический консалтинг, снижение персональных рисков руководства и бескомпромиссная защита корпоративных активов при проверках и конфликтах.
          </p>

          {/* CTA Group */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
          >
            <button
              ref={buttonRef}
              onClick={() => openModal()}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="btn-legal-primary px-8 py-4 text-sm uppercase tracking-widest text-center shadow-subtle cursor-pointer"
            >
              Обсудить ситуацию
            </button>

            <button
              onClick={() => scrollTo("#practices")}
              className="btn-legal-outline px-6 py-4 text-sm text-[#141517] hover:border-[#141517] flex items-center justify-center gap-2 group transition-all"
            >
              <span>Смотреть практики</span>
              <ArrowDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
