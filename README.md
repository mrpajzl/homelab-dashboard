# 🏠 Homelab Dashboard

A modern, configurable homelab dashboard built with **Next.js**, **Convex**, and **Tailwind CSS**. Deploy to Vercel in minutes and manage all your services through a beautiful web interface.

## ✨ Features

- **Web-Based Configuration** - No config files! Manage everything through the UI
- **Convex Backend** - Real-time updates and serverless database
- **Vercel Deployment** - Deploy globally in one click
- **Service Management** - Add, edit, delete, and organize services
- **Categories** - Arr Stack, Storage, Downloads, Projects, Quick Access
- **System Monitoring** - CPU, RAM, and storage stats
- **Responsive Design** - Beautiful on desktop, tablet, and mobile
- **Real-time Updates** - Changes sync instantly across devices
- **Dark Theme** - Modern gradient design optimized for homelabs

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo>
cd homelab-dashboard-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Convex

```bash
# Login to Convex (creates account if needed)
npx convex dev

# This will:
# - Open your browser to sign in
# - Create a new project
# - Generate .env.local with your Convex URL
# - Start the Convex dev server
```

The Convex dev server will watch for changes and deploy them automatically.

### 4. Run Development Server

In a new terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click "Initialize Dashboard" to set up default services.

### 5. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add your Convex URL as environment variable
vercel env add NEXT_PUBLIC_CONVEX_URL
# Paste your production Convex URL from dashboard.convex.dev

# Deploy to production
vercel --prod
```

Or use the [Vercel Dashboard](https://vercel.com/new):
1. Import your GitHub repository
2. Add environment variable: `NEXT_PUBLIC_CONVEX_URL`
3. Deploy!

## 📖 Usage

### First Time Setup

1. Visit your deployed dashboard
2. Click "Initialize Dashboard" to create default services
3. Go to Settings to customize your services

### Adding Services

1. Click "⚙️ Settings" from the dashboard
2. Scroll to "Add New Service"
3. Fill in:
   - **Name**: Display name (e.g., "Sonarr")
   - **Category**: arr / storage / downloads / projects / quick
   - **URL**: Full URL to your service
   - **Icon**: Any emoji 🎬
4. Click "Add Service"

### Editing Services

1. Go to Settings
2. Find the service you want to edit
3. Click "Edit"
4. Update fields inline
5. Click "Done"

### Disabling Services

Check/uncheck the checkbox next to any service to show/hide it on the dashboard.

### Deleting Services

Click "Delete" next to any service (confirmation required).

## 🛠️ Configuration

### General Settings

- **Dashboard Title**: Customize your dashboard name
- **Update Interval**: How often stats refresh (milliseconds)
- **Show System Stats**: Toggle system monitoring display

### Categories

Services are organized into categories:

- **📚 Arr Stack**: Sonarr, Radarr, Prowlarr, Lidarr
- **💾 Storage**: TrueNAS, NAS systems
- **⬇️ Downloads**: qBittorrent, Transmission, etc.
- **🚀 Projects**: GitHub, Vercel, Codex, dev tools
- **⚡ Quick Access**: Portainer, Home Assistant, Grafana, etc.

You can add custom categories by using any string in the category field.

## 🔧 Development

### Project Structure

```
homelab-dashboard-app/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main dashboard
│   ├── settings/          # Settings page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx
│   ├── ServiceTile.tsx
│   ├── SystemStats.tsx
│   └── InitializeButton.tsx
├── convex/                # Convex backend
│   ├── schema.ts          # Database schema
│   ├── services.ts        # Service CRUD operations
│   ├── settings.ts        # Settings management
│   └── apiKeys.ts         # API key management
└── public/                # Static assets
```

### Database Schema

**Services Table**:
- `name`: Service display name
- `category`: Organization category
- `url`: Service URL
- `icon`: Emoji icon
- `enabled`: Show/hide service
- `order`: Display order

**Settings Table**:
- `key`: Setting identifier
- `value`: Setting value (stored as string)

**API Keys Table** (future):
- `service`: Service name
- `key`: API key (encrypted)
- `enabled`: Enable/disable integration

### Adding New Features

1. **Update Schema**: Edit `convex/schema.ts`
2. **Add Functions**: Create mutations/queries in `convex/`
3. **Update UI**: Add components in `components/`
4. **Deploy**: Convex auto-deploys on save

### Environment Variables

Create `.env.local`:

```bash
# Required
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Optional (for API integrations)
VERCEL_TOKEN=your_vercel_token
GITHUB_TOKEN=your_github_token
TRUENAS_API_KEY=your_truenas_key
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add `NEXT_PUBLIC_CONVEX_URL` environment variable
4. Deploy!

Your Convex deployment URL is available at [dashboard.convex.dev](https://dashboard.convex.dev)

### Custom Deployment

The app can be deployed anywhere that supports Next.js:

- **Vercel**: Best integration, automatic deployments
- **Netlify**: Use `next export` for static export
- **Docker**: Build with `next build` and serve with `next start`
- **Self-hosted**: Run with Node.js

## 🔐 Security

- **API Keys**: Store in environment variables, not in Convex
- **Authentication**: Add Convex Auth or NextAuth for multi-user
- **CORS**: Configure Convex functions for API access
- **HTTPS**: Always use HTTPS in production (Vercel provides automatically)

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.ts` or update classes in components:

```tsx
// Change gradient
<h1 className="bg-gradient-to-r from-blue-400 to-purple-500">
  
// Change background
<div className="bg-slate-800">
```

### Adding Custom Categories

Just use a new category name when adding services. Update `categoryConfig` in `app/page.tsx` to customize display:

```tsx
const categoryConfig = {
  yourCategory: { title: "Your Category", icon: "🎯" }
};
```

### Custom Icons

Use any emoji or even image URLs:

```tsx
// Emoji
icon: "🚀"

// Unicode
icon: "⚡"

// HTML entity (render as component)
icon: "&hearts;"
```

## 📊 API Integrations (Coming Soon)

Future versions will include live integrations with:

- **qBittorrent**: Active torrents, download speed
- **TrueNAS**: Storage capacity, pool health
- **Vercel**: Deployment status, build times
- **GitHub**: Repository stats, recent commits
- **Sonarr/Radarr**: Upcoming releases, recent additions

## 🐛 Troubleshooting

### "NEXT_PUBLIC_CONVEX_URL is not defined"

1. Make sure `.env.local` exists
2. Restart dev server: `npm run dev`
3. Check Convex dashboard for your deployment URL

### "Cannot connect to Convex"

1. Run `npx convex dev` in one terminal
2. Run `npm run dev` in another terminal
3. Check [dashboard.convex.dev](https://dashboard.convex.dev) for deployment status

### Services not loading

1. Check browser console for errors
2. Verify Convex functions are deployed
3. Try "Initialize Dashboard" again

### Changes not syncing

1. Hard refresh your browser (Cmd/Ctrl + Shift + R)
2. Check that Convex dev is running
3. Verify `.env.local` has correct URL

## 📝 License

MIT - feel free to use for your homelab!

## 🤝 Contributing

Issues and pull requests welcome!

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

---

Built with ❤️ for homelabbers
