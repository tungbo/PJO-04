const express = require("express");
const {
  createRole,
  getRole,
  getRoleById,
  updateRole,
} = require("../controllers/roleController");

const router = express.Router();

router.post("/role", async (req, res) => {
  try {
    const role = await createRole(req.body);
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/role", async (req, res) => {
  try {
    const role = await getRole();
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/role/detail", async (req, res) => {
  try {
    const { idRole } = req.body;
    const role = await getRoleById(idRole);
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/role", async (req, res) => {
  try {
    const role = await updateRole(req.body);
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.delete("/topping/:idTopping", async (req, res) => {
//   try {
//     const topping = await deleteTopping(req.params.idTopping);
//     res.status(200).json(topping);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = router;
