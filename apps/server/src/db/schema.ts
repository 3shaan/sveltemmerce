import type { z } from "zod";

import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const selectUserSchema = createSelectSchema(usersTable);
export type SelectUserSchema = z.infer<typeof selectUserSchema>;

export const createUserSchema = createInsertSchema(
  usersTable,
  {
    name: field => field.min(1),
    email: field => field.email(),
    age: field => field.positive().max(120),
  },
);
export type CreateUserSchema = z.infer<typeof createUserSchema>;
