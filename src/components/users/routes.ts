import { Hono } from "hono";
import { auth } from "../../middlewares/auth";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "./controller";

const users = new Hono();

// Public routes
users.post("/", createUser);

// Protected routes
users.use("/*", auth);
users.get("/", getAllUsers);
users.get("/:id", getUser);
users.patch("/:id", updateUser);
users.delete("/:id", deleteUser);

export default users;
