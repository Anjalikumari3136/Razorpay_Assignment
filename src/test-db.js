require("dotenv").config();

const { Pool } = require("pg");

console.log(process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("DB Connected Successfully 🚀");
    console.log(result.rows);
  } catch (err) {
    console.error("DB Error:");
    console.error(err);
  } finally {
    await pool.end();
  }
})();