const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required :[true,"please enter the name"],
    },
    email:{
        type:String,
        required:[true,"please enter the email"],
        unique:true,
        validate:[validator.isEmail,'enter valid email']
    },
    password:{
        type:String,
        required:[true,"please enter the password"],
        maxLength :[8,"password cannot exceed 8 characters"],
        select:false
    },
   
    role:{
        type:String,
        default:"user"
    },
    resetPassToken:String,
    resetPassTokenExpire:Date,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})
userSchema.methods.getJWT=function (){
   return jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}
userSchema.methods.isValidPassword = async function(enteredPassword){
    return  bcrypt.compare(enteredPassword, this.password)
}
userSchema.methods.getResetToken = function(){
    const token =crypto.randomBytes(10).toString("hex")

    this.resetPassToken = crypto.createHash("sha256").update(token).digest("hex")

    this.resetPassTokenExpire = Date.now()+ 30 *60 *1000
     return token 

}
const model = mongoose.model("user",userSchema)

module.exports =model;