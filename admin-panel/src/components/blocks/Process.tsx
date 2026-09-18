import { SectionHead } from '../ui/SectionHead'
import { Card } from '../ui/Card'

const steps = [
  {
    num: '01',
    title: 'Аудит и локализация рисков',
    text: 'Проводим конфиденциальный экспресс-аудит фактов, первичной документации и процессуального статуса доверителя.',
  },
  {
    num: '02',
    title: 'Выстраивание правовой позиции',
    text: 'Разрабатываем многоуровневую тактику защиты, готовим доказательственную базу и контр-аргументы.',
  },
  {
    num: '03',
    title: 'Процессуальная защита',
    text: 'Непосредственное участие адвокатов на допросах, судебных заседаниях, проверках и переговорах.',
  },
  {
    num: '04',
    title: 'Фиксация результата',
    text: 'Закрепление победы в суде, прекращение преследования, снятие арестов и защита от повторных претензий.',
  },
]

export function Process() {
  return (
    <section style={{ padding: '110px 0' }}>
      <div className="wrap">
        <SectionHead
          eyebrow="Методология"
          title="Как мы ведём защиту интересов доверителя"
          description="Системный подход исключает случайности и обеспечивает контроль на каждом этапе дела."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {steps.map((step, index) => (
            <Card key={index} delay={index * 100}>
              <div
                style={{
                  fontFamily: "var(--f-display), 'Jost', sans-serif",
                  fontSize: 32,
                  fontWeight: 300,
                  color: 'var(--brass)',
                  marginBottom: 16,
                }}
              >
                {step.num}
              </div>
              <h3 style={{ fontSize: 20, marginBottom: 12 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
                {step.text}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
