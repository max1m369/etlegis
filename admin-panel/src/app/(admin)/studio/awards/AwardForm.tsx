'use client'

import { useActionState } from 'react'
import { saveAward, deleteAward } from './actions'
import { Text } from '../_components/Fields'

interface Props {
  doc?: any
}

export default function AwardForm({ doc }: Props) {
  const [state, action, pending] = useActionState(saveAward.bind(null, doc?.id ?? null), null)

  return (
    <form action={action} className="adm-form" style={{ maxWidth: 640 }}>
      {state?.error && <p role="alert" className="adm-alert">{state.error}</p>}
      {state?.ok && <p className="adm-ok">Сохранено успешно</p>}

      <div className="adm-grid">
        <Text
          name="year"
          type="number"
          label="Год рейтинга"
          defaultValue={doc?.year ?? new Date().getFullYear()}
          required
        />
        <Text
          name="publication"
          label="Рейтинг / Издание"
          placeholder="Право-300, Коммерсантъ..."
          defaultValue={doc?.publication}
          required
        />
        <Text
          name="category"
          label="Номинация / Практика"
          placeholder="Уголовное право (защита бизнеса)..."
          defaultValue={doc?.category}
          required
        />
        <Text
          name="band"
          label="Группа / Band"
          placeholder="Group 1 (Федеральный рейтинг)"
          defaultValue={doc?.band}
        />
        <Text
          name="url"
          label="Ссылка на публикацию рейтинга"
          placeholder="https://..."
          defaultValue={doc?.url}
        />

        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button type="submit" disabled={pending} className="adm-btn adm-btn--primary">
            {pending ? 'Сохранение…' : 'Сохранить награду'}
          </button>

          {doc && (
            <button
              type="button"
              className="adm-btn adm-btn--danger"
              onClick={() => confirm('Удалить?') && deleteAward(doc.id)}
            >
              Удалить
            </button>
          )}
        </div>
      </div>
    </form>
  )
}
