const UserModel=require('../model/UserModel')
const SchedulerModel=require('../model/SchedulerModel')
const ClientModel = require("../model/Client")
const TimeTableModel = require("../model/TimeTable")
const StudentModel = require("../model/Student");
const QuitModel = require("../model/Quit");
const controllerError = require("../utils/controllerError");

const key = process.env.SECRET_KEY

const Cryptr = require("cryptr");
const ClassAttendenceModel = require('../model/ClassAttendence');
const cryptr = new Cryptr(key);
module.exports.getStudent__controller=async (req,res,next)=>{
    try {
        const studentInfo=await UserModel.find({role:"Student"})
        for (let i = 0; i < studentInfo.length; i++) {
          studentInfo[i].password = cryptr.decrypt(studentInfo[i].password);
        }
        return res.status(200).json({
            studentInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}
module.exports.getStudentName__controller=async (req,res,next)=>{
  try {
    const  userId  = req.params.id;
      const studentInfo=await UserModel.findOne({_id: userId})
      return res.status(200).json({
          studentInfo
      })
  } catch (err) {
      console.log(err)
      return res.status(400).json({
          error: "Error occurred"
      })
  }
}

module.exports.getTeacher__controller=async (req,res,next)=>{
    try {
        const teacherInfo=await UserModel.find({role:"Teacher"})
        for (let i = 0; i < teacherInfo.length; i++) {
          teacherInfo[i].password = cryptr.decrypt(teacherInfo[i].password);
        }
        return res.status(200).json({
            teacherInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}

module.exports.getScheduler__controller=async (req,res,next)=>{
    try {
        const SchedulerInfo=await UserModel.find({role:"Scheduler"})
         for (let i = 0; i < SchedulerInfo.length; i++) {
          SchedulerInfo[i].password = cryptr.decrypt(SchedulerInfo[i].password);
        }
        return res.status(200).json({
            SchedulerInfo
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: "Error occurred"
        })
    }
}

module.exports.getClient_controller = async (req,res,next) => {
    try {
        const clientInfo = await ClientModel.find()
        return res.status(200).json({
            clientInfo
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({
            error:"Error occurred"
        })
    }
}
//================================================================================================
module.exports.getTimeTable_controller = async (req,res,next) => {
    try {
        const timeTableInfo = await TimeTableModel.find()
        return res.status(200).json({
            timeTableInfo
        })
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({
            error:"Error occurred"
        })
    }
}
//================================================================================================
module.exports.deleteClient_controller = async (req, res, next) => {

    try {
        const  userId  = req.params.id;
        const user = await ClientModel.findOneAndDelete({ _id: userId });
        if(user)
        {
          return res.status(200).json({
              user,
              message: "Client deleted successfully"
            });
        }
      else{
              return res.status(400).json({
                  error: "Client NOT FOUND"
                });
          }
        
      } catch (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      }

}


module.exports.deleteTeacher__controller = async (req, res, next) => {
    try {
      const  userId  = req.params.id;
      const user = await UserModel.findOneAndDelete({ _id: userId });
      if(user.role == "Student")
        var user1 = await TimeTableModel.deleteMany({student:user._id})
      else
        var user1 = await TimeTableModel.deleteMany({teacher:user._id})
      if(user)
      {
        return res.status(200).json({
            user,
            message: "User deleted successfully"
          });
      }
    else{
            return res.status(400).json({
                error: "USER NOT FOUND"
              });
        }
      
    } catch (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
  };

  module.exports.deleteScheduler__controller = async (req, res, next) => {
    try {
      const  userId  = req.params.id;
      const user = await UserModel.findOneAndDelete({ _id: userId });
      if(user)
      {
        return res.status(200).json({
            user,
            message: "User deleted successfully"
          });
      }
    else{
            return res.status(400).json({
                error: "USER NOT FOUND"
              });
        }
      
    } catch (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
  };
  module.exports.deleteTimeTable__controller = async (req, res, next) => {
    try {
      const  TimeTableId  = req.params.id;
      console.log(TimeTableId)
      const user = await TimeTableModel.findOneAndDelete({ _id: TimeTableId });
      if(user)
      {
        return res.status(200).json({
            user,
            message: "TimeTable deleted successfully"
          });
      }
    else{
            return res.status(400).json({
                error: "Timetable NOT FOUND"
              });
        }
      
    } catch (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    }
  };  
  
  module.exports.edit_profile = async (req, res, next) => {

        console.log(req.body);    
        const { _id, userName, email, password,zoomID,course,fee,familyName,numberOfClasses, teacher,role,FeeDate,Currency } = req.body;
        const userInfo = await UserModel.findOne({ email });
        console.log(userInfo);
        if (userInfo && userInfo._id != _id ) {
          return res.status(401).json({
            errors: { user: "User already exists" },
          });
        }
        const hash = cryptr.encrypt(password);
        const User = await UserModel.findByIdAndUpdate(_id, {
            userName: userName,
            email: email,
            password: hash,
            zoomID:zoomID,
            course:course,
            fee:fee,
            FeeDate:FeeDate,
            currency:Currency,
            familyName:familyName,
            numberOfClasses: numberOfClasses,
            teacher:teacher,
            role: role
        })
        .then((user) => {
            return res.status(200).json({
                user,
                message: "User updated successfully"
            });
        }).catch((err) => {
            return res.status(400).json({
                error: "Error occurred"
            });
        }
        );
  }
  
  module.exports.edit_profile_teacher = async (req, res, next) => {

    console.log(req.body);    
    const { _id, userName, email, password,confirmPassword } = req.body;
    const userInfo = await UserModel.findOne({ email });
    if (userInfo) {
      return res.status(401).json({
        errors: { user: "User already exists" },
      });
    }
    const hash = cryptr.encrypt(password);
    const User = await UserModel.findByIdAndUpdate(_id, {
        userName: userName,
        email: email,
        password: hash,
        confirmPassword: confirmPassword
    })
    .then((user) => {
        return res.status(200).json({
            user,
            message: "User updated successfully"
        });
    }).catch((err) => {
        return res.status(400).json({
            error: "Error occurred"
        });
    }
    );
}

module.exports.edit_Scheduler_profile = async (req, res, next) => {

    console.log(req.body);    
    const { _id, Name, email, password} = req.body;
    const userInfo = await UserModel.findOne({ email });
    if (userInfo && userInfo._id!=_id)  {
      return res.status(401).json({
        errors: { user: "User already exists" },
      });
    }
    const hash = cryptr.encrypt(password);
    const User = await UserModel.findByIdAndUpdate(_id, {
        Name: Name,
        email: email,
        password: hash ,
    })
    .then((user) => {
        return res.status(200).json({
            user,
            message: "User updated successfully"
        });
    }).catch((err) => {
        return res.status(400).json({
            error: "Error occurred"
        });
    }
    );
}


module.exports.edit_client_profile = async (req, res, next) => {
    console.log(req.body)
    const { _id, userName, email, NumberOfStudent, ContactNumber, Country, Fee, NumberofClasses} = req.body;
        const userInfo = await ClientModel.findOne({ email });
        console.log(userInfo);
        if (userInfo && userInfo._id != _id ) {
          return res.status(401).json({
            errors: { user: "Client already exists" },
          });
        }
        const User = await ClientModel.findByIdAndUpdate(_id, {
            userName: userName,
            email: email,
            NumberOfStudent: NumberOfStudent,
            ContactNumber: ContactNumber,
            NumberofClasses: NumberofClasses,
            Fee: Fee,
            FeeDate: FeeDate,
            Country: Country
        })
        .then((user) => {
            console.log(user)
            return res.status(200).json({
                user,
                message: "User updated successfully"
            });
        }).catch((err) => {
            return res.status(400).json({
                error: "Error occurred"
            });
        }
        );

}

module.exports.edit_Timetable = async (req, res, next) => {
  console.log(req.body)
  const { _id, TeacherStartTime, TeacherEndTime, StudentStartTime, StudentEndTime, Day, teacher, student} = req.body;
      const User = await TimeTableModel.findByIdAndUpdate(_id, {
          TeacherStartTime: TeacherStartTime,
          TeacherEndTime: TeacherEndTime,
          StudentStartTime: StudentStartTime,
          StudentEndTime: StudentEndTime,
          Day: Day,
          teacher: teacher,
          student: student
      })
      .then((user) => {
          console.log(user)
          return res.status(200).json({
              user,
              message: "User updated successfully"
          });
      }).catch((err) => {
          return res.status(400).json({
              error: "Error occurred"
          });
      }
      );

}
module.exports.getProfile__controller = async (req, res, next) => {
  try{
    console.log(req.params);
    const { ID } = req.params;
    const user = await StudentModel.findOne({ ID });
    return res.status(200).json({
      user,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

module.exports.get_Student_timeTable = async (req, res, next) => {
  try {
    console.log(req.params)
        const timeTable = await TimeTableModel.find({student:req.params.id});
      const temp =[]
      for(i=0; i<timeTable.length; i++){
        const t = await UserModel.findOne({ _id:timeTable[i].teacher})
        if(t)
        {
          temp.push({
            TeacherName:t.userName,
            startTime:timeTable[i].StartTime,
            endTime:timeTable[i].EndTime,
            Day: timeTable[i].Day
          })
        } 
      }
      return res.status(200).json({
          message:"Success",
          TimeTable:temp
      })
    }
    catch (err){
      return res.status(400).json({
        error: "Error occurred",
        err
    });
    }
}

module.exports.get_Teacher_timeTable = async (req, res, next) => {
  try {
    console.log(req.params)
        const timeTable = await TimeTableModel.find({teacher:req.params.id});
        console.log(timeTable)
      const temp =[]
      for(i=0; i<timeTable.length; i++){
        const t = await UserModel.findOne({ _id:timeTable[i].student})
        if(t)
        {
          temp.push({
            id: timeTable[i]._id,
            StudentName:t.userName,
            startTime:timeTable[i].TeacherStartTime,
            endTime:timeTable[i].TeacherEndTime,
            Day: timeTable[i].Day
          })
        } 
      }
      return res.status(200).json({
          message:"Success",
          TimeTable:temp
      })
    }
    catch (err){
      return res.status(400).json({
        error: "Error occurred",
        err
    });
    }
}

module.exports.get_Teacher_by_scheduler = async(req, res, next)=> {
  try {
      console.log(req.params)
      const teacher = await UserModel.find({scheduler:req.params.id})
      if(teacher){
        return res.status(200).json({
          message:"Success",
          teacher
      })
      }
      else {
        return res.status(400).json({
          error: "Error occurred",
          err
      });
      }

  }
  catch(err) {
      return res.status(400).json({
        error: "Error occurred",
        err
    });

  }
}

module.exports.get_TeacherHeldClasses_by_scheduler = async(req, res, next)=> {
  try {
    const HeldClasses = await ClassAttendenceModel.find()
    const id = req.params.id
    const tmp = []
    for(let i = 0; i < HeldClasses.length; i++){
        const d = new Date(HeldClasses[i].dateofAttendence)
        const timeTable = await TimeTableModel.findOne({_id:HeldClasses[i].AttedendedClass})
        console.log(timeTable.teacher)
        const teacher = await UserModel.findOne({_id:timeTable.teacher})
        if (teacher.scheduler == id){
            const stud = await UserModel.findOne({_id:timeTable.student})
            tmp.push({
              userName : teacher.userName,
              Student : stud.userName,
              Date : d.toDateString(),
              Slot : timeTable.TeacherStartTime + " - " + timeTable.TeacherEndTime,
              CourseCovered : HeldClasses[i].courseCovered,
              
            })
        }
    }
    if(tmp){
      return res.status(200).json({
        message:"Success",
        tmp
    })
    }
    else {
      return res.status(400).json({
        error: "Error occurred",
        err
    });
    }

  }
  catch(err) {
      return res.status(400).json({
        error: "Error occurred",
        err
    });

  }
}



