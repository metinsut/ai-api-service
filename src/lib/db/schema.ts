import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Example User table schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Types for type safety
export type User = typeof users.$inferSelect; // what you get from db
export type NewUser = typeof users.$inferInsert; // what you can insert into db
