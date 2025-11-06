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


// ✅ Update Applicant Status
export const updateApplicantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const applicant = await Applicant.findById(id);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    applicant.status = status || applicant.status;
    await applicant.save();

    res.status(200).json({ message: "Status updated successfully", applicant });
  } catch (error) {
    console.error("Error updating applicant status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete Applicant
export const deleteApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await Applicant.findByIdAndDelete(id);

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.status(200).json({ message: "Applicant deleted successfully" });
  } catch (error) {
    console.error("Error deleting applicant:", error);
    res.status(500).json({ message: "Server error" });
  }
};
