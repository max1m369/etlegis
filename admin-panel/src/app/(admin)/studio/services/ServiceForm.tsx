'use client'

import { useActionState, useState } from 'react'
import { saveService, deleteService } from './actions'
import { Text, Textarea, Select, Relation, SlugInput } from '../_components/Fields'
import RichText from '../_components/RichText'
import SeoFields from '../_components/SeoFields'
import { translit } from '@/lib/translit'

interface Props {
  doc?: any
  practices: any[]
  employees: any[]
}

export default function ServiceForm({ doc, practices, employees }: Props) {
  const [state, action, pending] = useActionState(saveService.bind(null, doc?.id ?? null), null)
  const [tab, setTab] = useState<'content' | 'when' | 'seo'>('content')
  const [status, setStatus] = useState(doc?._status ?? 'published')

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

  const whenString = doc?.when?.map((w: any) => w.item).join('\n') ?? ''

  return (
    <form action={action} className="adm-form">
      <div className="adm-form__bar">
        <div className="adm-tabs">
          {(['content', 'when', 'seo'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={tab === t ? 'is-active' : ''}
            >
              {t === 'content' ? 'Основное' : t === 'when' ? 'Когда обращаться' : 'SEO'}
            </button>
          ))}
        </div>
        <div className="adm-form__actions">
          {doc?.slug && (
            <a
              className="adm-btn"
              target="_blank"
              rel="noreferrer"
              href={`/api/preview?collection=services&slug=${doc.slug}`}
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

      <section hidden={tab !== 'content'} className="adm-grid">
        <Text
          name="title"
          label="Название услуги"
          value={title}
          onChange={handleTitleChange}
          placeholder="Например: Защита при налоговых проверках"
          required
        />
        <SlugInput
          name="slug"
          label="Адрес страницы (URL)"
          prefix="/services/"
          value={slug}
          onChange={handleSlugChange}
          onResetToAuto={handleResetSlug}
          isAuto={!isSlugManual}
        />
        <Select
          name="practice"
          label="Практика / Направление"
          defaultValue={typeof doc?.practice === 'object' ? doc.practice?.id : doc?.practice}
          options={practices.map((p) => ({ value: p.id, label: p.title }))}
          required
        />
        <Textarea name="lead" label="Лид-абзац" defaultValue={doc?.lead} required rows={3} />
        <RichText name="body" label="Подробное описание услуги" defaultValue={doc?.body} />
        <Relation
          name="lawyers"
          label="Ответственные юристы"
          multiple
          options={employees.map((e) => ({ value: e.id, label: e.name }))}
          defaultValue={doc?.lawyers?.map((l: any) => (typeof l === 'object' ? l.id : l))}
        />
        <Text name="order" type="number" label="Порядок сортировки" defaultValue={doc?.order ?? 0} />
      </section>

      <section hidden={tab !== 'when'} className="adm-grid">
        <Textarea
          name="whenText"
          label="Ситуации доверителя (по одной на строку)"
          defaultValue={whenString}
          rows={6}
          hint="Каждая строка сформирует отдельный пункт в блоке «В каких ситуациях необходима помощь»"
        />
      </section>

      <section hidden={tab !== 'seo'}>
        <SeoFields
          title={title}
          slug={slug}
          urlPrefix="/services/"
          defaultTitle={doc?.seo?.title}
          defaultDescription={doc?.seo?.description}
        />
      </section>

      {doc && (
        <footer className="adm-danger">
          <div />
          <button
            type="button"
            className="adm-btn adm-btn--danger"
            onClick={() => confirm('Удалить услугу?') && deleteService(doc.id)}
          >
            Удалить услугу
          </button>
        </footer>
      )}
    </form>
  )
}
