const mongoose=require('mongoose')


const holdSchema= mongoose.Schema({
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
    returnDate:{
        type: Date,
    }
},{timestamps: true})

const HoldModel=mongoose.model("Hold", holdSchema)

module.exports=HoldModel