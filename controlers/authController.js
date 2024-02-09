const User = require("../models/userModel")
const sendEmail = require("../utils/email")
const sendToken = require("../utils/jwt")
const crypt = require("crypto")

exports.registerUser = async(req,res,next)=>{
    

        const{name,email,password} = req.body
        const check = await User.findOne({email})
        if(check){
           return res.status(400).json({
                success:false,
                message:"This Email is already register"
            })}

    if(!email || !password){
                return  res.status(200).json({
                      success:false,
                      message : "please enter email and password"
                  })
                  next()
    }
   
    if( password.length != 8){
        return res.status(200).json({
            success:false,
            message : "password does not exceed 8 characters "
        })

    }
       
    const user = await User.create({
        name,
        email,
        password
       
    })
    

    
    sendToken(user,201,res)
    
}

exports.loginUser =async(req,res,next)=>{

    const{email,password}=req.body
    if(!email || !password){
      return  res.status(200).json({
            success:false,
            message : "please enter email and password"
        })
        next()
    }
    const user = await User.findOne({email}).select("+password")
    if(!user){
       return res.status(200).json({
            success:false,
            message : "invalid email or password"
        })
        next()
    }
    if(!await user.isValidPassword(password)){
       return res.status(200).json({
            success:false,
            message : "invalid email or password"
        })
        next()
    }

    sendToken(user,201,res)
    console.log("login success",user)
}
exports.logoutUser = (req,res,next)=>{
    
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    .status(200)
    .json({

        success:true,
        message:"logout successfully"
    })
    console.log("logout successf")
}

exports.forgotPassword = async (req,res,next)=>{
   const user = await User.findOne({email : req.body.email})

   const resetToken = user.getResetToken()
   await user.save({validateBeforeSave : false})
   const resetURL = `${req.protocol}:://${req.get("host")}/api/v1/password/reset/${resetToken}`
   const message = `Reset your password URL is follow as \n\n
   ${resetURL}\n\n if you not request this reset password,then ignore it`

   try{
    sendEmail({
        email:user.email,
        subject : "harizon password recovery",
        message
        

    })
    res.status(201).json(
        {
            success:true,
            message:"email sent successfully"
        }
    )
   }
   catch(error){
    user.resetPassToken = undefined
    user.resetPassTokenExpire = undefined
    await user.save()
    return next()
}
}
exports.resetPassord = async(req,res,next) =>{
    const resetPassToken = crypt.createHash("sha256").update(req.params.token).digest("hex")
  


    const user = await User.findOne({
        resetPassToken,
        resetPassTokenExpire:{
            $gt : Date.now()
        }
    })
    if(!user){
        return console.log("user not found")
    }
    if(req.body.password !== req.body.confirmPassword){
        return console.log("password does not match")

    }
    user.password = req.body.password;
    user.resetPassToken = undefined;
    user.resetPassTokenExpire = undefined;
    await user.save({validateBeforeSave:false})
    sendToken(user,201,res)
}

exports.getUserProfile = async(req,res,next)=>{
   const user = await User.findById(req.user.id)
   res.status(200).json({
    success:true,
    user
   })
}
exports.changePassword = async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password")
    console.log(user)
    if(! await user.isValidPassword(req.body.oldPassword)){
        return next(console.log("password incorrect"))
    }
    user.password = req.body.password
    await user.save()
    res.status(200).json({
     success:true,
     user
    })
 }
 exports.updateProfile = async(req,res,next)=>{
    const newData ={
        name:req.body.name,
        email:req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id,newData,{
        new : true,
        runValidators:true
    })
    res.status(200).json({
     success:true,
     user
    })

}