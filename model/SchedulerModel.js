const mongoose=require('mongoose')


const schedulerSchema= mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   
},{timestamps: true})

const SchedulerModel=mongoose.model("Scheduler", schedulerSchema)

module.exports=SchedulerModel