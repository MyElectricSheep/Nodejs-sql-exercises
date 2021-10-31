const db = require("../database");

const getOneUser = (req, res, next) => {
  const { id } = req.params;

  const getOneUserQuery = {
    text: `
    SELECT u.id, u.first_name, u.last_name, u.age, u.active, u.token_id, t.value
    FROM users u
    LEFT JOIN tokens t
    ON u.token_id = t.id 
    WHERE u.id=$1`,
    values: [id],
  };

  db.query(getOneUserQuery)
    .then((data) => {
      if (!data.rows.length) {
        return res.status(404).send("A user with this ID does not exist");
      }
      req.user = data.rows[0];
      next();
    })
    .catch(next);
};

module.exports = getOneUser;
