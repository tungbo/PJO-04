const express = require("express");
const bodyParser = require("body-parser");
const pizzaRoutes = require("./routes/pizzaRoutes");
const sizeRoutes = require("./routes/pizzaSizeRoutes");
const toppingRoutes = require("./routes/toppingRoutes");
const roleRoutes = require("./routes/roleRoutes");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/api", pizzaRoutes, sizeRoutes, toppingRoutes, roleRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});