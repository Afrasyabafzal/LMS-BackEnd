const router = require("express").Router();
const {
    add_attendence,
    generateReport,
    downloadPDF,
    scheduler_confirmation,
    get_confirmed_class_by_teacher,
    get_confirmed_class_by_student
} = require("../controllers/attendenceController")
const { requireLogin } = require("../middlewares/requireLogin");

router.post("/addAttendence",requireLogin,add_attendence)
router.post("/generate",generateReport)
router.get("/download",downloadPDF)
router.post("/scheduler_confirmation",requireLogin,scheduler_confirmation)
router.get("/get_confirmed_class_by_teacher/:id",requireLogin,get_confirmed_class_by_teacher)
router.get("/get_confirmed_class_by_student/:id",requireLogin,get_confirmed_class_by_student)



module.exports = router;