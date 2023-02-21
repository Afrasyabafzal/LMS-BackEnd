const UserModel=require('../model/UserModel')
const SchedulerModel=require('../model/SchedulerModel')
const ClientModel = require("../model/Client")
const TimeTableModel = require("../model/TimeTable")
const StudentModel = require("../model/Student");
const QuitModel = require("../model/Quit");
const HoldModel = require("../model/Hold");
const controllerError = require("../utils/controllerError");

const key = "5u8x/A?D(G+KbPeSgVkYp3s6v9y$B&E)"

const Cryptr = require("cryptr");
const cryptr = new Cryptr(key);

module.exports.getQuitStudent__controller=async (req,res,next)=>{
    try {
        const studentInfo=await QuitModel.find({})
        for (let i = 0; i < studentInfo.length; i++) {
          studentInfo[i].password = cryptr.decrypt(studentInfo[i].password);
        }
        return res.status(200).json({
            studentInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}
module.exports.getHoldStudent__controller=async (req,res,next)=>{
    try {
        const studentInfo=await HoldModel.find({})
        for (let i = 0; i < studentInfo.length; i++) {
          studentInfo[i].password = cryptr.decrypt(studentInfo[i].password);
        }
        return res.status(200).json({
            studentInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}

module.exports.revert_Student__controller = async (req, res, next) => {
    try {
      const {_id, userName, email, password,RollNumber, confirmPassword, role, enrollmentDate,zoomID,familyName, numberOfClasses, teacher, FeeDate,fee,course,currency } = req.body;
      const user1 =  await HoldModel.findOneAndDelete({ _id: _id });
      const hash = cryptr.encrypt(password);
        const user = new UserModel({
          userName,
          RollNumber,
          email,
          password: hash,
          enrollmentDate,
          zoomID,
          familyName,
          numberOfClasses,
          teacher,
          role,
          FeeDate,
          fee,
          course,
          currency
          
        });
  
        user
        .save()
        .then((userData) => {
          res.status(201).json({
            userData,
          });
        })
        .catch((err) => {
          controllerError(err, res, "Error occurred");
        });
  
      
    } catch (error) {
      controllerError(error, res, "Error occurred");
    }
  };
  