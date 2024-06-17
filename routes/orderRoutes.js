const express = require("express");
const { getCheckout, getDetail } = require("../controllers/orderController");

const router = express.Router();

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

module.exports = router;
