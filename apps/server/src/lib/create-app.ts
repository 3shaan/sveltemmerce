import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

import { logger } from "@/middlewares/pino-logger.js";

import type { AppBinding } from "./types.ts";

export function createRouter() {
  return new OpenAPIHono<AppBinding>({ strict: false, defaultHook }); // this will count /error/ as /error.
}

export function createApp() {
  const app = createRouter();

  app.use(serveEmojiFavicon("😀"));

  app.use(logger());

  // 404 for all unmatched routes
  app.notFound(notFound);

  // Error handling
  app.onError(onError);

  return app;
}
