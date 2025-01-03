import { env } from "@/config/env";
import { logger } from "@/lib/logger";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

// Create the connection pool
const pool = new Pool({ connectionString: env.database.url });
export const db = drizzle(pool);

// Test the connection
(async () => {
  try {
    const result = await pool.query("SELECT 1");
    if (result) {
      logger.info("Database connection established");
    }
  } catch (error) {
    logger.error(error, "Failed to connect to database");
    process.exit(1);
  }
})();
