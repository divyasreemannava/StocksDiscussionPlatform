const mongoose = require("mongoose")

const user_Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String
    },
    picture:{
        type:String
    }
})

const User = mongoose.model("User",user_Schema)
module.exports = User