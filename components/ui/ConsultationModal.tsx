'use client';

import { useConsultationModal } from '@/lib/store/useConsultationModal';
import { Button } from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import { formatRuPhone, isValidRuPhone } from '@/lib/utils';

export function ConsultationModal() {
  const { isOpen, contextTitle, closeModal } = useConsultationModal();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setIsSubmitted(false);
      setErrorMsg('');
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatRuPhone(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Пожалуйста, укажите ваше имя');
      return;
    }
    if (!isValidRuPhone(phone)) {
      setErrorMsg('Укажите корректный номер телефона РФ (+7 (XXX) XXX-XX-XX)');
      return;
    }

    setErrorMsg('');
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Затемняющий оверлей */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />

      {/* Контейнер модалки */}
      <div className="relative w-full max-w-lg bg-white border border-et-border p-6 sm:p-10 shadow-2xl z-10">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-et-muted hover:text-et-dark text-xl font-light p-2"
          aria-label="Закрыть"
        >
          ✕
        </button>

        <span className="text-[10px] uppercase tracking-widest text-et-accent font-semibold block mb-2">
          Конфиденциальный запрос
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-et-dark mb-2">
          Обсудить ситуацию
        </h3>
        {contextTitle && (
          <p className="text-xs text-et-accent font-medium mb-4">Тема: {contextTitle}</p>
        )}
        <p className="text-xs text-et-muted mb-6 leading-relaxed">
          Адвокат бюро свяжется с вами в течение 15 минут для первичной правовой оценки обстоятельств.
        </p>

        {isSubmitted ? (
          <div className="bg-et-bg p-6 text-center border border-et-border">
            <h4 className="font-serif text-lg font-medium text-et-dark mb-2">Запрос принят</h4>
            <p className="text-xs text-et-muted">Партнер бюро уже ознакамливается с деталями обращения.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {errorMsg && (
              <div role="alert" className="p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-[2px]">
                {errorMsg}
              </div>
            )}

            <div>
              <label htmlFor="modal-name" className="text-[11px] uppercase tracking-wider text-et-muted block mb-1">
                Ваше имя / ФИО доверителя
              </label>
              <input
                id="modal-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван Иванов"
                className="w-full bg-et-bg border border-et-border px-3.5 py-2.5 text-xs text-et-dark placeholder-neutral-400 focus:outline-none focus:border-et-dark transition-colors"
              />
            </div>
            <div>
              <label htmlFor="modal-phone" className="text-[11px] uppercase tracking-wider text-et-muted block mb-1">
                Телефон для защищенной связи
              </label>
              <input
                id="modal-phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+7 (___) ___-__-__"
                className="w-full bg-et-bg border border-et-border px-3.5 py-2.5 text-xs text-et-dark placeholder-neutral-400 focus:outline-none focus:border-et-dark transition-colors"
              />
            </div>
            <div>
              <label htmlFor="modal-details" className="text-[11px] uppercase tracking-wider text-et-muted block mb-1">
                Суть вопроса (кратко)
              </label>
              <textarea
                id="modal-details"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Стадия спора, проверка, субсидиарный иск..."
                className="w-full bg-et-bg border border-et-border px-3.5 py-2.5 text-xs text-et-dark placeholder-neutral-400 focus:outline-none focus:border-et-dark transition-colors resize-none"
              />
            </div>
            <p className="text-[10px] text-neutral-400 leading-tight">
              Нажимая кнопку, вы подтверждаете согласие на обработку персональных данных в соответствии с Федеральным законом № 152-ФЗ.
            </p>
            <Button fullWidth type="submit" className="mt-4">
              Обсудить ситуацию
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ConsultationModal;
