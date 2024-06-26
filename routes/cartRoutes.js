const express = require("express");
const {
  createCart,
  getCartByUserId,
  updateCart,
  deleteCart,
} = require("../controllers/cartController");
//Yeu cau dang nhap
const router = express.Router();
// Them sp vao cart
router.post("/cart", async (req, res) => {
  try {
    const cart = await createCart(req.body);
    res.status(201).json("da them san pham vao gio hang");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); 
// Tat ca cac sp co trong card
router.get("/cart", async (req, res) => {
  try {
    const { idAccount } = req.user;
    const cart = await getCartByUserId(idAccount);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Cap nhat cart
router.put("/cart", async (req, res) => {
  try {
    const cart = await updateCart(req.body);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Xoa sp trong cart
router.delete("/cart", async (req, res) => {
  try {
    const cart = await deleteCart(req.body);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
