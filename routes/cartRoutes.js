const express = require("express");
const {
  createCart,
  getCartByUserId,
  updateCart,
  deleteCart,
  checkCart,
  updateInCart,
} = require("../controllers/cartController");
//Yeu cau dang nhap
const router = express.Router();
// Them sp vao cart
router.post("/cart", async (req, res) => {
  try {
    const cartExists = await checkCart(req.body.idAccount, req.body.idPiza);
    if (cartExists) {
      const upCart = await updateCart(
        req.body.quantity,
        req.body.idAccount,
        req.body.idPiza
      );
      res
        .status(200)
        .json("So luong san pham trong gio hang da duoc cap nhat.");
    } else {
      const cart = await createCart(req.body);
      res.status(201).json("San pham da duoc them vao gio hang.");
    }
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
    console.log(req.body);
    const cart = await updateInCart(req.body);
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
