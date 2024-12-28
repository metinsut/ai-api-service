import { defineConfig } from "drizzle-kit";
import { env } from "./src/config/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.database.url,
  },
});
