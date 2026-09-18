'use client'

import { useState } from 'react'
import { Brackets } from '../motion/Brackets'
import { Button } from '../ui/Button'

interface LeadFormProps {
  source?: string
  diagnosticsData?: any
  title?: string
  subtitle?: string
}

export function LeadForm({
  source = 'Главная страница',
  diagnosticsData,
  title = 'Получить правовой анализ ситуации',
  subtitle = 'Оставьте контакты — дежурный адвокат свяжется с вами в течение 15 минут для конфиденциального разбора дела.',
}: LeadFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(true)
  const [hp, setHp] = useState('') // Honeypot field
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !phone.trim()) {
      setError('Пожалуйста, укажите имя и телефон')
      return
    }

    if (!consent) {
      setError('Необходимо согласие на обработку персональных данных')
      return
    }

    // Anti-bot honeypot check
    if (hp) {
      setSubmitted(true)
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          message: message || undefined,
          source,
          consent: true,
          hp,
          diagnostics: diagnosticsData || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Ошибка при отправке заявки')
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Не удалось отправить заявку. Попробуйте позвонить нам напрямую.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <Brackets tone="brass">
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div
            style={{
              fontFamily: "var(--f-display), 'Jost'",
              fontSize: 32,
              color: 'var(--brass)',
              marginBottom: 16,
            }}
          >
            Заявка принята
          </div>
          <p className="lead" style={{ maxWidth: 480, margin: '0 auto 24px' }}>
            Адвокат бюро уже получил ваше обращение и свяжется с вами в ближайшее время.
          </p>
          <div style={{ fontSize: 14, color: 'var(--text-2)' }}>
            Если вопрос требует срочного вмешательства (обыск, задержание) — звоните прямо сейчас:{' '}
            <a href="tel:+74951059115" style={{ color: 'var(--text)', fontWeight: 500 }}>
              +7 (495) 105-91-15
            </a>
          </div>
        </div>
      </Brackets>
    )
  }

  return (
    <Brackets tone="line">
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div className="eyebrow" style={{ textAlign: 'center', width: '100%' }}>
          Консультация & Аудит
        </div>
        <h3 style={{ fontSize: 'clamp(24px, 3vw, 36px)', textAlign: 'center', marginBottom: 12 }}>
          {title}
        </h3>
        <p
          style={{
            fontSize: 15,
            color: 'var(--text-2)',
            textAlign: 'center',
            marginBottom: 36,
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Honeypot hidden input */}
          <input
            type="text"
            name="website"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: 'var(--text-2)', marginBottom: 6 }}>
                Ваше имя *
              </label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="Алексей"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, color: 'var(--text-2)', marginBottom: 6 }}>
                Номер телефона *
              </label>
              <input
                type="tel"
                required
                className="input-field"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-2)', marginBottom: 6 }}>
              Электронная почта (необязательно)
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="name@company.ru"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-2)', marginBottom: 6 }}>
              Кратко опишите ситуацию или статью
            </label>
            <textarea
              className="textarea-field"
              placeholder="Налоговая проверка / Претензии контрагента / Уголовное дело..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          <label
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              fontSize: 13,
              color: 'var(--text-2)',
              cursor: 'pointer',
              marginTop: 4,
            }}
          >
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              style={{ marginTop: 3 }}
            />
            <span>
              Нажимая кнопку, вы подтверждаете согласие на обработку персональных данных и сохранение адвокатской тайны в соответствии с{' '}
              <a href="/privacy" style={{ color: 'var(--text)', textDecoration: 'underline' }} target="_blank">
                Политикой
              </a>.
            </span>
          </label>

          {error && (
            <div
              style={{
                padding: '12px 16px',
                background: 'rgba(231, 76, 60, 0.1)',
                border: '1px solid #E74C3C',
                color: '#E74C3C',
                fontSize: 14,
              }}
            >
              {error}
            </div>
          )}

          <Button type="submit" variant="brass" size="lg" disabled={loading} style={{ marginTop: 12 }}>
            {loading ? 'Отправка...' : 'Отправить обращение'}
          </Button>
        </form>
      </div>
    </Brackets>
  )
}
