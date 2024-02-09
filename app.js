const express = require("express")
const app = express()
const path = require("path")
const dotEnv = require("dotenv")
const cors = require("cors")
const dbconnect =require("./config/dbconnection")
dotEnv.config({path : path.join(__dirname,"config","config.env")})
const product = require("./routes/product")
const order = require("./routes/order")
const auth = require("./routes/auth")
const cookie = require("cookie-parser")



dbconnect() 
app.use(express.json())
app.use(cookie())
app.use(cors());
 

app.use("/api/v1",product)
app.use("/api/v1",order)
app.use("/api/v1",auth)


app.listen(process.env.PORT,() =>{
    console.log(`the port is running on ${process.env.PORT}`)
})