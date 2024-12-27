import { userInsertSchema } from "@/lib/db/schema";
import { auth } from "@/middlewares/auth";
import { OpenAPIHono } from "@hono/zod-openapi";
import { validator } from "hono-openapi/zod";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "./controller";

const users = new OpenAPIHono();

// Public routes
users.post("/", validator("json", userInsertSchema), createUser);

// Protected routes
users.use("/*", auth);
users.get("/", getAllUsers);
users.get("/:id", getUser);
users.patch("/:id", validator("json", userInsertSchema), updateUser);
users.delete("/:id", deleteUser);

export { users };
