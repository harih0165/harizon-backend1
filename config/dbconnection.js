const mongoose = require("mongoose");

const dbconnect = () =>{
    mongoose.connect(process.env.DB_URL).then((con)=> {
        console.log("db connected :" + con.connection.host)
    })
}
module.exports = dbconnect;


