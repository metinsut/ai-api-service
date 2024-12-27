import { env } from "@/config/env";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { logger } from "../logger";

const runMigrations = async () => {
  logger.info("Running migrations...");

  const connection = postgres(env.database.url, { max: 1 });
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
