import { pgTable, text, uuid, json } from "drizzle-orm/pg-core";

export const dataTable = pgTable("data", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  catagory: text("catagory").notNull(),
  description: text("description").notNull(),
  githubUrl: text("github_url").notNull(),
  githubRawUrl: text("github_raw_url"),
  registrieName: text("registrie_name"),
});

// Add to db/schema.ts

import { timestamp, jsonb } from "drizzle-orm/pg-core";

// Existing dataTable...

export const bucketsTable = pgTable("buckets", {
  id: uuid("id").primaryKey().defaultRandom(),
  shareId: text("share_id").notNull().unique(), // Short ID for sharing (e.g., using nanoid)
  title: text("title").notNull().default("My Bucket"),
  components: jsonb("components").notNull().$type<string[]>(), // Array of component names
  createdBy: text("created_by").notNull(), // User identifier (e.g., email or user ID)
});