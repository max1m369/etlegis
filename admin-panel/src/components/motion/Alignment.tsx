'use client'

import { useEffect, useRef, useState } from 'react'

export function Alignment({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const [aligned, setAligned] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAligned(true), 400)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <svg
      ref={ref}
      className={`frames ${aligned ? 'aligned' : ''} ${className}`}
      viewBox="0 0 400 400"
      aria-hidden="true"
    >
      <rect
        x="120"
        y="150"
        width="150"
        height="110"
        style={{
          transform: 'translate(-90px,-70px) rotate(-18deg) scale(.75)',
          opacity: 0.35,
        }}
      />
      <rect
        x="120"
        y="150"
        width="150"
        height="110"
        style={{
          transform: 'translate(70px,-100px) rotate(24deg) scale(1.2)',
          opacity: 0.3,
        }}
      />
      <rect
        x="120"
        y="150"
        width="150"
        height="110"
        style={{
          transform: 'translate(-60px,90px) rotate(11deg) scale(.9)',
          opacity: 0.4,
        }}
      />
      <rect
        x="120"
        y="150"
        width="150"
        height="110"
        style={{
          transform: 'translate(110px,60px) rotate(-30deg) scale(1.1)',
          opacity: 0.25,
        }}
      />
      <rect
        x="120"
        y="150"
        width="150"
        height="110"
        style={{
          transform: 'translate(20px,-40px) rotate(6deg) scale(1.35)',
          opacity: 0.3,
        }}
      />
      <rect
        className="key"
        x="140"
        y="130"
        width="150"
        height="110"
        style={{
          transform: 'translate(-40px,120px) rotate(-9deg) scale(.8)',
          opacity: 0.5,
        }}
      />
    </svg>
  )
}
