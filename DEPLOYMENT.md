# 🚀 Deployment Guide

Complete guide to deploying your Homelab Dashboard to Vercel with Convex backend.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- [Git](https://git-scm.com/) installed
- [GitHub](https://github.com) account
- [Vercel](https://vercel.com) account (free tier works great)
- [Convex](https://convex.dev) account (free tier included)

## Step-by-Step Deployment

### 1. Prepare Your Code

```bash
# Navigate to your project
cd homelab-dashboard-app

# Install dependencies
npm install
```

### 2. Set Up Convex

#### Option A: Using Convex CLI (Recommended)

```bash
# Start Convex development
npx convex dev
```

This will:
1. Open your browser to sign in to Convex
2. Create a new project (or select existing)
3. Generate `.env.local` with your Convex URL
4. Deploy your Convex functions
5. Start watching for changes

Keep this terminal running during development.

#### Option B: Manual Setup

1. Go to [dashboard.convex.dev](https://dashboard.convex.dev)
2. Create a new project
3. Copy your deployment URL
4. Create `.env.local`:

```bash
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

5. Deploy functions:

```bash
npx convex deploy
```

### 3. Test Locally

In a new terminal:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

1. Click "Initialize Dashboard"
2. Test adding/editing services in Settings
3. Verify everything works

### 4. Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Homelab Dashboard"

# Create GitHub repo and push
gh repo create homelab-dashboard --public --source=. --push

# Or manually:
# 1. Create repo on GitHub
# 2. Add remote: git remote add origin https://github.com/yourusername/homelab-dashboard.git
# 3. Push: git push -u origin main
```

### 5. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Follow prompts, then deploy to production
vercel --prod
```

#### Option B: Using Vercel Dashboard (Easier)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. Add environment variable:
   - **Name**: `NEXT_PUBLIC_CONVEX_URL`
   - **Value**: Your Convex production URL (from dashboard.convex.dev)

6. Click "Deploy"

### 6. Set Up Production Convex

Your development Convex instance is different from production!

1. Go to [dashboard.convex.dev](https://dashboard.convex.dev)
2. Click your project
3. Click "Production" tab
4. Copy the production URL
5. Update Vercel environment variable:

```bash
vercel env add NEXT_PUBLIC_CONVEX_URL production
# Paste your production Convex URL
```

6. Redeploy:

```bash
vercel --prod
```

Or in Vercel Dashboard:
- Settings → Environment Variables
- Update `NEXT_PUBLIC_CONVEX_URL` for Production
- Deployments → Redeploy

### 7. Initialize Production Data

1. Visit your production URL (e.g., `homelab-dashboard.vercel.app`)
2. Click "Initialize Dashboard"
3. Go to Settings
4. Update service URLs to match your homelab

## Environment Variables Reference

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL | `https://happy-animal-123.convex.cloud` |

### Optional (for future API integrations)

| Variable | Description |
|----------|-------------|
| `VERCEL_TOKEN` | Vercel API token for deployment status |
| `GITHUB_TOKEN` | GitHub personal access token |
| `TRUENAS_API_KEY` | TrueNAS API key |

## Custom Domain

### Add Custom Domain to Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `homelab.yourdomain.com`)
3. Follow DNS instructions to add A/CNAME record
4. Wait for DNS propagation (up to 48 hours, usually < 1 hour)

### DNS Configuration Examples

**Cloudflare:**
```
Type: CNAME
Name: homelab
Content: cname.vercel-dns.com
Proxy status: DNS only (grey cloud)
```

**Other providers:**
```
CNAME homelab.yourdomain.com → cname.vercel-dns.com
```

## Continuous Deployment

Once connected to GitHub, Vercel automatically deploys:

- **Production**: On push to `main` branch
- **Preview**: On push to other branches or pull requests

### Trigger Manual Deploy

```bash
# From CLI
vercel --prod

# Or in Vercel Dashboard
# Deployments → Redeploy
```

## Convex Schema Changes

When you update `convex/schema.ts`:

1. **Development**:
   - Convex dev automatically picks up changes
   - No action needed

2. **Production**:
   ```bash
   npx convex deploy --prod
   ```

## Monitoring & Logs

### Vercel Logs

```bash
# View real-time logs
vercel logs

# View specific deployment
vercel logs [deployment-url]
```

Or in Vercel Dashboard → Deployments → [Your Deployment] → Logs

### Convex Logs

- Go to [dashboard.convex.dev](https://dashboard.convex.dev)
- Select your project
- Click "Logs" tab

## Rollback

### Rollback Vercel Deployment

1. Vercel Dashboard → Deployments
2. Find previous successful deployment
3. Click "⋯" → "Promote to Production"

### Rollback Convex Functions

Convex keeps deployment history:

1. [dashboard.convex.dev](https://dashboard.convex.dev) → Your Project
2. Deployments tab
3. Click previous deployment → "Restore"

## Troubleshooting

### Build Failed on Vercel

**Error: Module not found**
```bash
# Make sure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

**Error: NEXT_PUBLIC_CONVEX_URL is not defined**
- Add environment variable in Vercel Dashboard
- Make sure it's set for Production environment
- Redeploy

### Convex Connection Issues

**"Failed to connect to Convex"**

1. Verify Convex URL is correct:
   ```bash
   # Should match .env.local
   echo $NEXT_PUBLIC_CONVEX_URL
   ```

2. Check Convex deployment status at dashboard.convex.dev

3. Verify functions are deployed:
   ```bash
   npx convex deploy --prod
   ```

### Data Not Syncing

1. Check browser console for errors (F12)
2. Verify you're on production Convex, not development
3. Hard refresh: Cmd/Ctrl + Shift + R

### Services Not Loading

1. Click "Initialize Dashboard" if it's your first time
2. Check Convex logs for errors
3. Verify database schema is deployed

## Updating Your Deployment

### Update Code

```bash
# Make changes
git add .
git commit -m "Update: description of changes"
git push

# Vercel auto-deploys on push to main
```

### Update Convex Functions

```bash
# Changes auto-deploy in dev mode (npx convex dev)

# For production:
npx convex deploy --prod
```

## Performance Optimization

### Enable Vercel Analytics

1. Vercel Dashboard → Your Project → Analytics
2. Enable Analytics (free tier available)

### Convex Optimization

- Use indexes for frequently queried fields
- Batch operations when possible
- Cache API responses

### Next.js Optimization

Already included:
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ Font optimization
- ✅ Turbopack for faster builds

## Security Best Practices

1. **Never commit secrets**:
   - Use `.env.local` (gitignored)
   - Use Vercel environment variables

2. **Protect settings page**:
   - Add authentication (NextAuth.js or Convex Auth)
   - Restrict access to admin users

3. **API keys**:
   - Store in Vercel environment variables
   - Never expose in client code

4. **CORS**:
   - Configure Convex functions to accept requests only from your domain

## Costs

### Free Tier Limits

**Vercel:**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic SSL

**Convex:**
- 1M function calls/month
- 1 GB database storage
- 1 GB file storage

**Both are generous for personal homelab use!**

## Support

- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Convex**: [docs.convex.dev](https://docs.convex.dev)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)

## Next Steps

1. ✅ Deploy successfully
2. ✅ Add your homelab services
3. 🔐 Add authentication (optional)
4. 🔌 Add API integrations (optional)
5. 🎨 Customize theme/branding
6. 📊 Add monitoring dashboards

---

**Congratulations! Your Homelab Dashboard is live! 🎉**
