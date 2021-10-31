// MIDDLEWARES: /:id/create-token : to create a token for a user - ✅
// MIDDLEWARES: /:id/verify/:token : to verify the token of a user - ✅

const express = require("express");
const db = require("../database");
const getOneUser = require("../middlewares/getOneUser");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.get("/tokens", (req, res, next) => {
  db.query("SELECT * FROM tokens")
    .then((data) => {
      res.json(data.rows);
    })
    .catch(next);
});

router.post("/:id/create-token", getOneUser, (req, res, next) => {
  const { user } = req;

  if (user.token_id)
    return res
      .status(403)
      .send("Cannot create token. This user already has a token.");

  const token = uuidv4(); // eg: 123e4567-e89b-12d3-a456-426614174000

  console.log(user);

  db.query("INSERT INTO tokens(value) VALUES($1) RETURNING *", [token])
    .then((data) => {
      const [{ id }] = data.rows; // => Token id
      console.log(id);
      return db.query("UPDATE users SET token_id=$1 WHERE id=$2 RETURNING *", [
        id,
        user.id,
      ]);
    })
    .then((data) => {
      if (!data.rows.length)
        return res.status(403).send("User could not be updated");
      res.json(data.rows[0]);
    })
    .catch(next);
});

router.get("/:id/verify/:token", getOneUser, (req, res, next) => {
  const { token } = req.params;
  const { value: dbToken, ...rest } = req.user;

  if (!dbToken)
    return res.status(404).send("No token is attached to this user yet.");

  if (token === dbToken) {
    res.json({
      ...rest,
      status: "valid token",
      accessGranted: true,
    });
  } else {
    res.json({
      ...rest,
      status: "invalid token",
      accessGranted: false,
    });
  }
});

module.exports = router;
