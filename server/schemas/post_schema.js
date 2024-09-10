const mongoose = require("mongoose")
const post_schema = new mongoose.Schema({
    stockSymbol:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        resquired:true
    },
    tags:{
        type:[String]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
}, { timestamps: true })

const PostSchema = mongoose.model("Post",post_schema)
module.exports = PostSchema