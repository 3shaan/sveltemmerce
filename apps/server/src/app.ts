import { configureOpenAPI } from "@/lib/configure-open-api.ts";
import { createApp } from "@/lib/create-app.ts";
import index from "@/route/route.index.ts";

const app = createApp();

const routes = [index];

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
