import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../libs/utils.route.js";
import cloudinary from "../libs/cloudinary.js";

export const signup = async (req, res) => {
  const { email, fullName, password, profilePic } = req.body;
  try {
    //Hash Password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password is less than 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });
    console.log(res)

    if (newUser) {
      //generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ error: "Invalid User Data Entered" });
    }
  } catch (err) {
    console.log("Error for New User/signup controller :  " + err);
    return res.status(400).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error for Login controller :  " + error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "User Logged Out Successfully" });
  } catch (error) {}
};

export const updateProfile = async (req, res) => {
  try{
    const {profilePic} = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ error: "ProfilePic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findById(userId, {profilePic: uploadResponse.secure_url},{new:true})

    return res.status(200).json({updatedUser})
  }catch(err){
    console.log("Error in update profile pic of user " + err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try{
    res.status(200).json(req.user);

  }catch(err){
    res.status(500).json({ error: "Internal Server Error" });
    console.log("Error from checkAuth" + err);
  }
}
