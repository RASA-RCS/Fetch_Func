// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of [Rasa Consultancy Services]. 
//  You shall not disclose such confidential information and shall use it only in accordance 
//with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]

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
