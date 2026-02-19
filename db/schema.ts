import { pgTable, text, uuid, integer, decimal, timestamp } from "drizzle-orm/pg-core";

export const tags = [
  "shadcn",
  "retro",
  "8bit",
  "orcish",
  "react",
  "tailwind",
  "ui",
  "lib",
  "reusable",
  "vue",
  "angular",
  "svelte",
  "state-management",
  "backgrounds",
  "music",
  "tool",
] as const;

export const dataTable = pgTable("data", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  github_url: text("github_url").notNull(),
  live_url: text("live_url").notNull(),
  logo_url: text("logo_url"), // Project logo URL
  tags: text("tags").array().notNull().default([]),
  average_rating: decimal("average_rating", { precision: 3, scale: 2 }).default("0"),
  total_ratings: integer("total_ratings").default(0),
});

export const ratingsTable = pgTable("ratings", {
  id: uuid("id").primaryKey().defaultRandom(),
  tool_id: uuid("tool_id").notNull().references(() => dataTable.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(), // 1-5 stars
  ip_hash: text("ip_hash").notNull(), // Hashed IP address for privacy
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// id
// title
// description
// github url
// live url
// tags [shadcn, tool , backgrounds , state-management , music , ui , react , vue , angular ..... etc]
