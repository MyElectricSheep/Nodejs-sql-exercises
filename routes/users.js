const express = require("express");
const db = require("../database");
const router = express.Router();
const userValidations = require("../validations/userValidations");
const { validationResult } = require("express-validator");
const getOneUser = require("../middlewares/getOneUser");

// Create an Express server with routes for the users on:
// GET  /  : To get all the users - ✅
// GET  /:id :  To get one user (with the id) - ✅
// POST / -> To create a new user - ✅
// PUT /:id  :  To edit one user (with the id) - ✅
// DELETE  /:id : To delete one user (with the id) - ✅

// EXTRA: /:id/orders : To get all orders linked to a specific user - ✅
// EXTRA: /:id/check-inactive : If a user has never ordered, he should be set as inactive - ✅

router.get("/", (req, res) => {
  db.query("SELECT * FROM users ORDER BY id ASC LIMIT 100")
    .then((data) => res.json(data.rows))
    .catch((err) => console.error(err));
});

router.get("/:id", getOneUser, (req, res) => {
  const { user } = req;
  res.json(user);
});

router.get("/:id/orders", (req, res) => {
  const { id } = req.params;
  db.query(
    `
    SELECT 
        u.first_name,
        u.last_name,
        ARRAY_AGG(JSON_BUILD_OBJECT('price', o.price, 'date', o.date)) AS orders
    FROM users u
    JOIN orders o
        ON u.id = o.user_id
        WHERE u.id = $1
    GROUP BY u.first_name, u.last_name
    `,
    [id]
  )
    .then((data) => {
      if (!data.rows.length)
        return res.send("This user did not make any orders yet");
      res.json(data.rows);
    })
    .catch((err) => console.error(err));
});

router.put("/:id/check-inactive", (req, res) => {
  const { id } = req.params;
  db.query(
    `
    SELECT u.first_name, u.last_name, COUNT(o.date) AS order_count
    FROM users u
    LEFT JOIN orders o
    ON u.id = o.user_id
    WHERE u.id = $1
    GROUP BY u.first_name, u.last_name
    `,
    [id]
  )
    .then((data) => {
      const [user] = data.rows;
      console.log(user);
      if (!user) return res.status(404).send("No user matches that id");
      if (parseInt(user.order_count, 10) < 1) {
        return db.query(
          `UPDATE users SET active=false WHERE id=$1 RETURNING *`,
          [id]
        );
      }
    })
    .then((data) => {
      if (!data)
        // if you don't return anything from a promise (previous then block, implicit else case),
        // you are effectively returning a resolved promise with the value undefined.
        return res.send(
          "This user has already placed some orders before and is active"
        );
      res.json(data.rows[0]);
    })
    .catch((err) => console.error(err));
});

router.post("/", userValidations, (req, res) => {
  const { first_name, last_name, age } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  db.query(
    "INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *",
    [first_name, last_name, age]
  )
    .then((data) => res.json(data.rows))
    .catch((err) => console.error(err));
});

router.put("/:id", userValidations, (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  db.query("SELECT * FROM users WHERE id=$1", [id])
    .then(({ rows }) => {
      if (!rows.length)
        return res.status(404).send("There is no user with that ID");

      const updateOneUser = {
        text: "UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *",
        values: [
          first_name || rows[0].first_name,
          last_name || rows[0].last_name,
          age || rows[0].age,
          id,
        ],
      };
      return db.query(updateOneUser);
    })
    .then((data) => {
      res.json(data.rows);
    })
    .catch((err) => console.error(err));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id=$1 RETURNING *", [id])
    .then((data) => {
      if (!data.rows.length)
        return res.status(404).send("There is no user with that ID");
      res.json(data.rows);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
