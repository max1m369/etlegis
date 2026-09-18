import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from '@/lib/payload'
import { getUser } from '@/auth/guard'
import { can, type Resource } from '@/auth/rbac'
import { toCsv } from '@/lib/csv'

const FIELDS: Record<string, string[]> = {
  leads: ['createdAt', 'name', 'phone', 'email', 'source', 'status', 'message'],
  bookings: ['createdAt', 'name', 'phone', 'slot', 'status', 'format', 'date', 'time'],
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const user = await getUser()
  const { collection } = await params

  if (!user || !FIELDS[collection] || !can(user.role, collection as Resource, 'read')) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const payload = await getPayload()
  const from = req.nextUrl.searchParams.get('from')
  const to = req.nextUrl.searchParams.get('to')
  const where: any = { and: [] }

  if (from) where.and.push({ createdAt: { greater_than_equal: from } })
  if (to) where.and.push({ createdAt: { less_than_equal: to } })

  const { docs } = await payload.find({
    collection: collection as never,
    limit: 5000,
    sort: '-createdAt',
    depth: 1,
    where: where.and.length ? where : undefined,
  })

  const csv = '\uFEFF' + toCsv(docs, FIELDS[collection]) // UTF-8 BOM для корректного открытия в Excel

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${collection}-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
