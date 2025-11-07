import mongoose from "mongoose";

const applicantsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  jobTitle: { type: String, required: true },

  status: {
    type: String,
    enum: ["Pending", "Shortlisted", "Rejected"],
    default: "Pending",
  },
  resumePath: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

const Applicant = mongoose.model("Applicant", applicantsSchema);

export default Applicant;
