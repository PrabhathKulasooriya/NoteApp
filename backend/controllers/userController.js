import UserModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";




//Create New User
export const createUser = async (req, res) =>{
    
    const {name, email, password} = req.body;

    try{
        if(!name || !email || !password){
            return res.status(400).json({success: false, message: "All fields are required"});
        }

        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({success: false, message: "User already exists"});
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({success: false, message: "Please enter a valid email"});
        }

        if(password.length<6){
            return res.status(400).json({success: false, message: "Password must be at least 6 characters"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = UserModel({
            name,
            email,
            password
        });

        const user = await newUser.save();
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET,{expiresIn: "3d"});

        return res.status(201).json({success: true, message: "User created successfully", user:user, token:token});

    }catch(error){
        console.log("Error Creating User",error.message);
        return res.status(500).json({success: false, message: "Error registering user"});
    }
}