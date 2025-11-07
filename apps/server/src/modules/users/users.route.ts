import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCode from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import { createUserSchema, selectUserSchema } from "@/db/schema.ts";

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

export type FindAll = typeof findAll;

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
export type CreateUser = typeof createUser;
