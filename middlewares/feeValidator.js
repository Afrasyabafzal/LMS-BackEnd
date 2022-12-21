const { body, validationResult } = require("express-validator");

module.exports = [
  body("link")
    .not()
    .isEmpty()
    .withMessage("link required"),
  body("submissionDate").not().isEmpty().withMessage("date required"),
]

module.exports.fee_validator = (req, res, next) => {
  const errors = validationResult(req).formatWith((errors) => errors.msg);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }
  next();
};
