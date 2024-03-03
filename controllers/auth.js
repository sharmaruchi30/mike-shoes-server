import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {SuccessResponse, DataErrorResponse, ErrorResponse} from "../controllers/base_response.js";


//  REGISTER USER

export const register  = async (req , res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        const user = await User.findOne({ email : email });
        if (user) return DataErrorResponse(res, "User already exist with the entered email", {});;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password , salt);

        const newUser = User({
            name, 
            email,
            password : passwordHash 
      
             });
        // res.status(200).json({msg : "Account created"})
        const savedUser = await newUser.save();
        return SuccessResponse(res, 'User registered successfully' ,savedUser);
    } catch(e){
        ErrorResponse(res, e.message ,{});
    }
};

// LOGGING IN

export const login = async (req, res) => {
  
    try{
        const { email , password } = req.body;
        const user = await User.findOne({ email : email });
        if (!user) return DataErrorResponse(res, "Email does not exist", {});;

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) return DataErrorResponse(res, "Invalid Password", {} );;
        
        
        const token = jwt.sign({ id: user.id } , process.env.JWT_SECRET);
        delete user.password;
        return SuccessResponse(res, "Logged In successfully" ,{ token, user });
    }
    catch(e){
        ErrorResponse(res, e.message ,{});
    }
};