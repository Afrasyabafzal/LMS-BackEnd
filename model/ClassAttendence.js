const mongoose = require('mongoose')


const Attendence = mongoose.Schema({
    dateofAttendence: {
        type: Date,
        required: true
    },
    AttedendedClass:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'TimeTable'
    },
    courseCovered:{
        type:String,
        required: true
    },
    Dua:{
        type:String,
        required: true
    },
    Held:{
        type: Boolean,
        required: true,
    },
    zoomID:{
        type: String,
    },
    SchedularConfirmation:{
        type: Boolean,
    },

},{timestamps: true})

const ClassAttendenceModel = mongoose.model("ClassAttendence", Attendence)

module.exports = ClassAttendenceModel