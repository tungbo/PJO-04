const express = require("express");
const bodyParser = require("body-parser");
const { auth, authorize } = require("./middleware/auth");
const pizzaRoutes = require("./routes/pizzaRoutes");
const sizeRoutes = require("./routes/pizzaSizeRoutes");
const toppingRoutes = require("./routes/toppingRoutes");
const roleRoutes = require("./routes/roleRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const port = 3000;

app.use(bodyParser.json());
// Yeu cau quyen, login test
app.use("/api/auth/", auth, authorize(["U", "A"]), checkoutRoutes);

app.use(
  "/api",
  pizzaRoutes,
  sizeRoutes,
  toppingRoutes,
  roleRoutes,
  userRoutes,
  authRoutes,
  cartRoutes,
  orderRoutes
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
