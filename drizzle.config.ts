import type { Config } from "drizzle-kit";
import { config } from "./src/config/env.js";

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: config.database.url,
  },
  verbose: true,
  strict: true,
} satisfies Config;
