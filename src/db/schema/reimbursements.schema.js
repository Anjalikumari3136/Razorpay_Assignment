const {
  pgTable,
  serial,
  varchar,
  text,
  decimal,
  integer,
  timestamp,
} = require("drizzle-orm/pg-core");

const reimbursements = pgTable("reimbursements", {
  id: serial("id").primaryKey(),

  employeeId: integer("employee_id").notNull(),

  title: varchar("title", {
    length: 255,
  }).notNull(),

  description: text("description"),

  amount: decimal("amount", {
    precision: 10,
    scale: 2,
  }).notNull(),

  status: varchar("status", {
    length: 30,
  })
    .notNull()
    .default("SUBMITTED"),

  rmComment: text("rm_comment"),

  apeComment: text("ape_comment"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

module.exports = { reimbursements };