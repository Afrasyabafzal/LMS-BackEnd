const FeeModel = require("../model/FeeModel");
const UserModel = require("../model/UserModel");
const controllerError = require("../utils/controllerError");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
module.exports.getFee = async (req, res, next) => {
    try {
        const fee = await FeeModel.find();
        res.status(200).json({
        fee,
        });
    } catch (error) {
        controllerError(error, res, "Error occurred");
    }
};
//store fee
module.exports.storeFee = async (req, res, next) => {
    try {
        const {student,link,submissionDate,paid} = req.body;
        const fee = new FeeModel({
            student,
            link,
            submissionDate,
            paid
        });
        fee
        .save()
        .then((result) => {
            res.status(201).json({
            result,
            });
        })
        .catch((err) => {
            controllerError(err, res, "Error occurred");
        });
    } catch (error) {
        controllerError(error, res, "Error occurred");
    }
}
module.exports.downloadPDF = async (req,res)=> {
    const file = `${__dirname}/../report/FeeReport.pdf`;
    res.download(file);
}
module.exports.generateReport = async (req,res)=> {
    console.log("hello")

    try{
        const HeldClasses = await FeeModel.find()
        console.log(HeldClasses)
        const tmp = []
        for(let i = 0; i < HeldClasses.length; i++){
            const d = new Date(HeldClasses[i].submissionDate)
            const student = await UserModel.findOne({_id:HeldClasses[i].student})

            // console.log(teacher)
            console.log(student)
            tmp.push({
                Student: student.userName,
                RollNumber: student.RollNumber,
                Link: HeldClasses[i].link,
                submissionDate: HeldClasses[i].submissionDate,
                Status: HeldClasses[i].paid ? "paid" : "Not paid"
            })
        }
        ejs.renderFile(path.join(__dirname, '../templates/', "feeReport.ejs"), {tmp: tmp}, (err, data) => {
            if (err) {
                  res.send(err);
            } else {
                let options = {
                    "height": "11.25in",
                    "width": "8.5in",
                    "header": {
                        "height": "40mm"
                    },
                    "footer": {
                        "height": "20mm",
                    },
                };
                pdf.create(data, options).toFile("report/FeeReport.pdf", function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send("File created successfully");
                    }
                });
            }
        });

    }
    catch(err){

    }
    
}