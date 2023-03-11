const ClassAttendenceModel = require("../model/ClassAttendence")
const TimeTableModel = require("../model/TimeTable")
const UserModel=require('../model/UserModel')
const CourseModel = require("../model/CourseModel")
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
            if(HeldClasses[i].SchedularConfirmation){
            const d = new Date(HeldClasses[i].dateofAttendence)
            const timeTable = await TimeTableModel.findOne({_id:HeldClasses[i].AttedendedClass})
            console.log(timeTable)
            const teacher = await UserModel.findOne({_id:timeTable.teacher})
            const student = await UserModel.findOne({_id:timeTable.student})
            console.log(teacher)
            console.log(student)
            if(teacher && student)
            tmp.push({
                Teacher: teacher.userName,
                Student: student.userName,
                Dua: HeldClasses[i].Dua,
                courseCovered: HeldClasses[i].courseCovered,
                dateOfClass: d.toISOString().slice(0,10),
                Status: HeldClasses[i].Held ? "Held" : "Not Held"
            })
            }
        }
        console.log(tmp)
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

module.exports.scheduler_confirmation = async (req,res,next)=>{
    try{
        const {id, zoomID} = req.body;
        const classAttendence = await ClassAttendenceModel.findOne({_id:id})
        const timeTable = await TimeTableModel.findOne({_id:classAttendence.AttedendedClass})
        const teacher = await UserModel.findOne({_id:timeTable.teacher})
        const student = await UserModel.findOne({_id:timeTable.student})
        const course = await CourseModel.findOne({_id:student.course})
        console.log(teacher)
        console.log(student)
        console.log(course)
        teacher.salary += course.perClassRate
        await teacher.save()
        classAttendence.zoomID = zoomID;
        classAttendence.SchedularConfirmation = true;
        classAttendence.save().then((data)=>{
            res.status(200).json({
                data,
                message:"Class confirmed in Record"
            })
        }
        ).catch((err)=>{
            controllerError(err,res,"Error occurred")
        })
    }
    catch (e){
        controllerError(e, res, "Error occurred");
    }
}

module.exports.get_confirmed_class_by_teacher = async (req,res,next)=>{
    try{
            const id = req.params.id;
            const timeTable = await TimeTableModel.find({teacher:id})
            const tmp = []
            for(let i = 0; i < timeTable.length; i++){
                const classAttendence = await ClassAttendenceModel.find({AttedendedClass:timeTable[i]._id})
                const user = await UserModel.findOne({_id:timeTable[i].student})
                for(let j = 0; j < classAttendence.length; j++){
                    if(classAttendence && classAttendence[i].SchedularConfirmation){
                        const d = new Date(classAttendence[j].dateofAttendence)

                        console.log(d.toISOString().slice(0,10) == new Date().toISOString().slice(0,10))    
                        if(d.toISOString().slice(0,10) == new Date().toISOString().slice(0,10)){
                            console.log(d.toISOString().slice(0,10) == new Date().toISOString().slice(0,10))
                        tmp.push({
                            slot: timeTable[i].TeacherStartTime + "-" + timeTable[i].TeacherEndTime,
                            dateOfClass: d.toISOString().slice(0,10),
                            student: user.userName,
                            status: classAttendence[i].Held ? "Held" : "Not Held"
                        })
                    }
                }
                      
            }
          }
          console.log(tmp)
            res.status(200).json({
                data:tmp,
                message:"Class confirmed in Record"
            })

    }
    catch (e){
        controllerError(e, res, "Error occurred");
    }
}

module.exports.get_confirmed_class_by_student = async (req,res,next)=>{
    
    try{
        const id = req.params.id;
        console.log("Attende",id)
        const timeTable = await TimeTableModel.find({student:id})
        const tmp = []
        for(let i = 0; i < timeTable.length; i++){
            const classAttendence = await ClassAttendenceModel.find({AttedendedClass:timeTable[i]._id})
            const user = await UserModel.findOne({_id:timeTable[i].teacher})
            for(let j = 0; j < classAttendence.length; j++){
                if(classAttendence && classAttendence[i].SchedularConfirmation){
                    const d = new Date(classAttendence[j].dateofAttendence)
                    if(d.toISOString().slice(0,10) == new Date().toISOString().slice(0,10)){
                    tmp.push({
                        slot: timeTable[i].StudentStartTime + "-" + timeTable[i].StudentEndTime,
                        dateOfClass: d.toISOString().slice(0,10),
                        teacher: user.userName,
                        status: classAttendence[i].Held ? "Held" : "Not Held"
                    })
                }
            }
        }
    }
        res.status(200).json({
            data:tmp,
            message:"Class confirmed in Record"
        })
    }
    catch(error){
        controllerError(e, res, "Error occurred");
    }
}