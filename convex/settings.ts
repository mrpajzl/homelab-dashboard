import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get a setting by key
export const get = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const setting = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    return setting?.value;
  },
});

// Get all settings
export const list = query({
  handler: async (ctx) => {
    const settings = await ctx.db.query("settings").collect();
    return settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);
  },
});

// Set a setting
export const set = mutation({
  args: {
    key: v.string(),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value });
    } else {
      await ctx.db.insert("settings", {
        key: args.key,
        value: args.value,
      });
    }
  },
});

// Initialize default settings
export const initializeDefaults = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("settings").first();
    if (existing) return; // Already initialized

    const defaultSettings = {
      dashboardTitle: "🏠 Homelab Dashboard",
      updateInterval: "60000",
      enableAnimations: "true",
      showSystemStats: "true",
      theme: "dark",
    };

    for (const [key, value] of Object.entries(defaultSettings)) {
      await ctx.db.insert("settings", { key, value });
    }
  },
});
