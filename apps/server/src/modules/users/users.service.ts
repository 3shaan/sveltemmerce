import type { CreateUserSchema } from "@/db/schema.ts";

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
