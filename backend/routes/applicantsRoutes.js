import express from "express";
import { createApplicant, getApplicants } from "../controllers/applicantsController.js";

const router = express.Router();

router.post("/", createApplicant);
router.get("/", getApplicants);

export default router;
