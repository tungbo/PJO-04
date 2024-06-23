const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { register } = require("../controllers/authController");
const { getUserByUsername } = require("../controllers/userController");

const router = express.Router();
// Dang ky
router.post("/register", async (req, res) => {
  const { UserName, Password, address, phone, Name } = req.body;
  try {
    const oldUser = await getUserByUsername(UserName);
    if (oldUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Create the user
    const user = await register({
      UserName,
      Password,
      address,
      phone,
      Name,
      role: "U", // Set default role to 'U'
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.idAccount, role: user.role },
      "ai-yeu-bac-ho-chi-minh-bang-cac-em-nhi-dong",
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });
    res.json({ message: "Register in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//Dang nhap
router.post("/login", async (req, res) => {
  const { UserName, Password } = req.body;
  try {
    // Find the user by username
    const user = await getUserByUsername(UserName);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.idAccount, role: user.role },
      "ai-yeu-bac-ho-chi-minh-bang-cac-em-nhi-dong",
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      path:"/",
      maxAge: 3600000, // 1 hour
    });
    res.json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
// Dang xuat
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
