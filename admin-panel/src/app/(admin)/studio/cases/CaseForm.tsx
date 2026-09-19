'use client'

import { useActionState, useState } from 'react'
import { saveCase, deleteCase, duplicateCase } from './actions'
import { Text, Textarea, Select, Checkbox, Money, Relation, SlugInput } from '../_components/Fields'
import RichText from '../_components/RichText'
import MediaPicker from '../_components/MediaPicker'
import SeoFields from '../_components/SeoFields'
import { translit } from '@/lib/translit'

interface Props {
  doc?: any
  practices: any[]
  employees: any[]
  services: any[]
}

export default function CaseForm({ doc, practices, employees, services }: Props) {
  const [state, action, pending] = useActionState(saveCase.bind(null, doc?.id ?? null), null)
  const [tab, setTab] = useState<'content' | 'meta' | 'seo'>('content')
  const [status, setStatus] = useState(doc?._status ?? 'draft')

  const [title, setTitle] = useState(doc?.title ?? '')
  const [slug, setSlug] = useState(doc?.slug ?? '')
  const [isSlugManual, setIsSlugManual] = useState(Boolean(doc?.slug))

  const handleTitleChange = (val: string) => {
    setTitle(val)
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
    setSlug(translit(title))
  }

  return (
    <form action={action} className="adm-form">
      <div className="adm-form__bar">
        <div className="adm-tabs">
          {(['content', 'meta', 'seo'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={tab === t ? 'is-active' : ''}
            >
              {t === 'content' ? 'Содержание' : t === 'meta' ? 'Параметры дела' : 'SEO'}
            </button>
          ))}
        </div>
        <div className="adm-form__actions">
          {doc?.slug && (
            <a
              className="adm-btn"
              target="_blank"
              rel="noreferrer"
              href={`/api/preview?collection=cases&slug=${doc.slug}`}
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
            Сохранить черновик
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

      <section hidden={tab !== 'content'} className="adm-grid">
        <Text
          name="title"
          label="Название кейса"
          value={title}
          onChange={handleTitleChange}
          placeholder="Например: Защита бенефициаров от субсидиарной ответственности"
          required
        />
        <SlugInput
          name="slug"
          label="Адрес страницы (URL)"
          prefix="/cases/"
          value={slug}
          onChange={handleSlugChange}
          onResetToAuto={handleResetSlug}
          isAuto={!isSlugManual}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          <Select
            name="practice"
            label="Практика *"
            defaultValue={typeof doc?.practice === 'object' ? doc.practice?.id : (doc?.practice ?? practices[0]?.id)}
            options={practices.map((p) => ({ value: p.id, label: p.title }))}
            required
          />
          <Select
            name="role"
            label="Наша роль *"
            defaultValue={doc?.role ?? 'defence'}
            options={[
              { value: 'defence', label: 'Защита' },
              { value: 'plaintiff', label: 'Истец' },
              { value: 'defendant', label: 'Ответчик' },
            ]}
          />
          <Money name="amount" label="Сумма спора, ₽" defaultValue={doc?.amount} />
        </div>

        <RichText name="synopsis" label="Фабула" defaultValue={doc?.synopsis} />
        <RichText name="task" label="Задача" defaultValue={doc?.task} />
        <RichText name="actions" label="Что сделали" defaultValue={doc?.actions} />
        <RichText
          name="result"
          label="Результат"
          defaultValue={doc?.result}
          hint="Этот блок оформляется метафорой «Просвет» на странице кейса"
        />
      </section>

      <section hidden={tab !== 'meta'} className="adm-grid">
        <Text
          name="instances"
          label="Инстанции"
          placeholder="АС города Москвы → 9 ААС → АС МО"
          defaultValue={doc?.instances}
        />
        <Text
          name="duration"
          label="Срок ведения"
          placeholder="14 месяцев"
          defaultValue={doc?.duration}
        />
        <Text
          name="year"
          type="number"
          label="Год завершения"
          defaultValue={doc?.year}
        />
        <Relation
          name="lawyers"
          label="Юристы по делу"
          multiple
          options={employees.map((e) => ({ value: e.id, label: e.name }))}
          defaultValue={doc?.lawyers?.map((l: any) => (typeof l === 'object' ? l.id : l))}
        />
        <Relation
          name="relatedServices"
          label="Связанные услуги"
          multiple
          options={services.map((s) => ({ value: s.id, label: s.title }))}
          defaultValue={doc?.relatedServices?.map((s: any) => (typeof s === 'object' ? s.id : s))}
        />
        <Checkbox name="showOnHome" label="Показывать на главной" defaultChecked={doc?.showOnHome} />

        <fieldset className="adm-fieldset">
          <legend>Конфиденциальность</legend>
          <Checkbox
            name="clientConsent"
            label="Клиент согласовал публикацию"
            defaultChecked={doc?.disclosure?.clientConsent}
          />
          <Text
            name="consentDate"
            type="date"
            label="Дата согласия"
            defaultValue={doc?.disclosure?.consentDate?.slice(0, 10)}
          />
          <Text
            name="anonymizedClient"
            label="Обезличенное описание клиента"
            placeholder="крупный производственный холдинг"
            defaultValue={doc?.disclosure?.anonymizedClient}
          />
        </fieldset>
      </section>

      <section hidden={tab !== 'seo'}>
        <SeoFields
          title={title}
          slug={slug}
          urlPrefix="/cases/"
          defaultTitle={doc?.seo?.title}
          defaultDescription={doc?.seo?.description}
          withOgImage
          defaultOgImage={doc?.seo?.ogImage?.id || doc?.seo?.ogImage}
        />
      </section>

      {doc && (
        <footer className="adm-danger">
          <button type="button" onClick={() => duplicateCase(doc.id)} className="adm-btn">
            Дублировать
          </button>
          <button
            type="button"
            className="adm-btn adm-btn--danger"
            onClick={() => confirm('Удалить кейс безвозвратно?') && deleteCase(doc.id)}
          >
            Удалить
          </button>
        </footer>
      )}
    </form>
  )
}
