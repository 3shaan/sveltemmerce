import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

export type AppBinding = {
  Variables: {
    logger: PinoLogger;
  };
};

export type AppOpenAI = OpenAPIHono<AppBinding>;

export type AppController<R extends RouteConfig> = RouteHandler<R, AppBinding>;
