import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  provider: text("provider").default("local"),
  createdAt: timestamp("created_at").defaultNow(),
  resetToken: text("reset_token"),
  resetTokenExpiry: timestamp("reset_token_expiry"),

});

