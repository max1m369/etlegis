import { NextResponse, type NextRequest } from 'next/server'

const SESSION_COOKIE = 'etl_session'
const PUBLIC_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH || '/studio'
const ALLOWLIST = (process.env.ADMIN_IP_ALLOWLIST || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || ''

  if (ALLOWLIST.length && !ALLOWLIST.includes(ip)) {
    return new NextResponse('Not found', { status: 404 })
  }

  // Внешний путь (например /kabinet) → внутренний /studio
  let target = pathname
  if (PUBLIC_PATH !== '/studio') {
    if (pathname === PUBLIC_PATH || pathname.startsWith(PUBLIC_PATH + '/')) {
      target = pathname.replace(PUBLIC_PATH, '/studio')
    } else if (pathname.startsWith('/studio')) {
      return new NextResponse('Not found', { status: 404 })
    }
  }

  const isLogin = target.startsWith('/studio/login')
  if (target.startsWith('/studio') && !isLogin && !req.cookies.get(SESSION_COOKIE)) {
    const url = req.nextUrl.clone()
    url.pathname = `${PUBLIC_PATH}/login`
    url.search = `?from=${encodeURIComponent(pathname)}`
    return NextResponse.redirect(url)
  }

  const url = req.nextUrl.clone()
  url.pathname = target
  const res = target === pathname ? NextResponse.next() : NextResponse.rewrite(url)
  res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  res.headers.set('Referrer-Policy', 'same-origin')
  return res
}

export const config = { matcher: ['/studio/:path*', '/kabinet/:path*'] }
