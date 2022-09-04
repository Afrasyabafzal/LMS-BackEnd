const UserModel=require('../model/UserModel')
const ClientModel = require("../model/Client")

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
        console.log(userInfo);
        if (userInfo && userInfo._id != _id ) {
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

