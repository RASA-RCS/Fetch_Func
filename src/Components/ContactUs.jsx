import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields.");
      return;
    }

    // ✨ Send email using EmailJS
    emailjs
      .send(
        "service_gjbcw9k", // replace with your EmailJS service ID
        "template_bat5c7i", // replace with your EmailJS template ID
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "Vmj-Zo4qWyL0VL3Qx" // replace with your EmailJS public key
      )
      .then(
        () => {
          setSubmitted(true);
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("Email sending failed:", error);
          alert("❌ Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="pt-6">
      <Helmet>
        <title>Contact Us</title>
      </Helmet>

      {/* Hero */}
      <div className="py-12 text-center text-white bg-gradient-to-r from-blue-800 to-indigo-200">
        <h1 className="text-4xl font-bold md:text-5xl">Contact Us</h1>
        <p className="mt-3 text-lg opacity-90">
          We’d love to hear from you! Get in touch with us.
        </p>
      </div>

      {/* Contact Section */}
      <div className="grid items-center gap-12 px-6 py-16 mx-auto max-w-7xl md:grid-cols-2">
        {/* Left: Contact Details */}
        <div className="space-y-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 bg-white shadow-md rounded-xl"
          >
            <h3 className="text-xl font-semibold text-blue-700">📍 Address</h3>
            <p className="mt-2 text-gray-600">
              123 Learning Street, Knowledge City, India
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 bg-white shadow-md rounded-xl"
          >
            <h3 className="text-xl font-semibold text-blue-700">📞 Phone</h3>
            <p className="mt-2 text-gray-600">+91 9693 944 929</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 bg-white shadow-md rounded-xl"
          >
            <h3 className="text-xl font-semibold text-blue-700">📧 Email</h3>
            <p className="mt-2 text-gray-600">amarjeetkumar9779@gmail.com</p>
          </motion.div>
        </div>

        {/* Right: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 bg-white shadow-lg rounded-2xl"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          ) : (
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-green-600">
                ✅ Message Sent!
              </h3>
              <p className="mt-2 text-gray-600">
                Thank you for reaching out. We’ll get back to you soon.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
