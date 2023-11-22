import express from "express";
import { 
    createJobApplication, 
    updateJobApplication, 
    deleteJobApplication, 
    getJobApplication, 
    getJobApplications,
    getPendingJobApplications
    } from "../controllers/jobApplicationController.js";


    const router = express.Router();

// Create a new job application
router.post("/", createJobApplication);

// Update an existing job application
router.put("/:id",  updateJobApplication);

// Delete a job application
router.delete("/:id",  deleteJobApplication);

// Get a specific job application
router.get("/:id", getJobApplication);

// Get all job applications
router.get("/", getJobApplications);

router.get("/pending", getPendingJobApplications);

export default router;