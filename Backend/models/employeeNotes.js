import mongoose from "mongoose";

const empNoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    employeeID: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const EmployeeNote = mongoose.model("EmployeeNote", empNoteSchema);

export default EmployeeNote;
