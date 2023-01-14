const router = require("express").Router();
const {
    getFee,
    storeFee,
    downloadPDF,
    generateReport,
    getFeeByStudent
} = require("../controllers/FeeController")
const { requireLogin } = require("../middlewares/requireLogin");
const { fee_validator } = require("../middlewares/feeValidator");

router.get("/getFee",requireLogin,getFee)
router.post("/storeFee",fee_validator,storeFee)
router.get("/getFeeByStudent/:id",getFeeByStudent)
router.get("/download",downloadPDF)
router.post("/generate",generateReport)

module.exports = router;
