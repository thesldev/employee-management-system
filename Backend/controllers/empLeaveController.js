import EmpLeaveModel from "../models/empLeaveModel.js";

// Create a new leave
export const createLeave = async (req, res, next) => {
    const newLeave = new EmpLeaveModel(req.body);
    try {
        const savedLeave = await newLeave.save();
        res.status(200).json(savedLeave);
    } catch (err) {
        next(err);
    }
}

// Update an existing leave
export const updateLeave = async (req, res, next) => {
    try {
        const updateLeave = await EmpLeaveModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateLeave);
    } catch (err) {
        next(err);
    }
}

// Delete a leave
export const deleteLeave = async (req, res, next) => {
    try {
        await EmpLeaveModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Leave has been deleted");
    } catch (err) {
        next(err);
    }
}

// Get a specific leave
export const getLeave = async (req, res, next) => {
    try {
        const Leave = await EmpLeaveModel.findById(
            req.params.id
        );
        res.status(200).json(Leave);
    } catch (err) {
        next(err);
    }
}

// Get all leaves
export const getLeaves = async (req, res, next) => {
    try {
        const Leaves = await EmpLeaveModel.find();
        res.status(200).json(Leaves);
    } catch (err) {
        next(err);
    }
}

// Get pending leaves by employee ID
export const getPendingLeavesByEmployeeId = async (req, res, next) => {
    const { employeeId } = req.params;

    try {
        // Fetch pending leaves with a status of "Pending" for the given employee ID
        const pendingLeaves = await EmpLeaveModel.find({
            employeeId,
            status: 'Pending',
        });

        res.status(200).json(pendingLeaves);
    } catch (err) {
        next(err);
    }
};


// get approved or reject results byemployee ID
export const getFinshedLeavesByEmployeeId = async (req, res, next) => {
    const { employeeId } = req.params;

    try {
        // Fetch pending leaves with a status of "Accepted of Rejected" for the given employee ID
        const finishedLeaves = await EmpLeaveModel.find({
            employeeId,
            status: { $in: ['Approved', 'Rejected'] },
        });

        res.status(200).json(finishedLeaves);
    } catch (err) {
        next(err);
    }
};