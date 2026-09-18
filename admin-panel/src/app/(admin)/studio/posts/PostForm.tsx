'use client'

import { useActionState, useState } from 'react'
import { savePost, deletePost } from './actions'
import { Text, Textarea, Select, Relation, SlugInput } from '../_components/Fields'
import RichText from '../_components/RichText'
import MediaPicker from '../_components/MediaPicker'
import SeoFields from '../_components/SeoFields'
import { translit } from '@/lib/translit'

interface Props {
  doc?: any
  employees: any[]
  practices: any[]
}

export default function PostForm({ doc, employees, practices }: Props) {
  const [state, action, pending] = useActionState(savePost.bind(null, doc?.id ?? null), null)
  const [tab, setTab] = useState<'content' | 'meta' | 'seo'>('content')
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
              {t === 'content' ? 'Содержание' : t === 'meta' ? 'Параметры' : 'SEO'}
            </button>
          ))}
        </div>
        <div className="adm-form__actions">
          {doc?.slug && (
            <a
              className="adm-btn"
              target="_blank"
              rel="noreferrer"
              href={`/api/preview?collection=posts&slug=${doc.slug}`}
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
          label="Заголовок материала"
          value={title}
          onChange={handleTitleChange}
          placeholder="Например: Изменения в налоговом законодательстве 2026"
          required
        />
        <SlugInput
          name="slug"
          label="Адрес страницы (URL)"
          prefix="/media/"
          value={slug}
          onChange={handleSlugChange}
          onResetToAuto={handleResetSlug}
          isAuto={!isSlugManual}
        />
        <Select
          name="type"
          label="Тип материала"
          defaultValue={doc?.type ?? 'article'}
          options={[
            { label: 'Статья / Колонка', value: 'article' },
            { label: 'Выступление / Вебинар', value: 'speech' },
            { label: 'СМИ о нас', value: 'press' },
          ]}
          required
        />
        <Text
          name="publishedAt"
          type="date"
          label="Дата публикации"
          defaultValue={doc?.publishedAt?.slice(0, 10) ?? new Date().toISOString().slice(0, 10)}
          required
        />
        <Textarea name="excerpt" label="Краткий анонс (лид)" defaultValue={doc?.excerpt} required rows={3} />
        <MediaPicker name="cover" label="Обложка материала" defaultValue={doc?.cover?.id || doc?.cover} />
        <RichText name="body" label="Основной текст" defaultValue={doc?.body} />
      </section>

      <section hidden={tab !== 'meta'} className="adm-grid">
        <Relation
          name="authors"
          label="Авторы (из команды бюро)"
          multiple
          options={employees.map((e) => ({ value: e.id, label: e.name }))}
          defaultValue={doc?.authors?.map((a: any) => (typeof a === 'object' ? a.id : a))}
        />
        <Relation
          name="practices"
          label="Связанные практики"
          multiple
          options={practices.map((p) => ({ value: p.id, label: p.title }))}
          defaultValue={doc?.practices?.map((p: any) => (typeof p === 'object' ? p.id : p))}
        />
        <Text
          name="videoUrl"
          label="Ссылка на видео / вебинар (YouTube, Rutube)"
          placeholder="https://..."
          defaultValue={doc?.videoUrl}
        />
      </section>

      <section hidden={tab !== 'seo'}>
        <SeoFields
          title={title}
          slug={slug}
          urlPrefix="/blog/"
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
            onClick={() => confirm('Удалить материал?') && deletePost(doc.id)}
          >
            Удалить материал
          </button>
        </footer>
      )}
    </form>
  )
}
