import Applicant from "../models/applicant.model.js";
import path from "path";
import fs from "fs";

// 📌 Multer Setup for PDF Uploads
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = "uploads/resumes";

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

export const uploadResume = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDF files allowed"), false);
        }
        cb(null, true);
    },
}).single("resume");

// 📌 Controller: Create Applicant
export const createApplicant = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Resume PDF is required" });
        }

        const { name, phone, email, age, jobTitle } = req.body;

        const applicant = new Applicant({
            name,
            phone,
            email,
            age,
            jobTitle,
            resumeUrl: `/uploads/resumes/${req.file.filename}`,
        });

        await applicant.save();

        res.status(201).json({
            message: "Application submitted successfully",
            applicant,
        });
    } catch (error) {
        console.error("Error creating applicant:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update status
export const updateApplicantStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const applicant = await Applicant.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!applicant) return res.status(404).json({ message: "Applicant not found" });
        res.json(applicant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all applicants
export const getApplicants = async (req, res) => {
    try {
        const applicants = await Applicant.find().sort({ createdAt: -1 }); // newest first
        res.json(applicants);
    } catch (error) {
        console.error("Error fetching applicants:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteApplicant = async (req, res) => {
    try {
        const { id } = req.params;
        const applicant = await Applicant.findByIdAndDelete(id);
        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }
        res.json({ message: "Applicant deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};