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

export const customer = pgTable("customer", {
  id: integer("id").primaryKey().notNull().generatedByDefaultAsIdentity(),
  customerName: varchar("customerName", { length: 50 }).notNull(),
  street: varchar("street", { length: 50 }).notNull(),
  zipCode: varchar("zipCode", { length: 6 }).notNull(),
  city: varchar("city", { length: 50 }).notNull(),
  vatCode: varchar("vatCode", { length: 11 }).notNull(),
  status: boolean("status").$defaultFn(() => false).notNull(),
  updatedAt: timestamp("updatedAt", { mode: 'string' }).notNull().defaultNow(),
  createdAt: timestamp("createdAt", { mode: 'string' }).notNull().defaultNow(),
});

export const orderHeader = pgTable("order_header", {
  id: integer("id").primaryKey().notNull().generatedByDefaultAsIdentity(),
  customerId: integer("customerId").references(() => customer.id).notNull(),
  customerName: varchar("customerName", { length: 50 }).notNull(),
  contactName: varchar("contactName", { length: 50 }).notNull(),
  street: varchar("street", { length: 50 }).notNull(),
  zipCode: varchar("zipCode", { length: 6 }).notNull(),
  city: varchar("city", { length: 50 }).notNull(),
  vatCode: varchar("vatCode", { length: 11 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  status: integer("status").default(0),
  applicationId: varchar("applicationId", { length: 40 }).notNull(),
  orderDescription: varchar("orderDescription", { length: 100 }).notNull(),
  selectionLines: text("selectionLines").notNull(),
  updatedAt: timestamp("updatedAt", { mode: 'string' }).notNull().defaultNow(),
  createdAt: timestamp("createdAt", { mode: 'string' }).notNull().defaultNow(),
});
