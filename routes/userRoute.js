const {
  getStudent__controller,
  getTeacher__controller,
  getScheduler__controller,
  getTimeTable_controller,
  deleteTimeTable__controller,
  deleteTeacher__controller,
  deleteScheduler__controller,
  edit_Scheduler_profile,
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
  "/scheduler",
  requireLogin,
  adminAuthentication,
  getScheduler__controller
  );
router.get(
    "/timetable",
    requireLogin, 
    adminAuthentication,
    getTimeTable_controller
  );
  router.get(
    "/timetable/delete/:id",
    requireLogin,
    adminAuthentication,
    deleteTimeTable__controller
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

router.get(
  "/delete-scheduler/:id",
  requireLogin,
  adminAuthentication,
  deleteScheduler__controller
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
