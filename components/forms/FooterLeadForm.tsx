'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function FooterLeadForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, contextTitle: 'Заявка из футера' }),
      });
      if (res.ok) setDone(true);
    } catch {
      alert('Ошибка при отправке. Пожалуйста, позвоните нам.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="bg-white/10 p-8 border border-white/20 text-center text-white">
        <h4 className="font-serif text-2xl mb-2">Запрос отправлен</h4>
        <p className="text-xs text-neutral-400">Мы свяжемся с вами в течение 15 минут.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="text-xs uppercase text-neutral-400 block mb-1">Ваше имя</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Иван Иванов"
          className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
        />
      </div>
      <div>
        <label className="text-xs uppercase text-neutral-400 block mb-1">Номер телефона</label>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+7 (___) ___-__-__"
          className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
        />
      </div>
      <div>
        <label className="text-xs uppercase text-neutral-400 block mb-1">Кратко опишите ситуацию</label>
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Судебный спор, проверка, субсидиарная ответственность..."
          className="w-full bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
        />
      </div>
      <p className="text-[10px] text-neutral-500 leading-tight">
        Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности и обработкой персональных данных.
      </p>
      <Button fullWidth type="submit" disabled={loading} className="bg-white text-et-dark hover:bg-neutral-200 border-white mt-4">
        {loading ? 'Отправка...' : 'Обсудить ситуацию'}
      </Button>
    </form>
  );
}
