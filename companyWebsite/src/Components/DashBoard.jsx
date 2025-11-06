import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState("jobs");
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [jobs, setJobs] = useState([]);
    const [newJob, setNewJob] = useState({
        title: "",
        description: "",
        skills: "",
        Opening: "",
        experience: "",
        salary: "",
    });

    const [applicants, setApplicants] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const jobTitles = ["Frontend", "Backend", "Fullstack", "Data Engineer"];

    // 📦 Fetch Jobs
    const fetchJobs = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/jobs");
            setJobs(res.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    // 📦 Fetch Applicants
    const fetchApplicants = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/applicants");
            setApplicants(res.data);
        } catch (error) {
            console.error("Error fetching applicants:", error);
        }
    };

    useEffect(() => {
        fetchJobs();
        fetchApplicants();
    }, []);

    // ✅ Add Job
    const handleSaveJob = async () => {
        if (!newJob.title || !newJob.description || !newJob.skills || !newJob.Opening || !newJob.salary)
            return alert("⚠️ Please fill all fields!");

        const duplicate = jobs.some(
            (job) => job.title.toLowerCase() === newJob.title.toLowerCase()
        );
        if (duplicate) return alert("⚠️ This job title already exists!");

        try {
            const res = await axios.post("http://localhost:5000/api/jobs", newJob);
            alert("✅ Job added successfully!");
            setJobs([...jobs, res.data]);
            resetForm();
        } catch (error) {
            console.error("Error adding job:", error);
        }
    };

    // ✏️ Update Job
    const handleUpdateJob = async () => {
        if (!newJob.title || !newJob.description)
            return alert("⚠️ Please fill all fields!");

        const duplicate = jobs.some(
            (job) =>
                job.title.toLowerCase() === newJob.title.toLowerCase() &&
                job._id !== editId
        );
        if (duplicate) return alert("⚠️ Another job with this title already exists!");

        try {
            const res = await axios.put(
                `http://localhost:5000/api/jobs/${editId}`,
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
            await axios.delete(`http://localhost:5000/api/jobs/${id}`);
            setJobs(jobs.filter((job) => job._id !== id));
            alert("🗑️ Job deleted successfully!");
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




    // Filters
    const [filterJob, setFilterJob] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    // Filter applicants dynamically
    const filteredApplicants = applicants.filter(
        (a) =>
            (filterJob === "" || a.jobTitle === filterJob) &&
            (filterStatus === "" || a.status === filterStatus)
    );

    // ✅ Update applicant status
    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/applicants/${id}`,
                { status: newStatus }
            );
            setApplicants((prev) =>
                prev.map((a) => (a._id === id ? { ...a, status: newStatus } : a))
            );
            console.log("Status updated:", res.data);
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    // 🗑️ Delete Applicant
    const handleDeleteApplicant = async (id) => {
        if (!window.confirm("Delete this applicant?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/applicants/${id}`);
            setApplicants((prev) => prev.filter((a) => a._id !== id));
        } catch (error) {
            console.error("Error deleting applicant:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100 pt-20">
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            {/* Sidebar */}
            <aside className="w-64 bg-indigo-700 text-white p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
                <ul className="space-y-3">
                    <li
                        className={`cursor-pointer p-2 rounded-lg ${activeSection === "jobs" ? "bg-indigo-500" : "hover:bg-indigo-600"
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
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {activeSection === "jobs" ? (
                    // ================= JOB MANAGEMENT ==================
                    <div>
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

                                {/* Job List */}
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
                                                        <td className="border p-2">
                                                            {job.experience || "Fresher"}
                                                        </td>
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
                            // Add / Edit Job Form
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                                <h2 className="text-xl font-semibold mb-4 text-center">
                                    {isEditing ? "Update Job" : "Add New Job"}
                                </h2>

                                <div className="grid grid-cols-1 gap-4">
                                    <select
                                        value={newJob.title}
                                        onChange={(e) =>
                                            setNewJob({ ...newJob, title: e.target.value })
                                        }
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
                                        onChange={(e) =>
                                            setNewJob({ ...newJob, description: e.target.value })
                                        }
                                        className="border p-2 rounded-md h-24"
                                    ></textarea>

                                    <input
                                        type="text"
                                        placeholder="Skills (e.g., React, Java)"
                                        value={newJob.skills}
                                        onChange={(e) =>
                                            setNewJob({ ...newJob, skills: e.target.value })
                                        }
                                        className="border p-2 rounded-md"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Opening (e.g., 1,2,3,4..)"
                                        value={newJob.Opening}
                                        onChange={(e) =>
                                            setNewJob({ ...newJob, Opening: e.target.value })
                                        }
                                        className="border p-2 rounded-md"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Experience (e.g., 2 years)"
                                        value={newJob.experience}
                                        onChange={(e) =>
                                            setNewJob({ ...newJob, experience: e.target.value })
                                        }
                                        className="border p-2 rounded-md"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Salary (e.g., ₹6 LPA)"
                                        value={newJob.salary}
                                        onChange={(e) =>
                                            setNewJob({ ...newJob, salary: e.target.value })
                                        }
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
                    </div>
                ) : (
                    // ================= APPLICANTS SECTION ==================
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Applicants</h2>

                        {/* 🔍 Filter Bar */}
                        <div className="flex gap-4 mb-4">
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
                        </div>

                        {/* Applicants Table */}
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
                                    {filteredApplicants.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center p-4 text-gray-500">
                                                No applicants found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredApplicants.map((app) => (
                                            <tr key={app._id} className="hover:bg-gray-50">
                                                <td className="border p-2">{app.name}</td>
                                                <td className="border p-2">{app.email}</td>
                                                <td className="border p-2">{app.phone}</td>
                                                <td className="border p-2">{app.jobTitle}</td>
                                                <td className="border p-2">
                                                    <a
                                                        href={`http://localhost:5000/uploads/${app.resume}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 underline"
                                                    >
                                                        View Resume
                                                    </a>
                                                </td>
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
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
