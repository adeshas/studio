import { NextRequest, NextResponse } from 'next/server'
import { AwsClient } from 'aws4fetch'
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  const r2 = new AwsClient({
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
    region: 'auto',
    service: 's3',
  })

  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifySessionToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const ext = file.name.split('.').pop() ?? 'bin'
  const filename = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const bytes = await file.arrayBuffer()

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!
  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME!
  const endpoint = `https://${accountId}.r2.cloudflarestorage.com/${bucket}/${filename}`

  const res = await r2.fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
      'Content-Length': bytes.byteLength.toString(),
    },
    body: bytes,
  })

  if (!res.ok) {
    const text = await res.text()
    return NextResponse.json({ error: `R2 upload failed: ${text}` }, { status: 500 })
  }

  const publicUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${filename}`
  return NextResponse.json({ url: publicUrl })
}
