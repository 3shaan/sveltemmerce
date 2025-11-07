import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";

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
      })),
      "The list of users",
    ),
  },
},
);

export type FindAll = typeof findAll;
