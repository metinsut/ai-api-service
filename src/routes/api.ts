import { OpenAPIHono } from "@hono/zod-openapi";
import { healthRouter } from "./health";
import { users } from "./users/routes";

const router = new OpenAPIHono();

router.route("/health", healthRouter);
router.route("/users", users);

export { router };
