// routes/chat.routes.js
import express from "express";
import * as chatCtrl from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", chatCtrl.postChat);

export default router;
