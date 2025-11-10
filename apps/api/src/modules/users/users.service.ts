import { eq } from "drizzle-orm";

import type { CreateUserSchema, UpdateUserSchema } from "@/db/schema.ts";

import db from "@/db/index.ts";
import { usersTable } from "@/db/schema.ts";

export function findAll() {
  const users = db.query.usersTable.findMany();
  return users;
}

export async function create(data: CreateUserSchema) {
  const [user] = await db.insert(usersTable).values(data).returning();
  return user;
}

export async function findById(id: number) {
  const user = await db.query.usersTable.findFirst({
    where: (users, { eq }) => eq(users.id, id),
  });
  return user;
}

export async function update(id: number, data: UpdateUserSchema) {
  const [user] = await db.update(usersTable).set(data).where(eq(usersTable.id, id)).returning();
  return user;
}
