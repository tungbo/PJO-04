const express = require("express");
const {
  createCart,
  getCartByUserId,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/cart", async (req, res) => {
  try {
    const role = await createRole(req.body);
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/cart/:idAccount", async (req, res) => {
  try {
    const cart = await getCartByUserId(req.params.idAccount);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
