"use client";

import React, { useState } from "react";
import Link from "next/link";
import { companyContacts } from "@/lib/data/mock-data";
import FooterBackgroundShader from "@/components/ui/FooterBackgroundShader";

export default function Footer() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreePersonalData, setAgreePersonalData] = useState(false);

  // Phone input formatting (+7 (XXX) XXX-XX-XX)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.startsWith("8")) val = "7" + val.slice(1);
    if (!val.startsWith("7")) val = "7" + val;

    let formatted = "+7";
    if (val.length > 1) {
      formatted += " (" + val.substring(1, 4);
    }
    if (val.length >= 5) {
      formatted += ") " + val.substring(4, 7);
    }
    if (val.length >= 8) {
      formatted += "-" + val.substring(7, 9);
    }
    if (val.length >= 10) {
      formatted += "-" + val.substring(9, 11);
    }
    setPhone(formatted);
    if (hasError) setHasError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setHasError(true);
      setErrorMessage("Пожалуйста, укажите ваше имя и компанию");
      return;
    }
    if (phone.length < 16) {
      setHasError(true);
      setErrorMessage("Пожалуйста, введите корректный номер телефона");
      return;
    }
    if (!agreePrivacy || !agreePersonalData) {
      setHasError(true);
      setErrorMessage("Необходимо принять условия соглашений");
      return;
    }

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          contextTitle: 'Заявка из футера (Первичная консультация)',
        }),
      });
    } catch {
      // ignore network errors
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName("");
      setPhone("");
    }, 4000);
  };

  return (
    <footer id="contacts" className="w-full relative bg-[#090C11] text-white border-t border-white/[0.08] overflow-hidden scroll-mt-20">
      {/* Three.js / WebGL Dark Ambient Shader from proto-13 */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-90">
        <FooterBackgroundShader />
      </div>

      {/* Executive Boardroom Ambient Background Image */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <img
          src="/footer-bg.webp"
          alt=""
          className="hidden md:block absolute top-0 h-full w-auto max-w-none object-cover pointer-events-none select-none"
          style={{
            right: "-8%",
            aspectRatio: "16/9",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, transparent 8%, rgba(0,0,0,0.4) 18%, black 32%, black 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, transparent 8%, rgba(0,0,0,0.4) 18%, black 32%, black 100%)",
          }}
        />
        <img
          src="/footer-bg.webp"
          alt=""
          className="md:hidden absolute inset-0 w-full h-full object-cover object-[65%_bottom] pointer-events-none select-none opacity-40"
        />
      </div>

      {/* Mobile Dark Protective Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[#090C11]/90 md:hidden" />

      {/* Desktop Directional Illumination Overlay:
          - Pure dark on the left (0-36%) protecting text, form, and contacts
          - Silky smooth natural transition across the marked boundary (36-58%)
          - Natural daylight boardroom view on the right
      */}
      <div
        className="absolute inset-0 pointer-events-none z-0 hidden md:block"
        style={{
          background: 'linear-gradient(to right, #090C11 0%, #090C11 36%, rgba(9, 12, 17, 0.8) 46%, transparent 58%)'
        }}
      />

      {/* Subtle top & bottom edge atmospheric vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(9, 12, 17, 0.4) 0%, transparent 12%, transparent 88%, rgba(7, 9, 13, 0.6) 100%)'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Tier 1: Consultation CTA + Integrated Lead Form */}
        <section className="pt-16 pb-6 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Col: Heading + Description + LeadForm */}
            <div className="lg:col-span-6 max-w-[580px] space-y-6">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] mb-4 text-[#F9F8F5]">
                  Первичная консультация — бесплатно
                </h2>
                <p className="font-sans text-sm md:text-base text-neutral-400 leading-relaxed font-light">
                  Оценим риски, определим квалификацию дела и наметим план процессуальных действий в течение 15 минут.
                </p>
              </div>

              {/* Form fields, checkboxes and submit button */}
              <form onSubmit={handleSubmit} className="w-full space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="footer-name" className="sr-only">Ваше имя и компания</label>
                    <input
                      id="footer-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (hasError) setHasError(false);
                      }}
                      placeholder="Ваше имя и компания"
                      className="w-full h-[50px] px-4 bg-[#0E1218]/80 backdrop-blur-md border border-white/20 rounded-[1px] text-white placeholder-neutral-400 font-sans text-sm focus:outline-none focus:border-[#C5A059] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="footer-phone" className="sr-only">Номер телефона</label>
                    <input
                      id="footer-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+7 (___) ___-__-__"
                      className={`w-full h-[50px] px-4 bg-[#0E1218]/80 backdrop-blur-md border ${
                        hasError && phone.length < 16 ? "border-red-400" : "border-white/20"
                      } rounded-[1px] text-white placeholder-neutral-400 font-sans text-sm focus:outline-none focus:border-[#C5A059] transition-colors`}
                    />
                  </div>
                </div>

                {/* Checkboxes: Privacy & Personal Data */}
                <div className="space-y-2 pt-0.5">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                    <input
                      type="checkbox"
                      checked={agreePrivacy}
                      onChange={(e) => {
                        setAgreePrivacy(e.target.checked);
                        if (hasError) setHasError(false);
                      }}
                      className="w-4 h-4 rounded-[1px] border border-white/30 bg-[#0E1218] text-[#C5A059] focus:ring-0 accent-[#C5A059] cursor-pointer shrink-0"
                    />
                    <span className="text-xs text-neutral-300 group-hover:text-white transition-colors font-light">
                      Соглашаюсь с{" "}
                      <a href="#privacy" className="underline hover:text-[#C5A059] transition-colors">
                        политикой конфиденциальности
                      </a>
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                    <input
                      type="checkbox"
                      checked={agreePersonalData}
                      onChange={(e) => {
                        setAgreePersonalData(e.target.checked);
                        if (hasError) setHasError(false);
                      }}
                      className="w-4 h-4 rounded-[1px] border border-white/30 bg-[#0E1218] text-[#C5A059] focus:ring-0 accent-[#C5A059] cursor-pointer shrink-0"
                    />
                    <span className="text-xs text-neutral-300 group-hover:text-white transition-colors font-light">
                      Даю согласие на{" "}
                      <a href="#privacy" className="underline hover:text-[#C5A059] transition-colors">
                        обработку персональных данных
                      </a>
                    </span>
                  </label>
                </div>

                {hasError && (
                  <span className="text-[11px] text-red-400 block font-light">
                    {errorMessage || "Пожалуйста, заполните обязательные поля"}
                  </span>
                )}

                {/* Submit button with accessible label matching CTA tests */}
                <div className="pt-2">
                  <button
                    type="submit"
                    aria-label="Обсудить ситуацию — Получить консультацию"
                    disabled={isSubmitted || !agreePrivacy || !agreePersonalData}
                    className={`h-[50px] px-8 min-w-[240px] w-full sm:w-auto font-mono text-xs font-semibold uppercase tracking-[0.12em] rounded-[1px] transition-all cursor-pointer flex items-center justify-center ${
                      isSubmitted
                        ? "bg-emerald-600 text-white"
                        : (!agreePrivacy || !agreePersonalData)
                        ? "bg-[#9E8050]/40 text-[#0E1218]/60 cursor-not-allowed"
                        : "bg-[#9E8050] text-[#0E1218] hover:bg-white hover:text-[#0E1218]"
                    }`}
                  >
                    {isSubmitted ? "Отправлено ✓" : "Получить консультацию"}
                  </button>
                </div>

                {/* Attorney-Client Privilege note */}
                <p className="text-[11px] text-neutral-400 leading-relaxed pt-1 font-light">
                  Вся переданная информация охраняется тайной следствия и законом об адвокатской тайне (ст. 8 ФЗ №63-ФЗ).
                </p>
              </form>
            </div>

            {/* Right Col: Open space showcasing illuminated boardroom */}
            <div className="hidden lg:block lg:col-span-6" />
          </div>
        </section>

        {/* Tier 2: Contacts & Navigation */}
        <section className="pt-6 pb-10 px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Column A: Contacts */}
            <div className="lg:col-span-3 space-y-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#C5A059] font-medium">
                Контакты
              </div>
              <div>
                <a
                  href={`tel:${companyContacts.phoneRaw || '+74951059115'}`}
                  className="font-sans text-2xl md:text-3xl font-semibold hover:text-[#C5A059] transition-colors block text-white tracking-tight"
                >
                  +7 (495) 105-91-15
                </a>
                <div className="text-xs text-neutral-400 font-sans mt-1">
                  Пн–Пт 09:00–19:00 (приём по предварительной записи)
                </div>
              </div>

              <div className="text-sm text-neutral-300 space-y-1 pt-1 font-light">
                <div>{companyContacts.address}</div>
                <div className="text-xs text-neutral-400">
                  Метро: {companyContacts.metro}
                </div>
                <div className="pt-1.5">
                  <a
                    href={`mailto:${companyContacts.email}`}
                    className="text-xs text-[#C5A059] hover:underline"
                  >
                    {companyContacts.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Column B: Navigation Menu */}
            <div className="lg:col-span-3 space-y-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#C5A059] font-medium">
                Навигация
              </div>
              <ul className="font-sans font-medium space-y-2 text-sm">
                <li>
                  <Link
                    href="/practices"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Практики бюро
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Команда адвокатов
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cases"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Судебные кейсы
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Пресс-центр и блог
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contacts"
                    className="text-neutral-300 hover:text-white transition-colors"
                  >
                    Запись на приём
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column C: Open space on the right */}
            <div className="hidden lg:block lg:col-span-6" />
          </div>
        </section>

        {/* Tier 3: Bottom Hairline + Logo in bottom-left corner + Requisites */}
        <section className="py-6 border-t border-white/[0.08] text-xs text-neutral-400 font-light px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Lower Left: Official ETLEGIS Logo & Copyright */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <Link
                href="/"
                className="inline-flex items-center group focus-visible:outline-2 focus-visible:outline-[#C5A059]"
                aria-label="ETLEGIS — На главную"
              >
                <svg
                  className="h-6 sm:h-7 w-auto fill-white/90 group-hover:fill-[#C5A059] transition-colors"
                  viewBox="0 0 633.6 124.6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M113.4,31.3V11.9H35.8v19.4H12.5v81.5H94V89.5h19.4V70.1H55.2V58.4h58.2V42.9H55.2V31.3H113.4z M86.2,89.5V105 h-66V39h15.5v50.4H86.2z"/>
                  <g>
                    <path d="M214,85.9v9.8h-37.5V32.8H213v9.7h-26.2v16.4h23.9v9.5h-23.9v17.6H214z"/>
                    <path d="M285.5,42.4h-18.4v53.3h-10.3V42.4h-18.4v-9.6h47.2V42.4z"/>
                    <path d="M349.9,86v9.6h-36.5V32.8h10.3V86H349.9z"/>
                    <path d="M415.3,85.9v9.8h-37.5V32.8h36.5v9.7h-26.2v16.4h23.9v9.5h-23.9v17.6H415.3z"/>
                    <path d="M504.5,63.7c-0.3,19.3-13.3,33.1-31.7,33.1c-18.5,0-32.2-13.8-32.2-32.6c0-18.7,13.6-32.6,32-32.6 c15.3,0,28.2,9.7,31,23.3h-10.6c-2.7-8.1-10.7-13.4-20.2-13.4c-12.7,0-21.7,9.3-21.7,22.6c0,13.4,8.7,22.6,21.7,22.6 c10,0,18.2-5.7,20.6-14.2h-22.4v-8.9L504.5,63.7z"/>
                    <path d="M534.3,32.8h10.3v62.9h-10.3V32.8z"/>
                    <path d="M574.5,75.9H585c0,7,5.8,10.9,13.2,10.9c6.7,0,12.4-3.5,12.4-9.3c0-6.3-6.7-7.8-14.3-9.6 c-9.6-2.3-20.7-5-20.7-18c0-11.4,8.6-18.1,22-18.1c13.6,0,21.7,7.4,21.7,19.3h-10.2c0-6.3-5.2-9.7-11.8-9.7c-6.3,0-11.5,2.9-11.5,8 c0,5.8,6.5,7.4,13.9,9.2c9.8,2.4,21.3,5.2,21.3,18.7c0,12.6-10.2,19.3-22.9,19.3C584.1,96.6,574.5,88.7,574.5,75.9z"/>
                  </g>
                </svg>
              </Link>
              <div className="h-4 w-px bg-white/20 hidden sm:block" />
              <div>
                © 2026 {companyContacts.legalName}. Все права защищены.
              </div>
            </div>

            {/* Requisites */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
              <span>ОГРН: <span className="font-semibold text-neutral-300">{companyContacts.ogrn}</span></span>
              <span>·</span>
              <span>ИНН: <span className="font-semibold text-neutral-300">{companyContacts.inn}</span></span>
              <span>·</span>
              <a href="#privacy" className="hover:text-white underline">
                Политика конфиденциальности
              </a>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
