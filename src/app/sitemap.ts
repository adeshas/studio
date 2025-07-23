import { MetadataRoute } from 'next'
import { expertiseData } from '@/lib/expertise-data';

const BASE_URL = 'https://www.oyewoleadesina.com';

export const dynamic = "force-static";
export const revalidate = 0;
export const output = "export";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${BASE_URL}/`, changeFrequency: 'yearly' as const, priority: 1.0 },
    { url: `${BASE_URL}/the-firm`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/our-expertise`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/our-people`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/careers`, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${BASE_URL}/publications`, changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'yearly' as const, priority: 0.5 },
  ].map(page => ({
    ...page,
    lastModified: new Date(),
  }));

  const expertisePages = expertiseData.map((expertise) => ({
    url: `${BASE_URL}/our-expertise/${expertise.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const allPages: MetadataRoute.Sitemap = [
    ...staticPages,
    ...expertisePages,
  ];

  return allPages;
}
