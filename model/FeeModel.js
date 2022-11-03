const mongoose = require("mongoose");

const FeeSchema = mongoose.Schema(
  {
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
    year: {
        type: String,
        required: true,
    },
    month: {
        type: String,
    },
    submited: {
    type: Boolean,
    default: false,
    },
    date:{
        type: Date,
    }
  {
    timestamps: true,
  }
}
);

const FeeModel = mongoose.model("Fee", FeeSchema);

module.exports = FeeModel;