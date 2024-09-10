const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const mongo_uri = process.env.mongo_uri
const Connection = async ()=>{
    try{
        const result = await mongoose.connect(`${mongo_uri}`)
        console.log("connected to mongodb")
    }catch{
        console.log("error in connectiong to mongo db")
    }
}
module.exports = Connection