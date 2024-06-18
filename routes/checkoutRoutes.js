const express = require("express");
const { getCheckout, getDetail } = require("../controllers/checkoutController");
const {
  createOrder,
  createOrderDetail,
} = require("../controllers/orderController");
const { deleteCartOrder } = require("../controllers/cartController");

const router = express.Router();
// Lay thong tin user, cart
router.get("/checkout/:idAccount", async (req, res) => {
  try {
    const checkout = await getCheckout(req.params.idAccount);
    const details = await getDetail(req.params.idAccount);
    res.status(200).json({
      details,
      checkout,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Xoa cart, tao order
router.post("/checkout/:idAccount", async (req, res) => {
  const { totalOrderPiza, orderDetail } = req.body;
  const { idAccount } = req.params;
  try {
    const order = await createOrder({ idAccount, totalOrderPiza });

    for (const details of orderDetail) {
      await createOrderDetail({ idOrderPiza: order.idOrderPiza, ...details });
    }
    await deleteCartOrder({ idAccount });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
