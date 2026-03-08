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
          password :hashedPassword,
        });

        const user = await newUser.save();
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET,{expiresIn: "3d"});

        return res.status(201).json({success: true, message: "User created successfully", user:user, token:token});

    }catch(error){
        console.log("Error Creating User",error.message);
        return res.status(500).json({success: false, message: "Error registering user"});
    }

}

//User Login 
    export const loginUser = async(req, res)=>{
        const {email,password} = req.body;
        console.log("attempting to login user");
        try{

            if(!email || !password){
                return res.status(400).json({success: false, message: "All fields are required"});
            }

            const user = await UserModel.findOne({email});

            if(!user){
                return res.status(400).json({success: false, message: "User does not exist"});
            }

            const passwordMatch =  await bcrypt.compare(password, user.password);

            if(!passwordMatch){
                return res.status(400).json({success: false, message: "Incorrect password"});
            }

            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET,{expiresIn: "3d"});

            return res.status(200).json({success: true, message: "User logged in successfully", user:user, token:token});


        }catch(error){
            console.log("Error logging in user",error.message);
            return res.status(500).json({success: false, message: "Error logging in user"});
        }
    }

    //Edit User
    export const editUser = async(req, res)=>{
        const {name, email, password} = req.body;
        const userId = req.userId;

        try{


            const user = await UserModel.findOne({_id: userId});
            if(!user){
                return res.status(404).json({success: false, message: "User not found"});
            }

            if(name){
                user.name=name;
            }

            if(email){
                user.email=email;
            }

            if(password){
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                user.password = hashedPassword;
            }

            await user.save();

            return res.status(200).json({success: true, message: "User updated successfully", user});


        }catch(error){
            console.log("Error editing user",error.message);
            return res.status(500).json({success: false, message: "Error editing user"});
        }
    }

    // Get User
    export const getUser = async(req, res)=>{
        const userId = req.userId;
        try{
            const user = await UserModel.findOne({_id: userId});
            if(!user){
                return res.status(404).json({success: false, message: "User not found"});
            }
            return res.status(200).json({success: true, message: "User found successfully", user});
        }catch(error){
            console.log("Error getting user",error.message);
            return res.status(500).json({success: false, message: "Error getting user"});
        }
    }

