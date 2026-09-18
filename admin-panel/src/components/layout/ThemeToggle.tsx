'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    setMounted(true)
    const current = document.documentElement.dataset.theme as 'light' | 'dark'
    if (current) setTheme(current)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('etl-theme', next)
    } catch (e) {
      console.error(e)
    }
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className="toggle"
        aria-label="Сменить тему"
        style={{
          width: 44,
          height: 44,
          display: 'grid',
          placeItems: 'center',
          border: '1px solid var(--line)',
          background: 'none',
          color: 'var(--text)',
          cursor: 'pointer',
        }}
      >
        ◐
      </button>
    )
  }

  return (
    <button
      type="button"
      className="toggle"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
      title={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
      style={{
        width: 44,
        height: 44,
        display: 'grid',
        placeItems: 'center',
        border: '1px solid var(--line)',
        background: 'none',
        color: 'var(--text)',
        cursor: 'pointer',
        transition: 'all 0.25s var(--e)',
      }}
    >
      {theme === 'dark' ? '☼' : '◐'}
    </button>
  )
}
