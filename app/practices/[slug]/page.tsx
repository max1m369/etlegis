import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { practices } from "@/lib/data/mock-data";
import { ArrowLeft, CheckCircle2, Trophy, ShieldAlert, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return practices.map((practice) => ({
    slug: practice.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const practice = practices.find((p) => p.slug === slug);
  if (!practice) return {};

  return {
    title: `${practice.title} — Адвокатское бюро Etlegis`,
    description: practice.shortDescription,
  };
}

export default async function PracticeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const practice = practices.find((p) => p.slug === slug);

  if (!practice) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/practices"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#5E6267] hover:text-[#141517] transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Все практики</span>
            </Link>
          </div>

          {/* Hero of Practice */}
          <div className="max-w-4xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9B815C] font-semibold block mb-3">
              Направление защиты
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-medium text-[#141517] mb-6 leading-tight">
              {practice.title}
            </h1>
            <p className="text-base sm:text-xl text-[#5E6267] leading-relaxed">
              {practice.fullDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content: Services */}
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-[#141517] mb-6">
                  Услуги в рамках практики
                </h2>

                <div className="space-y-6">
                  {practice.services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white border border-[#E2E2DC] rounded-[2px] p-6 sm:p-8 shadow-subtle"
                    >
                      <h3 className="text-xl font-heading font-semibold text-[#141517] mb-4">
                        {service.title}
                      </h3>

                      <div className="space-y-4 text-sm text-[#5E6267] leading-relaxed mb-6">
                        <div>
                          <strong className="text-[#141517] block mb-1">С какой проблемой обращаются:</strong>
                          <p>{service.problemStatement}</p>
                        </div>

                        <div>
                          <strong className="text-[#141517] block mb-1">Стратегия бюро:</strong>
                          <p>{service.solutionApproach}</p>
                        </div>
                      </div>

                      {service.keyAdvantages.length > 0 && (
                        <div className="border-t border-[#ECECE8] pt-4">
                          <span className="text-xs uppercase font-semibold tracking-wider text-[#141517] block mb-2">
                            Преимущества нашего подхода:
                          </span>
                          <ul className="space-y-1.5">
                            {service.keyAdvantages.map((adv, i) => (
                              <li key={i} className="text-xs text-[#5E6267] flex items-center gap-2">
                                <CheckCircle2 size={13} className="text-[#9B815C] shrink-0" />
                                <span>{adv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Cases */}
              {practice.cases.length > 0 && (
                <div className="pt-6">
                  <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-[#141517] mb-6">
                    Успешные дела в практике
                  </h2>
                  <div className="space-y-4">
                    {practice.cases.map((c) => (
                      <div
                        key={c.id}
                        className="bg-white border border-[#E2E2DC] rounded-[2px] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle hover:border-[#141517] transition-all"
                      >
                        <div>
                          <span className="text-xs font-mono text-[#9B815C] font-semibold block mb-1">
                            {c.claimAmount ? `Сумма спора: ${c.claimAmount}` : "Успешное завершение"}
                          </span>
                          <h4 className="text-base font-heading font-semibold text-[#141517]">
                            {c.title}
                          </h4>
                          <p className="text-xs text-[#5E6267] mt-1 line-clamp-2">
                            {c.resultSummary}
                          </p>
                        </div>
                        <Link
                          href={`/cases/${c.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#141517] hover:text-[#9B815C] shrink-0"
                        >
                          <span>Разбор кейса</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar: Lead Lawyers & Direct CTA */}
            <div className="lg:col-span-4 space-y-8">
              {/* Lead Lawyers Card */}
              <div className="bg-white border border-[#E2E2DC] rounded-[2px] p-6 shadow-subtle">
                <h3 className="text-lg font-heading font-semibold text-[#141517] mb-4 pb-3 border-b border-[#ECECE8]">
                  Ведущие юристы практики
                </h3>
                <div className="space-y-4">
                  {practice.leadLawyers.map((lawyer) => (
                    <Link
                      key={lawyer.id}
                      href={`/team/${lawyer.slug}`}
                      className="flex items-center gap-3.5 group"
                    >
                      <div className="w-12 h-14 bg-[#ECECE8] rounded-[2px] overflow-hidden shrink-0">
                        <img
                          src={lawyer.photoUrl}
                          alt={lawyer.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#141517] group-hover:text-[#9B815C] transition-colors leading-tight">
                          {lawyer.name}
                        </h4>
                        <span className="text-[11px] text-[#5E6267] block mt-0.5">
                          {lawyer.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Consultation Box */}
              <div className="bg-[#141517] text-white p-6 sm:p-8 rounded-[2px] shadow-card">
                <span className="text-[11px] uppercase tracking-widest text-[#9B815C] font-semibold block mb-2">
                  Экстренная консультация
                </span>
                <h3 className="text-xl font-heading font-medium mb-3">
                  Требуется правовая защита?
                </h3>
                <p className="text-xs text-[#ECECE8]/80 leading-relaxed mb-6">
                  Запишитесь на первичный конфиденциальный анализ вашей ситуации с руководителем практики.
                </p>
                <a
                  href="#contacts"
                  className="btn-legal-primary bg-white text-[#141517] hover:bg-[#ECECE8] w-full py-3 text-xs uppercase tracking-wider text-center block"
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
