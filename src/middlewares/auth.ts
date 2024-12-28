import { env } from "@/config/env";
import { UnauthorizedError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import type { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { bearerAuth } from "hono/bearer-auth";
import { findUserById } from "@/routes/users/repository";

export const authMiddleware = async (c: Context, next: Next) => {
  const middleware = bearerAuth({
    verifyToken: async (token, context) => {
      const payload = await verify(token as string, env.auth.secret);
      if (!payload) {
        throw new UnauthorizedError("Authentication failed");
      }
      const user = await findUserById(payload.sub as number);
      if (!user) {
        throw new UnauthorizedError("User not found");
      }
      context.set("user", user);
      return true;
    },
  });
  await middleware(c, next);
  logger.debug("User authenticated");
};
