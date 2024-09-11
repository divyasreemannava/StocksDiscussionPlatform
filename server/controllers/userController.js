const express = require("express");
// const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secret_key = process.env.secret_key;  
const User = require("../schemas/user_schema.js");
const Joi = require("joi");
const saltRounds = 10;

exports.login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                status: "failed",
                message: "Please send the required fields of email and password"
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found, please register and try again"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({ email: email , id:user._id}, secret_key, { expiresIn: '1h' });
            console.log("token", token);

            // Set token in cookies
            const cookieOptions = {
                httpOnly: true,
                maxAge: 3600000  
            };
            res.cookie('token', token, cookieOptions);
            res.setHeader('Authorization', `Bearer ${token}`);

            return res.status(200).json({
                status: "success",
                message: "User signed in successfully",
                token:token,
                user:{
                    id:user.id,
                    username:user.name,
                    email:user.email
                }
            });
        } else {
            return res.status(401).json({
                status: "failed",
                message: "Incorrect password"
            });
        }
    } catch (err) {
        console.error(err);  
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.register = async (req, res) => {
    const userData = req.body;
    const { name, email, password } = userData;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                status: "Failed",
                message: "Please enter all the details"
            });
        }

        const response = await User.findOne({ email: email });
        if (response) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const schema = Joi.object({
            name: Joi.string().alphanum().min(3).max(10).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{6,20}$')),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
        });

        const { error } = schema.validate({ name, email, password });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                return res.status(400).json({
                    message: "Error Occurred while hashing the password"
                });
            }

            const user_data = new User({
                name: name,
                password: hash,
                email: email
            });

            const user_info = await user_data.save();
            res.status(201).json({
                status: "Success",
                message: "User details saved to db successfully",
                userId:user_info.id
            });
        });
    } catch (err) {
        console.log("in error", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


exports.getUserById = async (req,res)=>{
    const id = req.params.userId
    const headers = req.headers['authorization']
    try{
        if(!id){
            res.status(400).json({
                status:"Failed",
                message:"Please Send User id"
            })
        }
        const user_info = await User.findById(id)
        if(!user_info){
            return res.status(404).json({ message: 'User not found' });
        }
        res.setHeader('authorization',headers)
        res.status(200).json({
            id:user_info.id,
            username:user_info.name,
            bio:user_info.bio,
            profilePicture:user_info.picture
        })
    }catch(err){
        res.status(500).json({
            status:"Failed",
            message:"Iternal server Error"
        })
    }
    
}

// exports.modifyUser = async (req,res)=>{
//     const { name, bio, picture } = req.body;
//     const user_email = req.user.email
//     // console.log("--------------",req.user)
//     try{
//         const user_data = await User.findOneAndUpdate({email:user_email},{
//             name:name,
//             bio:bio,
//             picture:picture,
//             email:user_email
//         },{
//             new:true
//         })
//         if(!user_data){
//             return res.status(404).json({ success: false, message: 'User not found' })
//         }
//         res.status(200).json({ success: true, message: 'Profile updated', user: user_data })    
//     }
//     catch(err){
//         res.status(500).json({
//             message:"Internal server error"
//         })
//     }

// }
exports.modifyUser = async (req, res) => {
    const { name, bio } = req.body;
    const picture = req.file ? req.file.path : undefined;
    const user_email = req.user.email

  
    try {
      const updatedFields = {
        name:name,
            bio:bio,
            email:user_email,
        ...(picture && { picture }) // Only update if profile picture is provided
      };
  
      const user = await User.findByIdAndUpdate(req.user.id, updatedFields, { new: true });
  
      res.status(200).json({
        success: true,
        message: 'Profile updated',
        user: {
          id: user._id,
          username: user.username,
          bio: user.bio,
          profilePicture: user.profilePicture
        }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  