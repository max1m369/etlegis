'use client'

import React, { useState, useEffect, useRef } from 'react'
import { getMediaLibrary, uploadMediaDirect, getMediaById, MediaItemData } from '../media/actions'

interface MediaPickerProps {
  name: string
  label: string
  defaultValue?: string | number | null | any
  hint?: string
}

export default function MediaPicker({ name, label, defaultValue, hint }: MediaPickerProps) {
  // Determine initial ID value
  const initialId = typeof defaultValue === 'object' && defaultValue?.id
    ? String(defaultValue.id)
    : String(defaultValue ?? '')

  const [val, setVal] = useState(initialId)
  const [mediaItem, setMediaItem] = useState<MediaItemData | null>(
    typeof defaultValue === 'object' && defaultValue?.url
      ? {
          id: String(defaultValue.id || ''),
          alt: defaultValue.alt || '',
          filename: defaultValue.filename || '',
          url: defaultValue.url || '',
          thumbUrl: defaultValue.sizes?.thumb?.url || defaultValue.url || '',
        }
      : null
  )

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [library, setLibrary] = useState<MediaItemData[]>([])
  const [search, setSearch] = useState('')
  const [loadingLib, setLoadingLib] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [showManualInput, setShowManualInput] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const modalFileInputRef = useRef<HTMLInputElement>(null)

  // Load existing media info if only ID was provided
  useEffect(() => {
    if (val && !mediaItem) {
      getMediaById(val).then((item) => {
        if (item) setMediaItem(item)
      })
    }
  }, [val, mediaItem])

  // Fetch media library when modal opens or search changes
  const loadLibrary = async (query = '') => {
    setLoadingLib(true)
    try {
      const items = await getMediaLibrary(query)
      setLibrary(items)
    } catch (err) {
      console.error('Error fetching media library:', err)
    } finally {
      setLoadingLib(false)
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
    loadLibrary(search)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value
    setSearch(q)
    loadLibrary(q)
  }

  const handleSelectMedia = (item: MediaItemData) => {
    setVal(item.id)
    setMediaItem(item)
    setIsModalOpen(false)
  }

  const handleClear = () => {
    setVal('')
    setMediaItem(null)
  }

  // Handle direct file upload (automatically uploads to Media and selects it)
  const handleFileUpload = async (file: File) => {
    setUploading(true)
    setUploadError(null)

    const fd = new FormData()
    fd.append('file', file)
    // Create clean default alt from filename
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
    fd.append('alt', nameWithoutExt)

    try {
      const res = await uploadMediaDirect(fd)
      if (res.ok && res.item) {
        setVal(res.item.id)
        setMediaItem(res.item)
        if (isModalOpen) {
          // Refresh library and close modal
          await loadLibrary(search)
          setIsModalOpen(false)
        }
      } else {
        setUploadError(res.error || 'Ошибка загрузки')
      }
    } catch (err: any) {
      setUploadError(err.message || 'Ошибка загрузки')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
      if (modalFileInputRef.current) modalFileInputRef.current.value = ''
    }
  }

  return (
    <div className="adm-field">
      <label className="adm-field__label">
        <span>{label}</span>
      </label>

      {/* Hidden input ensuring the selected media ID is submitted with the form */}
      <input type="hidden" name={name} value={val} />

      {/* Upload error banner if any */}
      {uploadError && (
        <div className="adm-alert" style={{ margin: '0 0 12px', fontSize: 13 }}>
          {uploadError}
        </div>
      )}

      {/* Hidden file input for direct uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileUpload(file)
        }}
      />

      {/* State A: An image is currently selected */}
      {val ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: 14,
            background: 'var(--adm-surface-alt, #F9F9F8)',
            border: '1px solid var(--adm-line, #E5E7EB)',
            borderRadius: 6,
          }}
        >
          {/* Thumbnail preview */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 4,
              overflow: 'hidden',
              background: '#EAEAEA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              border: '1px solid var(--adm-line, #D1D5DB)',
            }}
          >
            {mediaItem?.thumbUrl || mediaItem?.url ? (
              <img
                src={mediaItem.thumbUrl || mediaItem.url}
                alt={mediaItem.alt || 'Фото'}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ fontSize: 24 }}>🖼️</span>
            )}
          </div>

          {/* Details */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: 14,
                color: 'var(--adm-text, #111)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {mediaItem?.alt || mediaItem?.filename || `Медиафайл #${val}`}
            </div>
            <div style={{ fontSize: 12, color: 'var(--adm-text-muted, #6B7280)', marginTop: 4 }}>
              ID: #{val} {mediaItem?.filename ? `• ${mediaItem.filename}` : ''}
            </div>
            {mediaItem?.url && (
              <a
                href={mediaItem.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: 11,
                  color: 'var(--adm-brass, #9B815C)',
                  textDecoration: 'underline',
                  display: 'inline-block',
                  marginTop: 4,
                }}
              >
                Открыть оригинал ↗
              </a>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleOpenModal}
              className="adm-btn"
              style={{ padding: '7px 12px', fontSize: 12 }}
            >
              Выбрать другое
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="adm-btn"
              style={{ padding: '7px 12px', fontSize: 12 }}
            >
              {uploading ? 'Загрузка…' : 'Загрузить новое'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="adm-btn adm-btn--danger"
              style={{ padding: '7px 12px', fontSize: 12 }}
            >
              Удалить
            </button>
          </div>
        </div>
      ) : (
        /* State B: No image selected */
        <div
          style={{
            padding: '24px 20px',
            border: '2px dashed var(--adm-line, #D5D5CE)',
            borderRadius: 6,
            background: 'var(--adm-surface-alt, #FAFAFA)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{ fontSize: 32, lineHeight: 1 }}>🖼️</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--adm-text, #111)' }}>
              Выберите фото из медиатеки или загрузите с компьютера
            </div>
            <div style={{ fontSize: 12, color: 'var(--adm-text-muted, #6B7280)', marginTop: 4 }}>
              Загруженный файл автоматически сохранится в медиатеке
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={handleOpenModal}
              className="adm-btn adm-btn--primary"
              style={{
                padding: '9px 18px',
                fontSize: 13,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>📁</span> Выбрать из медиатеки
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="adm-btn"
              style={{
                padding: '9px 18px',
                fontSize: 13,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>⬆️</span> {uploading ? 'Загрузка в медиатеку…' : 'Загрузить файл'}
            </button>
          </div>
        </div>
      )}

      {/* Manual input toggle for advanced users */}
      <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {hint && <span className="adm-field__hint">{hint}</span>}
        <button
          type="button"
          onClick={() => setShowManualInput(!showManualInput)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--adm-text-muted, #888)',
            fontSize: 11,
            cursor: 'pointer',
            marginLeft: 'auto',
            textDecoration: 'underline',
          }}
        >
          {showManualInput ? 'Скрыть ручной ввод ID' : 'Ввести ID вручную'}
        </button>
      </div>

      {showManualInput && (
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="ID медиафайла..."
            className="adm-input"
            style={{ maxWidth: 200, fontSize: 12 }}
          />
          <button
            type="button"
            onClick={() => {
              if (val) {
                getMediaById(val).then((item) => setMediaItem(item))
              }
            }}
            className="adm-btn"
            style={{ fontSize: 12, padding: '4px 10px' }}
          >
            Обновить
          </button>
        </div>
      )}

      {/* Media Library Selection Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            backdropFilter: 'blur(3px)',
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--adm-surface, #FFFFFF)',
              color: 'var(--adm-text, #111)',
              width: '100%',
              maxWidth: 820,
              maxHeight: '85vh',
              borderRadius: 8,
              border: '1px solid var(--adm-line, #E5E7EB)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--adm-line, #E5E7EB)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18, fontWeight: 600 }}>Медиатека</span>
                <span
                  style={{
                    fontSize: 12,
                    background: 'var(--adm-surface-alt, #F3F4F6)',
                    padding: '2px 8px',
                    borderRadius: 12,
                    color: 'var(--adm-text-muted, #6B7280)',
                  }}
                >
                  {library.length} файлов
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* Modal Upload Button */}
                <input
                  ref={modalFileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload(file)
                  }}
                />
                <button
                  type="button"
                  onClick={() => modalFileInputRef.current?.click()}
                  disabled={uploading}
                  className="adm-btn adm-btn--primary"
                  style={{ padding: '6px 14px', fontSize: 12 }}
                >
                  {uploading ? 'Загрузка…' : '⬆️ Загрузить файл'}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 22,
                    cursor: 'pointer',
                    color: 'var(--adm-text-muted, #666)',
                    lineHeight: 1,
                    padding: 4,
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Search Bar */}
            <div
              style={{
                padding: '12px 20px',
                borderBottom: '1px solid var(--adm-line, #E5E7EB)',
                backgroundColor: 'var(--adm-surface-alt, #FAFAFA)',
              }}
            >
              <input
                type="text"
                placeholder="🔍 Поиск по названию или описанию..."
                value={search}
                onChange={handleSearch}
                className="adm-input"
                style={{ width: '100%', fontSize: 13 }}
              />
            </div>

            {/* Modal Image Grid */}
            <div
              style={{
                padding: 20,
                overflowY: 'auto',
                flex: 1,
              }}
            >
              {loadingLib ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--adm-text-muted, #888)' }}>
                  Загрузка медиатеки...
                </div>
              ) : library.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--adm-text-muted, #888)' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📁</div>
                  <div>Медиафайлы не найдены</div>
                  <button
                    type="button"
                    onClick={() => modalFileInputRef.current?.click()}
                    className="adm-btn adm-btn--primary"
                    style={{ marginTop: 14, fontSize: 12 }}
                  >
                    Загрузить первый файл
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: 14,
                  }}
                >
                  {library.map((item) => {
                    const isSelected = String(item.id) === String(val)
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectMedia(item)}
                        style={{
                          border: isSelected
                            ? '2px solid var(--adm-brass, #9B815C)'
                            : '1px solid var(--adm-line, #E5E7EB)',
                          borderRadius: 6,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          backgroundColor: 'var(--adm-surface, #fff)',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                        }}
                      >
                        {isSelected && (
                          <div
                            style={{
                              position: 'absolute',
                              top: 6,
                              right: 6,
                              background: 'var(--adm-brass, #9B815C)',
                              color: '#fff',
                              borderRadius: '50%',
                              width: 20,
                              height: 20,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 12,
                              fontWeight: 'bold',
                              zIndex: 2,
                            }}
                          >
                            ✓
                          </div>
                        )}

                        <div
                          style={{
                            aspectRatio: '1',
                            background: '#F0F0EE',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                          }}
                        >
                          {item.thumbUrl || item.url ? (
                            <img
                              src={item.thumbUrl || item.url}
                              alt={item.alt || item.filename}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <span style={{ fontSize: 24 }}>📄</span>
                          )}
                        </div>

                        <div style={{ padding: '8px 10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 500,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                            title={item.alt || item.filename}
                          >
                            {item.alt || item.filename}
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              color: 'var(--adm-text-muted, #888)',
                              marginTop: 2,
                            }}
                          >
                            #{item.id}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '12px 20px',
                borderTop: '1px solid var(--adm-line, #E5E7EB)',
                display: 'flex',
                justifyContent: 'flex-end',
                backgroundColor: 'var(--adm-surface-alt, #FAFAFA)',
              }}
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="adm-btn"
                style={{ padding: '7px 16px', fontSize: 13 }}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
