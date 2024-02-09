const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
exports.isAuthenticateUser = async(req,res,next)=>{
     const {token}= req.cookies

   
     const decode = jwt.verify(token,process.env.JWT_SECRET)

     req.user = await User.findById(decode.id)
   
     next();
     
}



