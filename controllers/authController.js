const UserModel = require("../model/UserModel");
const SchedulerModel= require("../model/SchedulerModel");
const ClientModel = require("../model/Client");
const TimeTableModel = require("../model/TimeTable");
const StudentModel = require("../model/Student");
const QuitModel = require("../model/Quit");
const HoldModel = require("../model/Hold");
const bcrypt = require("bcryptjs");
const controllerError = require("../utils/controllerError");
const jwt = require("jsonwebtoken");
const cloudinary=require('../middlewares/cloudinary')
const key = process.env.SECRET_KEY
const Cryptr = require("cryptr");
const cryptr = new Cryptr(key);
//const { SECRET_KEY } = require("../config/keys");
module.exports.hold_student=async(req,res,next)=>{
  try{
    const { _id,userName, email, password,RollNumber, confirmPassword, role, enrollmentDate,zoomID,familyName, numberOfClasses, teacher,reason,returnDate } = req.body;
    console.log(RollNumber);
    const hash = cryptr.encrypt(password);
    const user1 =  await UserModel.findOneAndDelete({ _id: _id });
    const user = await new HoldModel({
      _id,
      userName,
      email,
      RollNumber,
      password: hash,
      enrollmentDate,
      zoomID,
      familyName,
      numberOfClasses,
      teacher,
      role,
      reason,
      returnDate
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
    return res.status(400).json({
      error: "Something went wrong",
    });
  }

};

module.exports.quit_student=async(req,res,next)=>{
  try{
    const { _id,userName, email, password, confirmPassword, role, enrollmentDate,zoomID,familyName, numberOfClasses, teacher,reason } = req.body;
    console.log(userName);
    const hash = cryptr.encrypt(password);
    const user1 =  await UserModel.findOneAndDelete({ _id: _id });
    const user = await new QuitModel({
      _id,
      userName,
      email,
      password: hash,
      enrollmentDate,
      zoomID,
      familyName,
      numberOfClasses,
      teacher,
      role,
      reason
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
    return res.status(400).json({
      error: "Something went wrong",
    });
  }

};
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
    const { userName, email, password, confirmPassword, role,scheduler, enrollmentDate,zoomID,course,fee,familyName, numberOfClasses, teacher ,StartTime, EndTime, Day,currency} = req.body;
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
        scheduler,
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
      
      const date = new Date();
      const allUser = await UserModel.find({role:"Student"});
      const allHoldUser = await HoldModel.find()
      RollNumber = "PRO-"+(allUser.length+allHoldUser.length+1)+"-"+date.getFullYear()
      const user = new UserModel({
        RollNumber,
        userName,
        email,
        password: hash,
        enrollmentDate,
        zoomID,
        course,
        fee,
        familyName,
        numberOfClasses,
        teacher,
        currency,
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
//funtion to add timetable
module.exports.AddTimetable= async (req,res) => {
  try {
    const { TeacherStartTime,StudentStartTime, StudentEndTime, TeacherEndTime, Day, student} = req.body;
    const teacher = await UserModel.findOne({_id:student});
    console.log(teacher.teacher);


      const timetable = new TimeTableModel({
        TeacherStartTime,
        StudentStartTime,
        StudentEndTime,
        TeacherEndTime,
        Day,
        teacher:teacher.teacher,
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
}
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
    const { userName, email, password} = req.body;
    const userInfo = await UserModel.findOne({ email });
    if (userInfo) {
      return res.status(401).json({
        errors: { user: "User already exists" },
      });
    }
    console.log(password)
    const hash = cryptr.encrypt(password);
    console.log(hash)
      const scheduler = new UserModel({
        userName,
        email,
        password: hash,
        role: "Scheduler"
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
    console.log(req.body)
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
module.exports.TimeTable_controller = async (req,user, res, next) => {
  try {
    const { StartTime, EndTime, Day, teacher} = req.body;


      const timetable = new TimeTableModel({
        StartTime,
        EndTime,
        Day,
        teacher,
        student:user._id
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
    console.log(req.body)
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
