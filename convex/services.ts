import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query all services
export const list = query({
  handler: async (ctx) => {
    const services = await ctx.db.query("services").collect();
    return services.sort((a, b) => a.order - b.order);
  },
});

// Query services by category
export const byCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    const services = await ctx.db
      .query("services")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .collect();
    return services.sort((a, b) => a.order - b.order);
  },
});

// Add a new service
export const add = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    url: v.string(),
    icon: v.string(),
    enabled: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const serviceId = await ctx.db.insert("services", {
      name: args.name,
      category: args.category,
      url: args.url,
      icon: args.icon,
      enabled: args.enabled ?? true,
      order: args.order ?? 0,
    });
    return serviceId;
  },
});

// Update a service
export const update = mutation({
  args: {
    id: v.id("services"),
    name: v.optional(v.string()),
    category: v.optional(v.string()),
    url: v.optional(v.string()),
    icon: v.optional(v.string()),
    enabled: v.optional(v.boolean()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

// Delete a service
export const remove = mutation({
  args: { id: v.id("services") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Initialize default services
export const initializeDefaults = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("services").first();
    if (existing) return; // Already initialized

    const defaultServices = [
      // Arr Stack
      { name: "Sonarr", category: "arr", url: "http://localhost:8989", icon: "📺", order: 1 },
      { name: "Radarr", category: "arr", url: "http://localhost:7878", icon: "🎬", order: 2 },
      { name: "Prowlarr", category: "arr", url: "http://localhost:9696", icon: "🔍", order: 3 },
      { name: "Lidarr", category: "arr", url: "http://localhost:8686", icon: "🎵", order: 4 },
      
      // Storage
      { name: "TrueNAS", category: "storage", url: "http://localhost:80", icon: "🗄️", order: 1 },
      
      // Downloads
      { name: "qBittorrent", category: "downloads", url: "http://localhost:8080", icon: "🌊", order: 1 },
      
      // Projects
      { name: "GitHub", category: "projects", url: "https://github.com", icon: "🐙", order: 1 },
      { name: "Vercel", category: "projects", url: "https://vercel.com/dashboard", icon: "▲", order: 2 },
      { name: "Codex", category: "projects", url: "http://localhost:3000", icon: "💻", order: 3 },
      
      // Quick Access
      { name: "Portainer", category: "quick", url: "http://localhost:9000", icon: "🐳", order: 1 },
      { name: "Home Assistant", category: "quick", url: "http://localhost:8123", icon: "🏡", order: 2 },
      { name: "Grafana", category: "quick", url: "http://localhost:3001", icon: "📊", order: 3 },
    ];

    for (const service of defaultServices) {
      await ctx.db.insert("services", {
        ...service,
        enabled: true,
      });
    }
  },
});
