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
    role:{
        type: String,
        default: "Admin"
    }
},{timestamps: true})

const UserModel=mongoose.model("User", userSchema)

module.exports=UserModel