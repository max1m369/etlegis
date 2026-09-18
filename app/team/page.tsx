import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { lawyers, practices } from "@/lib/data/mock-data";
import { ArrowRight, ShieldCheck, GraduationCap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Команда адвокатов — Адвокатское бюро Etlegis",
  description: "Адвокаты и партнеры бюро: опыт, образование, специализация в области корпоративного, налогового и уголовного права.",
};

export default function TeamIndexPage() {
  const getPracticeName = (id: string) => {
    return practices.find((p) => p.id === id)?.title || id;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9B815C] font-semibold block mb-3">
              Экспертиза и кадры
            </span>
            <h1 className="text-4xl sm:text-5xl font-heading font-medium text-[#141517] mb-6">
              Команда адвокатского бюро
            </h1>
            <p className="text-base sm:text-lg text-[#5E6267] leading-relaxed">
              Партнеры и адвокаты бюро обладают уникальным опытом ведения резонансных дел в высших судебных инстанциях и силовых ведомствах, совмещая академическую фундаментальность с жесткой практической эффективностью.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {lawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className="bg-white border border-[#E2E2DC] rounded-[2px] overflow-hidden shadow-subtle hover:shadow-card hover:border-[#141517] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECECE8]">
                    <img
                      src={lawyer.photoUrl}
                      alt={lawyer.name}
                      className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#141517]/85 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono rounded-[2px]">
                      Стаж {lawyer.experienceYears} лет
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#9B815C] block mb-1">
                      {lawyer.status}
                    </span>
                    <h2 className="text-2xl font-heading font-medium text-[#141517] mb-2 leading-snug">
                      {lawyer.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#5E6267] leading-relaxed mb-4">
                      {lawyer.specialization}
                    </p>

                    <div className="border-t border-[#ECECE8] pt-4 mb-4">
                      <span className="text-[11px] uppercase tracking-wider text-[#141517] font-semibold block mb-2">
                        Направления практик:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {lawyer.practiceIds.map((pid) => (
                          <span
                            key={pid}
                            className="px-2.5 py-1 bg-[#F8F9FA] border border-[#ECECE8] text-[10px] text-[#141517] rounded-[2px]"
                          >
                            {getPracticeName(pid)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/team/${lawyer.slug}`}
                    className="btn-legal-outline w-full py-3 text-xs uppercase tracking-wider text-center"
                  >
                    Подробнее об адвокате
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
