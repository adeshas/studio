import { NextResponse } from 'next/server'
import { getExpertise } from '@/lib/data/expertise'

export async function GET() {
  const items = await getExpertise()
  return NextResponse.json(items)
}
