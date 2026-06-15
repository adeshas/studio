import { cache } from 'react'
import { db } from '@/db'
import { expertise } from '@/db/schema'
import { eq, asc } from 'drizzle-orm'

export const getExpertise = cache(async () => {
  return db.select().from(expertise).orderBy(asc(expertise.sortOrder))
})

export const getExpertiseBySlug = cache(async (slug: string) => {
  const [item] = await db.select().from(expertise).where(eq(expertise.slug, slug))
  return item ?? null
})

export const getExpertiseCount = cache(async () => {
  const items = await db.select({ id: expertise.id }).from(expertise)
  return items.length
})
