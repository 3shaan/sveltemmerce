import type { OpenAPIHono } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

export type AppBinding = {
  Variables: {
    logger: PinoLogger;
  };
};

export type AppOpenAI = OpenAPIHono<AppBinding>;
