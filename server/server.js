// ================================
// server.js  (FULL WORKING VERSION)
// ================================

import express from "express";
import cors from "cors";
import http from "http";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"; // All authentication related routes
import dotenv from "dotenv"; 

// Routes
import jobRoutes from "./routes/job.routes.js";
import applicantRoutes from "./routes/applicant.routes.js";

// Socket controller link
import { setSocket } from "./controllers/job.controller.js";

// Import Socket.io
import { Server } from "socket.io";

const app = express();

const PORT = process.env.PORT || 9000; // Set port from env or default 9000

// ================================
// MIDDLEWARE
// ================================
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// ================================
// API ROUTES
// ================================
app.use("/api/jobs", jobRoutes);
app.use("/api/applicants", applicantRoutes);

// Authentication routes
app.use("/api/auth", authRoutes); // All routes prefixed with /api/auth

// ================================
// CREATE HTTP SERVER
// ================================
const server = http.createServer(app);

// ================================
// SOCKET.IO INITIALIZATION (IMPORTANT)
// ================================
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Pass `io` to the controller so it can emit events
setSocket(io);

// Log socket connections
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// ================================
// START SERVER
// ================================
const start = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log("🚀 Server running on port ",PORT);
  });
};

start();
