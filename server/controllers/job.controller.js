
import Job from "../models/job.model.js";

let io = null;

// Attach socket globally
export const setSocket = (socketIO) => {
  io = socketIO;
};

// CREATE JOB
export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);

    if (io) {
      io.emit("jobUpdated", {
        type: "added",
        job,
      });
    }

    res.status(201).json(job);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL JOBS
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET JOB BY ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE JOB
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (io) {
      io.emit("jobUpdated", {
        type: "updated",
        job,
      });
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    if (io) {
      io.emit("jobUpdated", {
        type: "deleted",
        jobId: req.params.id,
      });
    }

    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
