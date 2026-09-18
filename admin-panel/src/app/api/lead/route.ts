import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getPayload } from '@/lib/payload'

const schema = z.object({
  name: z.string().min(2).max(120),
  phone: z.string().min(6).max(32),
  email: z.string().email().optional().or(z.literal('')),
  message: z.string().max(2000).optional(),
  source: z.string().max(120).optional(),
  consent: z.literal(true),
  hp: z.string().max(0).optional(), // Honeypot bot protection
  diagnostics: z.any().optional(),
})

const hits = new Map<string, number[]>()
const isRateLimited = (ip: string) => {
  const now = Date.now()
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < 60_000)
  arr.push(now)
  hits.set(ip, arr)
  return arr.length > 5
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Слишком много запросов. Пожалуйста, подождите минуту.' }, { status: 429 })
  }

  try {
    const json = await req.json()
    const parsed = schema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Некорректно заполнены обязательные поля формы', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const d = parsed.data

    const payload = await getPayload()
    await payload.create({
      collection: 'leads',
      data: {
        name: d.name,
        phone: d.phone,
        email: d.email || undefined,
        message: d.message,
        source: d.source,
        diagnostics: d.diagnostics,
        status: 'new',
        consent: {
          given: true,
          at: new Date().toISOString(),
          policyVersion: '1.0',
          ip,
        },
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    console.error('Lead creation error:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка при сохранении заявки. Пожалуйста, свяжитесь по телефону.' },
      { status: 500 }
    )
  }
}
