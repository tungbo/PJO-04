const express = require("express");
const { getCheckout, getDetail } = require("../controllers/checkoutController");
const {
  createOrder,
  createOrderDetail,
} = require("../controllers/orderController");
const { deleteCartOrder } = require("../controllers/cartController");
const stripe = require("stripe")(
  "sk_test_51PVws3EpMDtYacyevhIFxzEw7bezUma5JsqhPI04iSES4IqC5qbx8ENRvVjupRelPxseslvkVuCDka4eVFHqr9Br00TtebVlqm"
);

const router = express.Router();
router.get("/checkout", async (req, res) => {
  try {
    const { idAccount } = req.body;
    // Lay thong tin cac sp trong cart
    const checkout = await getCheckout(idAccount);
    // Lay thong tin user
    const details = await getDetail(idAccount);
    res.status(200).json({
      details,
      checkout,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Xoa cart, tao order
router.post("/checkout", async (req, res) => {
  const { idAccount } = req.body;
  const { totalOrderPiza, orderDetail } = req.body;
  try {
    //Tao order
    const order = await createOrder({ idAccount, totalOrderPiza });

    for (const details of orderDetail) {
      //Tao order detail
      await createOrderDetail({ idOrderPiza: order.idOrderPiza, ...details });
    }
    // Xoa cart
    await deleteCartOrder({ idAccount });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
