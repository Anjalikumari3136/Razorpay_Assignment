const pool = require("../../config/db");

const assignRoleToUser = async ({
  userId,
  role,
  managerId,
}) => {

  const allowedRoles = [
    "EMP",
    "RM",
    "APE",
    "CFO",
  ];

  if (!allowedRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  const result = await pool.query(
    `
    UPDATE users
    SET role = $1,
        manager_id = $2
    WHERE id = $3
    RETURNING id,name,email,role,manager_id
    `,
    [role, managerId || null, userId]
  );

  if (result.rows.length === 0) {
    throw new Error("User not found");
  }

  return result.rows[0];
};

if (
  user.email === "cfo@org.com" &&
  role !== "CFO"
) {
  throw new Error(
    "Cannot modify CFO role"
  );
}

module.exports = {
  assignRoleToUser,
};