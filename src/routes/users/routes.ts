import { userInsertSchema, userSelectSchema } from "@/lib/db/schema";
import { auth } from "@/middlewares/auth";
import { OpenAPIHono } from "@hono/zod-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "./controller";
import { describeRoute } from "hono-openapi";

const users = new OpenAPIHono();

// Public routes
users.post(
  "/",
  describeRoute({
    tags: ["Users"],
    responses: {
      201: {
        description: "User created",
        content: {
          "application/json": {
            schema: resolver(userSelectSchema),
          },
        },
      },
    },
  }),
  validator("json", userInsertSchema),
  createUser,
);

// Protected routes
users.use("/*", auth);
users.get("/", describeRoute({ tags: ["Users"] }), getAllUsers);
users.get("/:id", describeRoute({ tags: ["Users"] }), getUser);
users.patch(
  "/:id",
  describeRoute({ tags: ["Users"] }),
  validator("json", userInsertSchema),
  updateUser,
);
users.delete("/:id", describeRoute({ tags: ["Users"] }), deleteUser);

export { users };
