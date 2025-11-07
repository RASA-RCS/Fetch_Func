import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import CareersForm from "./CareersForm";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// ✅ Create socket connection outside the component (global)
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const slides = [
  {
    img: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=800&q=80",
    title:
      "Our Company is proud to be an equal opportunity and affirmative action employer.",
    description:
      "We are committed to building a workforce that represents our users, building a culture of belonging and equal opportunity.",
  },
  {
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    title: "Innovation and Growth",
    description:
      "At Our Company, we foster innovation and encourage continuous learning. We grow together through ownership and collaboration.",
  },
  {
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    title: "Commitment to Excellence",
    description:
      "We believe in teamwork, creativity, and diversity — aiming to create a meaningful impact and growth for all.",
  },
];

const Careers = () => {
  const [index, setIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Slider rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 📦 Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

 // ✅ Connect socket and listen for updates
useEffect(() => {
  fetchJobs();

  socket.on("connect", () => {
    console.log("🟢 Connected to Socket.io server");
  });

  // ✅ Listen to the same event your server emits: "jobUpdated"
  socket.on("jobUpdated", (data) => {
    console.log("📡 Job update received:", data);

    // 🔄 Update state instantly without fetching again (optional but fast)
    if (data.type === "added") {
      setJobs((prev) => [data.job, ...prev]);
      toast.success(`🆕 New job added: ${data.job.title}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } else if (data.type === "updated") {
      setJobs((prev) =>
        prev.map((j) => (j._id === data.job._id ? data.job : j))
      );
      toast.info(`✏️ Job updated: ${data.job.title}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } else if (data.type === "deleted") {
      setJobs((prev) => prev.filter((j) => j._id !== data.jobId));
      toast.warn(`🗑️ A job was removed.`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  });

  return () => {
    socket.off("jobUpdated");
    // socket.disconnect();
  };
}, []);

  const handleApplyClick = (jobTitle) => {
    setSelectedJob(jobTitle);
    setShowForm(true);
  };

  return (
    <div className="pt-6">
      <Helmet>
        <title>Careers</title>
      </Helmet>

      {/* Header Section */}
      <div className="py-12 text-center text-white bg-gradient-to-r from-blue-800 to-indigo-100">
        <h1 className="text-4xl font-extrabold md:text-5xl">Join Our Team @ XYZ</h1>
      </div>

      {/* Slider Section */}
      <div className="grid items-center grid-cols-1 gap-10 px-4 py-16 mx-auto max-w-7xl md:grid-cols-2">
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[index].img}
            src={slides[index].img}
            alt={slides[index].title}
            className="w-full h-[350px] object-cover rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].title}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-2xl font-bold text-gray-800">{slides[index].title}</h2>
            <p className="text-gray-700 leading-relaxed">{slides[index].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Job Cards */}
      <div className="px-6 py-12 mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-extrabold text-center text-gray-800">
          💼 Open Positions
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">No job openings available right now.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <motion.div
                key={job._id}
                className="relative overflow-hidden transition-all bg-white border rounded-2xl shadow hover:shadow-2xl hover:scale-[1.02]"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      job.image ||
                      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={job.title}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white drop-shadow-md">
                    {job.title}
                  </h3>
                </div>

                <div className="p-6 space-y-3">
                  <p>
                    <span className="font-semibold text-blue-700">Openings:</span>{" "}
                    {job.Opening || "Not specified"}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-700">Experience:</span>{" "}
                    {job.experience ? `${job.experience} years` : "Fresher"}
                  </p>
                  <p>
                    <span className="font-semibold text-blue-700">Package:</span>{" "}
                    {job.salary ? `${job.salary} LPA` : "Not disclosed"}
                  </p>
                  <p className="pt-2 text-sm text-gray-600 border-t">
                    {job.description?.length > 120
                      ? job.description.slice(0, 120) + "..."
                      : job.description || "No description provided."}
                  </p>

                  <button
                    onClick={() => handleApplyClick(job.title)}
                    className="w-full px-4 py-2 mt-4 text-sm font-semibold text-white transition bg-blue-600 rounded-full hover:bg-blue-700"
                  >
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Application Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-2xl p-6 bg-white rounded-xl shadow-lg"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute text-2xl text-gray-600 top-3 right-4 hover:text-red-500"
              >
                ✖
              </button>
              <CareersForm selectedJob={selectedJob} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
};

export default Careers;
