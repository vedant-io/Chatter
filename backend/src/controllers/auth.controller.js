import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../libs/utils.route.js";

export const signup = async (req,res)=>{
   const { email, fullName, password, profilePic } = req.body;
   try{
       //Hash Password
       if (password.length < 6){
           return res.status(400).json({error: 'Password is less than 6 characters'});
       }

       const user = await User.findOne({email})
       if (user){
           return res.status(400).json({error: 'User already exists'});
       }

       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);

       const newUser = new User({
           email,
           fullName,
           password: hashedPassword,
       })

       if (newUser){
           //generate jwt token
           generateToken(newUser._id,res)
           await newUser.save()

           res.status(201).json({_id:newUser._id,email:newUser.email,fullName:newUser.fullName,profilePic:newUser.profilePic})

       }else{
           return res.status(400).json({error: 'Invalid User Data Entered'});
       }

   }catch(err){
       console.log("Error for New User/signup controller :  " + err);
       return res.status(400).json({error: 'Internal Server Error'});

   }
}

export const login = (req,res)=>{
    res.send("Login Route")
}


export const logout = (req,res)=>{
    res.send("Logout Route")
}