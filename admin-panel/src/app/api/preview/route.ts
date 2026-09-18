import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/auth/guard'

const PATHS: Record<string, string> = {
  cases: '/cases',
  posts: '/media',
  services: '/services',
  employees: '/team',
}

export async function GET(req: NextRequest) {
  const user = await getUser()
  if (!user) return new NextResponse('Forbidden', { status: 403 })

  const collection = req.nextUrl.searchParams.get('collection') ?? ''
  const slug = req.nextUrl.searchParams.get('slug') ?? ''

  if (!PATHS[collection] || !/^[a-z0-9-]+$/.test(slug)) {
    return new NextResponse('Bad request', { status: 400 })
  }

  const dm = await draftMode()
  dm.enable()

  redirect(`${PATHS[collection]}/${slug}`)
}
