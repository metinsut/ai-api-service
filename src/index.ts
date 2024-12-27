import { prettyJSON } from "hono/pretty-json";
import { router } from "./routes/api";
import { env } from "./config/env";
import { NotFoundError } from "./lib/errors";
import { logger, requestLogger } from "./lib/logger";
import { errorHandler } from "./middlewares/error-handler";
import { i18nMiddleware } from "./middlewares/i18n";
import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { openAPISpecs } from "hono-openapi";

const app = new OpenAPIHono({
  strict: false,
});

// Global middlewares
app.use("*", requestLogger());
app.use("*", prettyJSON());
app.use("*", i18nMiddleware);

app.get(
  "/openapi",
  openAPISpecs(app, {
    documentation: {
      info: {
        title: "Rhinobase Cloud",
        version: "1.0.0",
        description: "API Documentation",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  }),
);

app.get(
  "/reference",
  apiReference({
    theme: "kepler",
    layout: "classic",
    defaultHttpClient: {
      targetKey: "javascript",
      clientKey: "fetch",
    },
    spec: {
      url: "/openapi",
    },
  }),
);

app.get("/health", (c) => {
  logger.debug("Health check endpoint called");
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: env.server.nodeEnv,
    apiPrefix: env.server.apiPrefix,
  });
});

app.route(env.server.apiPrefix, router);

// 404 handler
app.notFound(() => {
  throw new NotFoundError();
});

// Error handler
app.onError(errorHandler);

// Start the server
logger.info(`🚀 Server is running on port ${env.server.port} in ${env.server.nodeEnv} mode`);

export default {
  port: env.server.port,
  fetch: app.fetch,
};
