import Applicant from "../models/applicantModel.js";

// ✅ Create applicant (when user applies from Careers form)
export const createApplicant = async (req, res) => {
  try {
    const applicant = new Applicant(req.body);
    await applicant.save();
    res.status(201).json({ success: true, message: "Application Received", applicant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all applicants (for Admin Dashboard)
export const getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find().populate("appliedJob").sort({ createdAt: -1 });
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
