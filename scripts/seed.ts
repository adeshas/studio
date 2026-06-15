import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { teamMembers, expertise, publications, galleryItems, siteSettings } from '../src/db/schema'
import { teamMembers as teamData } from '../src/lib/team-data'
import { expertiseData } from '../src/lib/expertise-data'
import { publicationsData } from '../src/lib/publications-data'
import { testGalleryMedia } from '../src/lib/test-gallery-data'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool)

async function seed() {
  console.log('Seeding team members...')
  await db.insert(teamMembers).values(
    teamData.map((m, i) => ({
      name: m.name,
      slug: m.slug,
      role: m.role,
      description: m.description,
      email: m.email ?? '',
      linkedin: m.linkedin ?? '',
      image: m.image,
      maskedImage: m.maskedImage,
      blackedImage: m.blackedImage,
      hint: m.hint,
      sortOrder: i,
    }))
  ).onConflictDoNothing()

  console.log('Seeding expertise...')
  await db.insert(expertise).values(
    expertiseData.map((e, i) => ({
      slug: e.slug,
      title: e.title,
      shortDescription: e.shortDescription,
      image: e.image,
      hint: e.hint,
      longDescription: e.longDescription,
      sortOrder: i,
    }))
  ).onConflictDoNothing()

  console.log('Seeding publications...')
  await db.insert(publications).values(
    publicationsData.map((p, i) => ({
      title: p.title,
      description: p.description,
      link: p.link,
      sortOrder: i,
    }))
  ).onConflictDoNothing()

  console.log('Seeding gallery...')
  await db.insert(galleryItems).values(
    testGalleryMedia.map((g, i) => ({
      type: g.type,
      src: g.src,
      streamId: 'streamId' in g ? g.streamId : null,
      alt: g.alt,
      hint: g.hint,
      sortOrder: i,
    }))
  )

  console.log('Seeding site settings...')
  await db.insert(siteSettings).values([
    {
      key: 'hero_slides',
      value: [
        { heading: 'Trusted Legal Partners', subheading: "Decades of collective experience guiding clients through Nigeria's most complex commercial and regulatory challenges." },
        { heading: 'Comprehensive Expertise', subheading: 'From dispute resolution to finance, real estate to IP, our full-service teams deliver tailored, sector-focused counsel.' },
        { heading: 'Client-Centric Solutions', subheading: 'We dive deep into your business, crafting practical strategies that protect your interests and drive results.' },
        { heading: 'Integrity & Excellence', subheading: 'Unwavering commitment to ethical standards, efficiency and clear communication at every step.' },
      ],
    },
    {
      key: 'firm_intro_image',
      value: 'https://pub-dff2dcf3e9c045f2bd47bede1998375e.r2.dev/uploads/ENTRANCE.JPG',
    },
  ]).onConflictDoNothing()

  await pool.end()
  console.log('Done.')
}

seed().catch(err => { console.error(err); process.exit(1) })
