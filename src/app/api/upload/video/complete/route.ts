import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifySessionToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { streamId } = await request.json()
  if (!streamId) return NextResponse.json({ error: 'streamId required' }, { status: 400 })

  const subdomain = process.env.CLOUDFLARE_STREAM_CUSTOMER_SUBDOMAIN!
  const manifestUrl = `https://${subdomain}.cloudflarestream.com/${streamId}/manifest/video.m3u8`

  return NextResponse.json({ src: manifestUrl, streamId })
}
