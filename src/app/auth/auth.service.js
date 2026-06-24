const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async ({ name, email, password }) => {

  if (!email.endsWith("@org.com")) {
    throw new Error("Only org.com emails allowed");
  }

  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO users
    (name, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role
    `,
    [name, email, hashedPassword, "EMP"]
  );

  return result.rows[0];
};

const loginUser = async ({ email, password }) => {

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid credentials");
  }

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return token;
};

module.exports = {
  registerUser,
  loginUser,
};