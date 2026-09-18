'use client'

import React from 'react'
import { Reveal } from './Reveal'

interface BracketsProps {
  children: React.ReactNode
  tone?: 'line' | 'brass'
  className?: string
  delay?: number
}

export function Brackets({ children, tone = 'line', className = '', delay = 0 }: BracketsProps) {
  return (
    <Reveal className={`bracketed tone-${tone} ${className}`} delay={delay}>
      <i className="br tl" />
      <i className="br br2" />
      {children}
    </Reveal>
  )
}
