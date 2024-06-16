const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { register } = require("../controllers/authController");
const { getUserByUsername } = require("../controllers/userController");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { UserName, Password, address, phone, Name } = req.body;
  try {
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
      { id: user.idAccount },
      "ai-yeu-bac-ho-chi-minh-bang-cac-em-nhi-dong",
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

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
      { id: user.idAccount },
      "ai-yeu-bac-ho-chi-minh-bang-cac-em-nhi-dong",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
