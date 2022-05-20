import express from 'express';
import mongoose from 'mongoose';

import Student from '../models/Student.js';

const router = express.Router();


export const createStudent = async (req, res) => {
    const { fatherName, fmobile, address,name, dob, religion, nationality, sclass } = req.body;

    const newStudent = new Student({ fatherName, fmobile, address, name, dob, religion, nationality,sclass, createdAt: new Date().toISOString() })

    try {
        await newStudent.save();
        res.status(201).json(newStudent );
    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error);
    }
}


export const getStudents = async (req, res) => { 
    try {
        const getStudent = await Student.find().sort("name : 1");
                
        res.status(200).json(getStudent);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error)
    }
}



export const getCount = async (req, res) => { 

    try {
        const post = await Student.countDocuments();
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const {  fatherName, fmobile, address,name, dob, religion, nationality, sclass } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Student with id: ${id}`);

    const updatedStudent = { fatherName, fmobile, address, name, dob, religion, nationality,sclass, _id: id };

    await Student.findByIdAndUpdate(id, updatedStudent, { new: true });

    res.json(updatedStudent);
}

export const deleteStedent = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Student with id: ${id}`);

    await Student.findByIdAndRemove(id);

    res.json({ message: "Student deleted successfully." });
}


//fetch data by class A



export default router;