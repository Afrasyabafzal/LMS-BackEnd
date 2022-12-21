const mongoose = require("mongoose");

const FeeSchema = mongoose.Schema(
  {
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    link: {
        type: String,
    },
    submissionDate:{
        type: Date,
    },
    paid:{
        type: Boolean,
        default: false
    },
},{timestamps: true}
);

const FeeModel = mongoose.model("Fee", FeeSchema);

module.exports = FeeModel;