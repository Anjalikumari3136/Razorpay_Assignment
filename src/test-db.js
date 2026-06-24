require("dotenv").config();
const pool = require("./config/db");

async function test() {
  const res = await pool.query("SELECT NOW()");
  console.log(res.rows);
}

test();