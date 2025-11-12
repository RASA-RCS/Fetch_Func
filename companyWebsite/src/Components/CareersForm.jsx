import React, { useState } from "react";
import axios from "axios";

const CareersForm = ({ selectedJob }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    jobTitle: selectedJob || "",
    resume: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "resume") {
      const file = files[0];
      if (file && file.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        return;
      }
      if (file && file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB.");
        return;
      }
      setError("");
      setFormData({ ...formData, resume: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resume) {
      setError("Please upload your resume (PDF only).");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("age", formData.age);
      data.append("jobTitle", formData.jobTitle);
      data.append("resume", formData.resume);

      const response = await axios.post(
        "http://localhost:5000/api/applicants",   // ✅ correct route
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSuccess("Application submitted successfully!");
      console.log("Server Response:", response.data);
      setError("");
      setFormData({
        name: "",
        phone: "",
        email: "",
        age: "",
        jobTitle: selectedJob || "",
        resume: null,
      });
    } catch (err) {
      console.error("Error uploading:", err);
      setError("Failed to submit application. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="mb-4 text-2xl font-semibold text-center text-blue-700">
        Apply for {formData.jobTitle}
      </h2>

      <div>
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Phone</label>
        <input
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Age</label>
        <input
          type="number"
          name="age"
          required
          value={formData.age}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Upload Resume (PDF, max 5MB)
        </label>
        <input
          type="file"
          name="resume"
          accept="application/pdf"
          onChange={handleChange}
          className="w-full"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      <button
        type="submit"
        className="w-full py-2 mt-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Submit Application
      </button>
    </form>
  );
};

export default CareersForm;
