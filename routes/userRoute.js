const {
  getStudent__controller,
  getTeacher__controller,
  deleteTeacher__controller,
  edit_profile
} = require("../controllers/userController");
const { adminAuthentication } = require("../middlewares/authentication");
const { requireLogin } = require("../middlewares/requireLogin");

const router = require("express").Router();

router.get(
  "/student",
  requireLogin,
  adminAuthentication,
  getStudent__controller
);

router.get(
  "/teacher",
  requireLogin,
  adminAuthentication,
  getTeacher__controller
);

router.get(
  "/delete/:id",
  requireLogin,
  adminAuthentication,
  deleteTeacher__controller
);
router.put(
  "/edit-profile",
  requireLogin,
  adminAuthentication,
  edit_profile
);

module.exports = router;
