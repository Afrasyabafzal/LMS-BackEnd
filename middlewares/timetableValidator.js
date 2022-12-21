const { body, validationResult } = require("express-validator");

module.exports = [
  body("TeacherStartTime")
    .not()
    .isEmpty()
    .withMessage("TeacherStartTime required"),

  body("StudentStartTime")
    .not()
    .isEmpty()
    .withMessage("StudentStartTime required"),

    body("StudentEndTime")
    .not()
    .isEmpty()
    .withMessage("StudentEndTime required"),

    body("TeacherEndTime")
    .not()
    .isEmpty()
    .withMessage("TeacherEndTime required"),

   body("Day")
    .not()
    .isEmpty()
    .withMessage("Day required"),
]
module.exports.timeTable_validator=(req,res,next)=>{
    const errors = validationResult(req).formatWith(errors=>errors.msg)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
        
      }
      next();
}