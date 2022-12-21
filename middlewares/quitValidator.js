const { body, validationResult } = require("express-validator");

module.exports = [
  body("reason")
    .not()
    .isEmpty()
    .withMessage("reason required")

]
module.exports.quit_validator=(req,res,next)=>{
    const errors = validationResult(req).formatWith(errors=>errors.msg)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
        
      }
      next();
}