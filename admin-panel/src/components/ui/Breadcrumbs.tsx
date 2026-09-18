import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="breadcrumbs">
      <Link href="/">Главная</Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span className="sep">/</span>
            {isLast || !item.href ? (
              <span style={{ color: 'var(--text)' }}>{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
