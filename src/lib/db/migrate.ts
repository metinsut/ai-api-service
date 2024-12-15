import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { config } from "../../config/env.js";
import { logger } from "../logger.js";

const runMigrations = async () => {
  logger.info("Running migrations...");

  const connection = postgres(config.database.url, { max: 1 });
  const db = drizzle(connection);

  try {
    await migrate(db, { migrationsFolder: "src/lib/db/migrations" });
    logger.info("Migrations completed successfully");
  } catch (error) {
    logger.error(error, "Migration failed");
    process.exit(1);
  }

  await connection.end();
  process.exit(0);
};

runMigrations();
