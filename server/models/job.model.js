const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: { type: String, required: true },
    Opening: { type: Number, required: true },
    experience: { type: String, default: "Fresher" },
    salary: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
