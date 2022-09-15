const mongoose=require('mongoose')
const ClientModel=require('../model/Client')

const FeeSchema= mongoose.Schema({
    paid: {
        january: false,
        february: false,
        march: false,
        april: false,
        may: false,
        june: false,
        july: false,
        august: false,
        september: false,
        october: false,
        november: false,
        december: false
    },
    client: {
        type:mongoose.Schema.Types.ObjectId,
        ref:ClientModel,
        required: true
    },
   
},{timestamps: true})

const FeeModel=mongoose.model("Fee", FeeSchema)

module.exports=FeeModel