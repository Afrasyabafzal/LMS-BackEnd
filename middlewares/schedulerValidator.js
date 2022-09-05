const { body, validationResult } = require("express-validator");

module.exports = [
  body("Name")
    .not()
    .isEmpty()
    .withMessage("name required")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters"),

  body("email")
    .not()
    .isEmpty()
    .withMessage("Email required")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid Email address")
    ,

  body("password").not().notEmpty().withMessage("Password required")
  .not().isIn(['123','password'])
  .withMessage('Do not use a common word as the password')
  .isLength({min:6})
  .withMessage('Password must be at least 6 characters'),
  


]
