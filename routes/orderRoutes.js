const express = require("express");
const {
  getOrderByIdAccount,
  getDetail,
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

module.exports = router;
