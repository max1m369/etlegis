'use client'

import React, { useState } from 'react'

interface MediaPickerProps {
  name: string
  label: string
  defaultValue?: string | number | null
  hint?: string
}

export default function MediaPicker({ name, label, defaultValue, hint }: MediaPickerProps) {
  const [val, setVal] = useState(String(defaultValue ?? ''))

  return (
    <div className="adm-field">
      <label className="adm-field__label">
        <span>{label}</span>
      </label>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <input
          name={name}
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="ID медиафайла или путь..."
          className="adm-input"
        />
        {val && (
          <button
            type="button"
            onClick={() => setVal('')}
            className="adm-btn"
            style={{ padding: '8px 12px', fontSize: 12 }}
          >
            Очистить
          </button>
        )}
      </div>

      {hint && <span className="adm-field__hint">{hint}</span>}
    </div>
  )
}
