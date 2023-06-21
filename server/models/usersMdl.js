const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
    },
    profilePic:{
        type:String,
        
    },
    status:{
        type:Boolean,
        required:true
    },
    createdAt:{
        type:String,
        required:true
    },

    }

    
);

module.exports = mongoose.model("users",userSchema)