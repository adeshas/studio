'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { publications } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function savePublication(data: {
  id?: string
  title: string
  description?: string
  link: string
  sortOrder: number
}) {
  if (data.id) {
    await db.update(publications).set({ ...data, updatedAt: new Date() }).where(eq(publications.id, data.id))
  } else {
    await db.insert(publications).values(data)
  }
  revalidatePath('/publications', 'page')
  revalidatePath('/', 'page')
}

export async function deletePublication(id: string) {
  await db.delete(publications).where(eq(publications.id, id))
  revalidatePath('/publications', 'page')
}

export async function movePublication(id: string, direction: 'up' | 'down') {
  const all = await db.select().from(publications).orderBy(publications.sortOrder)
  const idx = all.findIndex(p => p.id === id)
  const swapIdx = direction === 'up' ? idx - 1 : idx + 1
  if (swapIdx < 0 || swapIdx >= all.length) return

  const a = all[idx]
  const b = all[swapIdx]
  await db.update(publications).set({ sortOrder: b.sortOrder }).where(eq(publications.id, a.id))
  await db.update(publications).set({ sortOrder: a.sortOrder }).where(eq(publications.id, b.id))
  revalidatePath('/publications', 'page')
}
