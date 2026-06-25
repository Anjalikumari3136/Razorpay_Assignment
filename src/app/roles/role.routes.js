const express = require("express");
const router = express.Router();

const authenticate = require("../../middlewares/auth.middleware");
const authorize = require("../../middlewares/authorize.middleware");
const validate = require("../../middlewares/validate.middleware");

const { assignRole } = require("./role.controller");
const { assignRoleSchema } = require("./role.dto");

router.post(
  "/assign",
  authenticate,
  authorize("CFO"),
  validate({ body: assignRoleSchema }),
  assignRole
);

module.exports = router;