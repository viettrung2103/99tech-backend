import { Request, Response, RequestHandler } from "express";
import mongoose from "mongoose";
import Job, { CompanyType } from "../models/jobModel";
import { AuthenticatedRequest } from "../types/types";
import { error } from "console";

interface CreateJobRequest {
  title: string;
  type: string;
  description: string;
  company: CompanyType;
}


// Get all jobs
export const getAllJobs:RequestHandler = async (req:Request, res:Response): Promise<void> => {

  try {
    const jobs = await Job.find({ }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Create a new job
export const createJob = async (req:AuthenticatedRequest, res:Response):Promise<void> => {

  try {
    const user_id = req.user?._id;
    if (!user_id) {
      res.status(401).json({ error: "User authentication required" })
      return
    }

    const { title, type, description, company } = req.body as CreateJobRequest;

    if (!title || !type || !description) {
      res.status(400).json({
        error:"Missing required fields"
      })
      return;
    }

    if (!company || typeof company !== "object") {
      res.status(400).json({
        error:"company info is required"
      })
      return
    }

    if (!company.contactEmail || !company.contactPhone || !company.name) {
      res.status(400).json({
        error:"contact fields is missing"
      })
      return
    }

    const newJob = new Job({
      ...req.body,
      user_id,
    });


    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Server Error" });

  }
};

// Get job by ID
export const getJobById = async (req:AuthenticatedRequest, res:Response):Promise<void> => {
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    res.status(404).json({ error: "No such job" });
    return
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      console.log("Job not found");
      res.status(404).json({ message: "Job not found" });
      return
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Update job by ID
export const updateJob = async (req:AuthenticatedRequest, res:Response) :Promise<void>=> {
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    res.status(404).json({ error: "No such job" });
    return
  }

  try {
    // const user_id = req.user._id;
    const job = await Job.findOneAndUpdate(
      { _id: jobId },
      { ...req.body },
      { new: true }
    );
    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete job by ID
export const deleteJob = async (req:AuthenticatedRequest, res:Response):Promise<void> => {
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    res.status(404).json({ error: "No such job" });
    return
  }

  try {
    // const user_id = req.user._id;
    const job = await Job.findOneAndDelete({ _id: jobId });
    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

