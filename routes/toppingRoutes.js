const express = require("express");
const { authorize, authenticateJWT } = require("../middleware/auth");
const {
  createTopping,
  getTopping,
  getToppingById,
  updateTopping,
  deleteTopping,
} = require("../controllers/toppingController");

const router = express.Router();
//Tao topping
router.post("/topping", authenticateJWT, authorize(["A"]), async (req, res) => {
  try {
    const topping = await createTopping(req.body);
    res.status(201).json(topping);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Lay tat ca topping
router.get("/topping", async (req, res) => {
  try {
    const topping = await getTopping();
    res.status(200).json(topping);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/topping/detail", async (req, res) => {
  try {
    const { idTopping } = req.body;
    const topping = await getToppingById(idTopping);
    res.status(200).json(topping);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/topping", authenticateJWT, authorize(["A"]), async (req, res) => {
  try {
    const topping = await updateTopping(req.body);
    res.status(200).json(topping);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete(
  "/topping",
  authenticateJWT,
  authorize(["A"]),
  async (req, res) => {
    try {
      const { idTopping } = req.body;
      const topping = await deleteTopping(idTopping);
      res.status(200).json(topping);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
