const express = require("express");
const { getUser, updateUser } = require("../controllers/userController");

const router = express.Router();

router.get("/user", async (req, res) => {
  try {
    const user = await getUser();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/user/:idAccount", async (req, res) => {
  try {
    const user = await updateUser(req.params.idAccount, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
