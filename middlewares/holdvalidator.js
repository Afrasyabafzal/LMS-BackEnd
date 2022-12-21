const { body, validationResult } = require("express-validator");

module.exports = [
  body("reason")
    .not()
    .isEmpty()
    .withMessage("reason required"),

  body("returnDate")
    .not()
    .isEmpty()
    .withMessage("return Date required")

]
module.exports.hold_validator=(req,res,next)=>{
    const errors = validationResult(req).formatWith(errors=>errors.msg)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
        
      }
      next();
}