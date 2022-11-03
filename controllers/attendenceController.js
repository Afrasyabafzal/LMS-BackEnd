const ClassAttendenceModel = require("../model/ClassAttendence")
const controllerError = require("../utils/controllerError");

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