import express from "express";
import employeeModel from "../models/employeeModel.js";
import multer from 'multer';
const upload = multer({ dest: 'uploads/images' });

import { 
    authEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    getEmployees,
    getDetailsByEmployeeId,
    uploadProfileImage,
    getEmployeeProfileImage
    } from "../controllers/employeeContrall.js";




const router = express.Router();

//login employee
router.post('/login', authEmployee)

// Create a new employee
router.post("/", createEmployee);

// Update an existing employee
router.put("/:id",  updateEmployee);

// Delete a employee
router.delete("/:id",  deleteEmployee);

// Get a specific employee
router.get("/:id", getEmployee);

// Get all employees
router.get("/", getEmployees);

// Get  details By ID
router.get("/emp-details/:employeeID", getDetailsByEmployeeId);

// Upload employee profile image
router.post('/uploadProfileImage/:id', upload.single('profileImage'), uploadProfileImage);

// Get employee profile image
router.get('/profileImage/:id', getEmployeeProfileImage);


export default router;