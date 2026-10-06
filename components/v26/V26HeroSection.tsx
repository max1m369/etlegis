'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useConsultationModal } from '@/components/providers/ModalProvider';
import SeregaGentleText from '@/components/ui/SeregaGentleText';

const Monument3D = dynamic(() => import('@/components/ui/Monument3D'), {
  ssr: false,
});

interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; tag: string }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'sphere',
    question: 'В какой сфере возник правовой риск?',
    options: [
      { label: 'Уголовно-правовой риск / Статьи 159, 199 УК РФ', tag: 'УГОЛОВНОЕ' },
      { label: 'Выездная или встречная проверка ФНС РФ', tag: 'НАЛОГИ' },
      { label: 'Банкротство компании / Риск субсидиарной ответственности', tag: 'СУБСИДИАРКА' },
      { label: 'Сложный арбитраж / Корпоративный конфликт акционеров', tag: 'АРБИТРАЖ' },
    ],
  },
  {
    id: 'stage',
    question: 'На какой процессуальной стадии находится спор?',
    options: [
      { label: 'Превентивный аудит и устранение рисков', tag: 'ПРЕВЕНЦИЯ' },
      { label: 'Получен запрос / Требование о предоставлении документов', tag: 'ПРОВЕРКА' },
      { label: 'Идут следственные действия / Допросы / Выемки', tag: 'ЭКСТРЕННО' },
      { label: 'Дело в суде / Вынесено неблагоприятное решение', tag: 'СУД' },
    ],
  },
  {
    id: 'amount',
    question: 'Ориентировочный объём финансовых претензий?',
    options: [
      { label: 'До 10 млн рублей', tag: 'МАЛЫЙ' },
      { label: 'От 10 до 50 млн рублей', tag: 'СРЕДНИЙ' },
      { label: 'От 50 до 300 млн рублей', tag: 'КРУПНЫЙ' },
      { label: 'Свыше 300 млн рублей / Крупный бизнес', tag: 'ХОЛДИНГ' },
    ],
  },
];

export default function V26HeroSection() {
  const { openModal } = useConsultationModal();

  // Quiz interactive state embedded in Hero Col 3 (40%)
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSelectOption = (label: string) => {
    const q = QUIZ_QUESTIONS[currentStep];
    const updated = { ...answers, [q.id]: label };
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setCompleted(false);
    setIsSubmitted(false);
    setErrorMsg('');
    setPhone('');
    setName('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('8')) val = '7' + val.slice(1);
    if (!val.startsWith('7')) val = '7' + val;

    let formatted = '+7';
    if (val.length > 1) formatted += ' (' + val.substring(1, 4);
    if (val.length >= 5) formatted += ') ' + val.substring(4, 7);
    if (val.length >= 8) formatted += '-' + val.substring(7, 9);
    if (val.length >= 10) formatted += '-' + val.substring(9, 11);
    setPhone(formatted);
    if (errorMsg) setErrorMsg('');
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 16) {
      setErrorMsg('Укажите корректный номер телефона');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'Доверитель из квиза',
          phone,
          contextTitle: `Квиз-экспресс v2.6: ${answers.sphere || '—'} | ${answers.stage || '—'} | ${answers.amount || '—'}`,
        }),
      });
    } catch {
      // ignore network errors
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section
      id="sec-hero"
      data-bg="light"
      className="relative w-full min-h-screen bg-[#EAE6DF] text-[#19212C] pt-24 lg:pt-32 border-b border-[#19212C]/15"
    >
      {/* 20% - 40% - 40% Architectural Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-[20%_40%_40%] min-h-[calc(100vh-5rem)]">
        
        {/* Col 1 (20%): Reserved rail for Chameleon Logo */}
        <div className="hidden lg:block w-full border-r border-[#19212C]/10 pointer-events-none" />

        {/* Content Area: Cols 2 & 3 (Starts strictly at 20%) with 3D Monument behind */}
        <div className="col-span-1 lg:col-span-2 relative flex flex-col justify-center min-h-[calc(100vh-6rem)] overflow-hidden">
          
          {/* Centered 3D Monument in the background across Cols 2 & 3 */}
          <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
            <Monument3D
              centered={true}
              showBust={true}
              showFragments={false}
              zoom={0.95}
              className="w-full h-full opacity-90"
            />
          </div>

          {/* Main 2-Column Content Row (40% + 40%) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 px-4 lg:px-8 py-8 lg:py-12 items-center">
            
            {/* Col 2 (40%): Authentic Classic Headline, Lead & Direct Action */}
            <div className="flex flex-col justify-center">
              {/* Classic Exact Headline */}
              <h1 className="font-heading font-normal text-3xl sm:text-4xl lg:text-[44px] tracking-tight text-[#141517] leading-[1.12] mb-5">
                <span className="block font-semibold">
                  <SeregaGentleText delay={40} stagger={16}>
                    Мы — команда экспертов,
                  </SeregaGentleText>
                </span>
                <span className="block italic font-serif text-[#5A6472]">
                  <SeregaGentleText delay={220} stagger={14}>
                    которая знает, как защитить
                  </SeregaGentleText>
                </span>
                <span className="block font-semibold">
                  <SeregaGentleText delay={420} stagger={16}>
                    ваш бизнес.
                  </SeregaGentleText>
                </span>
              </h1>

              {/* Exact Classic Subtitle */}
              <p className="text-sm sm:text-base leading-relaxed text-[#5A6472] mb-6 max-w-lg">
                Стратегическое ведение дел, защита активов и топ-менеджмента. Практика с подтверждённым результатом в 1,2+ млрд ₽ сохранённых средств.
              </p>

              {/* Action Button & Hotline */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 border-t border-[#19212C]/10">
                <button
                  type="button"
                  onClick={() => openModal('Консультация под NDA — Главный экран')}
                  className="bg-[#19212C] hover:bg-[#C5A059] text-white hover:text-[#19212C] px-6 py-3.5 text-xs font-mono font-bold tracking-wider uppercase rounded-sm transition-all duration-200 shadow-sm cursor-pointer"
                >
                  Обсудить ситуацию →
                </button>
                <a
                  href="tel:+74952150815"
                  className="font-mono text-xs font-semibold text-[#19212C] hover:text-[#C5A059] transition-colors py-2"
                >
                  +7 (495) 215-08-15
                </a>
              </div>

              {/* Privilege seal */}
              <div className="font-mono text-[11px] text-[#64748B] mt-4 flex items-center gap-1.5">
                <span>🔒</span>
                <span>Тайна гарантирована ст. 8 Федерального закона «Об адвокатуре»</span>
              </div>
            </div>

            {/* Col 3 (40%): Diagnostics Quiz Directly on the Main Screen */}
            <div className="flex flex-col justify-center">
              <div className="bg-white/95 backdrop-blur-sm border border-[#19212C]/15 rounded-sm p-6 sm:p-7 flex flex-col justify-between shadow-lg h-full">
                
                {/* Quiz Header */}
                <div className="border-b border-[#19212C]/10 pb-4 mb-4">
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-[#C5A059] font-bold uppercase tracking-wider">
                      // ЭКСПРЕСС-ДИАГНОСТИКА РИСКОВ
                    </span>
                    <span className="text-[#64748B]">
                      {!completed ? `${currentStep + 1} / ${QUIZ_QUESTIONS.length}` : 'ЗАВЕРШЕНО'}
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full h-1 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C5A059] transition-all duration-300"
                      style={{
                        width: completed
                          ? '100%'
                          : `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Quiz Content Body */}
                <div className="flex-1 flex flex-col justify-center">
                  {!completed ? (
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-semibold text-[#0F172A] mb-4 leading-snug">
                        {QUIZ_QUESTIONS[currentStep].question}
                      </h3>

                      <div className="flex flex-col gap-2.5">
                        {QUIZ_QUESTIONS[currentStep].options.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSelectOption(opt.label)}
                            className="group w-full text-left p-3.5 bg-[#F8FAFC] hover:bg-[#19212C] border border-[#E2E8F0] hover:border-[#19212C] rounded-sm transition-all duration-200 flex items-center justify-between cursor-pointer"
                          >
                            <span className="text-xs sm:text-sm text-[#334155] group-hover:text-white transition-colors leading-relaxed">
                              {opt.label}
                            </span>
                            <span className="font-mono text-[10px] text-[#C5A059] ml-2 shrink-0 font-bold group-hover:text-[#C5A059]">
                              →
                            </span>
                          </button>
                        ))}
                      </div>

                      {currentStep > 0 && (
                        <button
                          type="button"
                          onClick={handleBack}
                          className="mt-4 font-mono text-[11px] text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
                        >
                          ← Назад к предыдущему вопросу
                        </button>
                      )}
                    </div>
                  ) : !isSubmitted ? (
                    <div>
                      <div className="bg-[#FAF8F5] border border-[#C5A059]/40 p-4 rounded-sm mb-4">
                        <div className="font-heading text-base font-bold text-[#0F172A] mb-1">
                          Профиль риска сформирован ✓
                        </div>
                        <p className="text-xs text-[#475569] leading-relaxed">
                          Дежурный адвокат бюро подготовит предварительную правовую позицию за 15 минут.
                        </p>
                        <div className="mt-2 pt-2 border-t border-[#C5A059]/20 font-mono text-[10px] text-[#64748B] space-y-0.5">
                          <div>Сфера: {answers.sphere}</div>
                          <div>Стадия: {answers.stage}</div>
                          <div>Сумма: {answers.amount}</div>
                        </div>
                      </div>

                      <form onSubmit={handleQuizSubmit} className="space-y-3">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ваше имя / Компания"
                          className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm text-xs font-mono text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#C5A059]"
                        />
                        <input
                          type="tel"
                          value={phone}
                          onChange={handlePhoneChange}
                          required
                          placeholder="+7 (___) ___-__-__"
                          className="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-sm text-xs font-mono text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#C5A059]"
                        />

                        {errorMsg && (
                          <div className="text-[11px] text-red-500 font-mono">{errorMsg}</div>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#19212C] hover:bg-[#C5A059] text-white hover:text-[#19212C] py-2.5 px-4 rounded-sm font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          {isSubmitting ? 'Передача...' : 'Получить план защиты под NDA →'}
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="w-10 h-10 mx-auto bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-lg mb-3">
                        ✓
                      </div>
                      <h4 className="font-heading text-lg font-bold text-[#0F172A] mb-1">
                        Данные приняты
                      </h4>
                      <p className="text-xs text-[#475569] leading-relaxed mb-4">
                        Дежурный партнёр уже анализирует вводные параметры. Звонок поступит в течение 15 минут.
                      </p>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="font-mono text-[11px] text-[#C5A059] hover:underline cursor-pointer"
                      >
                        Пройти повторно
                      </button>
                    </div>
                  )}
                </div>

                {/* Micro reassurance footer */}
                <div className="mt-4 pt-3 border-t border-[#19212C]/10 flex justify-between items-center font-mono text-[10px] text-[#64748B]">
                  <span>ДИАГНОСТИКА БЕСПЛАТНА</span>
                  <span className="text-[#C5A059] font-bold">15 МИНУТ</span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
