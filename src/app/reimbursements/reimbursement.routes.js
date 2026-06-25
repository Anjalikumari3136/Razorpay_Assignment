const express = require("express");
const router = express.Router();

const authenticate = require("../../middlewares/auth.middleware");
const authorize = require("../../middlewares/authorize.middleware");

const {
  createReimbursement,
  getMyReimbursements,
  getPendingReimbursements,
  approveByRM,
  rejectByRM,
  getRMApproved,
  apeApproveController,
  apeRejectController,
} = require("./reimbursement.controller");

// EMP
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

// RM
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

// APE
router.get(
  "/rm-approved",
  authenticate,
  authorize("APE"),
  getRMApproved
);

router.post(
  "/:id/ape-approve",
  authenticate,
  authorize("APE"),
  apeApproveController
);

router.post(
  "/:id/ape-reject",
  authenticate,
  authorize("APE"),
  apeRejectController
);

module.exports = router;