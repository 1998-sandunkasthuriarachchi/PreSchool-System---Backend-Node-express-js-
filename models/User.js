import mongoose from 'mongoose';

const Schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
    },
    id:{type:String}
    
})

const User=mongoose.model("User",Schema);
export default User;