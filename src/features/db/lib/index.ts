import postgres from "postgres"
import "dotenv/config"
import { drizzle } from "drizzle-orm/postgres-js"

export const sql = postgres(import.meta.env.VITE_DATABASE_URL!)
export const db = drizzle(sql)
