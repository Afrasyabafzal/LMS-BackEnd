const CourseModel = require("../model/CourseModel");
const UserModel = require("../model/UserModel");
const HoldModel = require("../model/Hold");
const cloudinary=require('../middlewares/cloudinary')

module.exports.postCourse__controller = async (req, res, next) => {
  try {
    const { courseName,noOfClasses,courseDescription, perClassRate } = req.body;

    if (!courseDescription || !courseName || !req.file || !noOfClasses || !perClassRate) {
      return res.status(400).json({
        error: "Please Provide All Information",
      });
    }

    const pic=await cloudinary.uploader.upload(req.file.path)
    //console.log(pic.secure_url)

    //const url = req.protocol + "://" + req.get("host");

    const course = new CourseModel({
      courseName,
      noOfClasses,
      courseDescription,
      perClassRate,
      courseThumbnail: pic.secure_url,
  
    });
    course
      .save()
      .then((result) => {
        //console.log(result)
        return res.status(200).json({
          result,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          error: "Something went wrong",
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

module.exports.getCourses__controller = async (req, res, next) => {
  try {
    const courses = await CourseModel.find()
    return res.status(200).json({
      courses,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

module.exports.getOneCourse__controller = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    console.log(courseId);
    const course = await CourseModel.findOne({ _id: courseId });
    return res.status(200).json({
      course,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

module.exports.deleteCourse__Controller = async (req, res, next) => {
  console.log("api calling")
  try {
    const { courseId,newCourseId } = req.body;
    const user= await UserModel.updateMany({course:courseId},{$set:{course:newCourseId}});
    console.log(user)
    const user1= await HoldModel.updateMany({course:courseId},{$set:{course:newCourseId}});
    console.log(user1)
    console.log(courseId)
    const course = await CourseModel.findOneAndDelete({ _id: courseId });
    return res.status(200).json({
      course,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
module.exports.editCourse__Controller = async (req, res, next) => {
  try {
    const { Id, courseName, noOfClasses, courseDescription, perClassRate } = req.body;
    console.log(req.body)
    if (!courseDescription || !courseName || !noOfClasses || !perClassRate) {
      console.log("error")
      return res.status(400).json({
        error: "Please Provide All Information",
      });
    }
    if(req.file){  
      const pic = await cloudinary.uploader.upload(req.file.path);
      const course = await CourseModel.findOneAndUpdate(
        { _id: Id },
        { courseName, noOfClasses, courseDescription, courseThumbnail: pic.secure_url, perClassRate }
      );
      return res.status(200).json({
        course,
      });


    } else {
      const course = await CourseModel.findOneAndUpdate(
        { _id: Id },
        { courseName, noOfClasses, courseDescription, perClassRate }
      );
      return res.status(200).json({
        course,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
