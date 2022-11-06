const ClassAttendenceModel = require("../model/ClassAttendence")
const TimeTableModel = require("../model/TimeTable")
const UserModel=require('../model/UserModel')
const controllerError = require("../utils/controllerError");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");

module.exports.add_attendence = async (req,res,next)=>{
    console.log(req.body)
    try{
        const { dateofAttendence, AttedendedClass, courseCovered, Dua, Held } = req.body; 
        console.log(dateofAttendence, AttedendedClass, courseCovered, Dua, Held)
        const classAttendence = new ClassAttendenceModel({
            dateofAttendence,
            AttedendedClass,
            courseCovered,
            Dua,
            Held
        })

        classAttendence.save().then((data)=>{
            res.status(200).json({
                data,
                message:"Class Added in Record"
            })
        }).catch((err)=>{
            controllerError(err,res,"Error occurred")
        })

    }
    catch (e){
        controllerError(e, res, "Error occurred");
    }
    
}

module.exports.generateReport = async (req,res)=> {
    try{
        const HeldClasses = await ClassAttendenceModel.find()
        console.log(HeldClasses)
        const tmp = []
        for(let i = 0; i < HeldClasses.length; i++){
            const d = new Date(HeldClasses[i].dateofAttendence)
            const timeTable = await TimeTableModel.findOne({_id:HeldClasses[i].AttedendedClass})
            console.log(timeTable)
            const teacher = await UserModel.findOne({_id:timeTable.teacher})
            const student = await UserModel.findOne({_id:timeTable.student})
            console.log(teacher)
            console.log(student)
            tmp.push({
                Teacher: teacher.userName,
                Student: student.userName,
                Dua: HeldClasses[i].Dua,
                courseCovered: HeldClasses[i].courseCovered,
                dateOfClass: d.toISOString().slice(0,10),
                Status: HeldClasses[i].Held ? "Held" : "Not Held"
            })
        }
        ejs.renderFile(path.join(__dirname, '../templates/', "classReport.ejs"), {tmp: tmp}, (err, data) => {
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
                pdf.create(data, options).toFile("report/Report.pdf", function (err, data) {
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

module.exports.downloadPDF = async (req,res)=> {
    const file = `${__dirname}/../report/Report.pdf`;
    res.download(file);
}