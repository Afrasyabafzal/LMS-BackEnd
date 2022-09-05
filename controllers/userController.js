const UserModel=require('../model/UserModel')
const SchedulerModel=require('../model/SchedulerModel')
module.exports.getStudent__controller=async (req,res,next)=>{
    try {
        const studentInfo=await UserModel.find({role:"Student"})
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
        const SchedulerInfo=await SchedulerModel.find({})
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

module.exports.deleteTeacher__controller = async (req, res, next) => {
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
  module.exports.deleteScheduler__controller = async (req, res, next) => {
    try {
      const  userId  = req.params.id;
      const user = await SchedulerModel.findOneAndDelete({ _id: userId });
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
  module.exports.edit_profile = async (req, res, next) => {

        console.log(req.body);    
        const { _id, userName, email, password,familyName,numberOfClasses, teacher,role } = req.body;
        const userInfo = await UserModel.findOne({ email });
        if (userInfo) {
          return res.status(401).json({
            errors: { user: "User already exists" },
          });
        }
        const User = await UserModel.findByIdAndUpdate(_id, {
            userName: userName,
            email: email,
            password: password,
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
    const User = await UserModel.findByIdAndUpdate(_id, {
        userName: userName,
        email: email,
        password: password,
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
    const userInfo = await SchedulerModel.findOne({ email });
    if (userInfo && userInfo._id!=_id)  {
      return res.status(401).json({
        errors: { user: "User already exists" },
      });
    }
    const User = await SchedulerModel.findByIdAndUpdate(_id, {
        Name: Name,
        email: email,
        password: password,
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