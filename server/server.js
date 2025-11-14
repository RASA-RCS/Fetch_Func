import express from "express";
import cors from "cors";
import http from "http";
import connectDB from "./config/db.js";
import jobRoutes from "./routes/job.routes.js";
import applicantRoutes from "./routes/applicant.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/jobs", jobRoutes);
app.use("/api/applicants", applicantRoutes);

const server = http.createServer(app);

const start = async () => {
  await connectDB();
  server.listen(5000, () => console.log("Server running on port 5000"));
};

start();
