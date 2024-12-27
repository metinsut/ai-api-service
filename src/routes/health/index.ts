import { env } from "@/config/env";
import { logger } from "@/lib/logger";
import { OpenAPIHono } from "@hono/zod-openapi";

export const healthRouter = new OpenAPIHono();

healthRouter.get("/", (c) => {
  logger.debug("Health check endpoint called");
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: env.server.nodeEnv,
    apiPrefix: env.server.apiPrefix,
  });
});
