import { Reveal } from '../motion/Reveal'
import { Counter } from '../motion/Counter'

interface StatsProps {
  foundationYear?: number
  casesCount?: number
  amountClaimed?: number
  yearsPractice?: number
}

export function Stats({
  foundationYear = 2019,
  casesCount = 200,
  amountClaimed = 1.2,
  yearsPractice = 5,
}: StatsProps) {
  return (
    <section
      className="stats"
      style={{
        background: 'var(--inverse)',
        color: 'var(--inverse-text)',
        padding: '96px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="grid-bg" style={{ opacity: 0.05 }} />
      <div className="wrap" style={{ position: 'relative' }}>
        <div
          className="srow"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40,
            position: 'relative',
          }}
        >
          <div className="stat">
            <Reveal delay={0}>
              <b
                style={{
                  display: 'block',
                  fontFamily: "var(--f-display), 'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(36px, 4.2vw, 58px)',
                  lineHeight: 1,
                  paddingTop: 18,
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 26,
                    height: 2,
                    background: 'var(--brass)',
                  }}
                />
                <Counter to={foundationYear} plain />
              </b>
              <span
                style={{
                  display: 'block',
                  marginTop: 12,
                  fontSize: 14,
                  color: 'var(--inverse-2)',
                  maxWidth: '16em',
                }}
              >
                год основания бюро
              </span>
            </Reveal>
          </div>

          <div className="stat">
            <Reveal delay={100}>
              <b
                style={{
                  display: 'block',
                  fontFamily: "var(--f-display), 'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(36px, 4.2vw, 58px)',
                  lineHeight: 1,
                  paddingTop: 18,
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 26,
                    height: 2,
                    background: 'var(--brass)',
                  }}
                />
                <Counter to={casesCount} suffix="+" plain />
              </b>
              <span
                style={{
                  display: 'block',
                  marginTop: 12,
                  fontSize: 14,
                  color: 'var(--inverse-2)',
                  maxWidth: '16em',
                }}
              >
                успешно завершённых дел
              </span>
            </Reveal>
          </div>

          <div className="stat">
            <Reveal delay={200}>
              <b
                style={{
                  display: 'block',
                  fontFamily: "var(--f-display), 'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(36px, 4.2vw, 58px)',
                  lineHeight: 1,
                  paddingTop: 18,
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 26,
                    height: 2,
                    background: 'var(--brass)',
                  }}
                />
                <Counter to={amountClaimed} dec={1} suffix=" млрд ₽" />
              </b>
              <span
                style={{
                  display: 'block',
                  marginTop: 12,
                  fontSize: 14,
                  color: 'var(--inverse-2)',
                  maxWidth: '16em',
                }}
              >
                сумма выигранного спора
              </span>
            </Reveal>
          </div>

          <div className="stat">
            <Reveal delay={300}>
              <b
                style={{
                  display: 'block',
                  fontFamily: "var(--f-display), 'Jost', sans-serif",
                  fontWeight: 300,
                  fontSize: 'clamp(36px, 4.2vw, 58px)',
                  lineHeight: 1,
                  paddingTop: 18,
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 26,
                    height: 2,
                    background: 'var(--brass)',
                  }}
                />
                <Counter to={yearsPractice} suffix="+" plain />
              </b>
              <span
                style={{
                  display: 'block',
                  marginTop: 12,
                  fontSize: 14,
                  color: 'var(--inverse-2)',
                  maxWidth: '16em',
                }}
              >
                лет судебной практики
              </span>
            </Reveal>
          </div>
        </div>

        <Reveal delay={400}>
          <p
            className="note"
            style={{
              marginTop: 64,
              fontSize: 18,
              color: 'var(--inverse-2)',
              maxWidth: '44em',
              position: 'relative',
            }}
          >
            Наши практики получили высокую оценку в ведущих рейтингах и признаны одними из лучших в России.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
