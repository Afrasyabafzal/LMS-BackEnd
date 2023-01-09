const router = require("express").Router();
const {
    getFee,
    storeFee,
    downloadPDF,
    generateReport
} = require("../controllers/FeeController")
const { requireLogin } = require("../middlewares/requireLogin");
const { fee_validator } = require("../middlewares/feeValidator");

router.get("/getFee",requireLogin,getFee)
router.post("/storeFee",fee_validator,storeFee)
router.get("/download",downloadPDF)
router.post("/generate",generateReport)

module.exports = router;
