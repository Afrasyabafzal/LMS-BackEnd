const router = require("express").Router();
const {
    add_attendence
} = require("../controllers/attendenceController")
const { requireLogin } = require("../middlewares/requireLogin");

router.post("/addAttendence",requireLogin,add_attendence)


module.exports = router;