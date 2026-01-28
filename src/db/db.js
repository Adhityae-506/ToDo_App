// import "dotenv/config"
// import { drizzle } from "drizzle-orm/postgres-js"
// import postgres from "postgres"

// let connectionString = process.env.DATABASE_URL
// if (host.includes("postgres:postgres@supabase_db_")) {
//   const url = URL.parse(host)
//   url.hostname = url.hostname.split("_")[1]
//   connectionString = url.href
// }

// export const client = postgres(connectionString, { prepare: false })
// export const db = drizzle(client)
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
