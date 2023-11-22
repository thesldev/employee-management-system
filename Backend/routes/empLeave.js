import express from "express";
import {
    createLeave,
    updateLeave,
    deleteLeave,
    getLeave,
    getLeaves,
    getPendingLeavesByEmployeeId,
    getFinshedLeavesByEmployeeId
} from "../controllers/empLeaveController.js";

const router = express.Router();

// Create a new leave
router.post("/", createLeave);

// Update an existing leave
router.put("/:id", updateLeave);

// Delete a leave
router.delete("/:id", deleteLeave);

// Get a specific leave
router.get("/:id", getLeave);

// Get all leaves
router.get("/", getLeaves);

router.get('/pending/:employeeId', getPendingLeavesByEmployeeId);

router.get('/finished/:employeeId', getFinshedLeavesByEmployeeId);

export default router;
