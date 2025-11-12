import express from "express";
import multer from "multer";
import path from "path";
import Applicant from "../models/applicantModel.js"; // ✅ updated import
import { updateApplicantStatus, deleteApplicant } from "../controllers/applicantsController.js"; // ✅ Add this line


const router = express.Router();

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/resumes/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files allowed!"));
        }
    },
});

// ✅ POST: Submit Application
router.post("/", upload.single("resume"), async (req, res) => {
    try {
        const { name, email, phone, age, jobTitle } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required" });
        }
        const resumePath = `/uploads/resumes/${req.file.filename}`;
        const applicant = new Applicant({
            name,
            email,
            phone,
            age,
            jobTitle,
            resumePath,
        });

        await applicant.save();
        res.status(201).json({ message: "Application submitted successfully!" });
    } catch (error) {
        console.error("Error saving applicant:", error);
        res.status(500).json({ message: "Server error" });
    }
});


router.put("/:id", updateApplicantStatus);
router.delete("/:id", deleteApplicant);

// ✅ PUT: Update Applicant Status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const applicant = await Applicant.findById(req.params.id);

    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    applicant.status = status;
    await applicant.save();

    res.json({ message: "Status updated successfully", applicant });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
});


// ✅ GET: Fetch all applicants
router.get("/", async (req, res) => {
    try {
        const applicants = await Applicant.find().sort({ createdAt: -1 });
        res.json(applicants);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch applicants" });
    }
});

export default router;
