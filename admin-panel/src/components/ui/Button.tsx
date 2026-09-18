import React from 'react'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'ghost' | 'brass'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: () => void
  disabled?: boolean
  style?: React.CSSProperties
}

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  onClick,
  disabled,
  style,
}: ButtonProps) {
  const variantClass =
    variant === 'ghost' ? 'ghost' : variant === 'brass' ? 'brass' : ''
  const sizeClass = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : ''
  const combinedClass = `btn ${variantClass} ${sizeClass} ${className}`.trim()

  if (href) {
    return (
      <Link href={href} className={combinedClass} style={style}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={combinedClass}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  )
}
