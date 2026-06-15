import { MetadataRoute } from 'next'
import { getExpertise } from '@/lib/data/expertise'
import { getTeamMembers } from '@/lib/data/team'

const BASE_URL = 'https://www.oyewoleadesina.com'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: `${BASE_URL}/`, changeFrequency: 'yearly' as const, priority: 1.0 },
    { url: `${BASE_URL}/the-firm`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/our-expertise`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/our-people`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/gallery`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/careers`, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${BASE_URL}/publications`, changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'yearly' as const, priority: 0.5 },
  ].map(page => ({ ...page, lastModified: new Date() }))

  const [expertiseItems, teamMembers] = await Promise.all([getExpertise(), getTeamMembers()])

  const expertisePages = expertiseItems.map(e => ({
    url: `${BASE_URL}/our-expertise/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const teamPages = teamMembers.map(m => ({
    url: `${BASE_URL}/our-people/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...expertisePages, ...teamPages]
}
