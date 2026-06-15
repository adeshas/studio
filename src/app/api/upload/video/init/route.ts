import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifySessionToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!
  const apiToken = process.env.CLOUDFLARE_STREAM_API_TOKEN!

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/direct_upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ maxDurationSeconds: 600, requireSignedURLs: false }),
    }
  )

  if (!res.ok) {
    const text = await res.text()
    return NextResponse.json({ error: `Stream API error: ${text}` }, { status: 500 })
  }

  const data = await res.json()
  return NextResponse.json({
    uploadUrl: data.result.uploadURL,
    streamId: data.result.uid,
  })
}
