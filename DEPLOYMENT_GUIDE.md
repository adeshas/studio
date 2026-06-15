# Deployment Guide — Oyewole & Adesina Studio

## Overview

The site is a Next.js 15 app that talks to a local PostgreSQL database.
Media (images, PDFs, videos) is hosted on Cloudflare R2 and Cloudflare Stream.
The admin panel lives at `/admin`.

---

## First-Time Setup (do this once on each environment)

### 1. Copy and fill in environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in every value:

| Variable | Where to find it |
|---|---|
| `DATABASE_URL` | `postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME` |
| `AUTH_SECRET` | Run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → top-right menu → Account ID |
| `CLOUDFLARE_R2_ACCESS_KEY_ID` | R2 → Manage R2 API Tokens → Create Token |
| `CLOUDFLARE_R2_SECRET_ACCESS_KEY` | Same token creation page |
| `CLOUDFLARE_R2_BUCKET_NAME` | Your R2 bucket name |
| `CLOUDFLARE_R2_PUBLIC_URL` | Your R2 public bucket URL (e.g. `https://pub-xxx.r2.dev`) |
| `CLOUDFLARE_STREAM_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens |
| `CLOUDFLARE_STREAM_CUSTOMER_SUBDOMAIN` | Found in Stream embed URLs (e.g. `customer-abc123`) |

---

### 2. Create the PostgreSQL database

```bash
# Connect to Postgres
psql -U postgres

# Create the database
CREATE DATABASE oa_cms;
\q
```

---

### 3. Push the database schema

```bash
npm run db:push
```

This creates all the tables (`team_members`, `expertise`, `publications`, `gallery_items`, `site_settings`, `admin_users`).

---

### 4. Seed the database with existing content

```bash
npm run db:seed
```

This imports all 81 records from the static TypeScript data files into the database. Safe to run only once — it uses `ON CONFLICT DO NOTHING`.

---

### 5. Create your first admin user

```bash
npx tsx scripts/create-admin.ts jane@oyewoleadesina.com "Jane Doe" "YourSecurePassword"
```

Repeat for each staff member who needs access (up to 5).

---

### 6. Test locally

```bash
npm run dev
```

- Site: http://localhost:9002
- Admin: http://localhost:9002/admin/login

---

## Routine Deployment

### On Your Laptop

```bash
# Check what changed
git status

# Stage and commit
git add <files>
git commit -m "Your message"

# Push to repository
git push origin v2branch
```

---

### On the Server

**One-command deploy:**
```bash
cd /path/to/project && git pull origin v2branch && npm install && npm run build && pm2 restart studio
```

Or step by step:

```bash
# 1. Pull latest code
git pull origin v2branch

# 2. Install any new dependencies
npm install

# 3. Run any new DB schema changes (safe to run; skips if already applied)
npm run db:push

# 4. Build
npm run build

# 5. Restart the service
# If using PM2:
pm2 restart studio

# If using systemd:
sudo systemctl restart studio
```

---

## Process Manager Setup (choose one)

### Option A — PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start the app
pm2 start npm --name "studio" -- start

# Save so it restarts on server reboot
pm2 save
pm2 startup
```

### Option B — systemd

Create `/etc/systemd/system/studio.service`:

```ini
[Unit]
Description=O&A Studio (Next.js)
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/project
ExecStart=/usr/bin/npm start
Restart=on-failure
EnvironmentFile=/path/to/project/.env.local

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable studio
sudo systemctl start studio
```

---

## Adding a New Admin User (server)

SSH into the server, go to the project directory, then:

```bash
npx tsx scripts/create-admin.ts newuser@oyewoleadesina.com "Full Name" "SecurePassword"
```

---

## Environment Variables on the Server

The server's `.env.local` must have the same variables as your local one, but with production values — especially:
- `DATABASE_URL` pointing to the server's Postgres instance
- `AUTH_SECRET` must be the same value across deployments (changing it logs everyone out)
- `NODE_ENV=production` (Next.js sets this automatically on `npm start`)

---

## Troubleshooting

### Build fails — clear cache

```bash
rm -rf .next node_modules
npm install
npm run build
```

### Database connection error

```bash
# Check Postgres is running
sudo systemctl status postgresql

# Test the connection string
psql "postgresql://USER:PASSWORD@localhost:5432/oa_cms" -c "\dt"
```

### Changes not showing on the live site

The CMS uses Next.js `revalidatePath` — content updates are instant after a Save in the admin. If a page still shows old content:

```bash
# Restart the server to clear any in-memory cache
pm2 restart studio
# or
sudo systemctl restart studio
```

### Check server logs

```bash
# PM2
pm2 logs studio --lines 100

# systemd
journalctl -u studio -n 100 --no-pager
```

---

## Common Commands Reference

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server (port 9002) |
| `npm run build` | Build for production |
| `npm run db:push` | Push schema changes to DB |
| `npm run db:seed` | Seed DB from static data files (once only) |
| `npm run db:studio` | Open Drizzle visual DB browser |
| `npx tsx scripts/create-admin.ts` | Create an admin user |
| `git push origin v2branch` | Push to repository |
| `pm2 restart studio` | Restart if using PM2 |
| `sudo systemctl restart studio` | Restart if using systemd |

---

**Last Updated:** June 2026
**Project:** Oyewole & Adesina Studio
**Branch:** v2branch
