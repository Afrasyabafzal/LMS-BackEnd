const {
  login__controller,
  register__controller,
  register_admin_controller,
  register_scheduler_controller,
  register_student_controller,
  register_client_controller,
  quit_student,
  hold_student,
  AddTimetable,
  TimeTable_controller,
  makeup_class_controller
} = require("../controllers/authController");
const upload = require("../middlewares/multer");
const { login_validator} = require("../middlewares/loginValidator");
const registerValidator = require("../middlewares/registerValidator");
const schedulerValidator= require("../middlewares/schedulerValidator")
const loginValidator = require("../middlewares/loginValidator");
const { adminAuthentication } = require("../middlewares/authentication");
const { requireLogin } = require("../middlewares/requireLogin");
const {hold_validator}=require("../middlewares/holdvalidator")
const {revert_Student__controller}=require("../controllers/quitAndHoldController")
const {quit_validator}=require("../middlewares/quitvalidator")
const {timeTable_validator}=require("../middlewares/timeTableValidator")



const router = require("express").Router();

router.post("/login", loginValidator,login_validator,login__controller)
router.post("/register-admin",register_admin_controller)
router.post("/revert-student",revert_Student__controller)
router.post("/register",registerValidator, registerValidator.register_validator ,register__controller)
router.post("/register-scheduler",schedulerValidator,register_scheduler_controller)

router.post("/register-student",upload.single("img"),register_student_controller)

router.post("/client/register",  registerValidator.register_validator, register_client_controller)

router.post("/add-timetable",requireLogin,timeTable_validator,AddTimetable)
router.post ("/add-makeup",requireLogin,timeTable_validator,makeup_class_controller)

router.post("/quit-student",quit_validator,quit_student)
router.post("/hold-student",hold_validator,hold_student)

module.exports = router;
