const { z } = require("zod");

const assignRoleSchema = z.object({
  role_name: z
    .string()
    .trim()
    .min(2, "role_name must be at least 2 characters")
    .max(50, "role_name must be at most 50 characters"),
});

module.exports = {
  assignRoleSchema,
};
