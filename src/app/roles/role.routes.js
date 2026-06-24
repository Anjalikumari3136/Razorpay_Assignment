const express = require("express");
const router = express.Router();

const authenticate = require("../../middlewares/auth.middleware");
const authorize = require("../../middlewares/authorize.middleware");

const { assignRole } = require("./role.controller");

router.post(
  "/assign",
  authenticate,
  authorize("CFO"),
  assignRole
);

module.exports = router;