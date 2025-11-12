// jobsRoutes.js
import express from "express";
import Job from "../models/jobModel.js";
const router = express.Router();

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

// Add new job
router.post("/", async (req, res) => {
  try {
    const job = await Job.create(req.body);
    const io = req.app.get("io");
    io.emit("jobUpdated", { type: "added", job }); // ✅ notify all clients
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update job
router.put("/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const io = req.app.get("io");
    io.emit("jobUpdated", { type: "updated", job: updatedJob }); // ✅ same name
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Failed to update job" });
  }
});

// Delete job
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);
    const io = req.app.get("io");
    if (deleted) {
      io.emit("jobUpdated", { type: "deleted", jobId: req.params.id }); // ✅ notify all clients
      res.status(200).json({ message: "Job deleted" });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
