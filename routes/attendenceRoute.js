const router = require("express").Router();
const {
    add_attendence,
    generateReport
} = require("../controllers/attendenceController")
const { requireLogin } = require("../middlewares/requireLogin");

router.post("/addAttendence",requireLogin,add_attendence)
router.post("/generate",generateReport)


module.exports = router;