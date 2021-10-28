const express = require("express");
const db = require("../database");
const router = express.Router();
const orderValidations = require("../validations/orderValidations");
const { validationResult } = require("express-validator");

// Create an Express server with routes for the orders on:
// GET  /  : To get all the orders - ✅
// GET  /:id :  To get one order (with the id) - ✅
// POST / -> To create a new order - ✅
// PUT /:id  :  To edit one order (with the id) - ✅
// DELETE  /:id : To delete one order (with the id) - ✅

router
  .route("/")
  .get((req, res) => {
    db.query("SELECT * FROM orders ORDER BY id ASC")
      .then((data) => res.json(data.rows))
      .catch((err) => console.error(err));
  })
  .post(orderValidations, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { price, user_id } = req.body;
    db.query("SELECT * FROM users WHERE id=$1", [user_id])
      .then((data) => {
        if (!data.rows.length)
          return res.status(404).send("No such user. Cannot create order.");
        return db.query(
          "INSERT INTO orders (price, date, user_id) VALUES ($1, CURRENT_TIMESTAMP, $2) RETURNING *",
          [price, user_id]
        );
      })
      .then((data) => {
        res.json(data.rows);
      })
      .catch((err) => console.error(err));
  });

router
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM orders WHERE id=$1", [id])
      .then((data) => {
        if (!data.rows.length)
          return res.status(404).send("This order does not exist");
        res.json(data.rows[0]);
      })
      .catch((err) => console.error(err));
  })
  .put(orderValidations, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { price, date, user_id } = req.body;

    db.query("SELECT * FROM users WHERE id=$1", [user_id])
      .then((data) => {
        if (!data.rows.length)
          return res.status(404).send("A user with this id does not exist");

        return db.query("SELECT * FROM orders WHERE id=$1", [id]);
      })
      .then(({ rows }) => {
        if (!rows.length)
          return res.status(404).send("An order with this id does not exist");

        const updateOneOrder = {
          text: "UPDATE orders SET price=$1, date=$2, user_id=$3 WHERE id=$4 RETURNING *",
          values: [
            price || rows[0].price,
            date || rows[0].date,
            user_id || rows[0].user_id,
            id,
          ],
        };

        return db.query(updateOneOrder);
      })
      .then((data) => res.json(data.rows[0]))
      .catch((err) => console.error(err));
  })
  .delete((req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM orders WHERE id=$1 RETURNING *", [id])
      .then((data) => {
        if (!data.rows.length)
          return res.status(404).send("An order with this id does not exist");
        res.json(data.rows[0]);
      })
      .catch((err) => console.error(err));
  });

module.exports = router;
