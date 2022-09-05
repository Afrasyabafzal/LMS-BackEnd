const mongoose=require('mongoose')


const schedulerSchema= mongoose.Schema({
    Name: {
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