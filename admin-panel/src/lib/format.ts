export function formatCurrency(amount?: number | null, fallback = ''): string {
  if (amount == null || isNaN(amount)) return fallback
  if (amount >= 1_000_000_000) {
    const b = amount / 1_000_000_000
    return `${b % 1 === 0 ? b : b.toFixed(1)} млрд ₽`
  }
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000
    return `${m % 1 === 0 ? m : m.toFixed(1)} млн ₽`
  }
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(amount)
}

export const formatMoney = formatCurrency

export function formatDate(dateString?: string | null): string {
  if (!dateString) return ''
  const d = new Date(dateString)
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

export function formatPhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '')
}
