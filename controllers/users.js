import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import express from 'express';

import mongoose from 'mongoose';

import User from '../models/User.js'

const router = express.Router();

export const signin = async (req, res) =>{
    const { email, password } = req.body;

    try{
        const exsitingUser =await User.findOne({email});

        if(!exsitingUser) return res.status(404).json({ message: "user dosen't exits."});

        const ispasswordCorrect =await bcrypt.compare(password, exsitingUser.password);

        if(!ispasswordCorrect) return res.status(404).json({ message: "Invalid credetials."});

        const token= jwt.sign({ email: exsitingUser.email, id:exsitingUser._id}, 'test', {expiresIn: "1h"});
 
        res.status(200).json({result: exsitingUser, token})
    }catch(err){
        res.status(500).json({message: "Something went wrong"});
        console.log(err);


    }
}

export const signup = async (req, res) =>{
    const { email,  password, confirmPassword, firstName, lastName, userType } = req.body;
   
    try{
        const exsitingUser = await User.findOne({ email });

        if(exsitingUser) return res.status(400).json({ message:  "User already exists."});

        if(password !== confirmPassword) return res.status(400).json({ message:  "Password don't match"});

        const hashedPassword= await bcrypt.hash(password, 12);

        const result= await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, userType: userType});

        const token= jwt.sign({ email: result.email, id:result._id}, 'test', {expiresIn: "1h"});
        
        res.status(200).json({result, token})
    }catch(err){
        res.status(500).json({message: "Something went wrong"});
        console.log(err)
    }
}

export const getUsers = async (req, res) => { 
    try {
        const user = await User.find();
                
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {

    const { id } = req.params;
    const { email,  password, name, userType  } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);

    const hashedPassword= await bcrypt.hash(password, 12);

    const updatedUser = { email, password: hashedPassword, name, userType, _id: id };

    await User.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updatedUser);
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: "User deleted successfully." });
}



export default router;