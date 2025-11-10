import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCode from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { createUserSchema, selectUserSchema, updateUserSchema } from "@/db/schema.ts";
import { notFoundSchema } from "@/lib/constants.ts";

const tags = ["Users"];

export const findAll = createRoute({
  path: "/users",
  method: "get",
  tags,
  responses: {
    200: jsonContent(
      z.array(z.object({
        id: z.number(),
        email: z.email(),
        name: z.string().min(2).max(100),
        age: z.number().min(0).max(120),
      })),
      "The list of users",
    ),
  },
},
);

export const createUser = createRoute({
  path: "/users",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(createUserSchema, "create users"),
  },
  responses: {
    [HttpStatusCode.CREATED]: jsonContent(
      selectUserSchema,
      "The created user",
    ),
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(createUserSchema),
      "the validation error(s)",
    ),

  },
},
);

export const findOne = createRoute({
  path: "/users/{id}",
  method: "get",
  tags,
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCode.OK]: jsonContent(
      selectUserSchema,
      "The user of the given id",
    ),
    [HttpStatusCode.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "The user not found of the given id",
    ),
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Validation error(s)",
    ),
  },
},
);

export const updateUser = createRoute({
  path: "/users/{id}",
  method: "patch",
  tags,
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(updateUserSchema, "update users"),
  },
  responses: {
    [HttpStatusCode.CREATED]: jsonContent(
      selectUserSchema,
      "The updated user",
    ),
    [HttpStatusCode.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "The user not found of the given id",
    ),
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
      [createErrorSchema(updateUserSchema), createErrorSchema(IdParamsSchema)],
      "the validation error(s)",
    ),
  },
},
);

// type export
export type FindAll = typeof findAll;
export type CreateUser = typeof createUser;
export type FindOne = typeof findOne;
export type UpdateUser = typeof updateUser;
