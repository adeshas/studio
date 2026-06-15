'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { galleryItems } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function addGalleryItem(data: {
  type: string
  src: string
  streamId?: string
  alt?: string
  hint?: string
  sortOrder: number
}) {
  await db.insert(galleryItems).values(data)
  revalidatePath('/gallery', 'page')
  revalidatePath('/', 'page')
}

export async function updateGalleryItem(id: string, data: { alt?: string; hint?: string }) {
  await db.update(galleryItems).set({ ...data, updatedAt: new Date() }).where(eq(galleryItems.id, id))
  revalidatePath('/gallery', 'page')
  revalidatePath('/', 'page')
}

export async function deleteGalleryItem(id: string) {
  await db.delete(galleryItems).where(eq(galleryItems.id, id))
  revalidatePath('/gallery', 'page')
  revalidatePath('/', 'page')
}

export async function moveGalleryItem(id: string, direction: 'up' | 'down') {
  const all = await db.select().from(galleryItems).orderBy(galleryItems.sortOrder)
  const idx = all.findIndex(g => g.id === id)
  const swapIdx = direction === 'up' ? idx - 1 : idx + 1
  if (swapIdx < 0 || swapIdx >= all.length) return

  const a = all[idx]
  const b = all[swapIdx]
  await db.update(galleryItems).set({ sortOrder: b.sortOrder }).where(eq(galleryItems.id, a.id))
  await db.update(galleryItems).set({ sortOrder: a.sortOrder }).where(eq(galleryItems.id, b.id))
  revalidatePath('/gallery', 'page')
  revalidatePath('/', 'page')
}
