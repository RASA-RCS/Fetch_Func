const Job = require("../models/job.model");

let io;
module.exports.setSocket = (socketIO) => {
  io = socketIO;
};

// CREATE JOB
const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);

    // Send real-time update
    if (io) io.emit("jobUpdated", { type: "create", job });

    res.status(201).json(job);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL JOBS
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE JOB
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Send real-time update
    if (io) io.emit("jobUpdated", { type: "update", job });

    res.json(job);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE JOB
const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    // Send real-time update
    if (io) io.emit("jobUpdated", { type: "delete", id: req.params.id });

    res.json({ message: "Job deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById: async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) return res.status(404).json({ message: "Not found" });
      res.json(job);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  updateJob,
  deleteJob,
  setSocket: module.exports.setSocket
};
