require("dotenv").config();
const express = require("express");
const secure = require("./middlewares/secure");

const users = require("./routes/users");
const orders = require("./routes/orders");

const app = express();
app.use(express.json());

// Uncomment next line to apply the "secure"
// middleware to all incoming requests
// You'll have to provide a token as a query string parameter
// to access any further route (eg: localhost:3000/api/endpoint?token=something)
// app.use(secure);

app.use("/api/users", users);
app.use("/api/orders", orders);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🐑⚡ Server listening on port ${port}`);
});
