const {
  getStudent__controller,
  getTeacher__controller,
  getScheduler__controller,
  deleteTeacher__controller,
  deleteScheduler__controller,
  edit_Scheduler_profile,
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
  "/scheduler",
  requireLogin,
  adminAuthentication,
  getScheduler__controller
  );

router.get(
  "/delete/:id",
  requireLogin,
  adminAuthentication,
  deleteTeacher__controller
);
router.get(
  "/delete-scheduler/:id",
  requireLogin,
  adminAuthentication,
  deleteScheduler__controller
);
router.put(
  "/edit-profile",
  requireLogin,
  adminAuthentication,
  edit_profile
);
router.put(
  "/edit-profile-teacher",
  requireLogin,
  adminAuthentication,
  edit_profile
);
router.put(
  "/edit-profile-scheduler",
  requireLogin,
  adminAuthentication,
  edit_Scheduler_profile
);

module.exports = router;
