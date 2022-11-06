const mongoose=require('mongoose')


const userSchema= mongoose.Schema({
    RollNumber:{
        type: String,
        unique: true
    },
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
    enrollmentDate:{
        type: Date,
    },
    zoomID:{
        type: String,

    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    scheduler:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Scheduler'
    },
    fee:{
        type: Number,
    },
    familyName:{
        type:String
    },
    numberOfClasses:{
        type: Number,
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
    },
    role:{
        type: String,
        default: "Admin"
    }
},{timestamps: true})

const UserModel=mongoose.model("User", userSchema)

module.exports=UserModel