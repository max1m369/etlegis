'use client'

import { useActionState, useState } from 'react'
import { saveEmployee, deleteEmployee } from './actions'
import { Text, Textarea, Checkbox, Relation, SlugInput } from '../_components/Fields'
import RichText from '../_components/RichText'
import MediaPicker from '../_components/MediaPicker'
import { translit } from '@/lib/translit'

interface Props {
  doc?: any
  practices: any[]
}

export default function EmployeeForm({ doc, practices }: Props) {
  const [state, action, pending] = useActionState(saveEmployee.bind(null, doc?.id ?? null), null)
  const [tab, setTab] = useState<'profile' | 'details' | 'seo'>('profile')
  const [status, setStatus] = useState(doc?._status ?? 'published')

  const [name, setName] = useState(doc?.name ?? '')
  const [slug, setSlug] = useState(doc?.slug ?? '')
  const [isSlugManual, setIsSlugManual] = useState(Boolean(doc?.slug))

  const handleNameChange = (val: string) => {
    setName(val)
    if (!isSlugManual) {
      setSlug(translit(val))
    }
  }

  const handleSlugChange = (val: string) => {
    setSlug(val)
    setIsSlugManual(true)
  }

  const handleResetSlug = () => {
    setIsSlugManual(false)
    setSlug(translit(name))
  }

  const specializationText = doc?.specialization?.map((s: any) => s.item).join('\n') ?? ''
  const educationText = doc?.education?.map((e: any) => e.item).join('\n') ?? ''

  return (
    <form action={action} className="adm-form">
      <div className="adm-form__bar">
        <div className="adm-tabs">
          {(['profile', 'details', 'seo'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={tab === t ? 'is-active' : ''}
            >
              {t === 'profile' ? 'Профиль' : t === 'details' ? 'Опыт и контакты' : 'SEO'}
            </button>
          ))}
        </div>
        <div className="adm-form__actions">
          {doc?.slug && (
            <a
              className="adm-btn"
              target="_blank"
              rel="noreferrer"
              href={`/api/preview?collection=employees&slug=${doc.slug}`}
            >
              Предпросмотр
            </a>
          )}
          <input type="hidden" name="status" value={status} />
          <button
            className="adm-btn"
            disabled={pending}
            onClick={() => setStatus('draft')}
          >
            Черновик
          </button>
          <button
            className="adm-btn adm-btn--primary"
            disabled={pending}
            onClick={() => setStatus('published')}
          >
            Опубликовать
          </button>
        </div>
      </div>

      {state?.error && <p role="alert" className="adm-alert">{state.error}</p>}
      {state?.ok && <p className="adm-ok">Сохранено успешно</p>}

      <section hidden={tab !== 'profile'} className="adm-grid">
        <Text
          name="name"
          label="ФИО сотрудника"
          value={name}
          onChange={handleNameChange}
          placeholder="Например: Алексей Бирюков"
          required
        />
        <SlugInput
          name="slug"
          label="Адрес профиля (URL)"
          prefix="/team/"
          value={slug}
          onChange={handleSlugChange}
          onResetToAuto={handleResetSlug}
          isAuto={!isSlugManual}
        />
        <Text name="position" label="Должность" defaultValue={doc?.position} required />
        <MediaPicker name="photo" label="Фотография" defaultValue={doc?.photo?.id || doc?.photo} />
        <Checkbox
          name="isAdvocate"
          label="Имеет действующий статус адвоката"
          defaultChecked={doc?.isAdvocate ?? true}
        />
        <Text
          name="registryNo"
          label="Реестровый номер адвоката"
          placeholder="77/14890"
          defaultValue={doc?.registryNo}
        />
        <Checkbox name="showOnHome" label="Показывать на главной" defaultChecked={doc?.showOnHome ?? true} />
      </section>

      <section hidden={tab !== 'details'} className="adm-grid">
        <Text
          name="experienceSince"
          type="number"
          label="В профессии с (год)"
          placeholder="2010"
          defaultValue={doc?.experienceSince}
        />
        <Relation
          name="practices"
          label="Практики / Специализации"
          multiple
          options={practices.map((p) => ({ value: p.id, label: p.title }))}
          defaultValue={doc?.practices?.map((p: any) => (typeof p === 'object' ? p.id : p))}
        />
        <Textarea
          name="specialization"
          label="Специализация (по одной на строку)"
          defaultValue={specializationText}
          rows={4}
        />
        <Textarea
          name="education"
          label="Образование и дипломы (по одному на строку)"
          defaultValue={educationText}
          rows={4}
        />
        <RichText name="bio" label="Биография и достижения" defaultValue={doc?.bio} />
        <Text name="languages" label="Иностранные языки" defaultValue={doc?.languages} />

        <fieldset className="adm-fieldset">
          <legend>Контакты</legend>
          <Text name="email" type="email" label="Email" defaultValue={doc?.contacts?.email} />
          <Text name="phone" label="Телефон" defaultValue={doc?.contacts?.phone} />
          <Text name="telegram" label="Telegram" defaultValue={doc?.contacts?.telegram} />
        </fieldset>
      </section>

      <section hidden={tab !== 'seo'} className="adm-grid">
        <Text name="seoTitle" label="SEO title" counter={70} defaultValue={doc?.seo?.title} />
        <Textarea
          name="seoDescription"
          label="SEO description"
          counter={180}
          defaultValue={doc?.seo?.description}
        />
      </section>

      {doc && (
        <footer className="adm-danger">
          <div />
          <button
            type="button"
            className="adm-btn adm-btn--danger"
            onClick={() => confirm('Удалить сотрудника?') && deleteEmployee(doc.id)}
          >
            Удалить сотрудника
          </button>
        </footer>
      )}
    </form>
  )
}
