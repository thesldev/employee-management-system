import mongoose from "mongoose";

const EmpLeaveSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    contactEmail: {
        type: String,
        required: true,
    },
    from: {
        type: Date,
        required: true,
    },
    to: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
    }
});

const EmpLeaveModel = mongoose.model("EmpLeave", EmpLeaveSchema);

export default EmpLeaveModel;
