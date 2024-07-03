const express = require("express");
const { authorize, authenticateJWT } = require("../middleware/auth");

const {
  getUser,
  updateUser,
  getUserByUsername,
} = require("../controllers/userController");

const router = express.Router();
// Danh sach user
router.get("/user", authenticateJWT, authorize(["A"]), async (req, res) => {
  try {
    const user = await getUser();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post(
  "/user/detail",
  authenticateJWT,
  authorize(["A", "U"]),
  async (req, res) => {
    try {
      const { UserName } = req.body;
      const user = await getUserByUsername(UserName);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.put(
  "/user",
  authenticateJWT,
  authorize(["U", "A"]),
  async (req, res) => {
    try {
      const user = await updateUser(req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
