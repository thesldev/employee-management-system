import employeeModel from "../models/employeeModel.js";
import { hashPassword,  comparePassword, } from "../utils/auth.js";
import asyncHandler from 'express-async-handler';
import generateToken from "../utils/generateToken.js";
import multer from "multer";
import fs from 'fs'
import path from 'path'


// configure multer
const upload = multer({ dest: 'uploads/images' });

//employee login
export const authEmployee = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    console.log('Email:', email);
    console.log('Password:', password);

    const employee = await employeeModel.findOne({ email });
  
    console.log('Employee:', employee);
    if (employee && (await comparePassword(password, employee.emp_acc_password))) {
      res.json({
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        isAdmin: employee.isAdmin,
        pic: employee.pic,
        token: generateToken(employee._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });




// //createEmployee
export const createEmployee = async (req, res, next) => {
    const {
      employeeName,
      NIC,
      address,
      postal_code,
      birth_day,
      telephone,
      email,
      designation,
      employee_id,
      emp_acc_password,
      age,
      province,
      gender 
    } = req.body;
  
    try {
      // Hash the password before saving it
      const hashedPassword = await hashPassword(emp_acc_password);
  
      // Create a new employee document with the hashed password
      const newEmployee = new employeeModel({
        employeeName,
        NIC,
        address,
        postal_code,
        birth_day,
        telephone,
        email,
        designation,
        employee_id,
        emp_acc_password: hashedPassword,
        age,
        province,
        gender
      });
  
      const savedEmployee = await newEmployee.save();
      res.status(200).json(savedEmployee);
    } catch (err) {
      next(err);
    }
  };

// get updsteEmployee
export const updateEmployee = async (req,res,next) =>{
    try{
        const updateEmployee = await employeeModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateEmployee);
    }catch(err){
        next(err);
    }
}

// get deleteEmployee
export const deleteEmployee = async (req,res,next) =>{
    try{
        await employeeModel.findByIdAndDelete(req.params.id);
        res.status(200).json("employee has been deleted");
    }catch(err){
        next(err)
    }
}

// get employee
export const getEmployee = async (req,res,next) =>{
    try {
        const employee = await employeeModel.findById(
            req.params.id
        );
        res.status(200).json(employee);
    } catch (err) {
       next(err);
    }
}

//get employees
export const getEmployees = async (req,res,next) =>{
    try {
        const employees = await employeeModel.find();
        res.status(200).json(employees);
    } catch (err) {
       next(err);
    }
}



// get employee byemployee ID
export const getDetailsByEmployeeId = async (req, res, next) => {
  const { employeeID} = req.params;

  try {
      // Fetch pending leaves with a status of "Accepted of Rejected" for the given employee ID
      const getDetailsByID = await employeeModel.find({
          employeeID,
      });

      res.status(200).json(getDetailsByID);
  } catch (err) {
      next(err);
  }
};



export const uploadProfileImage = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const file = req.file;

    if (file) {
      // Save the file to the server
      const imagePath = `uploads/images/${file.filename}`;
      
      // Update the employee document with the image path
      const updatedEmployee = await employeeModel.findByIdAndUpdate(
        employeeId,
        { profileImage: imagePath },
        { new: true }
      );
      
      res.status(200).json(updatedEmployee);
    } else {
      res.status(400).json({ message: 'No file provided.' });
    }
  } catch (err) {
    next(err);
  }
};



// Get employee profile image
export const getEmployeeProfileImage = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const employee = await employeeModel.findById(employeeId);

    if (!employee || !employee.profileImage || !employee.profileImage.data) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.set('Content-Type', employee.profileImage.contentType);
    res.send(employee.profileImage.data);
  } catch (err) {
    next(err);
  }
};