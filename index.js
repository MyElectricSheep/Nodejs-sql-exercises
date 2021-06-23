require("dotenv").config();
const express = require("express");

const users = require("./routes/users");
const orders = require("./routes/orders");

const app = express();
app.use(express.json());

app.use("/api/users", users);
app.use("/api/orders", orders);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🐑⚡ Server listening on port ${port}`);
});
