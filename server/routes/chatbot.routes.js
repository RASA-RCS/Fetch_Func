// ============================
//  Chatbot Route (AI Powered)
// ============================

import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

const router = express.Router();

// ----------------------------
// INIT AI CLIENTS
// ----------------------------
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ----------------------------
// CHATBOT ENDPOINT
// ----------------------------
router.post("/", async (req, res) => {
  try {
    const { message, model } = req.body;

    if (!message)
      return res.status(400).json({ message: "Message is required" });

    // --------------------------
    // 1️⃣ Gemini Chatbot
    // --------------------------
    if (model === "gemini") {
      const aiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await aiModel.generateContent(message);
      const reply = result?.response?.text() || "No response";

      return res.json({
        provider: "Gemini",
        reply,
      });
    }

    // --------------------------
    // 2️⃣ OpenAI Chatbot
    // --------------------------
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    const reply = response.choices[0].message.content;

    return res.json({
      provider: "OpenAI",
      reply,
    });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ message: "AI Error", error: error.message });
  }
});

export default router;
