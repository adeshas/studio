'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { teamMembers } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function saveTeamMember(data: {
  id?: string
  name: string
  slug: string
  role: string
  description?: string
  email?: string
  linkedin?: string
  image?: string
  maskedImage?: string
  blackedImage?: string
  hint?: string
  sortOrder: number
}) {
  if (data.id) {
    await db.update(teamMembers).set({ ...data, updatedAt: new Date() }).where(eq(teamMembers.id, data.id))
  } else {
    await db.insert(teamMembers).values(data)
  }
  revalidatePath('/our-people', 'page')
  revalidatePath('/our-people/[slug]', 'page')
  revalidatePath('/', 'page')
}

export async function deleteTeamMember(id: string) {
  await db.delete(teamMembers).where(eq(teamMembers.id, id))
  revalidatePath('/our-people', 'page')
  revalidatePath('/our-people/[slug]', 'page')
  revalidatePath('/', 'page')
}

export async function moveTeamMember(id: string, direction: 'up' | 'down') {
  const all = await db.select().from(teamMembers).orderBy(teamMembers.sortOrder)
  const idx = all.findIndex(m => m.id === id)
  const swapIdx = direction === 'up' ? idx - 1 : idx + 1
  if (swapIdx < 0 || swapIdx >= all.length) return

  const a = all[idx]
  const b = all[swapIdx]
  await db.update(teamMembers).set({ sortOrder: b.sortOrder }).where(eq(teamMembers.id, a.id))
  await db.update(teamMembers).set({ sortOrder: a.sortOrder }).where(eq(teamMembers.id, b.id))
  revalidatePath('/our-people', 'page')
}
