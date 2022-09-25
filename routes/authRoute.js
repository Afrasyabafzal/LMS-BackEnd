const {
  login__controller,
  register__controller,
  register_admin_controller,
  register_scheduler_controller,
  register_student_controller,
  register_client_controller,
  quit_student,
  hold_student,
  TimeTable_controller
} = require("../controllers/authController");
const upload = require("../middlewares/multer");
const { login_validator} = require("../middlewares/loginValidator");
const registerValidator = require("../middlewares/registerValidator");
const schedulerValidator= require("../middlewares/schedulerValidator")
const loginValidator = require("../middlewares/loginValidator");
const { adminAuthentication } = require("../middlewares/authentication");
const { requireLogin } = require("../middlewares/requireLogin");
const {revert_Student__controller}=require("../controllers/quitAndHoldController")



const router = require("express").Router();

router.post("/login", loginValidator,login_validator,login__controller)
router.post("/register-admin",register_admin_controller)
router.post("/revert-student",revert_Student__controller)
router.post("/register",registerValidator, registerValidator.register_validator ,register__controller)
router.post("/register-scheduler",schedulerValidator,register_scheduler_controller)
router.post("/register-student",upload.single("img"),register_student_controller)
router.post("/client/register",  registerValidator.register_validator, register_client_controller)
router.post("/add-timetable",  TimeTable_controller)
router.post("/quit-student",quit_student)
router.post("/hold-student",hold_student)

module.exports = router;
