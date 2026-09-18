import { Metadata } from 'next'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Diagnostics } from '@/components/blocks/Diagnostics'

export const metadata: Metadata = {
  title: 'Экспресс-диагностика юридических рисков бизнеса',
  description:
    'Онлайн-тест правовых рисков: оценка вероятности уголовного преследования, налоговых доначислений и субсидиарной ответственности.',
}

export default function DiagnosticsPage() {
  return (
    <div style={{ padding: '40px 0 110px' }}>
      <div className="wrap">
        <Breadcrumbs items={[{ label: 'Правовая диагностика' }]} />
      </div>
      <Diagnostics />
    </div>
  )
}
