# ⚡ Quick Start - 5 Minutes to Production

Get your Homelab Dashboard live on Vercel in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- GitHub account
- That's it! (Vercel & Convex accounts created during setup)

## Step 1: Clone & Install (1 minute)

```bash
cd homelab-dashboard-app
npm install
```

## Step 2: Set Up Convex (2 minutes)

```bash
npx convex dev
```

This opens your browser to:
1. ✅ Sign in to Convex (or create free account)
2. ✅ Create a new project
3. ✅ Auto-generate `.env.local`
4. ✅ Deploy backend functions

**Keep this terminal running!**

## Step 3: Test Locally (30 seconds)

Open a new terminal:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

Click "Initialize Dashboard" → You should see default services!

## Step 4: Push to GitHub (1 minute)

```bash
# If you have GitHub CLI
gh repo create homelab-dashboard --public --source=. --push

# Or manually:
git init
git add .
git commit -m "Initial commit"
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/homelab-dashboard.git
git push -u origin main
```

## Step 5: Deploy to Vercel (30 seconds)

### Option A: Vercel Dashboard (Easiest)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import" on your GitHub repo
3. Add environment variable:
   - **Name**: `NEXT_PUBLIC_CONVEX_URL`
   - **Value**: Copy from your `.env.local` file
4. Click "Deploy"

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

When prompted for environment variables, paste your Convex URL from `.env.local`.

## Step 6: Configure Your Services (ongoing)

1. Visit your deployed URL (e.g., `your-app.vercel.app`)
2. Click "⚙️ Settings"
3. Update service URLs to match your homelab
4. Add/remove services as needed

## Done! 🎉

Your dashboard is live and auto-deploys on every git push!

## What You Just Built

✅ Next.js 15 app with Turbopack  
✅ Convex serverless backend  
✅ Real-time database  
✅ Automatic deployments  
✅ SSL certificate  
✅ Global CDN  
✅ Zero configuration  

## Next Steps

- 📝 [Read full documentation](./README.md)
- 🚀 [Deployment guide](./DEPLOYMENT.md)
- 🎨 Customize colors and layout
- 🔌 Add API integrations
- 🔐 Add authentication

## Troubleshooting

### "NEXT_PUBLIC_CONVEX_URL is not defined"

Run `npx convex dev` in one terminal, `npm run dev` in another.

### Services not showing

Click "Initialize Dashboard" on first visit.

### Changes not deploying

```bash
git add .
git commit -m "Your changes"
git push
```

Vercel auto-deploys on push to main branch.

## Helpful Commands

```bash
# Development
npm run dev              # Start Next.js dev server
npm run convex:dev       # Start Convex dev (same as npx convex dev)

# Deployment
npm run deploy           # Deploy to Vercel production
npm run convex:deploy    # Deploy Convex functions to production

# Build locally
npm run build            # Test production build
npm run start            # Run production build locally
```

## Support

- Check browser console (F12) for errors
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed steps
- Check Convex logs at [dashboard.convex.dev](https://dashboard.convex.dev)
- Check Vercel logs in Vercel Dashboard

---

**Your homelab dashboard is now live! Add your services and enjoy! 🏠**
