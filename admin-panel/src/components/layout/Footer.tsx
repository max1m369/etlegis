import Link from 'next/link'

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--inverse)',
        color: 'var(--inverse-text)',
        padding: '80px 0 40px',
        borderTop: '1px solid var(--line)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="grid-bg" style={{ opacity: 0.05 }} />
      <div className="wrap" style={{ position: 'relative' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 48,
            marginBottom: 64,
          }}
        >
          {/* Колонка 1 */}
          <div>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                color: 'var(--inverse-text)',
                marginBottom: 20,
              }}
              aria-label="ETLEGIS — Главная"
            >
              <svg
                height="28"
                viewBox="0 0 633.6 124.6"
                fill="currentColor"
                style={{ display: 'block', width: 'auto' }}
                aria-hidden="true"
              >
                <path d="M113.4,31.3V11.9H35.8v19.4H12.5v81.5H94V89.5h19.4V70.1H55.2V58.4h58.2V42.9H55.2V31.3H113.4z M86.2,89.5V105 h-66V39h15.5v50.4H86.2z" />
                <g>
                  <path d="M214,85.9v9.8h-37.5V32.8H213v9.7h-26.2v16.4h23.9v9.5h-23.9v17.6H214z" />
                  <path d="M285.5,42.4h-18.4v53.3h-10.3V42.4h-18.4v-9.6h47.2V42.4z" />
                  <path d="M349.9,86v9.6h-36.5V32.8h10.3V86H349.9z" />
                  <path d="M415.3,85.9v9.8h-37.5V32.8h36.5v9.7h-26.2v16.4h23.9v9.5h-23.9v17.6H415.3z" />
                  <path d="M504.5,63.7c-0.3,19.3-13.3,33.1-31.7,33.1c-18.5,0-32.2-13.8-32.2-32.6c0-18.7,13.6-32.6,32-32.6 c15.3,0,28.2,9.7,31,23.3h-10.6c-2.7-8.1-10.7-13.4-20.2-13.4c-12.7,0-21.7,9.3-21.7,22.6c0,13.4,8.7,22.6,21.7,22.6 c10,0,18.2-5.7,20.6-14.2h-22.4v-8.9L504.5,63.7z" />
                  <path d="M534.3,32.8h10.3v62.9h-10.3V32.8z" />
                  <path d="M574.5,75.9H585c0,7,5.8,10.9,13.2,10.9c6.7,0,12.4-3.5,12.4-9.3c0-6.3-6.7-7.8-14.3-9.6 c-9.6-2.3-20.7-5-20.7-18c0-11.4,8.6-18.1,22-18.1c13.6,0,21.7,7.4,21.7,19.3h-10.2c0-6.3-5.2-9.7-11.8-9.7c-6.3,0-11.5,2.9-11.5,8 c0,5.8,6.5,7.4,13.9,9.2c9.8,2.4,21.3,5.2,21.3,18.7c0,12.6-10.2,19.3-22.9,19.3C584.1,96.6,574.5,88.7,574.5,75.9z" />
                </g>
              </svg>
            </Link>
            <p style={{ fontSize: 14, color: 'var(--inverse-2)', lineHeight: 1.6, maxWidth: 300 }}>
              Адвокатское бюро города Москвы. Защита бизнеса и руководителей в сложных уголовных, налоговых и банкротных процессах.
            </p>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <div
              style={{
                fontFamily: "var(--f-display), 'Jost', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 20,
                color: 'var(--brass)',
              }}
            >
              Разделы
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15 }}>
              <li>
                <Link href="/services" style={{ color: 'var(--inverse-2)', textDecoration: 'none' }}>
                  Услуги и практики
                </Link>
              </li>
              <li>
                <Link href="/cases" style={{ color: 'var(--inverse-2)', textDecoration: 'none' }}>
                  Судебная практика и кейсы
                </Link>
              </li>
              <li>
                <Link href="/team" style={{ color: 'var(--inverse-2)', textDecoration: 'none' }}>
                  Адвокаты и эксперты
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ color: 'var(--inverse-2)', textDecoration: 'none' }}>
                  О бюро и принципы
                </Link>
              </li>
              <li>
                <Link href="/awards" style={{ color: 'var(--inverse-2)', textDecoration: 'none' }}>
                  Рейтинги и награды
                </Link>
              </li>
              <li>
                <Link href="/media" style={{ color: 'var(--inverse-2)', textDecoration: 'none' }}>
                  Медиа и публикации
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Контакты */}
          <div>
            <div
              style={{
                fontFamily: "var(--f-display), 'Jost', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 20,
                color: 'var(--brass)',
              }}
            >
              Контакты
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, color: 'var(--inverse-2)' }}>
              <div>
                <a
                  href="tel:+74951059115"
                  style={{
                    color: 'var(--inverse-text)',
                    textDecoration: 'none',
                    fontSize: 18,
                    fontWeight: 500,
                    fontFamily: "var(--f-display), 'Jost', sans-serif",
                  }}
                >
                  +7 (495) 105-91-15
                </a>
              </div>
              <div>
                <a href="mailto:info@etlegis.ru" style={{ color: 'var(--inverse-2)', textDecoration: 'none' }}>
                  info@etlegis.ru
                </a>
              </div>
              <div style={{ lineHeight: 1.5 }}>
                Москва, 1-й Магистральный тупик, 11, стр. 10
              </div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>Пн-Пт 09:00 - 20:00</div>
            </div>
          </div>

          {/* Колонка 4: Консультация */}
          <div>
            <div
              style={{
                fontFamily: "var(--f-display), 'Jost', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 20,
                color: 'var(--brass)',
              }}
            >
              Правовой аудит
            </div>
            <p style={{ fontSize: 14, color: 'var(--inverse-2)', marginBottom: 20, lineHeight: 1.5 }}>
              Пройдите экспресс-диагностику рисков или запишитесь на первичную консультацию.
            </p>
            <Link href="/diagnostics" className="btn brass sm" style={{ width: '100%' }}>
              Оценить риски онлайн
            </Link>
          </div>
        </div>

        {/* Нижняя плашка */}
        <div
          style={{
            paddingTop: 32,
            borderTop: '1px solid rgba(189,195,199,0.15)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
            fontSize: 13,
            color: 'var(--inverse-2)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Адвокатское бюро «ЭТЛЕГИС». Все права защищены.
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>
              Политика конфиденциальности
            </Link>
            <Link href="/contacts" style={{ color: 'inherit', textDecoration: 'none' }}>
              Реквизиты
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
