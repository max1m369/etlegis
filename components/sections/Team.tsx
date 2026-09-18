"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { lawyers } from "@/lib/data/mock-data";
import { ArrowRight, Award } from "lucide-react";

export default function Team() {
  return (
    <section id="team" className="py-20 sm:py-28 bg-[#FFFFFF] border-t border-[#ECECE8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9B815C] font-semibold block mb-3">
              Лидеры практик
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-[#141517] leading-tight">
              Команда адвокатов бюро
            </h2>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href="/team"
              className="btn-legal-outline px-5 py-2.5 text-xs uppercase tracking-wider"
            >
              Вся команда бюро
            </Link>
          </div>
        </div>

        {/* Lawyers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="group bg-[#F8F9FA] border border-[#E2E2DC] rounded-[2px] overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Portrait with monochrome filter on hover */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECECE8]">
                  <img
                    src={lawyer.photoUrl}
                    alt={lawyer.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#141517]/85 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] uppercase tracking-widest font-mono rounded-[2px]">
                    Стаж {lawyer.experienceYears} лет
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9B815C] block mb-1">
                    {lawyer.status}
                  </span>
                  <h3 className="text-xl font-heading font-medium text-[#141517] mb-2 leading-snug">
                    {lawyer.name}
                  </h3>
                  <p className="text-xs text-[#5E6267] leading-relaxed line-clamp-3 mb-4">
                    {lawyer.specialization}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <Link
                  href={`/team/${lawyer.slug}`}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-[#E2E2DC] text-xs font-semibold uppercase tracking-wider text-[#141517] group-hover:text-[#9B815C] transition-colors"
                >
                  <span>Подробнее об адвокате</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
