import React, { useState } from "react";
import emailjs from "emailjs-com";

const CareersForm = () => {
  const [hasExperience, setHasExperience] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    salary: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✨ Send data via EmailJS
    emailjs
      .send(
         "service_gjbcw9k", // replace with your EmailJS service ID
        "template_bat5c7i", // replace with EmailJS Template ID
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          salary: form.salary,
          startDate: hasExperience ? form.startDate : "N/A",
          endDate: hasExperience ? form.endDate : "N/A",
        },
        "Vmj-Zo4qWyL0VL3Qx" // replace with EmailJS Public Key
      )
      .then(
        () => {
          alert("✅ Application submitted successfully!");
          setForm({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            salary: "",
            startDate: "",
            endDate: "",
          });
          setHasExperience(false);
        },
        (error) => {
          console.error("EmailJS Error:", error);
          alert("❌ Failed to submit. Try again later.");
        }
      );
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-pink-100">
      <div className="relative flex items-center justify-center w-full">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-6 bg-blue-100 shadow-2xl rounded-2xl "
        >
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
            Apply for Internship
          </h2>

          {/* First Name */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-gray-600">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-gray-600">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-gray-600">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold text-gray-600">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              required
            />
          </div>

          {/* Experience Checkbox */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={hasExperience}
              onChange={(e) => setHasExperience(e.target.checked)}
              className="mr-2 accent-pink-500"
            />
            <span className="text-gray-700">Do you have previous experience?</span>
          </div>

          {/* Experience Dates */}
          {hasExperience && (
            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-600">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-600">
                  End Date *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Expected Salary */}
          <div className="mb-6">
            <label className="block mb-1 text-sm font-semibold text-gray-600">
              Expected Salary *
            </label>
            <input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="Enter expected salary"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-black transition transform bg-pink-200 rounded-lg shadow-md hover:bg-pink-600 hover:scale-105"
          >
            Submit Application 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default CareersForm;
