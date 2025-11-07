import { Scalar } from "@scalar/hono-api-reference";

import type { AppOpenAI } from "./types.ts";

import packageJSON from "../../package.json" with { type: "json" };

export function configureOpenAPI(app: AppOpenAI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Tasks API",
    },
  });

  app.get("/reference", Scalar({
    url: "/doc",
    theme: "bluePlanet",
    defaultHttpClient: {
      targetKey: "node",
      clientKey: "fetch",
    },
  }));
}
