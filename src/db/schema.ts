import { pgTable, text, uuid, integer, timestamp, jsonb } from 'drizzle-orm/pg-core'

export const adminUsers = pgTable('admin_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const teamMembers = pgTable('team_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  role: text('role').notNull(),
  description: text('description'),
  email: text('email'),
  linkedin: text('linkedin'),
  image: text('image'),
  maskedImage: text('masked_image'),
  blackedImage: text('blacked_image'),
  hint: text('hint'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const expertise = pgTable('expertise', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  shortDescription: text('short_description'),
  image: text('image'),
  hint: text('hint'),
  longDescription: text('long_description').array(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const publications = pgTable('publications', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  link: text('link').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const galleryItems = pgTable('gallery_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type').notNull(), // 'image' | 'video'
  src: text('src').notNull(),
  streamId: text('stream_id'),
  alt: text('alt'),
  hint: text('hint'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const siteSettings = pgTable('site_settings', {
  key: text('key').primaryKey(),
  value: jsonb('value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type TeamMember = typeof teamMembers.$inferSelect
export type NewTeamMember = typeof teamMembers.$inferInsert
export type Expertise = typeof expertise.$inferSelect
export type NewExpertise = typeof expertise.$inferInsert
export type Publication = typeof publications.$inferSelect
export type NewPublication = typeof publications.$inferInsert
export type GalleryItem = typeof galleryItems.$inferSelect
export type NewGalleryItem = typeof galleryItems.$inferInsert
