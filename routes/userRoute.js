const {
  getStudent__controller,
  getTeacher__controller,
  deleteTeacher__controller,
  getClient_controller,
  edit_profile,
  edit_client_profile,
  deleteClient_controller
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
  "/client",
  requireLogin,
  adminAuthentication,
  getClient_controller
)

router.get(
  "/client/delete/:id",
  requireLogin,
  adminAuthentication,
  deleteClient_controller
)

router.get(
  "/delete/:id",
  requireLogin,
  adminAuthentication,
  deleteTeacher__controller
);

router.put(
  "/client/edit-profile",
  requireLogin,
  adminAuthentication,
  edit_client_profile
)

router.put(
  "/edit-profile",
  requireLogin,
  adminAuthentication,
  edit_profile
);

module.exports = router;
