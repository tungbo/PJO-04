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
router.get("/pizzas/detail", async (req, res) => {
  try {
    const { idPiza } = req.body;
    const pizza = await getPizzaById(idPiza);
    res.status(200).json(pizza);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Cap nhat sp
// router.put(
//   "/pizzas",
//   upload.single("imgPiza"),
//   authenticateJWT,
//   authorize(["A"]),
//   async (req, res) => {
//     console.log(res);
//     try {
//       const { idPiza } = req.body;
//       const pizza = {
//         ...req.body,
//         imgPiza: req.file ? req.file.path : undefined,
//       };
//       const updatedPizza = await updatePizza(idPiza, pizza);
//       res.status(200).json(updatedPizza);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }
// );

router.put(
  "/pizzas",
  upload.single("imgPiza"),
  authenticateJWT,
  authorize(["A"]),
  async (req, res) => {
    try {
      const { idPiza } = req.body;
      const existingPizza = await getPizzaById(idPiza);

      const pizza = {
        ...req.body,
        imgPiza: req.file ? req.file.path : existingPizza.imgPiza,
      };

      const updatedPizza = await updatePizza(idPiza, pizza);
      res.status(200).json(updatedPizza);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
router.delete(
  "/pizzas",
  authenticateJWT,
  authorize(["A"]),
  async (req, res) => {
    try {
      const { idPiza } = req.body;
      const pizza = await deletePizza(idPiza);
      res.status(200).json(pizza);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
