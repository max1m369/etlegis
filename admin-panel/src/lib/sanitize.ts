import sanitizeHtml from 'sanitize-html'

const defaultOptions: sanitizeHtml.IOptions = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'b', 'i', 'strong', 'em',
    'strike', 'code', 'hr', 'br', 'div', 'table', 'thead', 'caption',
    'tbody', 'tr', 'th', 'td', 'pre', 'ul', 'ol', 'li', 'blockquote',
    'span', 'sub', 'sup',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    span: ['class', 'style'],
    div: ['class', 'style'],
    p: ['class'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
}

export function cleanHtml(dirty?: string | null): string {
  if (!dirty) return ''
  return sanitizeHtml(dirty, defaultOptions)
}
