import type { AppController } from "@/lib/types.ts";

import type { FindAll } from "./users.route.ts";

import * as userService from "./users.service.ts";

export const findAll: AppController<FindAll> = async (c) => {
  const users = userService.findAll();
  return c.json(users);
};
