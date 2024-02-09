const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name : String,
    price : String,
    description : String,
    ratings :String,
    images :[{
        image : String
    }],
    categories : String,
    seller : String,
    stock : String,
    numofReviews : String,
   
    createdAt : Date


})
 const productModel = mongoose.model("product",productSchema)
 module.exports =productModel