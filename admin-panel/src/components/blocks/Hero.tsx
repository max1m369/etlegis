import React from 'react'
import Link from 'next/link'
import { Brackets } from '../motion/Brackets'
import { Alignment } from '../motion/Alignment'

interface HeroProps {
  title?: string
  lead?: string
}

export function Hero({
  title = 'Приводим ситуацию\nв выстроенную\nправовую позицию',
  lead = 'Защита бизнеса и его руководителей в уголовных, налоговых и банкротных делах. Работаем с 2019 года.',
}: HeroProps) {
  const formattedTitle = title.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < title.split('\n').length - 1 && <br />}
    </React.Fragment>
  ))

  return (
    <section
      className="hero"
      style={{
        position: 'relative',
        padding: '110px 0 120px',
        overflow: 'hidden',
      }}
    >
      <div className="grid-bg" />
      <div
        className="wrap"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 64,
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Brackets tone="line">
          <div className="eyebrow">Адвокатское бюро города Москвы</div>
          <h1
            style={{
              fontSize: 'clamp(38px, 5vw, 68px)',
              margin: '26px 0 28px',
            }}
          >
            {formattedTitle}
          </h1>
          <p className="lead" style={{ maxWidth: '34em' }}>
            {lead}
          </p>

          <div
            className="cta"
            style={{
              display: 'flex',
              gap: 16,
              margin: '40px 0 28px',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/contacts#consultation" className="btn">
              Бесплатная консультация
            </Link>
            <Link href="/cases" className="btn ghost">
              Смотреть кейсы
            </Link>
          </div>

          <div
            className="meta"
            style={{
              fontSize: 14,
              color: 'var(--text-2)',
              letterSpacing: '0.02em',
            }}
          >
            Москва, 1-й Магистральный тупик, 11, стр. 10 · +7 (495) 105-91-15
          </div>
        </Brackets>

        <div>
          <Alignment />
        </div>
      </div>
    </section>
  )
}
