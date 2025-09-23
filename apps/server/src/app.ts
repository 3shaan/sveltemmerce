import { OpenAPIHono } from "@hono/zod-openapi";
import { onError } from "stoker/middlewares";
import notFound from "stoker/middlewares/not-found";

import { logger } from "./middlewares/pino-logger.js";

const app = new OpenAPIHono();

app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// 404 for all unmatched routes
app.notFound(notFound);

// Error handling
app.onError(onError);

export default app;
