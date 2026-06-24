// const express = require("express");
// const cookieParser = require("cookie-parser");

// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// module.exports = app;


const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./app/auth/auth.routes");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/rest/onboardings", authRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running");
});

module.exports = app;