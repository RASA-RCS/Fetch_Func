import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import connectDB from "./config/db.js";
import jobRoutes from "./routes/jobsRoutes.js";
import applicantRoutes from "./routes/applicantsRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // ✅ frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// ✅ Serve uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Create HTTP + WebSocket server
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// ✅ Make io available to routes
app.set("io", io);

// ✅ Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/applicants", applicantRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Job Dashboard Backend is Running");
});

// ✅ Socket connection log
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);
  socket.on("disconnect", () => console.log("🔴 Client disconnected:", socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
