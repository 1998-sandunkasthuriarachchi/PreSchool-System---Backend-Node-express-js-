import mongoose from 'mongoose';

const Schema=mongoose.Schema({

    fatherName: String,
    fmobile: String,
    address: String,
    occupation: String,
    motherName: String,
    mmobile: String,

    name: String,
    dob: String,
    religion: String,
    nationality: String,
    creator: String,
    status:Boolean,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    
})

const Admission=mongoose.model("Admission",Schema);


export default Admission;