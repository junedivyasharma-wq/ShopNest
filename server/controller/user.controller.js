import {User} from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const generateToken=(user)=>{
    return jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,{
            expiresIn:"5d",
        }
    )
}

const register= async(req,res)=>{
    const {email,username,password}=req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"Username, email, and password are required"
        })
    }

    const user= await User.findOne({
        email:email
    })

    if(user){
        return res.status(400).json({
            message:"user already exits"
        })
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newUser=await User.create({
        username:username,
        email:email,
        password:hashedPassword,
    })

    if(newUser){
        const token=generateToken(newUser);
        return res.status(201).json({
            id:newUser._id,
            username:newUser.username,
            email:newUser.email,
            role:newUser.role,
            token:token,
            message:"User registered successfully"
        })
    }
    else{
        return res.status(400).json({
            message:"Error while registering the user"
        })
    }
    


};

const login=async(req,res)=>{
   const {email,password}=req.body;
    if(!email || ! password){
        return res.status(400).json({
            message:"Email and password both are required",
        })
    }
    const user=await User.findOne({email});
    if(!user){
        return res.status(404).json({
            message:"user not registered",
        })
    }

    
    const isPasswordcorrect=await bcrypt.compare(password,user.password);
    if(!isPasswordcorrect){
        return res.status(400).json({
            message:"Wrong password",
        })
    }

    const token=generateToken(user);

    return res.status(200).json({
        id:user._id,
        username:user.username,
        email:user.email,
        role:user.role,
        token:token,
        message:"User logged in successfully",
    })

};

const getUser=async(req,res)=>{
    const {email}=req.body;
    const user=await User.findOne({email}).select("-password");

    if(!user){
        return res.status(404).json({
            message:"User not found",
        })
    }

    return res.status(200).json({
        id:user._id,
        username:user.username,
        email:user.email,
    })
}

const getUsers=async(req,res)=>{
    try{
        const users=await User.find({}).select("-password");
        return res.json(users);
    }catch(error){
        return res.status(500).json({
            message:"Error while fetching users",
        })
    }
}
export  {register,login,getUser,getUsers};


