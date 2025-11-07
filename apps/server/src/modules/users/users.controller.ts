import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppController } from "@/lib/types.ts";

import type { CreateUser, FindAll } from "./users.route.ts";

import * as userService from "./users.service.ts";

export const findAll: AppController<FindAll> = async (c) => {
  const users = await userService.findAll();
  return c.json(users);
};

export const create: AppController<CreateUser> = async (c) => {
  const data = c.req.valid("json");
  const user = await userService.create(data);
  return c.json(user, HttpStatusCodes.CREATED);
};
