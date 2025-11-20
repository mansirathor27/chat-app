// middleware is a function that is called before executing the controller function
// if user is authenticated then only user can acess
// middleware to protect the routes

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async(req, res, next) =>{
    try {
        const token = req.headers.token;
        // to decode this token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.json({success: false, message: "User not found"})
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message})
    }
}
