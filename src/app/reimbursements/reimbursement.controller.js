const {
  createNewReimbursement,
  getEmployeeReimbursements,
  getPendingForRM,
  rmApprove,
  rmReject,
} = require("./reimbursement.service");

const createReimbursement = async (req, res) => {
  try {
    const result = await createNewReimbursement(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyReimbursements = async (req, res) => {
  try {
    const result = await getEmployeeReimbursements(
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};




const getPendingReimbursements = async (req, res) => {
  try {
    const data = await getPendingForRM(req.user.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const approveByRM = async (req, res) => {
  try {
    const data = await rmApprove(
      req.params.id,
      req.body.comment
    );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const rejectByRM = async (req, res) => {
  try {
    const data = await rmReject(
      req.params.id,
      req.body.comment
    );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createReimbursement,
  getMyReimbursements,
  getPendingReimbursements,
  approveByRM,
  rejectByRM,
};