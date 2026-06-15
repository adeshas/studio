import { NextRequest, NextResponse } from 'next/server'
import { getSetting } from '@/lib/data/settings'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params
  const value = await getSetting(key)
  return NextResponse.json(value)
}
