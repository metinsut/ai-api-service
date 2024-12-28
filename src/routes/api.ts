import { OpenAPIHono } from "@hono/zod-openapi";
import { users } from "./users/routes";
import { auth } from "./auth/routes";

export const router = new OpenAPIHono();

router.route("/users", users);
router.route("/auth", auth);
