import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        unique : true
    },
    email : { 
        type: String,
        require : true,
        unique : true
    },
    password : {
        type: String,
        require : true,
        
    },
    admin : {
        type: Boolean,
        default: false 
    }

},
{timestamps : true})

const User = mongoose.model('User', userSchema ); 

export default User;