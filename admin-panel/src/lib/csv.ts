function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : ''), obj)
}

function escapeCsvCell(value: any): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'object') {
    if (value instanceof Date) return value.toISOString()
    if (Array.isArray(value)) return `"${value.map((v) => (typeof v === 'object' ? v.name || v.title || v.id : v)).join('; ')}"`
    return `"${value.name || value.title || JSON.stringify(value).replace(/"/g, '""')}"`
  }
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes(';')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export function toCsv(docs: any[], fields: string[]): string {
  const header = fields.join(';')
  const rows = docs.map((doc) => {
    return fields
      .map((field) => {
        const val = getNestedValue(doc, field)
        return escapeCsvCell(val)
      })
      .join(';')
  })
  return [header, ...rows].join('\r\n')
}
