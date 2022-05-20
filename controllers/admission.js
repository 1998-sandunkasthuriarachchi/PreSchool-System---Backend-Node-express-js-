import express from 'express';
import mongoose from 'mongoose';

import Admission from '../models/Admission.js';

const router = express.Router();

export const createAd = async (req, res) => {
    const { fatherName, fmobile, address, occupation, motherName, mmobile, fname, lname, dob, religion, nationality, status } = req.body;

    const newAd = new Admission({ fatherName, fmobile, address, occupation, motherName, mmobile, name: `${fname} ${lname}`, dob, religion, nationality, status, createdAt: new Date().toISOString() })

    try {
        await newAd.save();
        res.status(201).json(newAd );
    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error);
    }
}


export const getAds = async (req, res) => { 
    try {
        const ad = await Admission.find().sort({_id:-1});
                
        res.status(200).json(ad);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export const getAd = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await Admission.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateAd = async (req, res) => {
    const { id } = req.params;
    const { fatherName, fmobile, address, motherName, mmobile, name, dob, religion, nationality, status } = req.body;

    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Admission with id: ${id}`);

    const updatedAd = { fatherName, fmobile, address, motherName, mmobile, name, dob, religion, nationality,status, _id: id };

    await Admission.findByIdAndUpdate(id, updatedAd, { new: true });

    res.json(updatedAd);
}

export const deleteAd = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Admission with id: ${id}`);

    await Admission.findByIdAndRemove(id);

    res.json({ message: "Admission deleted successfully." });
}

export const getCount = async (req, res) => { 

    try {
        const post = await Admission.findOne({status:'false'}).countDocuments();
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;