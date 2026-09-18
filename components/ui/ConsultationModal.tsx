"use client";

import React, { useState, useEffect } from "react";
import { useConsultationModal } from "@/components/providers/ModalProvider";
import { formatRuPhone, isValidRuPhone } from "@/lib/utils";
import { X, CheckCircle2, ShieldCheck, PhoneCall } from "lucide-react";

export default function ConsultationModal() {
  const { isOpen, closeModal, initialNote } = useConsultationModal();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [consent, setConsent] = useState(true);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (initialNote) setQuestion(initialNote);
    } else {
      document.body.style.overflow = "";
      setIsSubmitted(false);
      setErrorMsg("");
    }
  }, [isOpen, initialNote]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRuPhone(e.target.value);
    setPhone(formatted);
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitted(true);
      setName("");
      setPhone("");
      setQuestion("");
    } catch {
      setErrorMsg("Произошла ошибка при отправке. Пожалуйста, позвоните нам напрямую.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
    >
      <div
        className="relative w-full max-w-lg bg-bg-surface border border-border-subtle p-6 sm:p-8 rounded-[2px] shadow-modal animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          aria-label="Закрыть окно"
          className="absolute top-5 right-5 text-text-muted hover:text-text-main p-1 transition-colors"
        >
          <X size={22} />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 id="modal-title" className="text-2xl sm:text-3xl font-heading text-text-main mb-2">
              Запрос принят
            </h3>
            <p className="text-text-muted text-sm sm:text-base max-w-sm mb-6">
              Дежурный адвокат бюро свяжется с вами в течение 15 минут для конфиденциального обсуждения ситуации.
            </p>
            <button
              onClick={closeModal}
              className="btn-legal-primary px-8 py-3 text-sm"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-accent-bronze mb-2">
              <ShieldCheck size={16} />
              <span className="text-xs uppercase tracking-widest font-semibold">Адвокатская тайна</span>
            </div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-heading font-medium text-text-main mb-2">
              Обсудить ситуацию
            </h2>
            <p className="text-text-muted text-xs sm:text-sm mb-6 leading-relaxed">
              Опишите задачу или обстоятельства проверки. Мы гарантируем полную конфиденциальность и оперативный анализ рисков.
            </p>

            {errorMsg && (
              <div role="alert" className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[2px]">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="modal-user-name" className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
                  Ваше имя *
                </label>
                <input
                  id="modal-user-name"
                  type="text"
                  required
                  placeholder="Иван Иванович"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-bg-primary border border-border-subtle rounded-[2px] text-text-main placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="modal-user-phone" className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
                  Телефон *
                </label>
                <input
                  id="modal-user-phone"
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full px-3 py-2.5 bg-bg-primary border border-border-subtle rounded-[2px] text-text-main placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-accent transition-colors font-mono"
                />
              </div>

              <div>
                <label htmlFor="modal-user-question" className="block text-xs font-medium text-text-muted mb-1 uppercase tracking-wider">
                  Суть вопроса (кратко)
                </label>
                <textarea
                  id="modal-user-question"
                  rows={3}
                  placeholder="Опишите характер спора, стадию проверки или обстоятельства дела..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-3 py-2.5 bg-bg-primary border border-border-subtle rounded-[2px] text-text-main placeholder:text-text-muted/50 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  id="modal-consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded-[2px] text-accent focus:ring-0 cursor-pointer"
                />
                <label htmlFor="modal-consent" className="text-[11px] text-text-muted leading-tight cursor-pointer">
                  Согласен на обработку персональных данных в соответствии с Федеральным законом № 152-ФЗ и условиями конфиденциальности бюро
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-legal-primary py-3 text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? "Отправка..." : "Обсудить ситуацию"}
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-xs text-text-muted">
                <PhoneCall size={12} className="text-accent-bronze" />
                <span>Экстренная связь 24/7: </span>
                <a href="tel:+74951059115" className="font-semibold text-text-main hover:underline">
                  +7 (495) 105-91-15
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
