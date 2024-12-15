import type { Context, Next } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { config } from "../config/env.js";
import { UnauthorizedError } from "../lib/errors.js";
import { logger } from "../lib/logger.js";

// Context type extension for user
declare module "hono" {
  interface ContextVariableMap {
    user: {
      id: string;
      email: string;
    };
  }
}

// Create auth middleware with error handling
export const auth = async (c: Context, next: Next) => {
  const middleware = bearerAuth({
    token: config.auth.accessToken, // We'll use a static token for now
  });

  try {
    await middleware(c, next);
    logger.debug("User authenticated");
  } catch (_error) {
    throw new UnauthorizedError("Authentication failed");
  }
};
