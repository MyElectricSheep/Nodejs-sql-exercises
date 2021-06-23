const { body } = require("express-validator");

const userValidations = [
  body("first_name")
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("The user's first name has to be minimum 2 characters"),
  body("last_name")
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("The user's last name has to be minimum 2 characters"),
  body("age")
    .notEmpty()
    .isInt({ min: 18, max: 130 })
    .withMessage("The user's age should be between 18 and 130 years old"),
];

module.exports = userValidations;
