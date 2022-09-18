const {
  login__controller,
  register__controller,
  register_admin_controller,
  register_scheduler_controller,
  register_student_controller,
  register_client_controller,
  TimeTable_controller
} = require("../controllers/authController");
const upload = require("../middlewares/multer");
const { login_validator} = require("../middlewares/loginValidator");
const registerValidator = require("../middlewares/registerValidator");
const schedulerValidator= require("../middlewares/schedulerValidator")
const loginValidator = require("../middlewares/loginValidator");
const { adminAuthentication } = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/login", loginValidator,login_validator,login__controller)
router.post("/register-admin",register_admin_controller)
router.post("/register",registerValidator, registerValidator.register_validator ,register__controller)
router.post("/register-scheduler",schedulerValidator,register_scheduler_controller)
router.post("/register-student",upload.single("img"),register_student_controller)
router.post("/client/register",  registerValidator.register_validator, register_client_controller)
router.post("/add-timetable",  TimeTable_controller)

module.exports = router;
