import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getPayload } from '@/lib/payload'

const bookingSchema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(6).max(32),
  email: z.string().email().optional().or(z.literal('')),
  slotId: z.string().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
  format: z.enum(['online', 'office']).default('online'),
  notes: z.string().max(1000).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const parsed = bookingSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Неверные параметры бронирования' }, { status: 400 })
    }

    const { name, phone, email, slotId, date, time, format, notes } = parsed.data
    const payload = await getPayload()

    const booking = await payload.create({
      collection: 'bookings',
      data: {
        name,
        phone,
        email: email || undefined,
        slot: slotId || undefined,
        date: date || undefined,
        time: time || undefined,
        format,
        status: 'pending',
        notes: notes || undefined,
      } as any,
    })

    if (slotId) {
      await payload.update({
        collection: 'slots',
        id: slotId,
        data: { isBooked: true },
      }).catch(() => {})
    }

    return NextResponse.json({ ok: true, id: booking.id })
  } catch (error: any) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Ошибка при бронировании консультации' }, { status: 500 })
  }
}
