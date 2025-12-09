// models/event.model.js
import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  type: String,
  payload: Object,
  userId: String
}, { timestamps: true });

export default mongoose.model("Event", EventSchema);
