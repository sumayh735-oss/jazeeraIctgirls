const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

// IMPORT CONTROLLER (SAX)
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

// ✅ ROUTES (FIXED)
router.post("/register", register);
router.post('/login', loginValidation, authController.login);
router.get('/me', authMiddleware, authController.getMe);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;