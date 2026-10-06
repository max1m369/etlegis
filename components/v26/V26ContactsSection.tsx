'use client';

import React, { useState } from 'react';

export default function V26ContactsSection() {
  const [name, setName] = useState('Бенефициар холдинга');
  const [phone, setPhone] = useState('+7 (999) 000-00-00');
  const [category, setCategory] = useState('Проверка ФНС / Налоговый спор');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section
      id="sec-contacts"
      data-bg="dark"
      className="relative w-full bg-[#223243] text-[#F3F5F8] border-b border-white/10"
    >
      {/* 20% - 40% - 40% Architectural Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[20%_40%_40%]">
        
        {/* Col 1 (20%): Reserved rail for Chameleon Logo */}
        <div className="hidden lg:block w-full border-r border-white/10 pointer-events-none" />

        {/* Col 2 (40%): Title & Office Coordinates */}
        <div className="p-6 lg:p-12 lg:border-r border-white/10 flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-[#C5A059] uppercase tracking-widest mb-2 font-bold">
              // ОФИС И СВЯЗЬ
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-white mb-8">
              Контакты
            </h2>

            <div className="flex flex-col gap-4">
              {/* Headquarters */}
              <div className="bg-[#1B2836] border border-white/12 rounded-sm p-5 shadow-sm">
                <div className="font-mono text-[10px] text-[#C5A059] uppercase tracking-wider font-bold mb-1">
                  ШТАБ-КВАРТИРА БЮРО
                </div>
                <div className="text-sm sm:text-base font-semibold text-white">
                  Москва-Сити, Башня «Федерация Восток»
                </div>
                <div className="text-xs text-[#94A3B8] mt-1">
                  Пресненская наб., 12, 46 этаж, переговорные комплексы А и Б
                </div>
              </div>

              {/* Emergency Hotline */}
              <div className="bg-[#1B2836] border border-white/12 rounded-sm p-5 shadow-sm">
                <div className="font-mono text-[10px] text-[#C5A059] uppercase tracking-wider font-bold mb-1">
                  ЭКСТРЕННАЯ ЛИНИЯ АДВОКАТА 24/7
                </div>
                <a
                  href="tel:+74952150815"
                  className="font-mono text-base sm:text-lg font-bold text-white hover:text-[#C5A059] transition-colors"
                >
                  +7 (495) 215-08-15
                </a>
                <div className="text-xs text-[#94A3B8] mt-1">
                  Круглосуточный дежурный адвокат по уголовным и следственным рискам
                </div>
              </div>

              {/* Email under NDA */}
              <div className="bg-[#1B2836] border border-white/12 rounded-sm p-5 shadow-sm">
                <div className="font-mono text-[10px] text-[#C5A059] uppercase tracking-wider font-bold mb-1">
                  КОНФИДЕНЦИАЛЬНЫЙ EMAIL ПОД NDA
                </div>
                <a
                  href="mailto:partner@etlegis.ru"
                  className="font-mono text-sm sm:text-base font-bold text-white hover:text-[#C5A059] transition-colors"
                >
                  partner@etlegis.ru
                </a>
                <div className="text-xs text-[#94A3B8] mt-1">
                  Все обращения защищены статьёй 8 Федерального закона «Об адвокатуре»
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Col 3 (40%): Schematic Intake Form */}
        <div className="p-6 lg:p-12 lg:pt-24 flex flex-col justify-center">
          <div className="bg-[#1B2836] border border-white/12 rounded-sm p-6 sm:p-8 flex flex-col gap-4 shadow-md">
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-1">
                Запрос правовой позиции
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Прямое обращение к дежурному партнёру. Тайна переписки гарантирована.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-sm text-center font-mono text-xs text-emerald-300">
                ✓ Запрос зашифрован и передан дежурному партнёру. Время ответа до 15 минут.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <div>
                  <label className="block font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider mb-1">
                    Имя или статус доверителя
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-sm p-3 text-xs sm:text-sm text-white font-mono outline-none focus:border-[#C5A059] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider mb-1">
                    Телефон или защищенный мессенджер
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/15 rounded-sm p-3 text-xs sm:text-sm text-white font-mono outline-none focus:border-[#C5A059] transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider mb-1">
                    Категория правового риска
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#243447] border border-white/15 rounded-sm p-3 text-xs sm:text-sm text-white font-mono outline-none focus:border-[#C5A059] transition-colors cursor-pointer"
                  >
                    <option>Проверка ФНС / Налоговый спор</option>
                    <option>Уголовно-правовой риск / Обыск</option>
                    <option>Субсидиарная ответственность (КДЛ)</option>
                    <option>Корпоративный конфликт / Арбитраж</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-2 bg-[#C5A059] hover:bg-[#D8B36E] text-[#12151D] font-mono text-xs font-bold uppercase tracking-wider py-3.5 px-4 rounded-sm transition-colors duration-200 text-center cursor-pointer shadow-sm"
                >
                  Передать дело партнёру под NDA →
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
