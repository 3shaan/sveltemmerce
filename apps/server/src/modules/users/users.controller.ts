import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppController } from "@/lib/types.ts";

import type { CreateUser, FindAll, FindOne, UpdateUser } from "./users.route.ts";

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

export const findById: AppController<FindOne> = async (c) => {
  const { id } = c.req.valid("param");
  const user = await userService.findById(id);
  if (!user)
    return c.json({ message: "User not found" }, HttpStatusCodes.NOT_FOUND);
  return c.json(user, HttpStatusCodes.OK);
};

export const updateById: AppController<UpdateUser> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");
  const user = await userService.update(id, data);
  if (!user)
    return c.json({ message: "User not found" }, HttpStatusCodes.NOT_FOUND);
  return c.json(user, HttpStatusCodes.CREATED);
};
