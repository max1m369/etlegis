'use client'

import { useEffect, useRef } from 'react'

interface CounterProps {
  to: number
  dec?: number
  suffix?: string
  plain?: boolean
  duration?: number
}

export function Counter({
  to,
  dec = 0,
  suffix = '',
  plain = false,
  duration = 1200,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()

        const t0 = performance.now()
        const step = (t: number) => {
          const p = Math.min((t - t0) / duration, 1)
          const v = to * (1 - Math.pow(1 - p, 3))
          el.textContent = (plain ? Math.round(v).toString() : v.toFixed(dec)) + suffix
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.3 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [to, dec, suffix, plain, duration])

  return <span ref={ref}>0</span>
}
