'use client'

import { Suspense, useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import { loginAction } from './actions'
import s from './login.module.css'

function LoginForm() {
  const searchParams = useSearchParams()
  const from = searchParams.get('from') ?? ''
  const [state, action, pending] = useActionState(loginAction, null)

  return (
    <form action={action} className={s.card}>
      <h1 className={s.title}>ETLEGIS</h1>
      <p className={s.sub}>Панель управления</p>

      <input type="hidden" name="from" value={from} />

      <label className={s.label}>
        E-mail
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          placeholder="admin@etlegis.ru"
          className={s.input}
        />
      </label>

      <label className={s.label}>
        Пароль
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Минимум 12 символов"
          className={s.input}
        />
      </label>

      {state?.error && (
        <p role="alert" className={s.error}>
          {state.error}
        </p>
      )}

      <button className={s.submit} disabled={pending}>
        {pending ? 'Проверяем…' : 'Войти в панель'}
      </button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <main className={s.wrap}>
      <Suspense fallback={<div className={s.card} style={{ textAlign: 'center' }}>Загрузка...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  )
}
