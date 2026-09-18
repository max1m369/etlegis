import React from 'react'
import { Reveal } from '../motion/Reveal'
import { Button } from './Button'

interface SectionHeadProps {
  eyebrow?: string
  title: string | React.ReactNode
  description?: string | React.ReactNode
  action?: {
    label: string
    href: string
  }
  align?: 'left' | 'center' | 'between'
  className?: string
}

export function SectionHead({
  eyebrow,
  title,
  description,
  action,
  align = 'between',
  className = '',
}: SectionHeadProps) {
  return (
    <div
      className={`sec-head ${className}`}
      style={{
        display: 'flex',
        flexDirection: align === 'center' ? 'column' : 'row',
        justifyContent: align === 'between' ? 'space-between' : align === 'center' ? 'center' : 'flex-start',
        alignItems: align === 'between' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start',
        textAlign: align === 'center' ? 'center' : 'left',
        marginBottom: 56,
        gap: 32,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ maxWidth: 720 }}>
        {eyebrow && <Reveal className="eyebrow">{eyebrow}</Reveal>}
        <Reveal delay={100}>
          <h2 style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', maxWidth: '16em' }}>
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={200}>
            <p className="lead" style={{ marginTop: 16 }}>
              {description}
            </p>
          </Reveal>
        )}
      </div>

      {action && (
        <Reveal delay={150}>
          <Button href={action.href} variant="ghost">
            {action.label}
          </Button>
        </Reveal>
      )}
    </div>
  )
}
