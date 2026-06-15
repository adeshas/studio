/**
 * Usage: npx tsx scripts/create-admin.ts <email> <name> <password>
 * Example: npx tsx scripts/create-admin.ts jane@oyewoleadesina.com "Jane Doe" MySecurePass123
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { adminUsers } from '../src/db/schema'
import bcrypt from 'bcryptjs'

const [,, email, name, password] = process.argv

if (!email || !name || !password) {
  console.error('Usage: npx tsx scripts/create-admin.ts <email> <name> <password>')
  process.exit(1)
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const db = drizzle(pool)

async function createAdmin() {
  const passwordHash = await bcrypt.hash(password, 12)
  const [user] = await db.insert(adminUsers).values({ email, name, passwordHash }).returning()
  console.log(`Admin created: ${user.email} (id: ${user.id})`)
  await pool.end()
}

createAdmin().catch(err => { console.error(err); process.exit(1) })
