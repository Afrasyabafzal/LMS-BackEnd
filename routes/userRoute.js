const {
  getStudent__controller,
  getStudentName__controller,
  getTeacher__controller,
  getScheduler__controller,
  getTimeTable_controller,
  deleteTimeTable__controller,
  deleteTeacher__controller,
  deleteScheduler__controller,
  edit_Scheduler_profile,
  getClient_controller,
  getProfile__controller,
  edit_profile,
  edit_Timetable,
  edit_client_profile,
  deleteClient_controller,
  get_Student_timeTable,
  get_Teacher_timeTable,
  get_Teacher_by_scheduler,
  get_TeacherHeldClasses_by_scheduler
} = require("../controllers/userController");
const {getQuitStudent__controller, getHoldStudent__controller}=require("../controllers/quitAndHoldController")
const { adminAuthentication } = require("../middlewares/authentication");
const { requireLogin } = require("../middlewares/requireLogin");

const router = require("express").Router();
router.get(
  "/quit-student",
  requireLogin,
  adminAuthentication,
  getQuitStudent__controller
);
router.get(
  "/get-hold-student",
  requireLogin,
  adminAuthentication,
  getHoldStudent__controller
);
router.get(
  "/student",
  requireLogin,
  getStudent__controller
);
router.get(
  "/student/TimeTable/:id",
  requireLogin,
  get_Student_timeTable
);
router.get(
  "/teacher/TimeTable/:id",
  requireLogin,
  get_Teacher_timeTable
);
router.get(
  "/get-user/:id",
   requireLogin,
  getStudentName__controller
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

router.post(
  "/delete-teacher",
  requireLogin,
  adminAuthentication,
  deleteTeacher__controller
);

router.post(
  "/delete-scheduler",
  requireLogin,
  adminAuthentication,
  deleteScheduler__controller
);
router.get(
  "/get-student/:id",
  // requireLogin,
  getProfile__controller
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


router.put(
  "/edit-timetable",
  requireLogin,
  adminAuthentication,
  edit_Timetable
);

router.get(
  "/get-teacher/:id",
  requireLogin,
  get_Teacher_by_scheduler
);

router.get(
  "/get-teacher-held-classes/:id",
  requireLogin,
  get_TeacherHeldClasses_by_scheduler
);
module.exports = router;
