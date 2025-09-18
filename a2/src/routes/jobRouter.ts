import express from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobControllers";
import requireAuth from "../middleware/requireAuth";

const router = express.Router();

// Public routes
router.get("/", getAllJobs);
router.get("/:jobId", getJobById);

// Protected routes
router.use(requireAuth);
router.post("/", createJob);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);

export default router;
