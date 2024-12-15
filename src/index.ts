import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { config } from "./config/env.js";
import { logger, requestLogger } from "./lib/logger.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { NotFoundError } from "./lib/errors.js";

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

// Test error handling
app.get("/error-test", () => {
  throw new NotFoundError("This is a test error");
});

// 404 handler
app.notFound(() => {
  throw new NotFoundError();
});

// Error handler
app.onError(errorHandler);

// Start the server
logger.info(`🚀 Server is running on port ${config.server.port} in ${config.server.nodeEnv} mode`);

export default {
  port: config.server.port,
  fetch: app.fetch,
};
