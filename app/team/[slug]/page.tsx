import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { lawyers, practices, cases } from "@/lib/data/mock-data";
import { ArrowLeft, GraduationCap, Award, Briefcase, Trophy, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return lawyers.map((lawyer) => ({
    slug: lawyer.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lawyer = lawyers.find((l) => l.slug === slug);
  if (!lawyer) return {};

  return {
    title: `${lawyer.name} — Адвокатское бюро Etlegis`,
    description: `${lawyer.status}. ${lawyer.specialization}. Стаж ${lawyer.experienceYears} лет.`,
  };
}

export default async function LawyerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lawyer = lawyers.find((l) => l.slug === slug);

  if (!lawyer) {
    notFound();
  }

  const lawyerPractices = practices.filter((p) => lawyer.practiceIds.includes(p.id));
  const lawyerCases = cases.filter((c) => c.lawyerIds.includes(lawyer.id));

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#5E6267] hover:text-[#141517] transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Вся команда</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Portrait and Quick Meta */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-[#E2E2DC] rounded-[2px] p-6 shadow-subtle sticky top-28">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECECE8] rounded-[2px] mb-6">
                  <img
                    src={lawyer.photoUrl}
                    alt={lawyer.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 left-3 bg-[#141517]/85 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono rounded-[2px]">
                    Стаж {lawyer.experienceYears} лет
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#9B815C] block mb-1">
                      {lawyer.status}
                    </span>
                    <h1 className="text-2xl font-heading font-medium text-[#141517]">
                      {lawyer.name}
                    </h1>
                  </div>

                  <p className="text-xs text-[#5E6267] leading-relaxed">
                    {lawyer.specialization}
                  </p>

                  <a
                    href="#contacts"
                    className="btn-legal-primary w-full py-3 text-xs uppercase tracking-wider text-center block mt-4"
                  >
                    Обсудить ситуацию
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Bio, Education, Practices, Cases */}
            <div className="lg:col-span-8 space-y-12">
              {/* Bio */}
              <div className="bg-white border border-[#E2E2DC] rounded-[2px] p-8 sm:p-10 shadow-subtle">
                <h2 className="text-2xl font-heading font-semibold text-[#141517] mb-4 pb-3 border-b border-[#ECECE8]">
                  Профессиональный профиль
                </h2>
                <p className="text-sm sm:text-base text-[#5E6267] leading-relaxed">
                  {lawyer.bio}
                </p>
              </div>

              {/* Education */}
              <div className="bg-white border border-[#E2E2DC] rounded-[2px] p-8 sm:p-10 shadow-subtle">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#ECECE8]">
                  <GraduationCap className="text-[#9B815C]" size={20} />
                  <h2 className="text-2xl font-heading font-semibold text-[#141517]">
                    Образование и квалификация
                  </h2>
                </div>
                <ul className="space-y-3">
                  {lawyer.education.map((edu, idx) => (
                    <li key={idx} className="text-sm text-[#5E6267] flex items-start gap-3">
                      <span className="text-[#9B815C] font-mono text-xs mt-1">0{idx + 1}.</span>
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Linked Practices */}
              <div className="bg-white border border-[#E2E2DC] rounded-[2px] p-8 sm:p-10 shadow-subtle">
                <h2 className="text-2xl font-heading font-semibold text-[#141517] mb-6 pb-3 border-b border-[#ECECE8]">
                  Курируемые практики
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {lawyerPractices.map((p) => (
                    <Link
                      key={p.id}
                      href={`/practices/${p.slug}`}
                      className="p-4 bg-[#F8F9FA] border border-[#E2E2DC] rounded-[2px] hover:border-[#141517] transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="text-sm font-semibold text-[#141517] group-hover:text-[#9B815C] transition-colors mb-1">
                          {p.title}
                        </h4>
                        <p className="text-xs text-[#5E6267] line-clamp-2">
                          {p.shortDescription}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#141517] mt-3 uppercase tracking-wider">
                        <span>Перейти</span>
                        <ArrowRight size={12} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Linked Cases */}
              {lawyerCases.length > 0 && (
                <div className="bg-white border border-[#E2E2DC] rounded-[2px] p-8 sm:p-10 shadow-subtle">
                  <h2 className="text-2xl font-heading font-semibold text-[#141517] mb-6 pb-3 border-b border-[#ECECE8]">
                    Участие в ключевых делах
                  </h2>
                  <div className="space-y-4">
                    {lawyerCases.map((c) => (
                      <div
                        key={c.id}
                        className="p-5 bg-[#F8F9FA] border border-[#E2E2DC] rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          {c.claimAmount && (
                            <span className="text-xs font-mono text-[#9B815C] font-semibold block mb-1">
                              Сумма спора: {c.claimAmount}
                            </span>
                          )}
                          <h4 className="text-base font-heading font-semibold text-[#141517]">
                            {c.title}
                          </h4>
                          <p className="text-xs text-[#5E6267] mt-1">
                            {c.resultSummary}
                          </p>
                        </div>
                        <Link
                          href={`/cases/${c.slug}`}
                          className="btn-legal-outline px-4 py-2 text-xs uppercase tracking-wider shrink-0"
                        >
                          Разбор дела
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
