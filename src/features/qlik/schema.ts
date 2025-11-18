import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const selection = pgTable("selection", {
  id: integer("id").primaryKey().notNull().generatedByDefaultAsIdentity(),
  description: varchar("description", { length: 100 }).notNull(),
  userId: text("userId").notNull(),
  applicationId: varchar("applicationId", { length: 40 }).notNull(),
  selectionAsJson: text("selectionAsJson").notNull(),
  selectionLines: text("selectionLines").notNull(),
  archive: varchar("archive", { length: 10 }).notNull(),
  ts01: varchar("ts01", { length: 10 }).notNull(),
  selectionFidCount: integer("selectionFidCount"),
  selectionPidCount: integer("selectionPidCount"),
  bookmark: boolean("bookmark").$defaultFn(() => false).notNull(),
  createdAt: timestamp("createdAt", { mode: 'string' }).notNull().defaultNow(),
});
