//import modules
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const path = require("path");



//app
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));



//db
require("./config/database").connectDb();



//middleware
app.use(morgan("dev"))

app.use(cors({ origin: true, credentials: true }));


//routes
const authRoute = require("./routes/authRoutes")
const userRoute = require("./routes/user/userRoutes")
const adminRoute = require("./routes/admin/adminRoutes")


app.use("/api/auth" ,authRoute)
app.use("/api/user",userRoute)
app.use("/api/admin",adminRoute)



//port
const PORT = process.env.PORT || 8080;

app.get("/",(req,res)=>{
    res.send("Backend is Running..");
})

//listener
app.listen(PORT , ()=>{console.log('Server is running on  http://localhost:8080');})