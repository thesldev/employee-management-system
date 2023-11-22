import jobApplication from "../models/jobApplication.js";

// get createJobApplication
export const createJobApplication = async (req,res,next) =>{
    req.body.status = "Pending";
    const newJobApplication = new jobApplication(req.body);
    try{
        const savedJobApplication = await newJobApplication.save();
        res.status(200).json(savedJobApplication);
    }catch(err){
        next(err)
    }
}

// updateJobapplication
export const updateJobApplication = async (req,res,next) =>{
    try{
        const updateJobApplication = await jobApplication.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateJobApplication);
    }catch(err){
        next(err);
    }
}

// delete Job Application
export const deleteJobApplication = async (req,res,next) =>{
    try{
        await jobApplication.findByIdAndDelete(req.params.id);
        res.status(200).json("Job Application has been deleted");
    }catch(err){
        next(err)
    }
}

// get job application
export const getJobApplication = async (req,res,next) =>{
    try {
        const JobApplication = await jobApplication.findById(
            req.params.id
        );
        res.status(200).json(JobApplication);
    } catch (err) {
       next(err);
    }
}

//get job applications
export const getJobApplications = async (req,res,next) =>{
    try {
        const JobApplgetJobApplications = await jobApplication.find();
        res.status(200).json(JobApplgetJobApplications);
    } catch (err) {
       next(err);
    }
}


export const getPendingJobApplications = async (req, res, next) => {
    try {
      const pendingJobApplications = await jobApplication.find({ status: 'Pending' });
  
      if (!pendingJobApplications || pendingJobApplications.length === 0) {
        return res.status(404).json({ message: 'No pending job applications found' });
      }
  
      return res.status(200).json(pendingJobApplications);
    } catch (err) {
      next(err);
    }
  };
  
