import { cache } from 'react'
import { db } from '@/db'
import { galleryItems } from '@/db/schema'
import { asc } from 'drizzle-orm'

export const getGalleryItems = cache(async () => {
  return db.select().from(galleryItems).orderBy(asc(galleryItems.sortOrder))
})

export const getGalleryCount = cache(async () => {
  const items = await db.select({ id: galleryItems.id }).from(galleryItems)
  return items.length
})
