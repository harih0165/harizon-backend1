const mongoose =require("mongoose")

 const orderSchema = new mongoose.Schema({
    cartItems : Array,
    amount : String,
    status : String,
   user : String,
    createdAt : String
})

const orderModel = mongoose.model("order",orderSchema)

module.exports =orderModel;
