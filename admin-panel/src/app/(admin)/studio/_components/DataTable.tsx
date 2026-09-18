import React from 'react'
import Link from 'next/link'

export interface Column<T = any> {
  key: string
  label: string
  primary?: boolean
  render?: (row: T) => React.ReactNode
}

interface DataTableProps<T = any> {
  basePath: string
  rows: T[]
  columns: Column<T>[]
  searchQuery?: string
  pagination?: {
    page: number
    totalPages: number
  }
}

export default function DataTable<T extends { id: string | number }>({
  basePath,
  rows,
  columns,
  searchQuery,
  pagination,
}: DataTableProps<T>) {
  return (
    <div className="adm-table-wrap">
      <div className="adm-table-toolbar">
        <form method="GET" style={{ display: 'flex', gap: 8, flex: 1, maxWidth: 360 }}>
          <input
            name="q"
            type="search"
            placeholder="Поиск по названию..."
            defaultValue={searchQuery ?? ''}
            className="adm-input"
            style={{ padding: '6px 12px', fontSize: 13 }}
          />
          <button type="submit" className="adm-btn" style={{ padding: '6px 12px', fontSize: 13 }}>
            Найти
          </button>
        </form>
      </div>

      <table className="adm-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '32px', color: 'var(--adm-text-muted)' }}>
                Нет записей
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id}>
                {columns.map((c) => (
                  <td key={c.key}>
                    {c.primary ? (
                      <Link href={`${basePath}/${row.id}`} className="adm-table-link">
                        {c.render ? c.render(row) : (row as any)[c.key] ?? '—'}
                      </Link>
                    ) : c.render ? (
                      c.render(row)
                    ) : (
                      (row as any)[c.key] ?? '—'
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {pagination && pagination.totalPages > 1 && (
        <div
          style={{
            padding: '12px 16px',
            borderTop: '1px solid var(--adm-line)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 13,
            color: 'var(--adm-text-muted)',
          }}
        >
          <span>
            Страница {pagination.page} из {pagination.totalPages}
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            {pagination.page > 1 && (
              <Link
                href={`${basePath}?page=${pagination.page - 1}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`}
                className="adm-btn"
                style={{ padding: '4px 10px', fontSize: 12 }}
              >
                Назад
              </Link>
            )}
            {pagination.page < pagination.totalPages && (
              <Link
                href={`${basePath}?page=${pagination.page + 1}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`}
                className="adm-btn"
                style={{ padding: '4px 10px', fontSize: 12 }}
              >
                Вперёд
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
