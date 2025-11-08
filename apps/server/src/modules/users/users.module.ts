import { appModule } from "@/lib/create-app.ts";

import * as userController from "./users.controller.ts";
import * as userRoute from "./users.route.ts";

const userModule = appModule()
  .openapi(userRoute.findAll, userController.findAll)
  .openapi(userRoute.createUser, userController.create)
  .openapi(userRoute.findOne, userController.findById);

export default userModule;
