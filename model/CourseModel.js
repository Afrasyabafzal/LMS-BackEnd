const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    noOfClasses: {
      type: Number,
    },
    courseDescription: {
      type: String,
      required: true,
    },

    courseThumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model("Course", courseSchema);

module.exports = CourseModel;
