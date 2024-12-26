import { userInsertSchema } from "@/lib/db/schema";
import { auth } from "@/middlewares/auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "./controller";

const users = new Hono();

// Public routes
users.post("/", zValidator("json", userInsertSchema), createUser);

// Protected routes
users.use("/*", auth);
users.get("/", getAllUsers);
users.get("/:id", getUser);
users.patch("/:id", zValidator("json", userInsertSchema), updateUser);
users.delete("/:id", deleteUser);

export default users;
