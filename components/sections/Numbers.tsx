"use client";

import React, { useRef, useEffect } from "react";
import { metricsData } from "@/lib/data/mock-data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Numbers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 -mt-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E2E2DC] rounded-[2px] shadow-card p-6 sm:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#ECECE8]">
            {metricsData.map((item, index) => (
              <div
                key={item.label}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`flex flex-col justify-between ${
                  index > 0 ? "pt-6 sm:pt-0 sm:pl-6 lg:pl-8" : ""
                }`}
              >
                <div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-heading text-4xl sm:text-5xl font-semibold text-[#141517] tracking-tight">
                      {item.value}
                    </span>
                    {item.suffix && (
                      <span className="font-heading text-2xl font-normal text-[#9B815C]">
                        {item.suffix}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-[#141517] mb-1">
                    {item.label}
                  </h3>
                </div>
                <p className="text-xs text-[#5E6267] leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
