import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../libs/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user.id;
        const filterUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filterUsers);
    }catch(err){
        console.log("Error from getUsersForSidebar " + err.message);
        res.status(500).json({
            error: "Internal Server Error",
        })

    }
}

export const getMessages = async (req, res) => {
    try {
        const { id:userToChatId } = req.params
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, recipientId:userToChatId},
                {senderId:userToChatId, recipientId:myId},
            ]
        })
        res.status(200).json(messages);
    }catch(err){
        console.log("Error from getMessages " + err.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id:receiverId } = req.params;
        const senderId=req.user._id;

        let imageurl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageurl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageurl,
        })

        await newMessage.save();

        //todo: realtime functionality goes here => socket.io

        res.status(201).json(newMessage);
    }catch(err){
        console.log("Error from sendMessage " + err.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}