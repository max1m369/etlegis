import { Metadata } from 'next'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Brackets } from '@/components/motion/Brackets'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности и защита персональных данных',
  description:
    'Политика обработки персональных данных и гарантии соблюдения адвокатской тайны адвокатского бюро ETLEGIS.',
}

export default function PrivacyPage() {
  return (
    <div style={{ padding: '40px 0 110px' }}>
      <div className="wrap">
        <Breadcrumbs items={[{ label: 'Политика конфиденциальности' }]} />

        <div style={{ maxWidth: 880, margin: '0 auto 64px' }}>
          <Brackets tone="line">
            <div className="eyebrow">Юридическая информация</div>
            <h1 style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', margin: '16px 0 24px' }}>
              Политика конфиденциальности и адвокатская тайна
            </h1>
            <p className="lead" style={{ lineHeight: 1.6 }}>
              Адвокатское бюро города Москвы «ЭТЛЕГИС» гарантирует полную защиту персональных данных и строгое соблюдение адвокатской тайны в соответствии с законодательством РФ.
            </p>
          </Brackets>
        </div>

        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            fontSize: 16,
            lineHeight: 1.7,
            color: 'var(--text-2)',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
          }}
        >
          <section>
            <h2 style={{ fontSize: 22, color: 'var(--text)', marginBottom: 12 }}>
              1. Адвокатская тайна
            </h2>
            <p>
              В соответствии с Федеральным законом от 31.05.2002 № 63-ФЗ «Об адвокатской деятельности и адвокатуре в Российской Федерации», адвокатской тайной являются любые сведения, связанные с оказанием адвокатом юридической помощи своему доверителю.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 22, color: 'var(--text)', marginBottom: 12 }}>
              2. Сбор и обработка персональных данных
            </h2>
            <p>
              Мы собираем только те данные, которые вы добровольно предоставляете при заполнении форм обратной связи на сайте (имя, номер телефона, адрес электронной почты, текст сообщения).
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 22, color: 'var(--text)', marginBottom: 12 }}>
              3. Цели обработки
            </h2>
            <p>
              Персональные данные используются исключительно для связи с заявителем, проведения первичной юридической консультации и заключения соглашения об оказании юридической помощи.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 22, color: 'var(--text)', marginBottom: 12 }}>
              4. Непередача данных третьим лицам
            </h2>
            <p>
              Сведения, полученные через сайт или в ходе консультаций, не подлежат передаче третьим лицам, коммерческим структурам или государственным органам, за исключением случаев, прямо предусмотренных законодательством РФ.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
