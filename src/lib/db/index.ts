import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "../../config/env";
import { logger } from "../logger";

// Create the connection
const client = postgres(config.database.url);

// Create the database instance
export const db = drizzle(client);

// Test the connection
try {
  await client`SELECT 1`;
  logger.info("Database connection established");
} catch (error) {
  logger.error(error, "Failed to connect to database");
  process.exit(1);
}
