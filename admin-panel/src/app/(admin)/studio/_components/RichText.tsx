'use client'

import React, { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'

interface RichTextProps {
  name: string
  label: string
  defaultValue?: string | null
  hint?: string
}

export default function RichText({ name, label, defaultValue, hint }: RichTextProps) {
  const [content, setContent] = useState(defaultValue ?? '')

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'adm-editor-link',
        },
      }),
      Placeholder.configure({
        placeholder: 'Начните вводить текст...',
      }),
    ],
    content: defaultValue ?? '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && defaultValue !== undefined && editor.getHTML() !== defaultValue) {
      editor.commands.setContent(defaultValue ?? '')
    }
  }, [defaultValue, editor])

  if (!editor) {
    return (
      <div className="adm-field">
        <label className="adm-field__label">{label}</label>
        <div className="adm-editor" style={{ padding: 16, color: 'var(--adm-text-muted)' }}>
          Загрузка редактора...
        </div>
      </div>
    )
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL ссылки:', previousUrl)

    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="adm-field">
      <label className="adm-field__label">
        <span>{label}</span>
      </label>

      {/* Hidden textarea to submit standard FormData to Server Action */}
      <textarea
        name={name}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ display: 'none' }}
      />

      <div className="adm-editor">
        <div className="adm-editor__toolbar">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
            title="Жирный"
          >
            <b>B</b>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
            title="Курсив"
          >
            <i>I</i>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            title="Заголовок H2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            title="Заголовок H3"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
            title="Маркированный список"
          >
            • Список
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
            title="Нумерованный список"
          >
            1. Список
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
            title="Цитата"
          >
            “ Цитата
          </button>
          <button
            type="button"
            onClick={setLink}
            className={editor.isActive('link') ? 'is-active' : ''}
            title="Ссылка"
          >
            🔗 Ссылка
          </button>
        </div>

        <EditorContent editor={editor} className="adm-editor__content" />
      </div>

      {hint && <span className="adm-field__hint">{hint}</span>}
    </div>
  )
}
