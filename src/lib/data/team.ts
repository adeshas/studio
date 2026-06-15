import { cache } from 'react'
import { db } from '@/db'
import { teamMembers } from '@/db/schema'
import { eq, asc } from 'drizzle-orm'

export const getTeamMembers = cache(async () => {
  return db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder))
})

export const getTeamMemberBySlug = cache(async (slug: string) => {
  const [member] = await db.select().from(teamMembers).where(eq(teamMembers.slug, slug))
  return member ?? null
})

export const getTeamMemberCount = cache(async () => {
  const members = await db.select({ id: teamMembers.id }).from(teamMembers)
  return members.length
})
