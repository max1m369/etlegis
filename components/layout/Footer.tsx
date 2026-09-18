"use client";

import React, { useState } from "react";
import Link from "next/link";
import { companyContacts } from "@/lib/data/mock-data";
import { formatRuPhone, isValidRuPhone } from "@/lib/utils";
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldAlert, MessageSquare } from "lucide-react";

export default function Footer() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatRuPhone(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!name.trim()) {
      setErrorMsg("Пожалуйста, укажите ваше имя");
      return;
    }
    if (!isValidRuPhone(phone)) {
      setErrorMsg("Укажите корректный номер телефона РФ (+7 (XXX) XXX-XX-XX)");
      return;
    }
    if (!consent) {
      setErrorMsg("Необходимо согласие на обработку персональных данных");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      setErrorMsg("Произошла ошибка при отправке. Пожалуйста, позвоните нам напрямую.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contacts" className="relative bg-[#141517] text-[#ECECE8] pt-20 pb-12 overflow-hidden">
      {/* Subtle architectural atmosphere overlay */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-luminosity pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141517] via-[#141517]/95 to-[#141517]/85 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#2C2E33]">
          {/* Left Column: Mission, Positioning & Contacts */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white">
                et.legis
              </span>
              <p className="text-xs uppercase tracking-[0.25em] text-[#9B815C] mt-1 font-medium">
                {companyContacts.name}
              </p>
            </div>

            <p className="text-[#A1A4A8] text-sm sm:text-base leading-relaxed max-w-lg">
              Стратегический консалтинг, процессуальная защита бенефициаров и генеральных директоров в сложных арбитражных и уголовных спорах. С 2019 года спасаем ключевые активы и деловую репутацию клиентов.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#9B815C] mt-0.5 shrink-0" />
                <div>
                  <a
                    href="tel:+74951059115"
                    className="text-lg font-medium text-white hover:text-[#9B815C] transition-colors block"
                  >
                    {companyContacts.phone}
                  </a>
                  <span className="text-xs text-[#7E8288]">
                    {companyContacts.workingHours}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#9B815C] mt-0.5 shrink-0" />
                <div>
                  <a
                    href="mailto:info@etlegis.ru"
                    className="text-sm font-medium text-white hover:text-[#9B815C] transition-colors"
                  >
                    {companyContacts.email}
                  </a>
                  <span className="block text-xs text-[#7E8288]">
                    Для официальных запросов и судебных документов
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#9B815C] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-white">{companyContacts.address}</p>
                  <span className="text-xs text-[#7E8288]">Прием по предварительной записи</span>
                </div>
              </div>
            </div>

            {/* Direct Instant Messengers */}
            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href={companyContacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E2024] hover:bg-[#282B30] border border-[#34373D] text-xs font-medium text-white rounded-[2px] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
              <a
                href={companyContacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E2024] hover:bg-[#282B30] border border-[#34373D] text-xs font-medium text-white rounded-[2px] transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span>Telegram</span>
              </a>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-6">
            <div className="bg-[#1C1D21] border border-[#2D3036] p-6 sm:p-8 rounded-[2px]">
              <div className="flex items-center gap-2 text-[#9B815C] mb-2">
                <ShieldAlert size={16} />
                <span className="text-xs uppercase tracking-widest font-medium">Конфиденциально</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading text-white mb-2">
                Обсудить ситуацию с адвокатом
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A4A8] mb-6">
                Оставьте номер для связи. Мы проведем экспресс-анализ рисков и предложим план действий в течение 15 минут.
              </p>

              {isSubmitted ? (
                <div className="py-10 text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/80 text-emerald-400 flex items-center justify-center mb-3">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="text-xl font-heading text-white mb-2">Заявка принята</h4>
                  <p className="text-xs sm:text-sm text-[#A1A4A8] max-w-sm">
                    Дежурный партнер бюро свяжется с вами в ближайшее время.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {errorMsg && (
                    <div role="alert" className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-[2px]">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label htmlFor="footer-name" className="block text-xs uppercase tracking-wider text-[#A1A4A8] mb-1">
                      Ваше имя *
                    </label>
                    <input
                      id="footer-name"
                      type="text"
                      required
                      placeholder="Имя или должность"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#141517] border border-[#34373D] text-white text-sm rounded-[2px] focus:outline-none focus:border-[#9B815C] transition-colors placeholder:text-[#5E6267]"
                    />
                  </div>

                  <div>
                    <label htmlFor="footer-phone" className="block text-xs uppercase tracking-wider text-[#A1A4A8] mb-1">
                      Телефон *
                    </label>
                    <input
                      id="footer-phone"
                      type="tel"
                      required
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="w-full px-3.5 py-2.5 bg-[#141517] border border-[#34373D] text-white text-sm rounded-[2px] focus:outline-none focus:border-[#9B815C] transition-colors placeholder:text-[#5E6267] font-mono"
                    />
                  </div>

                  <div>
                    <label htmlFor="footer-message" className="block text-xs uppercase tracking-wider text-[#A1A4A8] mb-1">
                      Суть вопроса (кратко)
                    </label>
                    <textarea
                      id="footer-message"
                      rows={3}
                      placeholder="Опишите стадию процесса, сумму спора или характер проверки..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#141517] border border-[#34373D] text-white text-sm rounded-[2px] focus:outline-none focus:border-[#9B815C] transition-colors placeholder:text-[#5E6267] resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      id="footer-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded-[2px] text-[#9B815C] focus:ring-0 cursor-pointer bg-[#141517] border-[#34373D]"
                    />
                    <label htmlFor="footer-consent" className="text-[11px] text-[#7E8288] leading-tight cursor-pointer">
                      Согласен на обработку персональных данных в соответствии с Федеральным законом № 152-ФЗ
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-white text-[#141517] hover:bg-[#ECECE8] font-medium text-sm uppercase tracking-wider rounded-[2px] transition-all disabled:opacity-60 mt-2"
                  >
                    {isSubmitting ? "Отправка..." : "Обсудить ситуацию"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E8288]">
          <p>© {new Date().getFullYear()} {companyContacts.name}. Все права защищены.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Адвокатская тайна (ст. 8 ФЗ № 63-ФЗ)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
