import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { companyContacts } from "@/lib/data/mock-data";
import { Phone, Mail, MapPin, MessageSquare, Send, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты бюро — Адвокатское бюро Etlegis",
  description: "Контакты адвокатского бюро в Москве: телефон +7 (495) 105-91-15, адрес, мессенджеры, карта проезда.",
};

export default function ContactsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9B815C] font-semibold block mb-3">
              Связь с бюро
            </span>
            <h1 className="text-4xl sm:text-5xl font-heading font-medium text-[#141517] mb-6">
              Контакты и офис в Москве
            </h1>
            <p className="text-base sm:text-lg text-[#5E6267] leading-relaxed">
              Мы проводим конфиденциальные встречи в нашем офисе по предварительной договоренности. При неотложных следственных действиях дежурный адвокат выезжает немедленно.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border border-[#E2E2DC] rounded-[2px] p-8 shadow-subtle">
              <Phone className="text-[#9B815C] mb-4" size={24} />
              <span className="text-xs uppercase tracking-wider text-[#5E6267] block mb-1">
                Круглосуточный телефон
              </span>
              <a
                href="tel:+74951059115"
                className="text-xl font-heading font-semibold text-[#141517] hover:text-[#9B815C] transition-colors block mb-2"
              >
                {companyContacts.phone}
              </a>
              <span className="text-xs text-[#5E6267]">
                Оперативный дежурный адвокат: 24/7
              </span>
            </div>

            <div className="bg-white border border-[#E2E2DC] rounded-[2px] p-8 shadow-subtle">
              <Mail className="text-[#9B815C] mb-4" size={24} />
              <span className="text-xs uppercase tracking-wider text-[#5E6267] block mb-1">
                Электронная почта
              </span>
              <a
                href="mailto:info@etlegis.ru"
                className="text-xl font-heading font-semibold text-[#141517] hover:text-[#9B815C] transition-colors block mb-2"
              >
                {companyContacts.email}
              </a>
              <span className="text-xs text-[#5E6267]">
                Для процессуальных запросов и документов
              </span>
            </div>

            <div className="bg-white border border-[#E2E2DC] rounded-[2px] p-8 shadow-subtle">
              <MapPin className="text-[#9B815C] mb-4" size={24} />
              <span className="text-xs uppercase tracking-wider text-[#5E6267] block mb-1">
                Адрес офиса
              </span>
              <p className="text-lg font-heading font-semibold text-[#141517] mb-2">
                {companyContacts.address}
              </p>
              <span className="text-xs text-[#5E6267]">
                Парковка для доверителей по согласованию
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
