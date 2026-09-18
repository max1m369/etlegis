import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import { saveSettings } from './actions'
import { Text, Textarea } from '../_components/Fields'

export const dynamic = 'force-dynamic'

export default async function SettingsAdminPage() {
  await requirePermission('settings', 'read')
  const payload = await getPayload()
  const settings = await payload.findGlobal({ slug: 'settings' }).catch(() => ({} as any))

  return (
    <div style={{ maxWidth: 720 }}>
      <header className="adm-head">
        <h1>Настройки сайта</h1>
      </header>

      <form action={saveSettings} className="adm-form">
        <div className="adm-grid">
          <fieldset className="adm-fieldset">
            <legend>Контакты</legend>
            <Text name="phone" label="Основной телефон" defaultValue={settings?.phone ?? '+7 (495) 105-91-15'} />
            <Text name="email" type="email" label="Email" defaultValue={settings?.email ?? 'info@etlegis.ru'} />
            <Textarea name="address" label="Адрес офиса" defaultValue={settings?.address ?? 'Москва, 1-й Магистральный тупик, 11, стр. 10'} />
            <Text name="workHours" label="Режим работы" defaultValue={settings?.workHours ?? 'Пн-Пт 09:00 - 20:00'} />
          </fieldset>

          <fieldset className="adm-fieldset">
            <legend>Главная страница (Hero)</legend>
            <Textarea name="heroTitle" label="Заголовок на первом экране" defaultValue={settings?.heroTitle ?? 'Приводим ситуацию в выстроенную правовую позицию'} />
            <Textarea name="heroLead" label="Подзаголовок на первом экране" defaultValue={settings?.heroLead ?? 'Защита бизнеса и его руководителей в уголовных, налоговых и банкротных делах. Работаем с 2019 года.'} />
          </fieldset>

          <div style={{ marginTop: 12 }}>
            <button type="submit" className="adm-btn adm-btn--primary">
              Сохранить настройки
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
