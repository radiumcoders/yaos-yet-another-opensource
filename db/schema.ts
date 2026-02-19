import { pgTable, text, uuid } from "drizzle-orm/pg-core";



export const dataTable = pgTable("data", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  github_url: text("github_url").notNull(),
  live_url: text("live_url").notNull(),
  tags: text("tags").array().notNull().default([]),
});

// id
// title
// description
// github url
// live url
// tags [shadcn, tool , backgrounds , state-management , music , ui , react , vue , angular ..... etc]
