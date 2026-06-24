const express = require("express");
const router = express.Router();

const authenticate = require("../../middlewares/auth.middleware");
const authorize = require("../../middlewares/authorize.middleware");

const {
  createReimbursement,
  getMyReimbursements,
} = require("./reimbursement.controller");

const {
  getPendingReimbursements,
  approveByRM,
  rejectByRM,
} = require("./reimbursement.controller");

router.post(
  "/",
  authenticate,
  authorize("EMP"),
  createReimbursement
);

router.get(
  "/my",
  authenticate,
  authorize("EMP"),
  getMyReimbursements
);


router.get(
  "/pending",
  authenticate,
  authorize("RM"),
  getPendingReimbursements
);

router.post(
  "/:id/rm-approve",
  authenticate,
  authorize("RM"),
  approveByRM
);

router.post(
  "/:id/rm-reject",
  authenticate,
  authorize("RM"),
  rejectByRM
);


module.exports = router;