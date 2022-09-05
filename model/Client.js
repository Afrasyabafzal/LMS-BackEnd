const mongoose = require('mongoose')


const client= mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    NumberOfStudent:{
        type: Number,
        required: true
    },
    ContactNumber:{
        type: String,
        required: true    
    },
    Country:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    Fee:{
        type: Number,
        required: true
    },
    NumberofClasses:{
        type: Number,
        required: true
    }

},{timestamps: true})

const ClientModel = mongoose.model("Client", client)

module.exports = ClientModel