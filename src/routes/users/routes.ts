import { userInsertSchema } from "@/lib/db/schema";
import { authMiddleware } from "@/middlewares/auth";
import { OpenAPIHono } from "@hono/zod-openapi";
import { validator } from "hono-openapi/zod";
import { getUser, updateUserHandler, deleteUserHandler, getAllUsersHandler } from "./controller";
import { describeRoute } from "hono-openapi";

const users = new OpenAPIHono();

users.use("/*", authMiddleware);
users.get("/", describeRoute({ tags: ["Users"] }), getAllUsersHandler);
users.get("/:id", describeRoute({ tags: ["Users"] }), getUser);
users.patch(
  "/:id",
  describeRoute({ tags: ["Users"] }),
  validator("json", userInsertSchema),
  updateUserHandler,
);
users.delete("/:id", describeRoute({ tags: ["Users"] }), deleteUserHandler);

export { users };
