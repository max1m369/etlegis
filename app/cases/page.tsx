import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cases, practices } from "@/lib/data/mock-data";
import { Trophy, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кейсы и победы — Адвокатское бюро Etlegis",
  description: "Успешные дела адвокатского бюро: защита активов на миллиарды рублей, прекращение уголовных дел, спасение от субсидиарной ответственности.",
};

export default function CasesIndexPage() {
  const getPracticeTitle = (id: string) => {
    return practices.find((p) => p.id === id)?.title || "Арбитраж";
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9B815C] font-semibold block mb-3">
              Судебная статистика
            </span>
            <h1 className="text-4xl sm:text-5xl font-heading font-medium text-[#141517] mb-6">
              Выигранные дела доверителей
            </h1>
            <p className="text-base sm:text-lg text-[#5E6267] leading-relaxed">
              Более 1,2 млрд рублей защищенных и сохраненных активов доверителей. Подробный разбор прецедентных споров в арбитражных судах и органах предварительного следствия.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-[#E2E2DC] rounded-[2px] p-6 sm:p-8 flex flex-col justify-between shadow-subtle hover:shadow-card hover:border-[#141517] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#ECECE8]">
                    <span className="text-[10px] uppercase font-semibold text-[#9B815C] tracking-wider">
                      {getPracticeTitle(c.practiceId)}
                    </span>
                    <span className="text-xs font-mono text-[#5E6267]">{c.date}</span>
                  </div>

                  {c.claimAmount && (
                    <div className="mb-4">
                      <span className="text-[11px] uppercase tracking-wider text-[#5E6267] block">
                        Сумма спора:
                      </span>
                      <span className="text-3xl font-heading font-semibold text-[#141517]">
                        {c.claimAmount}
                      </span>
                    </div>
                  )}

                  <h2 className="text-xl font-heading font-medium text-[#141517] mb-3 leading-snug">
                    {c.title}
                  </h2>

                  <p className="text-xs text-[#5E6267] leading-relaxed line-clamp-3 mb-6">
                    {c.challenge}
                  </p>

                  <div className="p-3.5 bg-[#F8F9FA] border border-[#ECECE8] rounded-[2px] mb-6">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#141517] mb-1">
                      <Trophy size={13} className="text-[#9B815C]" />
                      <span>Итог:</span>
                    </div>
                    <p className="text-xs text-[#5E6267] leading-relaxed">
                      {c.resultSummary}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/cases/${c.slug}`}
                  className="btn-legal-primary py-3 text-xs uppercase tracking-wider text-center"
                >
                  Читать подробный разбор
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
