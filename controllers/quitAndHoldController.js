const UserModel=require('../model/UserModel')
const SchedulerModel=require('../model/SchedulerModel')
const ClientModel = require("../model/Client")
const TimeTableModel = require("../model/TimeTable")
const StudentModel = require("../model/Student");
const QuitModel = require("../model/Quit");
const HoldModel = require("../model/Hold");
const controllerError = require("../utils/controllerError");

const key = process.env.SECRET_KEY

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

