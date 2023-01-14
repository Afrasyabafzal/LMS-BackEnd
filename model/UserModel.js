const mongoose=require('mongoose')


const userSchema= mongoose.Schema({
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
        ref: 'User'
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
    },
    FeeDate:{
        type: Number,
    },
    RollNumber:{
        type: String,
    },
    currency:{
        type:String
    },
    salary:{
        type: Number,
    },

},{timestamps: true})

const UserModel=mongoose.model("User", userSchema)

module.exports=UserModel