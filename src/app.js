const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("./app/auth/auth.routes");

const authenticate = require("./middlewares/auth.middleware");
const authorize = require("./middlewares/authorize.middleware");

const roleRoutes = require("./app/roles/role.routes");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/rest/onboardings", authRoutes);

app.use("/rest/roles", roleRoutes);

const reimbursementRoutes = require(
  "./app/reimbursements/reimbursement.routes"
);

app.use(
  "/rest/reimbursements",
  reimbursementRoutes
);
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
app.get("/whoami", authenticate, (req, res) => {
  res.json(req.user);
});

module.exports = app;