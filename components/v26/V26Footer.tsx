'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { companyContacts } from '@/lib/data/mock-data';

export default function V26Footer() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreePersonalData, setAgreePersonalData] = useState(false);

  // Phone input formatting (+7 (XXX) XXX-XX-XX)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('8')) val = '7' + val.slice(1);
    if (!val.startsWith('7')) val = '7' + val;

    let formatted = '+7';
    if (val.length > 1) {
      formatted += ' (' + val.substring(1, 4);
    }
    if (val.length >= 5) {
      formatted += ') ' + val.substring(4, 7);
    }
    if (val.length >= 8) {
      formatted += '-' + val.substring(7, 9);
    }
    if (val.length >= 10) {
      formatted += '-' + val.substring(9, 11);
    }
    setPhone(formatted);
    if (hasError) setHasError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setHasError(true);
      setErrorMessage('Пожалуйста, укажите ваше имя и компанию');
      return;
    }
    if (phone.length < 16) {
      setHasError(true);
      setErrorMessage('Пожалуйста, введите корректный номер телефона');
      return;
    }
    if (!agreePrivacy || !agreePersonalData) {
      setHasError(true);
      setErrorMessage('Необходимо принять условия соглашений');
      return;
    }

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          contextTitle: 'Заявка из футера v2.6 (Первичная консультация)',
        }),
      });
    } catch {
      // ignore network errors
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setPhone('');
    }, 4000);
  };

  return (
    <footer
      id="sec-footer"
      data-bg="dark"
      className="relative w-full bg-[#090C11] text-white border-t border-white/10 overflow-hidden"
    >
      {/* 20% - 80% Architectural Grid */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[20%_80%]">
        
        {/* Col 1 (20%): Reserved rail for Chameleon Logo */}
        <div className="hidden lg:block w-full border-r border-white/10 pointer-events-none" />

        {/* Content Area (80%): Form (Box 1) + Contacts (Box 2) + Boardroom Photo (Box 3) */}
        <div className="w-full flex flex-col min-w-0">
          
          {/* Main 3-Zone Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-[38%_32%_30%] divide-y lg:divide-y-0">
            
            {/* 1. First Green Square: Primary Intake Form */}
            <div className="p-6 lg:p-8 xl:p-10 flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs text-[#C5A059] uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                  <span>// КОНСУЛЬТАЦИЯ ПАРТНЁРА</span>
                  <span className="w-6 h-px bg-[#C5A059]" />
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-white mb-2 leading-tight">
                  Первичная консультация — бесплатно
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6">
                  Оценим риски, определим квалификацию спора и наметим план процессуальных действий в течение 15 минут.
                </p>

                <form onSubmit={handleSubmit} className="w-full space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="v26-footer-name" className="sr-only">Ваше имя и компания</label>
                      <input
                        id="v26-footer-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (hasError) setHasError(false);
                        }}
                        placeholder="Ваше имя и компания"
                        className="w-full h-11 px-3.5 bg-[#0E1218]/90 backdrop-blur-md border border-white/20 rounded-sm text-white placeholder-neutral-400 font-sans text-xs focus:outline-none focus:border-[#C5A059] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="v26-footer-phone" className="sr-only">Номер телефона</label>
                      <input
                        id="v26-footer-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+7 (___) ___-__-__"
                        className={`w-full h-11 px-3.5 bg-[#0E1218]/90 backdrop-blur-md border ${
                          hasError && phone.length < 16 ? 'border-red-400' : 'border-white/20'
                        } rounded-sm text-white placeholder-neutral-400 font-sans text-xs focus:outline-none focus:border-[#C5A059] transition-colors`}
                      />
                    </div>
                  </div>

                  {/* Checkboxes: Privacy & Personal Data */}
                  <div className="space-y-2 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none group">
                      <input
                        type="checkbox"
                        checked={agreePrivacy}
                        onChange={(e) => {
                          setAgreePrivacy(e.target.checked);
                          if (hasError) setHasError(false);
                        }}
                        className="w-3.5 h-3.5 rounded-xs border border-white/30 bg-[#0E1218] text-[#C5A059] accent-[#C5A059] cursor-pointer shrink-0"
                      />
                      <span className="text-[11px] text-neutral-300 group-hover:text-white transition-colors font-light">
                        Соглашаюсь с{' '}
                        <a href="#privacy" className="underline hover:text-[#C5A059] transition-colors">
                          политикой конфиденциальности
                        </a>
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none group">
                      <input
                        type="checkbox"
                        checked={agreePersonalData}
                        onChange={(e) => {
                          setAgreePersonalData(e.target.checked);
                          if (hasError) setHasError(false);
                        }}
                        className="w-3.5 h-3.5 rounded-xs border border-white/30 bg-[#0E1218] text-[#C5A059] accent-[#C5A059] cursor-pointer shrink-0"
                      />
                      <span className="text-[11px] text-neutral-300 group-hover:text-white transition-colors font-light">
                        Даю согласие на{' '}
                        <a href="#privacy" className="underline hover:text-[#C5A059] transition-colors">
                          обработку персональных данных
                        </a>
                      </span>
                    </label>
                  </div>

                  {hasError && (
                    <span className="text-[11px] text-red-400 block font-light">
                      {errorMessage || 'Пожалуйста, заполните обязательные поля'}
                    </span>
                  )}

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitted || !agreePrivacy || !agreePersonalData}
                      className={`h-11 px-6 min-w-[200px] w-full sm:w-auto font-mono text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center justify-center ${
                        isSubmitted
                          ? 'bg-emerald-600 text-white'
                          : !agreePrivacy || !agreePersonalData
                          ? 'bg-[#9E8050]/40 text-[#0E1218]/60 cursor-not-allowed'
                          : 'bg-[#9E8050] text-[#0E1218] hover:bg-white hover:text-[#0E1218]'
                      }`}
                    >
                      {isSubmitted ? 'Отправлено ✓' : 'Получить консультацию'}
                    </button>
                  </div>

                  <p className="text-[10px] text-neutral-400 leading-relaxed pt-1 font-light">
                    Вся переданная информация охраняется законом об адвокатской тайне (ст. 8 ФЗ №63-ФЗ).
                  </p>
                </form>
              </div>
            </div>

            {/* 2. Second Green Square: Direct Contacts & Headquarters */}
            <div className="p-6 lg:p-8 xl:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-[#090C11]">
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#C5A059] font-medium mb-1.5">
                    // ШТАБ-КВАРТИРА & ПЕРЕГОВОРНЫЙ КОМПЛЕКС
                  </div>
                  <a
                    href="tel:+74951059115"
                    className="font-heading text-2xl sm:text-3xl font-semibold hover:text-[#C5A059] transition-colors block text-white tracking-tight"
                  >
                    +7 (495) 105-91-15
                  </a>
                  <div className="text-xs text-neutral-400 mt-1 font-light leading-relaxed">
                    Пн–Пт 09:00–19:00 (приём в переговорном комплексе по предварительной записи)
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-neutral-300 space-y-1 font-light">
                  <div className="font-medium text-white">{companyContacts.address}</div>
                  <div className="text-xs text-neutral-400">
                    Метро: {companyContacts.metro} · Башня «Федерация Восток», 46 этаж
                  </div>
                  <div className="pt-1">
                    <a
                      href={`mailto:${companyContacts.email}`}
                      className="text-xs text-[#C5A059] hover:underline font-mono"
                    >
                      {companyContacts.email}
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-x-5 gap-y-2 text-xs font-mono text-neutral-400">
                  <Link href="/practices" className="hover:text-white transition-colors">
                    Практики бюро
                  </Link>
                  <Link href="/team" className="hover:text-white transition-colors">
                    Команда адвокатов
                  </Link>
                  <Link href="/cases" className="hover:text-white transition-colors">
                    Судебные кейсы
                  </Link>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Пресс-центр
                  </Link>
                </div>
              </div>

              {/* Status footer inside contacts box */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#64748B]">
                <span>EXECUTIVE BOARDROOM // 46F</span>
                <span className="text-[#C5A059]">CONFIDENTIAL</span>
              </div>
            </div>

            {/* 3. Third Zone: Boardroom Table Photography */}
            <div className="relative w-full h-full min-h-[380px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10 group bg-[#141A23]">
              <img
                src="/footer-bg.webp"
                alt="Переговорный комплекс АБ «Этлегис»"
                className="absolute inset-0 w-full h-full object-cover object-[center_right] group-hover:scale-105 transition-transform duration-700 select-none"
              />
              {/* Subtle edge shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090C11]/90 via-transparent to-[#090C11]/30 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#090C11]/30 via-transparent to-transparent pointer-events-none" />

              {/* Boardroom Caption Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-white/90 bg-black/65 px-3 py-2 border border-white/15 backdrop-blur-md rounded-xs">
                <span>ПЕРЕГОВОРНЫЙ КОМПЛЕКС // 46F</span>
                <span className="text-[#C5A059]">МОСКВА-СИТИ</span>
              </div>
            </div>

          </div>

          {/* Bottom Hairline Requisites Bar */}
          <div className="border-t border-white/10 py-5 px-6 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] font-mono text-[#64748B]">
            <div>
              © 2019–2026 {companyContacts.legalName}. Все права защищены.
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span>ОГРН: {companyContacts.ogrn}</span>
              <span>·</span>
              <span>ИНН: {companyContacts.inn}</span>
              <span>·</span>
              <a href="#privacy" className="hover:text-white underline">
                Политика конфиденциальности
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
