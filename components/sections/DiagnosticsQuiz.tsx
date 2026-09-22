'use client';

import React, { useState } from 'react';

interface Question {
  id: string;
  question: string;
  options: { label: string; score: 'low' | 'med' | 'high' }[];
}

const questions: Question[] = [
  {
    id: 'sphere',
    question: '1. В какой сфере возникла правовая проблема или риск?',
    options: [
      { label: 'Уголовно-правовые риски / Экономические статьи (159, 199, 201 УК РФ)', score: 'high' },
      { label: 'Выездная или камеральная налоговая проверка (ФНС)', score: 'med' },
      { label: 'Банкротство компании или риск субсидиарной ответственности', score: 'high' },
      { label: 'Арбитражный спор / Корпоративный конфликт учредителей', score: 'med' },
    ],
  },
  {
    id: 'stage',
    question: '2. На какой стадии находится ситуация сейчас?',
    options: [
      { label: 'Предотвращение рисков (превентивный комплаенс / аудит)', score: 'low' },
      { label: 'Получен запрос / Требование о предоставлении документов', score: 'med' },
      { label: 'Идут выемки / Допросы / Проверка в самом разгаре', score: 'high' },
      { label: 'Дело передано в суд / Вынесено неблагоприятное решение', score: 'high' },
    ],
  },
  {
    id: 'amount',
    question: '3. Каков ориентировочный объём финансовых претензий или сумма спора?',
    options: [
      { label: 'До 10 млн рублей', score: 'low' },
      { label: 'От 10 до 50 млн рублей', score: 'med' },
      { label: 'От 50 до 300 млн рублей', score: 'high' },
      { label: 'Свыше 300 млн рублей / Крупный холдинг', score: 'high' },
    ],
  },
];

export default function DiagnosticsQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (optionText: string) => {
    const q = questions[currentStep];
    const nextAnswers = { ...answers, [q.id]: optionText };
    setAnswers(nextAnswers);

    if (currentStep < questions.length - 1) {
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

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setCompleted(false);
    setSubmitted(false);
    setError(null);
    setName('');
    setPhone('');
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError('Укажите номер телефона');
      return;
    }

    setLoading(true);
    setError(null);

    const summary = [
      `1. Сфера: ${answers.sphere || '—'}`,
      `2. Стадия: ${answers.stage || '—'}`,
      `3. Сумма спора: ${answers.amount || '—'}`,
    ].join('\n');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'Не указано',
          phone,
          message: summary,
          contextTitle: 'Экспресс-аудит рисков',
        }),
      });

      if (!res.ok) {
        throw new Error('Не удалось отправить заявку. Попробуйте еще раз или позвоните нам.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Ошибка соединения');
    } finally {
      setLoading(false);
    }
  };

  const progressPercent = Math.round(((currentStep + 1) / questions.length) * 100);

  return (
    <section id="diagnostics" className="py-24 sm:py-32 bg-[#F9F9F8] dark:bg-et-bg relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="text-xs sm:text-sm tracking-[0.25em] text-[#8C827A] dark:text-accent-bronze uppercase font-mono mb-4">
            ЭКСПРЕСС-АУДИТ
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] text-[#141517] dark:text-et-dark font-light tracking-tight leading-tight max-w-3xl mx-auto">
            Оценка юридических и уголовных рисков бизнеса
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-500 dark:text-et-muted max-w-xl mx-auto leading-relaxed">
            Пройдите 3 простых вопроса, чтобы получить предварительное заключение адвоката о критичности ситуации.
          </p>
        </div>

        {/* Quiz Card Container with Legal Corner Brackets */}
        <div className="max-w-[780px] mx-auto relative">
          {/* Subtle Top-Left and Bottom-Right corner brackets matching screenshot */}
          <div
            className="absolute -top-3 -left-3 w-7 h-7 pointer-events-none"
            style={{
              borderTop: '1px solid var(--border-subtle, #CFCFC7)',
              borderLeft: '1px solid var(--border-subtle, #CFCFC7)',
            }}
          />
          <div
            className="absolute -bottom-3 -right-3 w-7 h-7 pointer-events-none"
            style={{
              borderBottom: '1px solid var(--border-subtle, #CFCFC7)',
              borderRight: '1px solid var(--border-subtle, #CFCFC7)',
            }}
          />

          <div className="bg-white dark:bg-bg-surface border border-[#E8E8E2] dark:border-border-subtle shadow-[0_4px_25px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.3)] p-6 sm:p-10 lg:p-12 relative transition-colors">
            {!completed ? (
              <div>
                {/* Meta info header */}
                <div className="flex justify-between items-center text-xs sm:text-sm text-neutral-500 dark:text-et-muted mb-4">
                  <span>
                    Шаг {currentStep + 1} из {questions.length}
                  </span>
                  <span>Конфиденциально</span>
                </div>

                {/* Progress bar line */}
                <div className="w-full h-[2px] bg-[#EAEAEA] dark:bg-bg-subtle mb-8 sm:mb-10 relative overflow-hidden">
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-[#9B815C] dark:bg-accent-bronze transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Question */}
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-normal text-[#141517] dark:text-et-dark mb-6 sm:mb-8 leading-snug">
                  {questions[currentStep].question}
                </h3>

                {/* Options List */}
                <div className="flex flex-col gap-3.5 sm:gap-4">
                  {questions[currentStep].options.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelect(opt.label)}
                      className="group w-full text-left p-4 sm:p-5 bg-white dark:bg-bg-subtle border border-[#E5E7EB] dark:border-border-subtle hover:border-[#9B815C] dark:hover:border-accent-bronze shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-200 flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-sm sm:text-[15px] text-[#1C2530] dark:text-et-dark font-normal leading-relaxed group-hover:text-black dark:group-hover:text-accent-bronze">
                        {opt.label}
                      </span>
                      <span className="text-[#9B815C] dark:text-accent-bronze text-lg sm:text-xl font-light ml-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1.5">
                        →
                      </span>
                    </button>
                  ))}
                </div>

                {/* Back button */}
                {currentStep > 0 && (
                  <div className="mt-8 pt-4 border-t border-[#F0F0EC] dark:border-border-subtle">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-xs sm:text-sm text-neutral-500 dark:text-et-muted hover:text-neutral-900 dark:hover:text-et-dark transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>←</span>
                      <span>Назад к предыдущему вопросу</span>
                    </button>
                  </div>
                )}
              </div>
            ) : !submitted ? (
              <div>
                {/* Completion notification banner */}
                <div className="bg-[#FAF8F5] dark:bg-bg-subtle border border-[#9B815C]/40 p-6 sm:p-8 mb-8">
                  <div className="text-xl sm:text-2xl text-[#9B815C] dark:text-accent-bronze font-heading font-medium mb-3">
                    Диагностика завершена
                  </div>
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-et-muted leading-relaxed">
                    На основе ваших ответов сформирован первичный профиль риска. Укажите контакты, чтобы дежурный адвокат бюро направил индивидуальный план минимизации правовых угроз.
                  </p>

                  {/* Summary of answers */}
                  <div className="mt-5 pt-4 border-t border-[#9B815C]/20 flex flex-col gap-2 text-xs sm:text-sm text-neutral-600 dark:text-et-muted">
                    <div>
                      <span className="text-neutral-400 font-medium">Сфера:</span>{' '}
                      <span className="text-[#141517] dark:text-et-dark">{answers.sphere}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 font-medium">Стадия:</span>{' '}
                      <span className="text-[#141517] dark:text-et-dark">{answers.stage}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 font-medium">Сумма спора:</span>{' '}
                      <span className="text-[#141517] dark:text-et-dark">{answers.amount}</span>
                    </div>
                  </div>
                </div>

                {/* Lead Form */}
                <form onSubmit={handleSubmitLead} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs sm:text-sm text-red-700 dark:text-red-400">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-500 dark:text-et-muted mb-1.5">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Иван Иванов"
                      className="w-full bg-[#FAF9F7] dark:bg-bg-subtle border border-[#E5E5DE] dark:border-border-subtle px-4 py-3 text-sm text-[#141517] dark:text-et-dark placeholder-neutral-400 focus:outline-none focus:border-[#9B815C] dark:focus:border-accent-bronze transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-500 dark:text-et-muted mb-1.5">
                      Номер телефона *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full bg-[#FAF9F7] dark:bg-bg-subtle border border-[#E5E5DE] dark:border-border-subtle px-4 py-3 text-sm text-[#141517] dark:text-et-dark placeholder-neutral-400 focus:outline-none focus:border-[#9B815C] dark:focus:border-accent-bronze transition-colors"
                    />
                  </div>

                  <p className="text-[11px] text-neutral-400 leading-tight">
                    Конфиденциально. Отправляя форму, вы подтверждаете согласие на обработку персональных данных. Информация защищена адвокатской тайной.
                  </p>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#141517] dark:bg-accent-bronze text-white dark:text-[#0D0F12] hover:bg-[#9B815C] dark:hover:bg-accent-bronze-light transition-colors duration-200 py-3.5 px-6 text-sm uppercase tracking-wider font-semibold cursor-pointer disabled:opacity-50"
                    >
                      {loading ? 'Отправка...' : 'Получить правовое заключение'}
                    </button>
                  </div>
                </form>

                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={reset}
                    className="text-xs text-neutral-500 dark:text-et-muted hover:text-neutral-800 dark:hover:text-et-dark underline transition-colors cursor-pointer"
                  >
                    Пройти опрос заново
                  </button>
                </div>
              </div>
            ) : (
              /* Success confirmation state */
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F5] dark:bg-bg-subtle border border-[#9B815C] flex items-center justify-center mx-auto mb-4 text-[#9B815C] text-xl">
                  ✓
                </div>
                <h4 className="text-2xl font-serif text-[#141517] dark:text-et-dark mb-3">Заявка принята</h4>
                <p className="text-sm text-neutral-600 dark:text-et-muted max-w-md mx-auto mb-6 leading-relaxed">
                  Дежурный адвокат бюро уже получил ваши ответы по экспресс-аудиту и свяжется с вами в течение 15 минут для конфиденциального правового анализа.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-block text-xs uppercase tracking-wider text-[#9B815C] dark:text-accent-bronze hover:underline cursor-pointer"
                >
                  Пройти опрос заново
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
