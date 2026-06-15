import { NextResponse } from 'next/server'
import { getPublications } from '@/lib/data/publications'

export async function GET() {
  const items = await getPublications()
  return NextResponse.json(items)
}
