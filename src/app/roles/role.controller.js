const { assignRoleToUser } = require("./role.service");

const assignRole = async (req, res) => {
  try {
    const result = await assignRoleToUser(req.body);

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

module.exports = {
  assignRole,
};