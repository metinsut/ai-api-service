import type { Context } from "hono";
import { config } from "@/config/env";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export const errorHandler = async (err: Error, c: Context) => {
  // Log the error
  logger.error({
    err,
    path: c.req.path,
    method: c.req.method,
  });

  // If it's our custom error
  if (err instanceof AppError) {
    return c.json(
      {
        status: "error",
        code: err.code,
        message: err.message,
        ...(err.errors && { errors: err.errors }),
      },
      err.statusCode as 400 | 401 | 403 | 404 | 409 | 500,
    );
  }

  // For development, send the stack trace
  if (config.server.nodeEnv === "development") {
    return c.json(
      {
        status: "error",
        message: err.message,
        stack: err.stack,
      },
      500,
    );
  }

  // For production, send a generic error message
  return c.json(
    {
      status: "error",
      message: c.var.t("internal", { ns: "errors" }),
    },
    500,
  );
};
