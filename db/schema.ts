import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const dataTable = pgTable("data", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  catagory: text("catagory").notNull(),
  description: text("description").notNull(),
  githubUrl: text("github_url").notNull(),
  githubRawUrl: text("github_raw_url"),
  registrieName: text("registrie_name"),
});
