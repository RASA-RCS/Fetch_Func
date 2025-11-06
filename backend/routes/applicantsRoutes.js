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

        const applicant = new Applicant({
            name,
            email,
            phone,
            age,
            jobTitle,
            resumePath: req.file.path,
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
