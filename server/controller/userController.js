import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { sendToken } from '../utils/features.js';
// controller to register a user
export const registerUser=async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
   
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(404).json({
                success: false,
                message:"User Already Exist"
            })
        }
        if (password !== confirmPassword) {
            return res.status(404).json({ message:"Password does not match"})
        }
        const hashPassword =await  bcrypt.hash(password, 10)
        
        user = await User.create({ name, email, password: hashPassword })

        sendToken(user,res,"Register Successfully",201)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err
        });
    }
}
//controller to login user
export const loginUser=async (req, res) => {
    const { email, password } = req.body;

    try {
        const user =await User.findOne({ email }).select('+password')
        if (!user) {
          return  res.status(400).json({
                success: false,
                message:"Invalid EMail or Password"
            })
        }
        const isMatch =await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return  res.status(400).json({
                success: false,
                message:"Password is incorrect"
            })
        }
        sendToken(user,res,"Logged In Successfully",201)
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        });
    }
}
// export const logout=async (req, res) => {
//     res
//         .status(200)
//         .cookie("token", "",{expires:new Date(Date.now())})
//         .json({
//             success: true,
          
//         })
// }
// export const getProfile=(req, res) => {
//     return res.status(200).json({
//         success:true
//     })
// }
