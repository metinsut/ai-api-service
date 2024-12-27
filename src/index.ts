import { OpenAPIHono } from "@hono/zod-openapi";
import { prettyJSON } from "hono/pretty-json";
import { env } from "./config/env";
import { NotFoundError } from "./lib/errors";
import { logger, requestLogger } from "./lib/logger";
import { errorHandler } from "./middlewares/error-handler";
import { i18nMiddleware } from "./middlewares/i18n";
import { router } from "./routes/api";
import { healthRouter } from "./routes/health";
import { configureOpenAPI } from "./scalar";

const app = new OpenAPIHono({
  strict: false,
});

// Global middlewares
app.use("*", requestLogger());
app.use("*", prettyJSON());
app.use("*", i18nMiddleware);

configureOpenAPI(app);

app.route("/health", healthRouter);
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
