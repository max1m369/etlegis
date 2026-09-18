import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const auditChange: CollectionAfterChangeHook = async ({ req, doc, collection, operation }) => {
  try {
    await req.payload.create({
      collection: 'audit-log',
      data: {
        user: req.user?.id,
        action: operation,
        entity: collection.slug,
        entityId: String(doc.id),
        title: doc.title ?? doc.name ?? doc.publication ?? '',
        at: new Date().toISOString(),
      },
    })
  } catch (err) {
    // Non-blocking audit log
    console.error('Audit log change error:', err)
  }
  return doc
}

export const auditDelete: CollectionAfterDeleteHook = async ({ req, doc, collection }) => {
  try {
    await req.payload.create({
      collection: 'audit-log',
      data: {
        user: req.user?.id,
        action: 'delete',
        entity: collection.slug,
        entityId: String(doc.id),
        title: doc.title ?? doc.name ?? doc.publication ?? '',
        at: new Date().toISOString(),
      },
    })
  } catch (err) {
    console.error('Audit log delete error:', err)
  }
}
