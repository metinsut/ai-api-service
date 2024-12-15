/// <reference types="bun-types" />

import { z } from "zod";

// Environment variables schema
const envSchema = z.object({
  server: z.object({
    nodeEnv: z.enum(["development", "production", "test"]).default("development"),
    port: z.coerce.number().default(3000),
    apiPrefix: z.string().default("/api"),
    corsOrigin: z.string().default("*"),
  }),

  database: z.object({
    url: z.string(),
  }),

  auth: z.object({
    jwtSecret: z.string(),
    jwtExpiresIn: z.string().default("7d"),
  }),

  logger: z.object({
    level: z.enum(["debug", "info", "warn", "error"]).default("info"),
  }),
});

// Parse and validate environment variables
const env = envSchema.parse({
  server: {
    nodeEnv: Bun.env.NODE_ENV,
    port: Bun.env.PORT,
    apiPrefix: Bun.env.API_PREFIX,
    corsOrigin: Bun.env.CORS_ORIGIN,
  },
  database: {
    url: Bun.env.DATABASE_URL,
  },
  auth: {
    jwtSecret: Bun.env.JWT_SECRET,
    jwtExpiresIn: Bun.env.JWT_EXPIRES_IN,
  },
  logger: {
    level: Bun.env.LOG_LEVEL,
  },
});

export const config = env;
