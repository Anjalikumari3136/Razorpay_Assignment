const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./app/auth/auth.routes");

const authenticate = require("./middlewares/auth.middleware");
const authorize = require("./middlewares/authorize.middleware");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/rest/onboardings", authRoutes);

app.get(
  "/cfo-only",
  authenticate,
  authorize("CFO"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome CFO",
    });
  }
);

module.exports = app;