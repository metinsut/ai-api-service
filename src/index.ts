import { Hono } from "hono";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { config } from "./config/env.js";

const app = new Hono();

// Global middlewares
app.use("*", logger());
app.use("*", prettyJSON());

// Routes
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: config.server.nodeEnv,
    apiPrefix: config.server.apiPrefix,
  });
});

// Error handling
app.onError((err, c) => {
  console.error(`${err}`);
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
  return c.json(
    {
      status: "error",
      message: "Not Found",
    },
    404,
  );
});

// Start the server
console.log(`🚀 Server is running on port ${config.server.port} in ${config.server.nodeEnv} mode`);

export default {
  port: config.server.port,
  fetch: app.fetch,
};
