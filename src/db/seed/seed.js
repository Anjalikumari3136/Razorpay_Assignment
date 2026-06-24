require("dotenv").config();

const pool = require("../../config/db");
const bcrypt = require("bcrypt");

async function seed() {
  try {

    const existing = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      ["cfo@org.com"]
    );

    if (existing.rows.length > 0) {
      console.log("CFO already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      "CFO#ORG@April2026",
      10
    );

    await pool.query(
      `
      INSERT INTO users
      (name,email,password_hash,role)
      VALUES ($1,$2,$3,$4)
      `,
      [
        "Chief Financial Officer",
        "cfo@org.com",
        hashedPassword,
        "CFO",
      ]
    );

    console.log("CFO seeded successfully");

  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

seed();