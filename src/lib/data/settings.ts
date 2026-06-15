import { cache } from 'react'
import { db } from '@/db'
import { siteSettings } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const getSetting = cache(async (key: string) => {
  const [row] = await db.select().from(siteSettings).where(eq(siteSettings.key, key))
  return row?.value ?? null
})

export interface HeroSlide {
  heading: string
  subheading: string
}

export const getHeroSlides = cache(async (): Promise<HeroSlide[]> => {
  const value = await getSetting('hero_slides')
  return (value as HeroSlide[]) ?? []
})
