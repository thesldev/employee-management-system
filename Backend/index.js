import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import employeeRoute from './routes/employee.js';
import empLeaveRoute from './routes/empLeave.js';
import jobApplicationRoute from './routes/jobApplication.js';
import empNoteRoute from './routes/empNote.js';
import uploadRoute from './routes/upload.js';
import calendarRoute from './routes/calanderEvent.js'
import multer from 'multer';
import path from 'path';



import cors from 'cors';

const app = express();
dotenv.config();

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Replace with your frontend URL
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
  };
  
  app.use(cors(corsOptions));

//connect to mongodb
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to mongoDB.');
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on('connected', () => {
  console.log('mongodb connected.');
});

mongoose.connection.on('disconnected', () => {
  console.log('mongodb disconnected.');
});
 

//middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use('/api/employee', employeeRoute);
app.use('/api/empLeave', empLeaveRoute);
app.use('/api/empnote', empNoteRoute);
app.use('/api/jobApplication', jobApplicationRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/calender', calendarRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errMessage = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errMessage,
    stack: err.stack,
  });
});

//define port
app.listen(8800, () => {
  connect();
  console.log('connect to backend');
});
