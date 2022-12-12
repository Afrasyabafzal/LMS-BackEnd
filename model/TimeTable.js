const mongoose=require('mongoose')
const UserModel=require('../model/UserModel')


const timeTableSchema= mongoose.Schema({
    TeacherStartTime: {
        type: String,
        required: true
    },
    TeacherEndTime: {
        type: String,
        required: true
    },
    StudentStartTime: {
        type: String,
        required: true
    },
    StudentEndTime: {
        type: String,
        required: true
    },
    Day: {
        type: String,
        required: true
    },
    teacher: {
        type:mongoose.Schema.Types.ObjectId,
        ref:UserModel,
        required: true
    },
    student: {
        type:mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true
    },
   
},{timestamps: true})

const TimeTableModel=mongoose.model("TimeTable", timeTableSchema)

module.exports=TimeTableModel