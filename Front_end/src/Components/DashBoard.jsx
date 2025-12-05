// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of [Rasa Consultancy Services]. 
//  You shall not disclose such confidential information and shall use it only in accordance 
//with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async";
import Cookies from "js-cookie";
import { toast } from "react-toastify";


const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("jobs");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    skills: "",
    Opening: "",
    experience: "",
    salary: "",
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:9000/api/applicants/${id}`,
        { status: newStatus }
      );

      // Update UI
      setApplicants((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
      );

      // Toast Message
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 2000,
      });

    } catch (error) {
      toast.error("Failed to update status!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // ---------- APPLICANTS & FILTER STATE ----------
  const [applicants, setApplicants] = useState([]);
  const [filterJob, setFilterJob] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // New filter states (Search by Name / Email / Phone)
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  // Sorting state
  const [sortOption, setSortOption] = useState("");

  const jobTitles = [
    "Frontend",
    "Backend",
    "Fullstack",
    "Data Engineer",
    "Data Analytics",
    "Cyber Security",
    "Technical Support",
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const applicantsPerPage = 10;



// 📦 Fetch Jobs with validation
// 📦 Fetch Jobs with validation for specific fields
const fetchJobs = async () => {
  try {
    const res = await axios.get("http://localhost:9000/api/jobs");
    const data = res.data;

    // Define the fields you want to validate
    const requiredFields = ["title", "description", "skills", "Opening",  "salary"];

    // Find jobs with any missing field
    const invalidJobs = data.filter((job) =>
      requiredFields.some((field) => !job[field] || job[field] === "")
    );

    if (invalidJobs.length > 0) {
      toast.error("Error: Some job entries have missing fields!");
      console.warn("Jobs with missing fields detected:", invalidJobs);
    } else {
      setJobs(data); // Update state only if all rows are valid
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    toast.error("Failed to fetch jobs.");
  }
};



  // 📦 Fetch Applicants
  const fetchApplicants = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/applicants");
      setApplicants(res.data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchApplicants();
  }, []);

  const navigateToHome = () => {
    Cookies.remove("token");          // remove cookie token
    localStorage.removeItem("sessionExpiry");

    alert("Logged out successfully!");
    navigate("/", { replace: true });
  };

  // ✅ Validation Function
  const validateJobForm = () => {
    const numberRegex = /^[0-9]+$/;

    if (!newJob.title || !newJob.description || !newJob.skills)
      return alert("⚠️ Please fill in all required fields!");

    if (!numberRegex.test(newJob.Opening))
      return alert("⚠️ Opening must be a number only!");

    if (!numberRegex.test(newJob.salary))
      return alert("⚠️ Salary must be a number only!");

    return true;
  };

  // ✅ Add Job
  const handleSaveJob = async () => {
    if (!validateJobForm()) return;

    const duplicate = jobs.some(
      (job) => job.title.toLowerCase() === newJob.title.toLowerCase()
    );
    if (duplicate) return alert("⚠️ This job title already exists!");

    try {
      const res = await axios.post("http://localhost:9000/api/jobs", newJob);
      alert("✅ Job added successfully!");
      setJobs([...jobs, res.data]);
      resetForm();
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  // ✅ Update Job
  const handleUpdateJob = async () => {
    if (!validateJobForm()) return;

    const duplicate = jobs.some(
      (job) =>
        job.title.toLowerCase() === newJob.title.toLowerCase() &&
        job._id !== editId
    );
    if (duplicate) return alert("⚠️ Another job with this title already exists!");

    try {
      const res = await axios.put(
        `http://localhost:9000/api/jobs/${editId}`,
        newJob
      );
      alert("✅ Job updated successfully!");
      setJobs(jobs.map((job) => (job._id === editId ? res.data : job)));
      resetForm();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  // 🗑️ Delete Job
  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`http://localhost:9000/api/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
      alert(" Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleEditJob = (job) => {
    setIsEditing(true);
    setEditId(job._id);
    setNewJob({
      title: job.title,
      description: job.description,
      skills: job.skills,
      Opening: job.Opening,
      experience: job.experience,
      salary: job.salary,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
    setNewJob({
      title: "",
      description: "",
      skills: "",
      Opening: "",
      experience: "",
      salary: "",
    });
  };

  // -------------------- FILTER + SORT LOGIC --------------------
  // This replaces the old filteredApplicants and adds search + sort.
  const filteredApplicants = applicants
    .filter((a) =>
      // Job filter (empty means all)
      (filterJob === "" || a.jobTitle === filterJob) &&
      // Status filter
      (filterStatus === "" || a.status === filterStatus) &&
      // Name search (case-insensitive)
      (searchName === "" || (a.name || "").toLowerCase().includes(searchName.toLowerCase())) &&
      // Email search (case-insensitive)
      (searchEmail === "" || (a.email || "").toLowerCase().includes(searchEmail.toLowerCase())) &&
      // Phone search (partial match)
      (searchPhone === "" || (a.phone || "").includes(searchPhone))
    )
    .sort((a, b) => {
      if (sortOption === "az") return (a.name || "").localeCompare(b.name || "");
      if (sortOption === "za") return (b.name || "").localeCompare(a.name || "");
      if (sortOption === "newest") {
        // fallback: if createdAt not present, compare by _id (string) so order is stable
        const da = a.createdAt ? new Date(a.createdAt) : null;
        const db = b.createdAt ? new Date(b.createdAt) : null;
        if (da && db) return db - da;
        return (b._id || "").localeCompare(a._id || "");
      }
      if (sortOption === "oldest") {
        const da = a.createdAt ? new Date(a.createdAt) : null;
        const db = b.createdAt ? new Date(b.createdAt) : null;
        if (da && db) return da - db;
        return (a._id || "").localeCompare(b._id || "");
      }
      return 0;
    });

  // Reset page to 1 when filters change to avoid empty pages
  useEffect(() => {
    setCurrentPage(1);
  }, [filterJob, filterStatus, searchName, searchEmail, searchPhone, sortOption, applicants]);

  // ✅ Pagination Logic (unchanged)
  const indexOfLast = currentPage * applicantsPerPage;
  const indexOfFirst = indexOfLast - applicantsPerPage;
  const currentApplicants = filteredApplicants.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredApplicants.length / applicantsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // 🗑️ Delete Applicant
  const handleDeleteApplicant = async (id) => {
    if (!window.confirm("Delete this applicant?")) return;
    try {
      await axios.delete(`http://localhost:9000/api/applicants/${id}`);
      setApplicants((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Error deleting applicant:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-300 pt-20">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
        <ul className="space-y-3">
          <li
            className={`cursor-pointer p-2 rounded-lg ${activeSection === "jobs"
              ? "bg-indigo-500"
              : "hover:bg-indigo-600"
              }`}
            onClick={() => {
              setActiveSection("jobs");
              resetForm();
            }}
          >
            Jobs
          </li>
          <li
            className={`cursor-pointer p-2 rounded-lg ${activeSection === "applicants"
              ? "bg-indigo-500"
              : "hover:bg-indigo-600"
              }`}
            onClick={() => {
              setActiveSection("applicants");
              resetForm();
            }}
          >
            Applicants
          </li>
          <button
            onClick={navigateToHome}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeSection === "jobs" ? (
          // ================= JOB MANAGEMENT ==================
          <JobSection
            showForm={showForm}
            setShowForm={setShowForm}
            isEditing={isEditing}
            handleSaveJob={handleSaveJob}
            handleUpdateJob={handleUpdateJob}
            handleEditJob={handleEditJob}
            handleDeleteJob={handleDeleteJob}
            newJob={newJob}
            setNewJob={setNewJob}
            resetForm={resetForm}
            jobs={jobs}
            jobTitles={jobTitles}
          />
        ) : (
          // ================= APPLICANT SECTION ==================
          <ApplicantSection
            jobs={jobs}
            filteredApplicants={filteredApplicants}
            currentApplicants={currentApplicants}
            filterJob={filterJob}
            setFilterJob={setFilterJob}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            handleNext={handleNext}
            handlePrev={handlePrev}
            currentPage={currentPage}
            totalPages={totalPages}
            handleStatusChange={handleStatusChange}
            handleDeleteApplicant={handleDeleteApplicant}
            applicantsPerPage={applicantsPerPage}
            // pass new filter & sort states and their setters
            searchName={searchName}
            setSearchName={setSearchName}
            searchEmail={searchEmail}
            setSearchEmail={setSearchEmail}
            searchPhone={searchPhone}
            setSearchPhone={setSearchPhone}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        )}
      </main>
    </div>
  );
};

/* ================= Helper Components ================= */

const JobSection = ({
  showForm,
  setShowForm,
  isEditing,
  handleSaveJob,
  handleUpdateJob,
  handleEditJob,
  handleDeleteJob,
  newJob,
  setNewJob,
  resetForm,
  jobs,
  jobTitles,
}) => (
  <>
    {!showForm ? (
      <>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Job Management</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            + Add Job
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-3">Job List</h3>
          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs added yet.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Title</th>
                  <th className="border p-2 text-left">Skills</th>
                  <th className="border p-2 text-left">Experience</th>
                  <th className="border p-2 text-left">Opening</th>
                  <th className="border p-2 text-left">Salary</th>
                  <th className="border p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50">
                    <td className="border p-2">{job.title}</td>
                    <td className="border p-2">{job.skills}</td>
                    <td className="border p-2">{job.experience || "Fresher"}</td>
                    <td className="border p-2">{job.Opening}</td>
                    <td className="border p-2">{job.salary}</td>
                    <td className="border p-2 text-center space-x-3">
                      <button
                        onClick={() => handleEditJob(job)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </>
    ) : (
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isEditing ? "Update Job" : "Add New Job"}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <select
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            className="border p-2 rounded-md"
          >
            <option value="">Select Job Title</option>
            {jobTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Job Description"
            value={newJob.description}
            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            className="border p-2 rounded-md h-24"
          ></textarea>

          <input
            type="text"
            placeholder="Skills (e.g., React, Java)"
            value={newJob.skills}
            onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
            className="border p-2 rounded-md"
          />

          <input
            type="text"
            placeholder="Opening (e.g., 1,2,3,4..)"
            value={newJob.Opening}
            onChange={(e) => setNewJob({ ...newJob, Opening: e.target.value })}
            className="border p-2 rounded-md"
          />

          <input
            type="text"
            placeholder="Experience (e.g., 2 years)"
            value={newJob.experience}
            onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
            className="border p-2 rounded-md"
          />

          <input
            type="text"
            placeholder="Salary (e.g., ₹6 LPA)"
            value={newJob.salary}
            onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
            className="border p-2 rounded-md"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={resetForm}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={isEditing ? handleUpdateJob : handleSaveJob}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {isEditing ? "Update Job" : "Save Job"}
          </button>
        </div>
      </div>
    )}
  </>
);

const ApplicantSection = ({
  jobs,
  filteredApplicants,
  currentApplicants,
  filterJob,
  setFilterJob,
  filterStatus,
  setFilterStatus,
  handleNext,
  handlePrev,
  currentPage,
  totalPages,
  handleStatusChange,
  handleDeleteApplicant,
   applicantsPerPage,  
  searchName,
  setSearchName,
  searchEmail,
  setSearchEmail,
  searchPhone,
  setSearchPhone,
  sortOption,
  setSortOption
}) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Applicants</h2>

    {/* ---------------- FILTERS: Job / Status / Search Name / Email / Phone / Sort ---------------- */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      {/* Job Filter (fixed) */}
      <select
        onChange={(e) => setFilterJob(e.target.value)}
        value={filterJob}
        className="border p-2 rounded-md"
      >
        <option value="">All Jobs</option>
        {jobs.map((job) => (
          <option key={job._id} value={job.title}>
            {job.title}
          </option>
        ))}
      </select>

      {/* Status Filter */}
      <select
        onChange={(e) => setFilterStatus(e.target.value)}
        value={filterStatus}
        className="border p-2 rounded-md"
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Shortlisted">Shortlisted</option>
        <option value="Rejected">Rejected</option>
      </select>

      {/* Search by Name */}
      <input
        type="text"
        placeholder="Search by Name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        className="border p-2 rounded-md"
      />

      {/* Search by Email */}
      <input
        type="text"
        placeholder="Search by Email"
        value={searchEmail}
        onChange={(e) => setSearchEmail(e.target.value)}
        className="border p-2 rounded-md"
      />
    </div>

    {/* Extra row: Phone + Sort */}
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by Phone"
        value={searchPhone}
        onChange={(e) => setSearchPhone(e.target.value)}
        className="border p-2 rounded-md w-full md:w-1/3"
      />

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border p-2 rounded-md w-40"
      >
        <option value="">Sort By</option>
        <option value="az">Name A–Z</option>
        <option value="za">Name Z–A</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>

    {/* ---------------- TABLE ---------------- */}
    <div className="bg-white p-4 rounded-lg shadow-md">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Phone</th>
            <th className="border p-2 text-left">Applied Job</th>
            <th className="border p-2 text-left">Resume</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentApplicants.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-4 text-gray-500">
                No applicants found.
              </td>
            </tr>
          ) : (
            currentApplicants.map((app) => (
              <tr key={app._id} className="hover:bg-gray-50">
                <td className="border p-2">{app.name}</td>
                <td className="border p-2">{app.email}</td>
                <td className="border p-2">{app.phone}</td>
                <td className="border p-2">{app.jobTitle}</td>
                <td className="border p-2">
                  {app.resumeUrl ? (
                    <a
                      href={`http://localhost:9000${app.resumeUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    "Not Available"
                  )}
                </td>

                {/* Status Change Dropdown */}
                <td className="border p-2">
                  <select
                    value={app.status || "Pending"}
                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                    className="border rounded-md p-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>

                {/* Delete */}
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDeleteApplicant(app._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/* PAGINATION */}
    {filteredApplicants.length > applicantsPerPage && (
      <div className="flex justify-center items-center mt-4 space-x-3">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
        >
          Next
        </button>
      </div>
    )}
  </div>
);

export default Dashboard;
