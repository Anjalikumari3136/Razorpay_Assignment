const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
} = require("./auth.controller");

const validate = require("../../middlewares/validate.middleware");
const { loginSchema, registerSchema } = require("./auth.dto");

router.post("/register", validate({ body: registerSchema }), register);
router.post("/login", validate({ body: loginSchema }), login);
router.post("/logout", logout);


/**
 * @swagger
 * /rest/onboardings/login:
 *   post:
 *     summary: User Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', login)

module.exports = router;