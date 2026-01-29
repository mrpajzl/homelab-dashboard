import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  services: defineTable({
    name: v.string(),
    category: v.string(),
    url: v.string(),
    icon: v.string(),
    enabled: v.boolean(),
    order: v.number(),
  }).index("by_category", ["category"]),

  settings: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),

  apiKeys: defineTable({
    service: v.string(),
    key: v.string(),
    enabled: v.boolean(),
  }).index("by_service", ["service"]),

  systemStats: defineTable({
    cpu: v.number(),
    ram: v.number(),
    storage: v.optional(v.string()),
    timestamp: v.number(),
  }),
});
