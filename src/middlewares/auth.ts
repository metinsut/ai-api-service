import type { Context, Next } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { config } from "@/config/env";
import { UnauthorizedError } from "@/lib/errors";
import { logger } from "@/lib/logger";

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
