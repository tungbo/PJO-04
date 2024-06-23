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

router.get("/topping/:idTopping", async (req, res) => {
  try {
    const topping = await getToppingById(req.params.idTopping);
    res.status(200).json(topping);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put(
  "/topping/:idTopping",
  authenticateJWT,
  authorize(["A"]),
  async (req, res) => {
    try {
      const topping = await updateTopping(req.params.idTopping, req.body);
      res.status(200).json(topping);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.delete(
  "/topping/:idTopping",
  authenticateJWT,
  authorize(["A"]),
  async (req, res) => {
    try {
      const topping = await deleteTopping(req.params.idTopping);
      res.status(200).json(topping);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
