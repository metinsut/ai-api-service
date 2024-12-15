import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { config } from "./config/env.js";
import { logger, requestLogger } from "./lib/logger.js";

const app = new Hono();

// Global middlewares
app.use("*", requestLogger());
app.use("*", prettyJSON());

// Routes
app.get("/health", (c) => {
  logger.debug("Health check endpoint called");
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: config.server.nodeEnv,
    apiPrefix: config.server.apiPrefix,
  });
});

// Error handling
app.onError((err, c) => {
  logger.error({
    err,
    path: c.req.path,
    method: c.req.method,
  });

  return c.json(
    {
      status: "error",
      message: err.message,
    },
    500,
  );
});

// 404 handler
app.notFound((c) => {
  logger.warn({
    msg: "Route not found",
    path: c.req.path,
    method: c.req.method,
  });

  return c.json(
    {
      status: "error",
      message: "Not Found",
    },
    404,
  );
});

// Start the server
logger.info(`🚀 Server is running on port ${config.server.port} in ${config.server.nodeEnv} mode`);

export default {
  port: config.server.port,
  fetch: app.fetch,
};
