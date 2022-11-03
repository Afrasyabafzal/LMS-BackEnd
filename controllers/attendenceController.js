const ClassAttendenceModel = require("../model/ClassAttendence")
const controllerError = require("../utils/controllerError");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
let students = [
    {name: "Joy",
     email: "joy@example.com",
     city: "New York",
     country: "USA"},
    {name: "John",
     email: "John@example.com",
     city: "San Francisco",
     country: "USA"},
    {name: "Clark",
     email: "Clark@example.com",
     city: "Seattle",
     country: "USA"},
    {name: "Watson",
     email: "Watson@example.com",
     city: "Boston",
     country: "USA"},
    {name: "Tony",
     email: "Tony@example.com",
     city: "Los Angels",
     country: "USA"
 }];

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
    ejs.renderFile(path.join(__dirname, '../templates/', "classReport.ejs"), {students: students}, (err, data) => {
        if (err) {
              res.send(err);
        } else {
            let options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                    "height": "20mm"
                },
                "footer": {
                    "height": "20mm",
                },
            };
            pdf.create(data, options).toFile("report.pdf", function (err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send("File created successfully");
                }
            });
        }
    });
}