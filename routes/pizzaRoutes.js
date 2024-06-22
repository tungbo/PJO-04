const express = require("express");
const multer = require("multer");
const { authorize, authenticateJWT } = require("../middleware/auth");
const {
  createPizza,
  getPizzas,
  getPizzaById,
  updatePizza,
  deletePizza,
} = require("../controllers/pizzaController");

const router = express.Router();
//Su ly file anh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//Tao piza
router.post(
  "/pizzas",
  upload.single("imgPiza"),
  authenticateJWT,
  authorize(["A"]),
  async (req, res) => {
    try {
      const pizza = { ...req.body, imgPiza: req.file.path };
      const newPizza = await createPizza(pizza);
      res.status(201).json(newPizza);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
//Lay tat ca sp
router.get("/pizzas", async (req, res) => {
  try {
    const pizzas = await getPizzas();
    res.status(200).json(pizzas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Chi tiet sp
router.get("/pizzas/:idPiza", async (req, res) => {
  try {
    const pizza = await getPizzaById(req.params.idPiza);
    res.status(200).json(pizza);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Cap nhat sp
router.put(
  "/pizzas/:idPiza",
  upload.single("imgPiza"),
  authenticateJWT,
  authorize(["A"]),
  async (req, res) => {
    try {
      const pizza = {
        ...req.body,
        imgPiza: req.file ? req.file.path : undefined,
      };
      const updatedPizza = await updatePizza(req.params.idPiza, pizza);
      res.status(200).json(updatedPizza);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

router.delete(
  "/pizzas/:idPiza",
  authenticateJWT,
  authorize(["A"]),
  async (req, res) => {
    try {
      const pizza = await deletePizza(req.params.idPiza);
      res.status(200).json(pizza);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
