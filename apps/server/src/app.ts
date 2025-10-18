import type { PinoLogger } from "hono-pino";

import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";

import { logger } from "./middlewares/pino-logger.js";

type AppBinding = {
  Variables: {
    logger: PinoLogger;
  };
};

const app = new OpenAPIHono<AppBinding>();

app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// 404 for all unmatched routes
app.notFound(notFound);

// Error handling
app.onError(onError);

export default app;
