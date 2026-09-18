'use client'

import { useActionState, useRef } from 'react'
import { uploadMedia } from './actions'

export default function Uploader() {
  const [state, action, pending] = useActionState(uploadMedia, null)
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await action(formData)
        if (state?.ok) formRef.current?.reset()
      }}
      className="adm-form"
      style={{ padding: 24, marginBottom: 32 }}
    >
      <h2 style={{ fontSize: 16, marginBottom: 16 }}>Загрузить новый медиафайл</h2>

      {state?.error && <p role="alert" className="adm-alert" style={{ margin: '0 0 16px' }}>{state.error}</p>}
      {state?.ok && <p className="adm-ok" style={{ margin: '0 0 16px' }}>Файл успешно загружен</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, alignItems: 'flex-end' }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
            Файл (до 10 МБ, WebP/PNG/JPG/PDF) *
          </label>
          <input name="file" type="file" required className="adm-input" />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
            Alt-текст (описание изображения) *
          </label>
          <input
            name="alt"
            type="text"
            required
            placeholder="Адвокат Алексей Бирюков на заседании"
            className="adm-input"
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6 }}>
            Источник / Автор (необязательно)
          </label>
          <input name="credit" type="text" placeholder="Пресс-служба ETLEGIS" className="adm-input" />
        </div>

        <div>
          <button type="submit" disabled={pending} className="adm-btn adm-btn--primary" style={{ width: '100%', padding: '10px' }}>
            {pending ? 'Загрузка…' : 'Загрузить в медиатеку'}
          </button>
        </div>
      </div>
    </form>
  )
}
