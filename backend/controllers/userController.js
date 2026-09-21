import User from "../models/userModel.js";
import { deleteLocalFile } from "../utils/localFile.js";

export const getCurrentUser = async (req,res) => {
    try {
        const user = await User.findById(req.userId).select("-password").populate("enrolledCourses")

        console.log("user found" , user);
         if(!user){
            return res.status(400).json({message:"user does not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log( "get current user error", error);
        return res.status(400).json({message:"get current user error"})
    }
}


export const UpdateProfile = async (req,res) => {
    try {
        const userId = req.userId
        const {name , description} = req.body
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        let photoUrl = user.photoUrl
        if(req.file){
            deleteLocalFile(user.photoUrl)
            photoUrl = `/uploads/${req.file.filename}`
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {name: name || user.name, description: description || user.description, photoUrl},
            {new:true}
        ).select("-password")

        return res.status(200).json(updatedUser)
    } catch (error) {
         console.log(error);
       return res.status(500).json({message:`Update Profile Error  ${error}`})
    }
}
