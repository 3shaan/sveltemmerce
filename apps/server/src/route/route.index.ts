import { createRoute, z } from "@hono/zod-openapi";
import * as StatusCode from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

import { appModule } from "@/lib/create-app.ts";

const router = appModule().openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    summary: "Get the root path",
    description: "Get the root path",
    responses: {
      [StatusCode.OK]: jsonContent(z.object({ message: z.string() }), "Returns a JSON object with a message property"),
    },
  }),
  (ctx) => {
    return ctx.json({ message: "Welcome to Sveltemmerce!" });
  },
);

export default router;
