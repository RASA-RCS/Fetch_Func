import express from "express";
import { 
  createApplicant, 
  updateApplicantStatus, 
  getApplicants, 
  deleteApplicant 
} from "../controllers/applicant.controller.js";

const router = express.Router();

// GET all applicants
router.get("/", getApplicants);

// POST create applicant
router.post("/", createApplicant);

// PUT update status
router.put("/:id", updateApplicantStatus);

// DELETE applicant
router.delete("/:id", deleteApplicant); // ✅ Fixed: matches frontend call

export default router;
