const express = require("express");
const {
  createSize,
  getSizes,
  getSizeById,
  updateSize,
  deleteSize,
} = require("../controllers/pizzaSizeController");

const router = express.Router();
// Tao size
router.post("/size", async (req, res) => {
  try {
    const size = await createSize(req.body);
    res.status(201).json(size);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/size", async (req, res) => {
  try {
    const size = await getSizes();
    res.status(200).json(size);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/size/detail", async (req, res) => {
  try {
    const { idSize } = req.body;
    const size = await getSizeById(idSize);
    res.status(200).json(size);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/size", async (req, res) => {
  try {
    const size = await updateSize(req.body);
    res.status(200).json(size);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/size", async (req, res) => {
  try {
    const { idSize } = req.body;
    const size = await deleteSize(idSize);
    res.status(200).json(size);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
