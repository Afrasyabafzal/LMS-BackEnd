const UserModel = require("../model/UserModel");
const SchedulerModel= require("../model/SchedulerModel");
const ClientModel = require("../model/Client");
const TimeTableModel = require("../model/TimeTable");
const StudentModel = require("../model/Student");
const bcrypt = require("bcryptjs");
const controllerError = require("../utils/controllerError");
const jwt = require("jsonwebtoken");
const cloudinary=require('../middlewares/cloudinary')
const key = process.env.SECRET_KEY

const Cryptr = require("cryptr");
const cryptr = new Cryptr(key);
//const { SECRET_KEY } = require("../config/keys");
module.exports.register_admin_controller = async (req, res, next) => {
  try {
    const { userName, email, password,role} = req.body;
    const hash = cryptr.encrypt(password);
    console.log(hash)
      const Admin = new UserModel({
        userName,
        email,
        password: hash,
        role
      });

      Admin
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
module.exports.register__controller = async (req, res, next) => {
  try {
    const { userName, email, password, confirmPassword, role, enrollmentDate,zoomID,familyName, numberOfClasses, teacher } = req.body;
    console.log(role);
    const userInfo = await UserModel.findOne({ email });

    if (userInfo) {
      return res.status(401).json({
        errors: { user: "User already exists" },
      });
    }
    const hash = cryptr.encrypt(password);
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
        zoomID,
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
    console.log(password)
    const hash = cryptr.encrypt(password);
    console.log(hash)
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
    //console.log(req.body)
    const { hobby, age, grade,user,dob} = req.body;
    const check = await StudentModel.findOne({ user:user });
    if(check){
      //update
      if(req.file){
        
        const pic = await cloudinary.uploader.upload(req.file.path);
        const res =await StudentModel.findByIdAndUpdate(check._id,{hobby:hobby,age:age,picture:pic.secure_url,grade:grade,dob:dob})
        console.log(res)
      } else {
        const res =await StudentModel.findByIdAndUpdate(check._id,{hobby:hobby,age:age,grade:grade,dob:dob})
     // const res = StudentModel.findOneAndUpdate({user:user},{hobby:hobby,age:age,grade:grade,dob:dob})
      console.log(res)
      }
    }
  else{ 
   const pic=await cloudinary.uploader.upload(req.file.path)
      const student = new StudentModel({
        hobby,
        age,
        picture: pic.secure_url,
        grade,
        user,
        dob
      });

      student
      .save()
      .then((result) => {
       return  res.status(201).json({
          result,
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
    const check= cryptr.decrypt(userInfo.password);
    if(check==password){
      const token = jwt.sign({ _id: userInfo._id,name: userInfo.userName,email: userInfo.email,role: userInfo.role }, key);
      res.status(200).json({
        token,
        userInfo,
      });

    }else{
      return res.status(401).json({
        errors: { userExist: "Password is incorrect" },
      });
    }

  } catch (error) {
    controllerError(error, res, "Error occurred");
  }
};
