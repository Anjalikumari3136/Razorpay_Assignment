const { z } = require("zod");

const createReimbursementSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "title must be at least 3 characters")
    .max(100, "title must be at most 100 characters"),
  description: z
    .string()
    .min(5, "description must be at least 5 characters")
    .optional(),
  amount: z
    .number({ required_error: "amount is required", invalid_type_error: "amount must be a number" })
    .positive("amount must be a positive number"),
  employee_id: z
    .number({ required_error: "employee_id is required", invalid_type_error: "employee_id must be a number" })
    .int("employee_id must be an integer")
    .positive("employee_id must be a positive integer"),
});

const idParamSchema = z.object({
  id: z
    .string()
    .refine((val) => Number.isInteger(Number(val)) && Number(val) > 0, {
      message: "id must be a positive integer",
    }),
});

const approvalBodySchema = z.object({
  comment: z
    .string()
    .max(500, "comment must be at most 500 characters")
    .optional(),
});

module.exports = {
  createReimbursementSchema,
  idParamSchema,
  approvalBodySchema,
};
