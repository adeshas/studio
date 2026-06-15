import { cache } from 'react'
import { db } from '@/db'
import { publications } from '@/db/schema'
import { asc } from 'drizzle-orm'

export const getPublications = cache(async () => {
  return db.select().from(publications).orderBy(asc(publications.sortOrder))
})

export const getPublicationsCount = cache(async () => {
  const items = await db.select({ id: publications.id }).from(publications)
  return items.length
})
