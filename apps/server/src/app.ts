import type { PinoLogger } from "hono-pino";

import { OpenAPIHono } from "@hono/zod-openapi";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { onError } from "stoker/middlewares";
import notFound from "stoker/middlewares/not-found";

import { logger } from "./middlewares/pino-logger.js";

type AppBinding = {
  Variables: {
    logger: PinoLogger;
  };
};

const app = new OpenAPIHono<AppBinding>();

expand(config());

app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// 404 for all unmatched routes
app.notFound(notFound);

// Error handling
app.onError(onError);

export default app;
