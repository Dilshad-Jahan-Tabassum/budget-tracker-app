import User from "../models/user.model.js";
import  bcryptjs from 'bcryptjs';
import { error } from "console";
import jwt from "jsonwebtoken";
import { errorHendeler } from './../middleware/error.js';

export const signUp = async (req, res, next) => {
   const {username, email, password  } = req.body;
   //console.log(username, email ) ;

   if(!username || !email || !password || username.trim() === '' || email.trim() === '' || password == ''){
      return next(errorHendeler(400, 'All fields are required'))
   }
    //    hashing passworad with bycriptjs----------------------------
   const hashpasswoard =bcryptjs.hashSync(password,10);
   const newUser = new User(
    {
      userName : username,
      email,
      password : hashpasswoard
    }
   );
   
   try{
    await newUser.save();
    res.json('SignUp successful') 
   }
   catch(err){
      return next(err);
   }
   
};


export const signIn = async (req, res, next ) => {
    const { email, password  } = req.body;
    try{
       if(!email || !password){
         return next(errorHendeler(400, 'All fields are required'))
       }
       const validUser = await User.findOne({email});
       if(!validUser){
        return next(errorHendeler(404, 'Email not found'))
       }
       const validPasword = bcryptjs.compareSync(password, validUser.password);
       if(!validPasword){
        return next(errorHendeler(400, 'Invalid password' ))
        
       }
 
       // remove password from user for frontend sequrity--------------------------------
       const {password : pass, ...rest} = validUser._doc;
       const token =  jwt.sign({id : validUser._id , isAdmin: validUser.admin}, "dilshad")
       res.status(200).cookie('access_token', token,{httpOnly : true}).json(rest);
       
    }
    catch(err){
       return next(err);
    }
 
 
 
 }

 export const signOut = async (req, res, next) =>{
   try{
     res.clearCookie('access_token').status(200).json('sign Out Successful')
   }
   catch(err){
      return next(err);
   }
}