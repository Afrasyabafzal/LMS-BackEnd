const UserModel = require("../model/UserModel");
const SchedulerModel= require("../model/SchedulerModel");
const ClientModel = require("../model/Client");
const TimeTableModel = require("../model/TimeTable");
const StudentModel = require("../model/Student");
const bcrypt = require("bcryptjs");
const controllerError = require("../utils/controllerError");
const jwt = require("jsonwebtoken");
const cloudinary=require('../middlewares/cloudinary')
//const { SECRET_KEY } = require("../config/keys");
const key = process.env.SECRET_KEY
module.exports.register__controller = async (req, res, next) => {
  try {
    const { userName, email, password, confirmPassword, role, enrollmentDate,familyName, numberOfClasses, teacher } = req.body;
    console.log(role);
    const userInfo = await UserModel.findOne({ email });

    if (userInfo) {
      return res.status(401).json({
        errors: { user: "User already exists" },
      });
    }
    const hash = await bcrypt.hash(password, 10);
    if(role == "Teacher") {
      console.log(role);
      const user = new UserModel({
        userName,
        email,
        password: hash,
        role
      });

      user
      .save()
      .then((userData) => {
        res.status(201).json({
          userData,
        });
      })
      .catch((err) => {
        controllerError(err, res, "Error occurred");
      });
    }

    if(role == "Student") {
      const user = new UserModel({
        userName,
        email,
        password: hash,
        enrollmentDate,
        familyName,
        numberOfClasses,
        teacher,
        role
      });

      user
      .save()
      .then((userData) => {
        res.status(201).json({
          userData,
        });
      })
      .catch((err) => {
        controllerError(err, res, "Error occurred");
      });
    }

    
  } catch (error) {
    controllerError(error, res, "Error occurred");
  }
};

module.exports.register_client_controller = async (req, res, next) => {
  try {
    console.log(req.body)
    const { userName, email, NumberOfStudent, ContactNumber, Country, Fee,FeeDate, NumberofClasses} = req.body;
    
    const userInfo = await ClientModel.findOne({ email });

    if (userInfo) {
      return res.status(401).json({
        errors: { user: "Client already exists" },
      });
    }
    
      const user = new ClientModel({
        userName,
        email,
        NumberOfStudent,
        ContactNumber,
        Country,
        Fee,
        FeeDate,
        NumberofClasses
      });

      user
      .save()
      .then((userData) => {
        res.status(201).json({
          userData,
        });
      })
      .catch((err) => {
        controllerError(err, res, "Error occurred");
      });
    
    
  } catch (error) {
    controllerError(error, res, "Error occurred");
  }
};

module.exports.register_scheduler_controller = async (req, res, next) => {
  try {
    const { Name, email, password} = req.body;
    const userInfo = await SchedulerModel.findOne({ email });
    if (userInfo) {
      return res.status(401).json({
        errors: { user: "User already exists" },
      });
    }
    const hash = await bcrypt.hash(password, 10);
      const scheduler = new SchedulerModel({
        Name,
        email,
        password: hash
      });

      scheduler
      .save()
      .then((userData) => {
        res.status(201).json({
          userData,
        });
      })
      .catch((err) => {
        controllerError(err, res, "Error occurred");
      });
    
  } catch (error) {
    controllerError(error, res, "Error occurred");
  }
};
module.exports.register_student_controller = async (req, res, next) => {
  try {
    const { hobby, age, grade,user} = req.body;
   const pic=await cloudinary.uploader.upload(req.file.path);
      const student = new StudentModel({
        hobby,
        age,
        picture: pic.secure_url,
        grade,
        user
      });

      student
      .save()
      .then((userData) => {
        res.status(201).json({
          userData,
        });
      })
      .catch((err) => {
        controllerError(err, res, "Error occurred");
      });
    
  } catch (error) {
    controllerError(error, res, "Error occurred");
  }
};

//==========================================================================================================
                                       //TimeTable Controller
module.exports.TimeTable_controller = async (req, res, next) => {
  try {
    const { StartTime, EndTime, Day, teacher, student} = req.body;

      const timetable = new TimeTableModel({
        StartTime,
        EndTime,
        Day,
        teacher,
        student
      });

      timetable
      .save()
      .then((userData) => {
        res.status(201).json({
          userData,
        });
      })
      .catch((err) => {
        controllerError(err, res, "Error occurred");
      });
    
  } catch (error) {
    controllerError(error, res, "Error occurred");
  }
};



//==========================================================================================================
//TODO: Login Controller

module.exports.login__controller = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userInfo = await (await UserModel.findOne({ email }));

    if (!userInfo) {
      return res.status(401).json({
        errors: { userExist: "User not exist Please register and then login again" },
      });
    }

    // console.log(userInfo)
    bcrypt
      .compare(password, userInfo.password)
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            errors: { password: "password not matched" },
          });
        }

        userInfo.password=undefined
        
        const token = jwt.sign({ _id: userInfo._id,name: userInfo.userName,email: userInfo.email,role: userInfo.role }, key);
        return res.status(200).json({
          userInfo,
          token,
        });
      })
      .catch((err) => {
        controllerError(err, res, "Error occurred");
      });
  } catch (error) {
    controllerError(error, res, "Error occurred");
  }
};
