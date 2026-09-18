import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { practices } from "@/lib/data/mock-data";
import { ArrowRight, CheckCircle, Scale } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Практики бюро — Адвокатское бюро Etlegis",
  description: "Ключевые направления юридической защиты и консалтинга: уголовное право, корпоративные споры, налоговые споры, банкротство.",
};

export default function PracticesIndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9B815C] font-semibold block mb-3">
              Специализация
            </span>
            <h1 className="text-4xl sm:text-5xl font-heading font-medium text-[#141517] mb-6">
              Практики адвокатского бюро
            </h1>
            <p className="text-base sm:text-lg text-[#5E6267] leading-relaxed">
              Мы специализируемся на решении правовых конфликтов высшей категории сложности, когда на кону стоят миллионные и миллиардные активы, непрерывность бизнеса и свобода доверителей.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practices.map((practice, idx) => (
              <div
                key={practice.id}
                className="bg-white border border-[#E2E2DC] rounded-[2px] p-8 sm:p-10 shadow-subtle hover:shadow-card hover:border-[#141517] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-[#9B815C] uppercase tracking-widest block mb-2">
                    Направление 0{idx + 1}
                  </span>
                  <h2 className="text-2xl font-heading font-semibold text-[#141517] mb-4">
                    {practice.title}
                  </h2>
                  <p className="text-sm text-[#5E6267] leading-relaxed mb-6">
                    {practice.fullDescription}
                  </p>

                  <div className="border-t border-[#ECECE8] pt-6 mb-6">
                    <h3 className="text-xs uppercase tracking-wider text-[#141517] font-semibold mb-3">
                      Связанные услуги:
                    </h3>
                    <ul className="space-y-2">
                      {practice.services.map((s) => (
                        <li key={s.id} className="text-xs sm:text-sm text-[#5E6267] flex items-start gap-2">
                          <CheckCircle size={14} className="text-[#9B815C] mt-0.5 shrink-0" />
                          <span>{s.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={`/practices/${practice.slug}`}
                  className="btn-legal-primary py-3.5 px-6 text-xs uppercase tracking-wider text-center"
                >
                  Перейти к практике
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
