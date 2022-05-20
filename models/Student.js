import mongoose from 'mongoose';

const Schema=mongoose.Schema({

    name: String,
    dob: String,
    address: String,

    fatherName: String,
    fmobile: String,
    

    religion: String,
    nationality: String,
    sclass:String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    
})

const Student=mongoose.model("Student",Schema);


export default Student;