import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query all API keys (without exposing the actual key)
export const list = query({
  handler: async (ctx) => {
    const keys = await ctx.db.query("apiKeys").collect();
    return keys.map(k => ({
      _id: k._id,
      service: k.service,
      enabled: k.enabled,
      hasKey: k.key.length > 0,
    }));
  },
});

// Get API key for a specific service
export const getByService = query({
  args: { service: v.string() },
  handler: async (ctx, args) => {
    const apiKey = await ctx.db
      .query("apiKeys")
      .withIndex("by_service", (q) => q.eq("service", args.service))
      .first();
    return apiKey;
  },
});

// Set/Update API key
export const set = mutation({
  args: {
    service: v.string(),
    key: v.string(),
    enabled: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("apiKeys")
      .withIndex("by_service", (q) => q.eq("service", args.service))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        key: args.key,
        enabled: args.enabled ?? existing.enabled,
      });
    } else {
      await ctx.db.insert("apiKeys", {
        service: args.service,
        key: args.key,
        enabled: args.enabled ?? true,
      });
    }
  },
});

// Toggle API key enabled status
export const toggle = mutation({
  args: { id: v.id("apiKeys") },
  handler: async (ctx, args) => {
    const apiKey = await ctx.db.get(args.id);
    if (apiKey) {
      await ctx.db.patch(args.id, { enabled: !apiKey.enabled });
    }
  },
});

// Delete API key
export const remove = mutation({
  args: { id: v.id("apiKeys") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
