const express = require("express");
const {
  getOrderByIdAccount,
  getOrder,
} = require("../controllers/orderController");

const router = express.Router();
// Lich su mua cua user
router.get("/order/:idAccount", async (req, res) => {
  try {
    const order = await getOrderByIdAccount(req.params.idAccount);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/order", async (req, res) => {
  try {
    const orders = await getOrder();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
