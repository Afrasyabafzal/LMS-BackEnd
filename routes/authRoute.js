const {
  login__controller,
  register__controller,
  register_client_controller
} = require("../controllers/authController");
const { login_validator} = require("../middlewares/loginValidator");
const registerValidator = require("../middlewares/registerValidator");
const loginValidator = require("../middlewares/loginValidator");
const { adminAuthentication } = require("../middlewares/authentication");

const router = require("express").Router();

router.post("/login", loginValidator,login_validator,login__controller)

router.post("/register",registerValidator, registerValidator.register_validator ,register__controller)

router.post("/client/register",  registerValidator.register_validator, register_client_controller)
module.exports = router;
