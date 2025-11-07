import type { AppController } from "@/lib/types.ts";

import type { FindAll } from "./users.route.ts";

export const findAll: AppController<FindAll> = async (c) => {
  const data = [{
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  }];
  return c.json(data);
};
