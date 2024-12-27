/// <reference types="bun-types" />

import { z } from "zod";

export const runTimeSchema = z.enum(["development", "production", "test"]);

const envSchema = z.object({
  server: z.object({
    nodeEnv: runTimeSchema.default("development"),
    port: z.coerce.number().default(3000),
    apiPrefix: z.string().default("/api"),
    corsOrigin: z.string().default("*"),
  }),

  database: z.object({
    url: z.string(),
  }),

  auth: z.object({
    accessToken: z.string(),
  }),

  logger: z.object({
    level: z.enum(["debug", "info", "warn", "error"]).default("info"),
  }),
});

export type EnvType = z.infer<typeof envSchema>;

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
    accessToken: Bun.env.JWT_SECRET,
  },
  logger: {
    level: Bun.env.LOG_LEVEL,
  },
});

export { env };
