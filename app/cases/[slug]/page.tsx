import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cases, practices, lawyers } from "@/lib/data/mock-data";
import { ArrowLeft, Trophy, ShieldAlert, Scale, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return cases.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = cases.find((item) => item.slug === slug);
  if (!c) return {};

  return {
    title: `${c.title} — Кейс Адвокатского бюро Etlegis`,
    description: c.resultSummary,
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseItem = cases.find((c) => c.slug === slug);

  if (!caseItem) {
    notFound();
  }

  const practice = practices.find((p) => p.id === caseItem.practiceId);
  const caseLawyers = lawyers.filter((l) => caseItem.lawyerIds.includes(l.id));

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#5E6267] hover:text-[#141517] transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Все кейсы</span>
            </Link>
          </div>

          <div className="max-w-4xl mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {practice && (
                <Link
                  href={`/practices/${practice.slug}`}
                  className="px-2.5 py-1 bg-white border border-[#E2E2DC] text-[10px] uppercase tracking-wider font-semibold text-[#9B815C] rounded-[2px]"
                >
                  {practice.title}
                </Link>
              )}
              <span className="text-xs font-mono text-[#5E6267]">{caseItem.date} год</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-heading font-medium text-[#141517] mb-6 leading-tight">
              {caseItem.title}
            </h1>

            {caseItem.claimAmount && (
              <div className="inline-block p-4 bg-white border border-[#E2E2DC] rounded-[2px] shadow-subtle mb-6">
                <span className="text-xs uppercase tracking-wider text-[#5E6267] block mb-1">
                  Объем спорных финансовых обязательств:
                </span>
                <span className="text-3xl sm:text-4xl font-heading font-semibold text-[#141517]">
                  {caseItem.claimAmount}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Victory Summary Highlight */}
              <div className="p-6 sm:p-8 bg-[#141517] text-white rounded-[2px] shadow-card">
                <div className="flex items-center gap-2 text-[#9B815C] mb-3">
                  <Trophy size={20} />
                  <span className="text-xs uppercase tracking-widest font-semibold">Итог процесса</span>
                </div>
                <p className="text-base sm:text-lg leading-relaxed font-light">
                  {caseItem.resultSummary}
                </p>
                {caseItem.courtInstance && (
                  <div className="mt-4 pt-4 border-t border-[#2C2E33] text-xs text-[#A1A4A8]">
                    Судебная инстанция: <strong className="text-white">{caseItem.courtInstance}</strong>
                  </div>
                )}
              </div>

              {/* Challenge / Problem */}
              <div className="bg-white border border-[#E2E2DC] rounded-[2px] p-8 shadow-subtle">
                <h2 className="text-2xl font-heading font-semibold text-[#141517] mb-4 pb-3 border-b border-[#ECECE8]">
                  Обстоятельства спора и риски
                </h2>
                <p className="text-sm sm:text-base text-[#5E6267] leading-relaxed">
                  {caseItem.challenge}
                </p>
              </div>

              {/* Solution / Strategy */}
              <div className="bg-white border border-[#E2E2DC] rounded-[2px] p-8 shadow-subtle">
                <h2 className="text-2xl font-heading font-semibold text-[#141517] mb-4 pb-3 border-b border-[#ECECE8]">
                  Стратегия и правовая позиция бюро
                </h2>
                <p className="text-sm sm:text-base text-[#5E6267] leading-relaxed">
                  {caseItem.solution}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Responsible Lawyers */}
              <div className="bg-white border border-[#E2E2DC] rounded-[2px] p-6 shadow-subtle">
                <h3 className="text-base font-heading font-semibold text-[#141517] mb-4 pb-3 border-b border-[#ECECE8]">
                  Адвокаты, ведущие дело
                </h3>
                <div className="space-y-4">
                  {caseLawyers.map((l) => (
                    <Link
                      key={l.id}
                      href={`/team/${l.slug}`}
                      className="flex items-center gap-3.5 group"
                    >
                      <div className="w-12 h-14 bg-[#ECECE8] rounded-[2px] overflow-hidden shrink-0">
                        <img
                          src={l.photoUrl}
                          alt={l.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#141517] group-hover:text-[#9B815C] transition-colors leading-tight">
                          {l.name}
                        </h4>
                        <span className="text-[11px] text-[#5E6267] block mt-0.5">
                          {l.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Similar Problem CTA */}
              <div className="bg-white border border-[#141517] rounded-[2px] p-6 shadow-card">
                <span className="text-[10px] uppercase tracking-widest text-[#9B815C] font-semibold block mb-2">
                  Аналогичная ситуация?
                </span>
                <h3 className="text-lg font-heading font-medium text-[#141517] mb-2">
                  Защитим ваши активы в суде
                </h3>
                <p className="text-xs text-[#5E6267] leading-relaxed mb-6">
                  Проведем детальную экспертизу документов и оценим шансы победы в первой и вышестоящих инстанциях.
                </p>
                <a
                  href="#contacts"
                  className="btn-legal-primary w-full py-3 text-xs uppercase tracking-wider text-center block"
                >
                  Обсудить ситуацию
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
