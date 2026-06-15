'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { siteSettings } from '@/db/schema'

export async function saveSetting(key: string, value: unknown) {
  await db.insert(siteSettings)
    .values({ key, value })
    .onConflictDoUpdate({ target: siteSettings.key, set: { value, updatedAt: new Date() } })
  revalidatePath('/', 'page')
}
