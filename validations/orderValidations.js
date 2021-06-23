const { body } = require("express-validator");

const orderValidations = [
  body("price")
    .notEmpty()
    .isInt({ min: 0, max: 9999 })
    .withMessage("The price of an item must be between 0 and 9999 Euros"),
  body("user_id")
    .notEmpty()
    .isInt({ min: 0, max: 9999 })
    .withMessage("You must provide a user id associated with that order"),
  body("date")
    .optional()
    .isISO8601()
    .withMessage(
      "Please provide a valid ISO 8601 formatted date (eg: 2021-06-23)."
    ),
];

module.exports = orderValidations;
