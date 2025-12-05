// ---------------- COPYRIGHT & CONFIDENTIALITY ----------------
//  Copyright (c) [2025] [Rasa Consultancy Services]. All rights reserved.
//  This software is the confidential and proprietary information of [Rasa Consultancy Services]. 
//  You shall not disclose such confidential information and shall use it only in accordance 
//  with the terms of the license agreement you entered into with [Rasa Consultancy Services].
//  For more information, please contact: [Your Company Email/Legal Department Contact]

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CareersForm = ({ selectedJob }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    jobTitle: selectedJob || "",
    resume: null,
  });

  const [liveErrors, setLiveErrors] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",

  });

  const validateLive = (name, value) => {
    let message = "";

    if (name === "name") {
      if (!/^[A-Za-z]*$/.test(value)) {
        message = "Only letters allowed";
      }
    }
    if (name === "phone") {
      if (!/^\d*$/.test(value)) {
        message = "Only digits allowed";
      } else if (value.length > 10) {
        message = "Cannot exceed 10 digits";
      }
    }
    // Email — MUST HAVE ONLY ONE DOT AFTER '@'
    if (name === "email") {
      const emailParts = value.split("@");

      if (emailParts.length === 2) {
        const afterAt = emailParts[1];
        const dotCount = (afterAt.match(/\./g) || []).length;

        if (dotCount > 1) {
          message = "Only one dot allowed after @";
        }
      }

      // Basic email shape check
      const emailRegex =
        /^[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

      if (value && !emailRegex.test(value)) {
        message =
          "Invalid email format (must start with a letter and contain only one dot after @)";
      }
    }

    setLiveErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };


  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Load saved data from localStorage whenever selectedJob changes
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("careersFormData")) || {};
    setFormData({
      ...savedData,
      jobTitle: selectedJob || savedData.jobTitle || "",
      resume: null, // always reset resume when opening a new job
    });
    setError("");
    setSuccess("");
  }, [selectedJob]);

  // ✅ Save form data to localStorage (excluding resume)
  useEffect(() => {
    const { resume, ...textOnly } = formData;
    localStorage.setItem("careersFormData", JSON.stringify(textOnly));
  }, [formData]);

  // ✅ Handle input changes
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

  // ✅ Validate form
  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^(?!\.)([a-zA-Z0-9._%+-]+)@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!nameRegex.test(formData.name)) {
      setError("Name must contain only letters.");
      return false;
    }
    if (!phoneRegex.test(formData.phone)) {
      setError("Phone number must be 10 digits only.");
      return false;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email (should not start with '.').");
      return false;
    }
    if (!formData.resume) {
      setError("Please upload your resume (PDF only).");
      return false;
    }

    setError("");
    return true;
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("age", formData.age);
      data.append("jobTitle", formData.jobTitle);
      data.append("resume", formData.resume);

      const response = await axios.post(
        "http://localhost:9000/api/applicants",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Thank you for applying! Email sent successfully.", {
        position: "top-right",
        autoClose: 3000,
      });

      console.log("Server Response:", response.data);

      // ✅ Clear resume but keep all other fields in localStorage
      setFormData((prev) => ({
        ...prev,
        resume: null,
      }));

      setError("");
      setSuccess("Application submitted successfully!");
    } catch (err) {
      console.error("Error uploading:", err);
      toast.error("Failed to submit application. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
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
          name="name"
          value={formData.name}
          type="text"
          onChange={(e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
            validateLive(name, value);
            handleChange;
          }}
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your full name"
        />
        {liveErrors.name && (
          <p className="text-red-500 text-xs">{liveErrors.name}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
            validateLive(name, value);
            handleChange;
          }}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="example@email.com"
        />
        {liveErrors.email && (
          <p className="text-red-500 text-xs">{liveErrors.email}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Phone</label>
        <input
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={(e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
            validateLive(name, value);
            handleChange;
          }}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="10-digit number"
        />
        {liveErrors.phone && (
          <p className="text-red-500 text-xs">{liveErrors.phone}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Age</label>
        <input
          type="number"
          name="age"
          required
          value={formData.age}
          onChange={(e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
            validateLive(name, value);
            handleChange;
          }}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
         {liveErrors.age && (
          <p className="text-red-500 text-xs">{liveErrors.age}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Upload Resume (PDF, max 5MB)</label>
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
