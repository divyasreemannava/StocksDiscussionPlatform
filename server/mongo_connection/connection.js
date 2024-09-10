const mongoose = require("mongoose")
const Connection = async ()=>{
    try{
        const result = await mongoose.connect("mongodb://localhost:27017/alpha")
        console.log("connected to mongodb")
    }catch{
        console.log("error in connectiong to mongo db")
    }
}
module.exports = Connection