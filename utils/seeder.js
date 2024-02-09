const products = require('../data/product.json');
const Product = require('../models/productModel');
const dotenv = require('dotenv');
const path = require("path")
const dbconnect =require("../config/dbconnection")

dotenv.config({path:path.join(__dirname,"config","config.env")});
dbconnect();

const seedProducts = async ()=>{
    try{
        await Product.deleteMany();
        console.log('Products deleted!')
        await Product.insertMany(products);
        console.log('All products added!');
    }catch(error){
        console.log(error.message);
    }
    process.exit();
}

seedProducts();