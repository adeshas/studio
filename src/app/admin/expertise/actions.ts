'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { expertise } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function saveExpertise(data: {
  id?: string
  slug: string
  title: string
  shortDescription?: string
  image?: string
  hint?: string
  longDescription?: string[]
  sortOrder: number
}) {
  if (data.id) {
    await db.update(expertise).set({ ...data, updatedAt: new Date() }).where(eq(expertise.id, data.id))
  } else {
    await db.insert(expertise).values(data)
  }
  revalidatePath('/our-expertise', 'page')
  revalidatePath('/our-expertise/[slug]', 'page')
}

export async function deleteExpertise(id: string) {
  await db.delete(expertise).where(eq(expertise.id, id))
  revalidatePath('/our-expertise', 'page')
}

export async function moveExpertise(id: string, direction: 'up' | 'down') {
  const all = await db.select().from(expertise).orderBy(expertise.sortOrder)
  const idx = all.findIndex(e => e.id === id)
  const swapIdx = direction === 'up' ? idx - 1 : idx + 1
  if (swapIdx < 0 || swapIdx >= all.length) return

  const a = all[idx]
  const b = all[swapIdx]
  await db.update(expertise).set({ sortOrder: b.sortOrder }).where(eq(expertise.id, a.id))
  await db.update(expertise).set({ sortOrder: a.sortOrder }).where(eq(expertise.id, b.id))
  revalidatePath('/our-expertise', 'page')
}
