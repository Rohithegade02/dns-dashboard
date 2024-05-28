import jwt from "jsonwebtoken";

export const sendToken = (user,res,message,statusCode) => {
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{
        expiresIn: '10h',  //token expies in 10 hours
      })
     res
        .cookie("token", token)
        .status(statusCode).json({success:true, message: message ,token});
}