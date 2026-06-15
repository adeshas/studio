import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth/session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (pathname.startsWith('/admin/login')) return NextResponse.next()

  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  const session = await verifySessionToken(token)
  if (!session) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
