// require express and bodyParser
const express = require("express");
const bodyParser = require("body-parser");

// Import DB Connection
require("./config/database");

// create express app
const app = express();

// define port to run express app
const port = process.env.PORT || 3000;

// use bodyParser middleware on express app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import Routes
const orderRoutes = require("./routes/ordersRoutes");
const dealsRoutes = require("./routes/dealsRoutes");

// Create the route of orders
app.use("/orders", orderRoutes);
// Create the route of deals
app.use("/deals", dealsRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("We are on PipeBlingApi");
});
// Listen to server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
