import jwt from "jsonwebtoken";
import {User} from "../model/user.model.js";

const verify=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(400).json({
                message:"Token not found",
            })
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        const user=await User.findOne({ _id: decoded.id }).select("-password");

        if(!user){
            return res.status(404).json({message:"user not found"});

        }

        req.user=user;
        next();

    }catch(error){
        throw new Error(error);
    }
}
export {verify};