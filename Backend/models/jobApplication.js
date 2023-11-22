import mongoose from "mongoose";

const jobApplicationModel = new mongoose.Schema({
    full_name:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    postal_code:{
        type:Number,
        required: true,
    },
    age:{
        type:Number,
        required: true,
    },
    contact_no:{
        type:Number,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    experience:{
        type:String,
        required: true,
    },
    references:{
        type:String,
        required: true,
    },
    licence_type:{
        type:String,
        required: true,
    },
    certificates:{
        type:String,
    },
    availability:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending',
      },
})

export default mongoose.model("JobApplication", jobApplicationModel);