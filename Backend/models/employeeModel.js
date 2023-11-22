import mongoose from "mongoose";

const employeeModel = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true,
    },
    NIC: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    postal_code: {
        type: String,
        required: true,
    },
    province:{
        type: String,
        required: true,
    },
    birth_day: {
        type: Date,
    },
    telephone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    designation: {
        type: String,
        required: true,
    },
    employee_id: {
        type: String,
        required: true,
        unique: true,
    },
    emp_acc_password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    gender:{
        type: String,
        required: true,
    },
    profileImage: {
        data: Buffer, 
        contentType: String,
      },
  
}, { timestamps: true });


export default mongoose.model("Employee", employeeModel);

