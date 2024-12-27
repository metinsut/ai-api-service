import { users } from "./users/routes";
import { OpenAPIHono } from "@hono/zod-openapi";

const router = new OpenAPIHono();

router.route("/users", users);

export { router };
