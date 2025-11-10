import { configureOpenAPI } from "@/lib/configure-open-api.ts";
import { createApp } from "@/lib/create-app.ts";
import userModule from "@/modules/users/users.module.ts";
import index from "@/route/route.index.ts";

const app = createApp();

const modules = [index, userModule];

configureOpenAPI(app);

modules.forEach((module) => {
  app.route("/", module);
});

export type AppType = typeof modules[number];

export default app;
