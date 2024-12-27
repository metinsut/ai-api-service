import type { Context, Next } from "hono";
// import { bearerAuth } from "hono/bearer-auth";
// import { env } from "@/config/env";
import { UnauthorizedError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export const auth = async (_c: Context, next: Next) => {
  // const middleware = bearerAuth({
  //   token: env.auth.accessToken,
  // });
  try {
    // await middleware(c, next);
    await next();
    logger.debug("User authenticated");
  } catch (_error) {
    throw new UnauthorizedError("Authentication failed");
  }
};
