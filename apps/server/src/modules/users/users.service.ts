import db from "@/db/index.ts";

export function findAll() {
  const users = db.query.usersTable.findMany();
  return users;
}
