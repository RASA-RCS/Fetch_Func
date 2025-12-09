// models/message.model.js
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  userId: String,
  origin: { type: String, enum: ["user","bot","system"], default: "user" },
  text: String,
  meta: Object
}, { timestamps: true });

export default mongoose.model("Message", MessageSchema);
