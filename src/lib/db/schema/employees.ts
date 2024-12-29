import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  gender: text("gender").notNull(),
  avatar: text("avatar").notNull(),
  company: text("company").notNull(),
  department: text("department").notNull(),
  position: text("position").notNull(),
  language: text("language").notNull(),
  university: text("university").notNull(),
  country: text("country").notNull(),
  birthDate: timestamp("birth_date").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// Types for type safety
export type Employee = typeof employees.$inferSelect;
export type NewEmployee = typeof employees.$inferInsert;

// Zod schemas for validation
export const employeeSelectSchema = createSelectSchema(employees);
export const employeeInsertSchema = createInsertSchema(employees, {
  fullName: (schema) => schema.min(2),
  email: (schema) => schema.email(),
  gender: (schema) =>
    schema.refine((val) => ["Male", "Female", "Other"].includes(val), {
      message: "Gender must be either Male, Female or Other",
    }),
});
