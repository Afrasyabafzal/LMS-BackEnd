const mongoose=require('mongoose')


const quitSchema= mongoose.Schema({
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
    reason:{
        type: String,
    },
    fee :{
        type: Number,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    FeeDate:{
        type: Number,
    },
    currency:{
        type: String,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    
},{timestamps: true})

const QuitModel=mongoose.model("Quit", quitSchema)

module.exports=QuitModel