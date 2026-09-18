'use client'

import { useState } from 'react'
import { SectionHead } from '../ui/SectionHead'
import { Brackets } from '../motion/Brackets'
import { Button } from '../ui/Button'
import { LeadForm } from './LeadForm'

const questions = [
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
]

export function Diagnostics() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [completed, setCompleted] = useState(false)

  const handleSelect = (optionText: string) => {
    const q = questions[currentStep]
    const nextAnswers = { ...answers, [q.id]: optionText }
    setAnswers(nextAnswers)

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setCompleted(true)
    }
  }

  const reset = () => {
    setCurrentStep(0)
    setAnswers({})
    setCompleted(false)
  }

  return (
    <section
      id="diagnostics"
      style={{
        padding: '110px 0',
        background: 'var(--surface)',
        position: 'relative',
      }}
    >
      <div className="wrap">
        <SectionHead
          eyebrow="Экспресс-аудит"
          title="Оценка юридических и уголовных рисков бизнеса"
          description="Пройдите 3 простых вопроса, чтобы получить предварительное заключение адвоката о критичности ситуации."
          align="center"
        />

        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          {!completed ? (
            <Brackets tone="line">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 24,
                  fontSize: 13,
                  color: 'var(--text-2)',
                }}
              >
                <span>
                  Шаг {currentStep + 1} из {questions.length}
                </span>
                <span>Конфиденциально</span>
              </div>

              <div
                style={{
                  width: '100%',
                  height: 3,
                  background: 'var(--line)',
                  marginBottom: 36,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${((currentStep + 1) / questions.length) * 100}%`,
                    background: 'var(--brass)',
                    transition: 'width 0.3s var(--e)',
                  }}
                />
              </div>

              <h3 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', marginBottom: 28 }}>
                {questions[currentStep].question}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {questions[currentStep].options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelect(opt.label)}
                    style={{
                      textAlign: 'left',
                      padding: '18px 24px',
                      background: 'var(--card)',
                      border: '1px solid var(--line)',
                      color: 'var(--text)',
                      fontFamily: 'inherit',
                      fontSize: 15,
                      cursor: 'pointer',
                      transition: 'all 0.2s var(--e)',
                      boxShadow: 'var(--shadow)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    className="diag-opt"
                  >
                    <span>{opt.label}</span>
                    <span style={{ color: 'var(--brass)', marginLeft: 12 }}>→</span>
                  </button>
                ))}
              </div>

              {currentStep > 0 && (
                <div style={{ marginTop: 24 }}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-2)',
                      fontSize: 14,
                      cursor: 'pointer',
                    }}
                  >
                    ← Назад к предыдущему вопросу
                  </button>
                </div>
              )}
            </Brackets>
          ) : (
            <div>
              <div
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--brass)',
                  padding: 28,
                  marginBottom: 32,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--f-display), 'Jost'",
                    fontSize: 22,
                    color: 'var(--brass)',
                    marginBottom: 12,
                  }}
                >
                  Диагностика завершена
                </div>
                <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.5 }}>
                  На основе ваших ответов сформирован первичный профиль риска. Укажите контакты, чтобы дежурный адвокат бюро направил индивидуальный план минимизации правовых угроз.
                </p>
              </div>

              <LeadForm
                source="Экспресс-диагностика рисков"
                diagnosticsData={answers}
                title="Получить правовое заключение"
                subtitle="Мы подготовим экспресс-анализ судебных перспектив и свяжемся с вами в защищённом режиме."
              />

              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <button
                  type="button"
                  onClick={reset}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-2)',
                    fontSize: 13,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Пройти опрос заново
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .diag-opt:hover {
          border-color: var(--brass) !important;
          transform: translateX(4px);
        }
      `}</style>
    </section>
  )
}
