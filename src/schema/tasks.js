import {pgTable,uuid,text,boolean,date,timestamp} from "drizzle-orm/pg-core";
import {users} from "./users.js";

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  title: text("title").notNull(),
  completed: boolean("completed").default(false),
  taskDate: date("task_Date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
