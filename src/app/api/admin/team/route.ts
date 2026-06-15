import { NextResponse } from 'next/server'
import { getTeamMembers } from '@/lib/data/team'

export async function GET() {
  const members = await getTeamMembers()
  return NextResponse.json(members)
}
