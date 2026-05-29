# Deployment Guide - Studio Site

## Quick Reference for Laptop & Server Deployment

---

## 1. ON YOUR LAPTOP (Local Development Machine)

### Step 1: Commit Changes
```bash
cd "/Users/ademolashasanya/Workspace/NGN/O&A/Site/New Site Builds/studio"

# Check status
git status

# Stage the files you want to deploy
#git add src/lib/team-data.ts src/components/testimonials.tsx src/app/test/profile/page.tsx

# Commit with a message
git commit -m "Update: Changed Mr. Adesina's name to Adedayo G. Adesina, SAN"

# Or if you've already committed, just push
git push origin v2branch
```


---

## 2. ON THE SERVER

### Step 1: SSH into Server
```bash
#ssh your-server-address
# or use your preferred SSH method
```

### Step 2: Navigate to Project Directory
```bash
cd /opt/sites/studio/
# (Replace with your actual server path)
```

### Step 3: Pull Latest Changes
```bash
# Fetch latest from repository
git fetch origin

# Pull the latest code
git pull origin v2branch

# Verify changes
git log --oneline -5
```

### Step 4: Install Dependencies & Build
```bash
# Install npm packages
npm install

# Build the Next.js project
npm run build

# Check for build errors
echo "Build status: $?"
```

### Step 5: Restart the Service
```bash
# If using PM2
pm2 restart studio
# or
pm2 restart all

# If using systemd
sudo systemctl restart studio
# or your service name

# If using manual process, stop and restart:
# pkill -f "next start"
# npm start &
```

### Step 6: Verify Deployment
```bash
# Check if service is running
ps aux | grep "next\|node"

# Test the site (replace with your domain)
curl https://your-domain.com
# Should return 200 OK
```

---

## Common Commands Reference

### Laptop
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server locally |
| `npm run build` | Build for production |
| `git status` | Check what changed |
| `git push origin v2branch` | Push to repository |

### Server
| Command | Purpose |
|---------|---------|
| `git pull origin v2branch` | Get latest code |
| `npm install` | Install/update dependencies |
| `npm run build` | Build for production |
| `pm2 restart studio` | Restart if using PM2 |
| `sudo systemctl restart studio` | Restart if using systemd |

---

## Troubleshooting

### Build Fails on Server
```bash
# Clear cache and node_modules
rm -rf node_modules .next
npm install
npm run build
```

### Changes Not Showing
```bash
# Make sure you pulled the latest
git pull origin v2branch

# Rebuild
npm run build

# Restart service
pm2 restart studio
```

### Check Server Logs
```bash
# PM2 logs
pm2 logs studio

# System logs
tail -f /var/log/your-app.log
```

---

## Quick One-Command Deploy (If Everything is Set Up)

**Laptop:**
```bash
git add . && git commit -m "Deploy: [your message]" && git push origin v2branch
```

**Server:**
```bash
cd /path/to/project && git pull origin v2branch && npm install && npm run build && pm2 restart studio
```

---

**Last Updated:** December 16, 2025  
**Project:** Oyewole & Adesina Studio  
**Branch:** v2branch
