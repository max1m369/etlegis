'use client'

import React, { useState } from 'react'
import { Text, Textarea } from './Fields'
import MediaPicker from './MediaPicker'

interface SeoFieldsProps {
  title: string
  slug: string
  urlPrefix?: string // e.g. '/cases/' or '/blog/'
  defaultTitle?: string
  defaultDescription?: string
  withOgImage?: boolean
  defaultOgImage?: any
  extractContent?: () => string
}

function stripHtml(html: string): string {
  if (!html) return ''
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

export default function SeoFields({
  title,
  slug,
  urlPrefix = '/cases/',
  defaultTitle,
  defaultDescription,
  withOgImage = false,
  defaultOgImage,
  extractContent,
}: SeoFieldsProps) {
  const [seoTitle, setSeoTitle] = useState(defaultTitle ?? '')
  const [seoDescription, setSeoDescription] = useState(defaultDescription ?? '')
  const [isGenerated, setIsGenerated] = useState(false)

  const handleAutoGenerate = () => {
    // 1. Generate SEO Title
    const cleanTitle = (title || '').trim()
    const autoTitle = cleanTitle
      ? `${cleanTitle} — Адвокатское бюро ETLEGIS`.slice(0, 70)
      : 'Адвокатское бюро ETLEGIS'

    // 2. Generate SEO Description
    let rawContent = ''
    if (extractContent) {
      rawContent = extractContent()
    } else {
      // Fallback extraction from common form field inputs
      const selectors = [
        'input[name="result"]',
        'input[name="synopsis"]',
        'input[name="task"]',
        'textarea[name="lead"]',
        'textarea[name="excerpt"]',
        'input[name="body"]',
      ]
      for (const sel of selectors) {
        const el = document.querySelector(sel) as HTMLInputElement | HTMLTextAreaElement | null
        if (el && el.value) {
          rawContent += ' ' + el.value
        }
      }
    }

    const cleanText = stripHtml(rawContent)
    const autoDesc = cleanText
      ? cleanText.slice(0, 160)
      : cleanTitle
      ? `Практика и правовая защита адвокатского бюро ETLEGIS: ${cleanTitle}`
      : 'Адвокатское бюро ETLEGIS — комплексная защита бизнеса и частных доверителей.'

    setSeoTitle(autoTitle)
    setSeoDescription(autoDesc)
    setIsGenerated(true)
  }

  const effectiveTitle = seoTitle || (title ? `${title} — Адвокатское бюро ETLEGIS` : 'Заголовок страницы — ETLEGIS')
  const effectiveDesc = seoDescription || 'Описание страницы в результатах поисковой выдачи Яндекс и Google. Кликните «Сгенерировать из содержания», чтобы заполнить автоматически.'
  const fullUrl = `https://etlegis.ru${urlPrefix}${slug || '...'}`

  return (
    <div className="adm-seo-box">
      <div className="adm-seo-toolbar">
        <div>
          <div style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--adm-text)' }}>
            Поисковая оптимизация (SEO & Мета-теги)
          </div>
          <div style={{ fontSize: 12, color: 'var(--adm-text-muted)', marginTop: 2 }}>
            Настройка отображения страницы в Google, Яндекс и соцсетях
          </div>
        </div>
        <button
          type="button"
          onClick={handleAutoGenerate}
          className="adm-btn adm-btn--primary"
          style={{ fontSize: 12.5, padding: '7px 14px' }}
        >
          ⚡ Сгенерировать из содержания
        </button>
      </div>

      {/* Live SERP Preview Card */}
      <div className="adm-seo-preview">
        <div className="adm-seo-preview__header">
          <span>Предпросмотр в поисковой выдаче (Google / Яндекс)</span>
          {isGenerated && <span style={{ color: '#27ae60', fontWeight: 600 }}>✓ Сгенерировано</span>}
        </div>
        <div className="adm-seo-preview__url">
          <span className="adm-seo-preview__url-badge">ETLEGIS</span>
          <span>{fullUrl}</span>
        </div>
        <div className="adm-seo-preview__title" title="Нажмите, чтобы скопировать заголовок">
          {effectiveTitle}
        </div>
        <div className="adm-seo-preview__desc">
          {effectiveDesc}
        </div>
      </div>

      <div className="adm-grid" style={{ marginTop: 8 }}>
        <Text
          name="seoTitle"
          label="SEO title (Заголовок в поисковой выдаче)"
          counter={70}
          value={seoTitle}
          onChange={(val) => setSeoTitle(val)}
          placeholder="Например: Защита бенефициаров от субсидиарной ответственности — ETLEGIS"
          hint="Рекомендуется до 70 символов. Если оставить пустым, сформируется автоматически."
        />

        <Textarea
          name="seoDescription"
          label="SEO description (Сниппет описания)"
          counter={180}
          value={seoDescription}
          onChange={(val) => setSeoDescription(val)}
          rows={3}
          placeholder="Краткое содержание кейса или статьи для поисковых сниппетов..."
          hint="Рекомендуется 140–160 символов. Если оставить пустым, сформируется автоматически из текста."
        />

        {withOgImage && (
          <MediaPicker
            name="ogImage"
            label="OG-изображение (Иллюстрация для шеринга в Telegram, ВК, WhatsApp)"
            defaultValue={defaultOgImage}
          />
        )}
      </div>
    </div>
  )
}
