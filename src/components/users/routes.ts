import { Hono } from "hono";
import { auth } from "../../middlewares/auth";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "./controller";
import { createUserSchema, updateUserSchema } from "./types";
import { zValidator } from "@hono/zod-validator";

const users = new Hono();

// Public routes
users.post("/", zValidator("json", createUserSchema), createUser);

// Protected routes
users.use("/*", auth);
users.get("/", getAllUsers);
users.get("/:id", getUser);
users.patch("/:id", zValidator("json", updateUserSchema), updateUser);
users.delete("/:id", deleteUser);

export default users;
