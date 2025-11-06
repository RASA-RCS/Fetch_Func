import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    salary: String,
    startDate: String,
    endDate: String,
    appliedJob: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  },
  { timestamps: true }
);

const Applicant = mongoose.model("Applicant", applicantSchema);
export default Applicant;
