import { getPayload } from '@/lib/payload'
import { requirePermission } from '@/auth/guard'
import Uploader from './Uploader'
import { deleteMedia } from './actions'
import { formatDate } from '@/lib/format'

export const dynamic = 'force-dynamic'

export default async function MediaAdminPage() {
  await requirePermission('media', 'read')
  const payload = await getPayload()

  const res = await payload.find({
    collection: 'media',
    limit: 60,
    sort: '-createdAt',
  })

  return (
    <div>
      <header className="adm-head">
        <h1>
          Медиатека <span className="adm-count">{res.totalDocs}</span>
        </h1>
      </header>

      <Uploader />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
        }}
      >
        {res.docs.map((item: any) => (
          <div
            key={item.id}
            style={{
              background: 'var(--adm-surface)',
              border: '1px solid var(--adm-line)',
              borderRadius: 4,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                aspectRatio: '16 / 10',
                background: 'var(--adm-surface-alt)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {item.mimeType?.startsWith('image/') ? (
                <img
                  src={item.sizes?.thumb?.url || item.url}
                  alt={item.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span style={{ fontSize: 13, color: 'var(--adm-text-muted)' }}>📄 {item.filename}</span>
              )}
            </div>

            <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 500, wordBreak: 'break-word' }}>
                {item.alt || item.filename}
              </div>
              <div className="adm-muted" style={{ fontSize: 11 }}>
                {formatDate(item.createdAt)} • {item.filesize ? `${Math.round(item.filesize / 1024)} KB` : ''}
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="adm-btn"
                  style={{ padding: '2px 8px', fontSize: 11 }}
                >
                  Открыть
                </a>
                <form
                  action={async () => {
                    'use server'
                    await deleteMedia(item.id)
                  }}
                >
                  <button
                    type="submit"
                    className="adm-btn adm-btn--danger"
                    style={{ padding: '2px 8px', fontSize: 11 }}
                  >
                    Удалить
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
