import mongoose from 'mongoose';

const Schema=mongoose.Schema({

    sclass:String,
    desc:String,
    submitDate:String,
    creator: String,
    status:Boolean,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    
})

const Homework=mongoose.model("Homework",Schema);


export default Homework;