const express = require("express");
const morgan = require("morgan");
const stripe = require("stripe")(
  "sk_test_51PVws3EpMDtYacyevhIFxzEw7bezUma5JsqhPI04iSES4IqC5qbx8ENRvVjupRelPxseslvkVuCDka4eVFHqr9Br00TtebVlqm"
);
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authorize, authenticateJWT } = require("./middleware/auth");
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
const port = 3001;

const corsOptions = {
  origin: "http://localhost:3000", // frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // cookie,HTTP Authentication
  optionsSuccessStatus: 204,
};
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
// Yeu cau quyen, login test
app.use(
  "/api/auth/",
  authenticateJWT,
  authorize(["U", "A"]),
  checkoutRoutes,
  cartRoutes,
  roleRoutes,
  sizeRoutes
);

app.use(
  "/api",
  pizzaRoutes,
  toppingRoutes,
  userRoutes,
  authRoutes,
  orderRoutes
);

app.post("/test", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Pizza",
          },
          unit_amount: 50 * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.status(200).json({
    paymentUrl: session.url,
  });
});

app.post("/test2", async (req, res) => {
  try {
    const { orderDetail } = req.body;

    // Tạo danh sách line_items từ orderDetail
    const lineItems = orderDetail.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    console.log(lineItems);

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    res.status(200).json({
      paymentUrl: session.url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
