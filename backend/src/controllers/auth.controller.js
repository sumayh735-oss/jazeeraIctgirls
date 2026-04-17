const User = require("../models/User");

// REGISTER
const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    console.log("BODY RECEIVED:", req.body);

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }



    const user = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase(),
      password,
      role: role || "student" // 🔥 IMPORTANT FIX
    });

    return res.status(201).json({
      success: true,
      user
    });

  } catch (error) {
    console.log("REGISTER ERROR FULL:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
  exports.getMe = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
};

module.exports = { register };