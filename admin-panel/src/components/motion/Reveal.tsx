'use client'

import React, { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  as?: React.ElementType
  className?: string
  style?: React.CSSProperties
}

export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  style = {},
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setSeen(true), delay)
          io.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -5% 0px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    <Tag ref={ref} className={`rv ${seen ? 'in-view' : ''} ${className}`} style={style}>
      {children}
    </Tag>
  )
}
