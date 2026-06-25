const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

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

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Razorpay API',
      version: '1.0.0',
      description: 'API Documentation',
    },
  },
  apis: ['./src/app/**/*.routes.js'],
};

const specs = swaggerJsdoc(options);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

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

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

module.exports = app;