// controllers/chat.controller.js
import Message from "../models/message.model.js";
import Event from "../models/event.model.js";
import { callAI } from "../services/aiService.js";

let ioInstance = null;
export const setChatSocket = (io) => { ioInstance = io; };

export const postChat = async (req, res) => {
  try {
    const { userId = "anon", text } = req.body;
    if (!text) return res.status(400).json({ error: "text required" });

    const userMsg = await Message.create({ userId, origin: "user", text });
    await Event.create({ type: "message_sent", payload: { userId, text } });

    // emit incoming message for live clients/admin
    if (ioInstance) ioInstance.emit("live-chat", { userId, text, id: userMsg._id });

    // call AI (both providers optionally)
    const reply = await callAI(text, { userId });

    const botMsg = await Message.create({ userId, origin: "bot", text: reply });

    if (ioInstance) ioInstance.emit("bot-response", { userId, message: reply, id: botMsg._id });

    await Event.create({ type: "bot_response", payload: { userId, text: reply } });

    return res.json({ reply });
  } catch (err) {
    console.error("chat post error", err);
    return res.status(500).json({ error: "server_error" });
  }
};
