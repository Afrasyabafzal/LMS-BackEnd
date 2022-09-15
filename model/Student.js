const mongoose=require('mongoose')


const studentSchema= mongoose.Schema({
    hobby: {
        type: String
    },
    age: {
        type: Number
    },
    picture: {
        type: String
    },
    grade:{
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
   
},{timestamps: true})

const StudentModel=mongoose.model("Student", studentSchema)

module.exports=StudentModel