const router = require("express").Router();
const {
    add_attendence,
    generateReport,
    downloadPDF
} = require("../controllers/attendenceController")
const { requireLogin } = require("../middlewares/requireLogin");

router.post("/addAttendence",requireLogin,add_attendence)
router.post("/generate",generateReport)
router.get("/download",downloadPDF)


module.exports = router;