const express = require("express");
const db = require("../database");
const router = express.Router();

// Create an Express server with routes for the orders on:
// GET  /  : To get all the orders - ✅
// GET  /:id :  To get one order (with the id) - ✅
// POST / -> To create a new order - ✅
// PUT /:id  :  To edit one order (with the id) - ✅
// DELETE  /:id : To delete one order (with the id) - ✅

router
  .route("/")
  .get((req, res) => {
    db.query("SELECT * FROM orders")
      .then((data) => res.json(data.rows))
      .catch((err) => console.error(err));
  })
  .post((req, res) => {
    const { price, date, user_id } = req.body;
    db.query(
      "INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *",
      [price, date, user_id]
    )
      .then((data) => res.json(data.rows))
      .catch((err) => console.error(err));
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM orders WHERE id=$1", [id])
      .then((data) => res.json(data.rows))
      .catch((err) => console.error(err));
  })
  .put((req, res) => {
    const { id } = req.params;
    const { price, date, user_id } = req.body;
    db.query(
      "UPDATE orders SET price=$1, date=$2, user_id=$3 WHERE id=$4 RETURNING *",
      [price, date, user_id, id]
    )
      .then((data) => res.json(data.rows))
      .catch((err) => console.error(err));
  })
  .delete((req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM orders WHERE id=$1 RETURNING *", [id])
      .then((data) => res.json(data.rows))
      .catch((err) => console.error(err));
  });

module.exports = router;
