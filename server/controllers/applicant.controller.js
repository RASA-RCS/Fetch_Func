// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of [Rasa Consultancy Services]. 
//  You shall not disclose such confidential information and shall use it only in accordance 
//with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]

import Applicant from "../models/applicant.model.js";
import { sendStatusEmail,sendApplicantThankYou } from "../config/EmailTemplate.js";
// import {  } from "../config/EmailTemplate.js";
import path from "path";
import fs from "fs";
import multer from "multer";

// --------------------------------------
//  MULTER STORAGE FOR PDF UPLOAD
// --------------------------------------
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


// --------------------------------------
//  CREATE APPLICANT + SEND EMAIL


// --------------------------------------
//  CREATE APPLICANT + SEND EMAIL
// --------------------------------------

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
      status: "Pending", // default status
    });

    await applicant.save();

    // -----------------------------
    // Send Thank You Email to Applicant
    // -----------------------------
   await sendApplicantThankYou(email, name, jobTitle);  // send email to applicant



    // OR if you still want to send status email also:
    // await sendStatusEmail(email, name, jobTitle, "Pending");

    res.status(201).json({
      message: `Thank you for applying for ${jobTitle}! An email has been sent to ${email}`,
      applicant,
    });

  } catch (error) {
    console.error("Error creating applicant:", error);
    res.status(500).json({ message: "Server error", error });
  }
};




// --------------------------------------
//  UPDATE STATUS + SEND EMAIL
// --------------------------------------
export const updateApplicantStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const applicant = await Applicant.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }

        // 📩 SEND EMAIL WHEN STATUS CHANGES
        await sendStatusEmail(
            applicant.email,
            applicant.name,
            applicant.jobTitle,
            status
        );

        res.json({
            message: "Status updated & email sent",
            applicant,
        });

    } catch (error) {
        console.error("Status Update Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// --------------------------------------
//  GET ALL APPLICANTS
// --------------------------------------
export const getApplicants = async (req, res) => {
    try {
        const applicants = await Applicant.find().sort({ createdAt: -1 });
        res.json(applicants);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


// --------------------------------------
//  DELETE APPLICANT
// --------------------------------------
export const deleteApplicant = async (req, res) => {
    try {
        const { id } = req.params;
        const applicant = await Applicant.findByIdAndDelete(id);

        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }

        res.json({ message: "Applicant deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
