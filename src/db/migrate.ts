import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { db } from ".";
import postgres from "postgres";
import { env } from "@/env";

(async () => {
  // Create a migration client
  const migrationClient = postgres(env.DATABASE_URL!, { max: 1 });
  const migrationDb = drizzle(migrationClient);
  
  await migrate(migrationDb, { migrationsFolder: "./migrations" });
  
  await migrationClient.end();
  console.log("Migration completed successfully!");
})();
