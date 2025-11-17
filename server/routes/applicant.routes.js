import express from "express";
import { 
  uploadResume,
  createApplicant, 
  updateApplicantStatus, 
  getApplicants, 
  deleteApplicant 
} from "../controllers/applicant.controller.js";

const router = express.Router();

// GET all applicants
router.get("/", getApplicants);

// POST create applicant (MULTER MUST RUN FIRST)
router.post("/", uploadResume, createApplicant);

// PUT update status
router.put("/:id", updateApplicantStatus);

// DELETE applicant
router.delete("/:id", deleteApplicant);

export default router;
