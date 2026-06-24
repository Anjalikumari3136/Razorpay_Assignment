const pool = require("../../config/db");

const createNewReimbursement = async (
  employeeId,
  { title, description, amount }
) => {

  const result = await pool.query(
    `
    INSERT INTO reimbursements
    (
      employee_id,
      title,
      description,
      amount,
      status,
      created_at,
      updated_at
    )
    VALUES
    (
      $1,$2,$3,$4,
      'PENDING_RM',
      NOW(),
      NOW()
    )
    RETURNING *
    `,
    [
      employeeId,
      title,
      description,
      amount,
    ]
  );

  return result.rows[0];
};

const getEmployeeReimbursements = async (
  employeeId
) => {

  const result = await pool.query(
    `
    SELECT *
    FROM reimbursements
    WHERE employee_id = $1
    ORDER BY created_at DESC
    `,
    [employeeId]
  );

  return result.rows;
};

const getPendingForRM = async (rmId) => {

  const result = await pool.query(
    `
    SELECT r.*
    FROM reimbursements r
    JOIN users u
      ON r.employee_id = u.id
    WHERE u.manager_id = $1
      AND r.status = 'PENDING_RM'
    ORDER BY r.created_at DESC
    `,
    [rmId]
  );

  return result.rows;
};

const rmApprove = async (
  reimbursementId,
  comment
) => {

  const result = await pool.query(
    `
    UPDATE reimbursements
    SET
      status = 'RM_APPROVED',
      rm_comment = $1,
      updated_at = NOW()
    WHERE id = $2
    RETURNING *
    `,
    [comment || null, reimbursementId]
  );

  return result.rows[0];
};

const rmReject = async (
  reimbursementId,
  comment
) => {

  const result = await pool.query(
    `
    UPDATE reimbursements
    SET
      status = 'RM_REJECTED',
      rm_comment = $1,
      updated_at = NOW()
    WHERE id = $2
    RETURNING *
    `,
    [comment || null, reimbursementId]
  );

  return result.rows[0];
};


module.exports = {
  createNewReimbursement,
  getEmployeeReimbursements,
  getPendingForRM,
  rmApprove,
  rmReject,
};