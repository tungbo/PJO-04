const express = require("express");
const {
  createTopping,
  getTopping,
  getToppingById,
  updateTopping,
  deleteTopping,
} = require("../controllers/toppingController");

const router = express.Router();

router.post("/topping", async (req, res) => {
  try {
    const topping = await createTopping(req.body);
    res.status(201).json(topping);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

router.put("/topping/:idTopping", async (req, res) => {
  try {
    const topping = await updateTopping(req.params.idTopping, req.body);
    res.status(200).json(topping);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/topping/:idTopping", async (req, res) => {
  try {
    const topping = await deleteTopping(req.params.idTopping);
    res.status(200).json(topping);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
