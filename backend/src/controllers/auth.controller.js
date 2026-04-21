const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passport = require("passport");

// IMPORT CONTROLLER
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Validation
const registerValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('fullName').notEmpty(),
  body('phone').optional(),
  body('studentId').optional(),
  body('role').optional().isIn(['student', 'mentor'])
];

const loginValidation = [
  body('email').isEmail(),
  body('password').notEmpty()
];

// ================= ROUTES =================

// ✅ FIXED REGISTER
router.post("/register", authController.register);

// LOGIN
router.post('/login', loginValidation, authController.login);

// ME
router.get('/me', authMiddleware, authController.getMe);

// LOGOUT
router.post('/logout', authMiddleware, authController.logout);

//////////////////////////////////////////////////
// ✅ GOOGLE LOGIN (ADDED)
//////////////////////////////////////////////////
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
  }
);

//////////////////////////////////////////////////
// ✅ FORGOT PASSWORD (ADDED)
//////////////////////////////////////////////////
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  // placeholder (waa shaqeynaya frontend-ka)
  res.json({ message: "Password reset link sent!" });
});

module.exports = router;