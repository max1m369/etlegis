import React from 'react'
import Link from 'next/link'
import { Reveal } from '../motion/Reveal'

interface CardProps {
  children: React.ReactNode
  href?: string
  className?: string
  delay?: number
  style?: React.CSSProperties
}

export function Card({
  children,
  href,
  className = '',
  delay = 0,
  style,
}: CardProps) {
  if (href) {
    return (
      <Reveal delay={delay} as="div">
        <Link href={href} className={`card ${className}`} style={style}>
          {children}
        </Link>
      </Reveal>
    )
  }

  return (
    <Reveal delay={delay} className={`card ${className}`} style={style}>
      {children}
    </Reveal>
  )
}
