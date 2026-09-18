'use client'

import React, { useState } from 'react'

export function Text({
  name,
  label,
  defaultValue,
  value: controlledValue,
  onChange: controlledOnChange,
  required,
  placeholder,
  prefix,
  type = 'text',
  counter,
  hint,
  autoFrom,
}: {
  name: string
  label: string
  defaultValue?: string | number | null
  value?: string
  onChange?: (val: string) => void
  required?: boolean
  placeholder?: string
  prefix?: string
  type?: string
  counter?: number
  hint?: string
  autoFrom?: string
}) {
  const [internalVal, setInternalVal] = useState(String(defaultValue ?? ''))
  const isControlled = controlledValue !== undefined
  const val = isControlled ? controlledValue : internalVal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalVal(e.target.value)
    }
    controlledOnChange?.(e.target.value)
  }

  return (
    <div className="adm-field">
      <label className="adm-field__label">
        <span>
          {label} {required && <span style={{ color: '#e74c3c' }}>*</span>}
        </span>
        {counter && (
          <span style={{ fontSize: 11, color: 'var(--adm-text-muted)' }}>
            {val.length}/{counter}
          </span>
        )}
      </label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {prefix && (
          <span
            style={{
              padding: '9px 10px',
              background: 'var(--adm-surface-alt)',
              border: '1px solid var(--adm-line)',
              borderRight: 'none',
              fontSize: 13,
              color: 'var(--adm-text-muted)',
              borderRadius: '4px 0 0 4px',
            }}
          >
            {prefix}
          </span>
        )}
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          value={val}
          onChange={handleChange}
          className="adm-input"
          style={prefix ? { borderRadius: '0 4px 4px 0' } : undefined}
        />
      </div>
      {hint && <span className="adm-field__hint">{hint}</span>}
    </div>
  )
}

export function SlugInput({
  name = 'slug',
  label = 'Адрес страницы (URL)',
  prefix = '/cases/',
  value,
  onChange,
  onResetToAuto,
  isAuto = true,
  hint,
}: {
  name?: string
  label?: string
  prefix?: string
  value: string
  onChange: (val: string) => void
  onResetToAuto?: () => void
  isAuto?: boolean
  hint?: string
}) {
  return (
    <div className="adm-field">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label className="adm-field__label" style={{ marginBottom: 0 }}>
          <span>{label}</span>
        </label>
        {isAuto ? (
          <span style={{ fontSize: 12, color: 'var(--adm-brass)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>⚡ Автоматически из названия</span>
          </span>
        ) : (
          <button
            type="button"
            onClick={onResetToAuto}
            className="adm-btn"
            style={{ padding: '2px 8px', fontSize: 11 }}
            title="Сгенерировать заново из названия"
          >
            ↻ Вернуть авто-генерацию
          </button>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {prefix && (
          <span
            style={{
              padding: '9px 10px',
              background: 'var(--adm-surface-alt)',
              border: '1px solid var(--adm-line)',
              borderRight: 'none',
              fontSize: 13,
              color: 'var(--adm-text-muted)',
              borderRadius: '4px 0 0 4px',
              userSelect: 'none',
            }}
          >
            {prefix}
          </span>
        )}
        <input
          name={name}
          type="text"
          placeholder="avtomaticheski-iz-nazvaniya"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="adm-input"
          style={prefix ? { borderRadius: '0 4px 4px 0' } : undefined}
        />
      </div>
      <span className="adm-field__hint">
        {hint || `Ссылка на сайте: ${prefix}${value || '...'}`}
      </span>
    </div>
  )
}

export function Textarea({
  name,
  label,
  defaultValue,
  value: controlledValue,
  onChange: controlledOnChange,
  required,
  placeholder,
  counter,
  hint,
  rows = 3,
}: {
  name: string
  label: string
  defaultValue?: string | null
  value?: string
  onChange?: (val: string) => void
  required?: boolean
  placeholder?: string
  counter?: number
  hint?: string
  rows?: number
}) {
  const [internalVal, setInternalVal] = useState(String(defaultValue ?? ''))
  const isControlled = controlledValue !== undefined
  const val = isControlled ? controlledValue : internalVal

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalVal(e.target.value)
    }
    controlledOnChange?.(e.target.value)
  }

  return (
    <div className="adm-field">
      <label className="adm-field__label">
        <span>
          {label} {required && <span style={{ color: '#e74c3c' }}>*</span>}
        </span>
        {counter && (
          <span style={{ fontSize: 11, color: 'var(--adm-text-muted)' }}>
            {val.length}/{counter}
          </span>
        )}
      </label>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        value={val}
        onChange={handleChange}
        rows={rows}
        className="adm-textarea"
      />
      {hint && <span className="adm-field__hint">{hint}</span>}
    </div>
  )
}

export function Select({
  name,
  label,
  defaultValue,
  required,
  options,
  hint,
}: {
  name: string
  label: string
  defaultValue?: string | number | null
  required?: boolean
  options: { label: string; value: string | number }[]
  hint?: string
}) {
  return (
    <div className="adm-field">
      <label className="adm-field__label">
        <span>
          {label} {required && <span style={{ color: '#e74c3c' }}>*</span>}
        </span>
      </label>
      <select name={name} required={required} defaultValue={defaultValue ?? ''} className="adm-select">
        <option value="">— Выберите из списка —</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && <span className="adm-field__hint">{hint}</span>}
    </div>
  )
}

export function Checkbox({
  name,
  label,
  defaultChecked,
  hint,
}: {
  name: string
  label: string
  defaultChecked?: boolean
  hint?: string
}) {
  return (
    <div className="adm-field">
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
        <input type="checkbox" name={name} defaultChecked={defaultChecked} />
        <span style={{ fontSize: 13.5, fontWeight: 500 }}>{label}</span>
      </label>
      {hint && <span className="adm-field__hint" style={{ paddingLeft: 24 }}>{hint}</span>}
    </div>
  )
}

export function Money({
  name,
  label,
  defaultValue,
  required,
  hint,
}: {
  name: string
  label: string
  defaultValue?: number | null
  required?: boolean
  hint?: string
}) {
  return (
    <div className="adm-field">
      <label className="adm-field__label">
        <span>
          {label} {required && <span style={{ color: '#e74c3c' }}>*</span>}
        </span>
      </label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          name={name}
          type="number"
          step="any"
          required={required}
          defaultValue={defaultValue ?? ''}
          placeholder="50000000"
          className="adm-input"
          style={{ borderRadius: '4px 0 0 4px' }}
        />
        <span
          style={{
            padding: '9px 14px',
            background: 'var(--adm-surface-alt)',
            border: '1px solid var(--adm-line)',
            borderLeft: 'none',
            fontSize: 13,
            color: 'var(--adm-text-muted)',
            borderRadius: '0 4px 4px 0',
          }}
        >
          ₽
        </span>
      </div>
      {hint && <span className="adm-field__hint">{hint}</span>}
    </div>
  )
}

export function Relation({
  name,
  label,
  options,
  defaultValue,
  multiple = false,
  hint,
}: {
  name: string
  label: string
  options: { label: string; value: string | number }[]
  defaultValue?: any
  multiple?: boolean
  hint?: string
}) {
  const defaultArray = Array.isArray(defaultValue)
    ? defaultValue.map(String)
    : defaultValue
    ? [String(defaultValue)]
    : []

  const [selected, setSelected] = useState<string[]>(defaultArray)

  const toggle = (val: string) => {
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    )
  }

  if (!multiple) {
    return (
      <div className="adm-field">
        <label className="adm-field__label">
          <span>{label}</span>
        </label>
        <select
          name={name}
          defaultValue={defaultArray[0] ?? ''}
          className="adm-select"
        >
          <option value="">— Выберите из списка —</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {hint && <span className="adm-field__hint">{hint}</span>}
      </div>
    )
  }

  return (
    <div className="adm-field">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <label className="adm-field__label" style={{ marginBottom: 0 }}>
          <span>{label}</span>
        </label>
        {selected.length > 0 && (
          <span style={{ fontSize: 12, color: 'var(--adm-brass)', fontWeight: 500 }}>
            Выбрано: {selected.length}
          </span>
        )}
      </div>

      {/* Скрытые инпуты для стандартной передачи в FormData */}
      {selected.map((val) => (
        <input key={val} type="hidden" name={name} value={val} />
      ))}

      {options.length === 0 ? (
        <div
          style={{
            padding: '12px 14px',
            background: 'var(--adm-surface-alt)',
            border: '1px solid var(--adm-line)',
            borderRadius: 4,
            color: 'var(--adm-text-muted)',
            fontSize: 13,
          }}
        >
          Нет доступных записей для выбора
        </div>
      ) : (
        <div
          style={{
            background: 'var(--adm-surface-alt)',
            border: '1px solid var(--adm-line)',
            borderRadius: 4,
            padding: '6px 8px',
            maxHeight: 180,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {options.map((opt) => {
            const isChecked = selected.includes(String(opt.value))
            return (
              <label
                key={opt.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  borderRadius: 4,
                  cursor: 'pointer',
                  background: isChecked
                    ? 'color-mix(in srgb, var(--adm-brass) 12%, transparent)'
                    : 'transparent',
                  transition: 'background 0.15s ease',
                  fontSize: 13.5,
                  userSelect: 'none',
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(String(opt.value))}
                />
                <span
                  style={{
                    color: isChecked ? 'var(--adm-text)' : 'var(--adm-text-muted)',
                    fontWeight: isChecked ? 500 : 400,
                  }}
                >
                  {opt.label}
                </span>
              </label>
            )
          })}
        </div>
      )}

      {hint && <span className="adm-field__hint">{hint}</span>}
    </div>
  )
}
