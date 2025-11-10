import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { pinoLogger } from "hono-pino";
import { pino } from "pino";
import PinoPretty from "pino-pretty";

import env from "@/env.ts";

expand(config());

export function logger() {
  return pinoLogger({
    pino: pino(
      {
        level: env.LOG_LEVEL === "debug" ? "debug" : "info",
      },
      env.NODE_ENV === "production" ? undefined : PinoPretty(),
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
